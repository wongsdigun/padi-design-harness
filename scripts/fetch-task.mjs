#!/usr/bin/env node
/* scripts/fetch-task.mjs
 * Fetch task context from Supabase public.tasks into prototype directory _task-context.json
 * Usage:
 *   node scripts/fetch-task.mjs --list
 *   node scripts/fetch-task.mjs <wbs-code-or-id> [--out src/prototypes/<user>/<slug>]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

// Load .env.local if present
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

const base = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

if (!base || !key) {
  console.error('[fetch-task] Error: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const args = process.argv.slice(2);
const listOnly = args.includes('--list') || args.length === 0;
const queryParam = args.find(a => !a.startsWith('--'));
const outIdx = args.indexOf('--out');
const outDir = outIdx !== -1 && args[outIdx + 1] ? args[outIdx + 1] : null;

async function get(path) {
  const res = await fetch(`${base}/rest/v1/${path}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });
  if (!res.ok) {
    throw new Error(`Supabase request failed: HTTP ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function run() {
  if (listOnly) {
    console.log('[fetch-task] Querying recent tasks from Supabase...');
    const tasks = await get('tasks?select=id,wbs,title,status,priority,assignees,squads,figma_url,prd_url&order=created_at.desc&limit=30');
    console.log(`\nFound ${tasks.length} recent tasks:`);
    console.table(tasks.map(t => ({
      WBS: t.wbs || '(none)',
      Title: (t.title || '').slice(0, 36),
      Status: t.status,
      Assignees: Array.isArray(t.assignees) ? t.assignees.join(', ') : '',
      Figma: t.figma_url ? 'Yes' : 'No',
      PRD: t.prd_url ? 'Yes' : 'No'
    })));
    return;
  }

  console.log(`[fetch-task] Searching for task matching "${queryParam}"...`);
  const encoded = encodeURIComponent(queryParam);
  // Try exact match on id or wbs, or title ilike
  const tasks = await get(`tasks?select=*&or=(id.eq.${encoded},wbs.eq.${encoded},title.ilike.*${encoded}*)&limit=5`);

  if (!tasks || tasks.length === 0) {
    console.error(`[fetch-task] No task found matching "${queryParam}".`);
    process.exit(1);
  }

  const task = tasks[0];
  const context = {
    task: {
      id: task.id,
      wbs: task.wbs || null,
      title: task.title || '(untitled)',
      status: task.status || 'Backlog',
      priority: task.priority || 'Medium',
      squads: Array.isArray(task.squads) ? task.squads : [],
      assignees: Array.isArray(task.assignees) ? task.assignees : [],
      startDate: task.start_date || null,
      endDate: task.end_date || null,
      links: {
        figma: task.figma_url || null,
        prd: task.prd_url || null,
        taiga: task.taiga_url || null,
        userflow: task.userflow_url || null,
        other: task.other_docs || null
      },
      description: task.description || '',
      fetchedAt: new Date().toISOString()
    }
  };

  console.log('\nTask Context Resolved:');
  console.log(`- ID: ${context.task.id}`);
  console.log(`- WBS: ${context.task.wbs}`);
  console.log(`- Title: ${context.task.title}`);
  console.log(`- Status: ${context.task.status}`);
  console.log(`- Assignees: ${context.task.assignees.join(', ')}`);
  console.log(`- Figma: ${context.task.links.figma || '(none)'}`);
  console.log(`- PRD: ${context.task.links.prd || '(none)'}`);

  if (outDir) {
    const targetFile = resolve(process.cwd(), outDir, '_task-context.json');
    mkdirSync(dirname(targetFile), { recursive: true });
    writeFileSync(targetFile, JSON.stringify(context, null, 2), 'utf8');
    console.log(`\nWritten task context to ${targetFile}`);
  }
}

run().catch(err => {
  console.error('[fetch-task] Fatal error:', err.message);
  process.exit(1);
});
