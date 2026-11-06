#!/usr/bin/env node
/* scripts/sync-notion.mjs
 * Sync Design Kanban tasks (from CSV or Notion export) into Supabase public.tasks.
 * Supports the ENABLE_NOTION_SYNC environment toggle:
 *   - When ENABLE_NOTION_SYNC !== 'true' (default): Runs in dry-run mode, validates data hygiene,
 *     and reports status without modifying Supabase.
 *   - When ENABLE_NOTION_SYNC === 'true': Performs upsert into Supabase public.tasks.
 *
 * Usage:
 *   node scripts/sync-notion.mjs [--dry-run] [--force-sync]
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Load .env.local
const envPath = resolve(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [k, ...v] = trimmed.split('=');
    if (k && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join('=').trim();
    }
  }
}

const isSyncEnabled = process.env.ENABLE_NOTION_SYNC === 'true' || process.argv.includes('--force-sync');
const isDryRun = process.argv.includes('--dry-run') || !isSyncEnabled;

const base = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

// Robust CSV parser
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  const clean = text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;

  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    const next = clean[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        cell += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(cell.trim());
        cell = '';
      } else if (c === '\n' || (c === '\r' && next === '\n')) {
        if (c === '\r') i++;
        row.push(cell.trim());
        rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += c;
      }
    }
  }
  if (cell || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows;
}

// Date parser: "Oct 5 → Oct 16" -> { start: "2026-10-05", end: "2026-10-16" }
const monthMap = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
};

function parseDateRange(dateStr) {
  if (!dateStr || !dateStr.includes('→')) return { start: null, end: null };
  const [sPart, ePart] = dateStr.split('→').map(p => p.trim());
  
  function parseSingle(str) {
    if (!str) return null;
    const parts = str.split(/\s+/);
    if (parts.length >= 2) {
      const mStr = parts[0].toLowerCase().slice(0, 3);
      const m = monthMap[mStr];
      const d = parts[1].padStart(2, '0');
      if (m && d) return `2026-${m}-${d}`;
    }
    return null;
  }

  const start = parseSingle(sPart);
  // If end part lacks month (e.g. "Oct 5 → 16"), inherit start month
  let end = null;
  if (ePart) {
    const eTokens = ePart.split(/\s+/);
    if (eTokens.length === 1 && /^\d+$/.test(eTokens[0]) && start) {
      end = `${start.slice(0, 7)}-${eTokens[0].padStart(2, '0')}`;
    } else {
      end = parseSingle(ePart);
    }
  }

  return { start, end };
}

// Extract Notion hex ID from URL if present
function parseParentId(parentStr) {
  if (!parentStr) return null;
  const match = parentStr.match(/([a-f0-9]{32})/i);
  return match ? match[1] : null;
}

async function run() {
  const csvPath = resolve(process.cwd(), 'data/notion-kanban-q4.csv');
  if (!existsSync(csvPath)) {
    console.error(`[sync-notion] Missing ${csvPath}`);
    process.exit(1);
  }

  const rows = parseCSV(readFileSync(csvPath, 'utf8'));
  const headers = rows[0] || [];
  
  const col = name => headers.indexOf(name);
  const nameIdx = col('Name');
  const assignedIdx = col('Assigned To');
  const codeIdx = col('Backlog WBS Code');
  const dateIdx = col('Date');
  const otherDocsIdx = col('Other docs');
  const pmIdx = col('PM');
  const parentIdx = col('Parent item');
  const priorityIdx = col('Priority');
  const squadIdx = col('Squad / Funnel');
  const statusIdx = col('Status');
  const figmaIdx = col('URL Figma');
  const prdIdx = col('URL PRD');
  const taigaIdx = col('URL Taiga');
  const userflowIdx = col('User flow');

  const tasks = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const name = (r[nameIdx] || '').replace(/[\u00A0\r\n]+/g, ' ').trim();
    if (!name || name === 'Name') continue;

    const dates = parseDateRange(r[dateIdx]);
    const assignees = (r[assignedIdx] || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const pms = (r[pmIdx] || '')
      .split(/[,/]+/)
      .map(s => s.trim())
      .filter(Boolean);
    const squads = (r[squadIdx] || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    tasks.push({
      title: name,
      wbs: (r[codeIdx] || '').trim() || null,
      status: (r[statusIdx] || 'Backlog').trim(),
      priority: (r[priorityIdx] || 'Medium').trim(),
      assignees,
      pms,
      squads,
      start_date: dates.start,
      end_date: dates.end,
      figma_url: (r[figmaIdx] || '').trim() || null,
      prd_url: (r[prdIdx] || '').trim() || null,
      taiga_url: (r[taigaIdx] || '').trim() || null,
      userflow_url: (r[userflowIdx] || '').trim() || null,
      other_docs: (r[otherDocsIdx] || '').trim() || null,
      parent_id: parseParentId(r[parentIdx]),
      quarter: 'Q4 2026'
    });
  }

  console.log(`[sync-notion] Parsed ${tasks.length} design tasks from CSV.`);
  console.log(`[sync-notion] Mode: ${isDryRun ? 'DRY-RUN (Safe Read-Only)' : 'LIVE UPSERT (ENABLE_NOTION_SYNC=true)'}`);

  if (isDryRun) {
    console.log('\nSample Parsed Tasks (First 3):');
    tasks.slice(0, 3).forEach((t, idx) => {
      console.log(`  [${idx + 1}] WBS: ${t.wbs || '-'} | Squad: ${t.squads.join('/') || '-'} | Status: ${t.status}`);
      console.log(`      Title: ${t.title}`);
      console.log(`      Dates: ${t.start_date || '?'} to ${t.end_date || '?'}`);
      console.log(`      Assignees: ${t.assignees.join(', ') || '-'} | PMs: ${t.pms.join(', ') || '-'}`);
      console.log(`      Figma: ${t.figma_url ? 'Yes' : 'No'} | PRD: ${t.prd_url ? 'Yes' : 'No'}`);
    });

    console.log('\n[sync-notion] Verification complete.');
    console.log('To execute live upsert to Supabase, run with: ENABLE_NOTION_SYNC=true node scripts/sync-notion.mjs');
    return;
  }

  // Live UPSERT into Supabase
  if (!base || !key) {
    console.error('[sync-notion] Error: Missing Supabase credentials in .env.local');
    process.exit(1);
  }

  console.log(`[sync-notion] Performing UPSERT of ${tasks.length} tasks into Supabase ${base} ...`);
  const res = await fetch(`${base}/rest/v1/tasks?on_conflict=title`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation'
    },
    body: JSON.stringify(tasks)
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[sync-notion] Upsert failed (HTTP ${res.status}):`, errorText);
    process.exit(1);
  }

  const result = await res.json();
  console.log(`[sync-notion] Successfully upserted ${result.length} tasks into Supabase!`);
}

run().catch(err => {
  console.error('[sync-notion] Fatal error:', err.message);
  process.exit(1);
});
