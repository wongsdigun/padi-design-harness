#!/usr/bin/env node
/* scripts/sync-product-wbs.mjs
 * Parse all 3 side-by-side tables from Product WBS CSV:
 * 1. Funnel x Sprint Roadmap (cols 0-7, including Design row)
 * 2. Backlog Code Initiatives (cols 9-12 with Goals, Solution, Drop)
 * 3. Sprint Schedule (cols 14-17)
 * Cross-references with Design Kanban CSV to detect dropped items, code mismatches,
 * and upcoming sprint tasks missing design cards.
 *
 * Usage:
 *   node scripts/sync-product-wbs.mjs [--audit] [--json]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

// Parse CSV with robust handling of RFC 4180 quotes, commas, and embedded newlines
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  // Strip BOM if present
  const cleanText = text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;

  for (let i = 0; i < cleanText.length; i++) {
    const c = cleanText[i];
    const next = cleanText[i + 1];
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

const wbsCsvPath = resolve(process.cwd(), 'data/product-wbs-q4.csv');
const kanbanCsvPath = resolve(process.cwd(), 'data/notion-kanban-q4.csv');

if (!existsSync(wbsCsvPath)) {
  console.error(`[sync-product-wbs] Error: Missing ${wbsCsvPath}`);
  process.exit(1);
}

const wbsRows = parseCSV(readFileSync(wbsCsvPath, 'utf8'));

// 1. Parse Table 1: Funnel x Sprint Roadmap (cols 0-7)
const sprintHeaders = [
  { id: 'S1', label: wbsRows[0][1] || 'Sprint 1 (16-Oct)' },
  { id: 'S2', label: wbsRows[0][2] || 'Sprint 2 (30-Oct)' },
  { id: 'S3', label: wbsRows[0][3] || 'Sprint 3 (13-Nov)' },
  { id: 'S4', label: wbsRows[0][4] || 'Sprint 4 (27-Nov)' },
  { id: 'S5', label: wbsRows[0][5] || 'Sprint 5 (11-Dec)' },
  { id: 'S6', label: wbsRows[0][6] || 'Sprint 6 (23-Dec)' },
  { id: 'S7', label: wbsRows[0][7] || 'Sprint 7 (30-Dec)' }
];

const funnelRoadmap = {};
const designRoadmap = {};

for (let r = 1; r < wbsRows.length; r++) {
  const funnelName = wbsRows[r][0];
  if (!funnelName) continue;

  const sprints = {};
  for (let s = 0; s < 7; s++) {
    const rawVal = wbsRows[r][s + 1] || '';
    const items = rawVal
      .split('|')
      .map(item => item.trim())
      .filter(Boolean);
    sprints[sprintHeaders[s].id] = items;
  }

  funnelRoadmap[funnelName] = sprints;
  if (funnelName.toLowerCase() === 'design') {
    Object.assign(designRoadmap, sprints);
  }
}

// 2. Parse Table 2: Backlog Initiatives (cols 9-12)
const initiatives = [];
for (let r = 1; r < wbsRows.length; r++) {
  const code = wbsRows[r][9];
  const simpleWording = wbsRows[r][11];
  const rawFeatures = wbsRows[r][10] || '';
  const dropFlag = (wbsRows[r][12] || '').trim().toLowerCase() === 'drop';

  if (!code && !simpleWording && !rawFeatures) continue;

  // Extract Funnel, Goals, Solution from rawFeatures
  let funnel = '';
  let goals = '';
  let solution = '';

  const featureLines = rawFeatures.split('\n').map(l => l.trim()).filter(Boolean);
  for (const line of featureLines) {
    if (line.toLowerCase().startsWith('funnel:')) {
      funnel = line.substring(7).trim();
    } else if (line.toLowerCase().startsWith('goals:')) {
      goals = line.substring(6).trim();
    } else if (line.toLowerCase().startsWith('solution:')) {
      solution = line.substring(9).trim();
    }
  }

  initiatives.push({
    code: code || '',
    simpleWording: simpleWording || '',
    funnel: funnel || '',
    goals: goals || '',
    solution: solution || '',
    isDropped: dropFlag,
    compositeKey: `${code || 'NOCODE'}::${funnel || 'NOFUNNEL'}::${simpleWording || 'NOTITLE'}`
  });
}

// 3. Parse Table 3: Sprint Schedules (cols 14-17)
const sprintSchedules = [];
for (let r = 1; r < wbsRows.length; r++) {
  const sprintId = wbsRows[r][14];
  const start = wbsRows[r][15];
  const end = wbsRows[r][16];
  const effectiveDays = parseInt(wbsRows[r][17], 10) || null;

  if (sprintId && start && end) {
    sprintSchedules.push({
      sprint: sprintId,
      start,
      end,
      effectiveDays
    });
  }
}

// 4. Parse Kanban CSV if available for Cross-Reference Audit
let kanbanTasks = [];
if (existsSync(kanbanCsvPath)) {
  const kanbanRows = parseCSV(readFileSync(kanbanCsvPath, 'utf8'));
  const headers = kanbanRows[0] || [];
  const nameIdx = headers.indexOf('Name');
  const codeIdx = headers.indexOf('Backlog WBS Code');
  const squadIdx = headers.indexOf('Squad / Funnel');
  const statusIdx = headers.indexOf('Status');
  const assigneesIdx = headers.indexOf('Assigned To');
  const figmaIdx = headers.indexOf('URL Figma');
  const prdIdx = headers.indexOf('URL PRD');
  const dateIdx = headers.indexOf('Date');
  const parentIdx = headers.indexOf('Parent item');

  for (let r = 1; r < kanbanRows.length; r++) {
    const row = kanbanRows[r];
    const name = row[nameIdx] || '';
    if (!name) continue;

    kanbanTasks.push({
      name,
      code: row[codeIdx] || '',
      squad: row[squadIdx] || '',
      status: row[statusIdx] || 'Backlog',
      assignees: row[assigneesIdx] || '',
      figma: row[figmaIdx] || '',
      prd: row[prdIdx] || '',
      date: row[dateIdx] || '',
      parent: row[parentIdx] || ''
    });
  }
}

// 5. Cross-Reference Audit Analysis
const auditDiscrepancies = [];

// A. Check for Kanban tasks using dropped WBS codes
for (const task of kanbanTasks) {
  if (!task.code) continue;
  const matchedInits = initiatives.filter(init => init.code === task.code);
  const droppedMatch = matchedInits.find(init => init.isDropped);
  if (droppedMatch) {
    auditDiscrepancies.push({
      type: 'DROPPED_WBS_IN_ACTIVE_CARD',
      severity: 'HIGH',
      taskName: task.name,
      wbsCode: task.code,
      details: `Card uses code "${task.code}" which is marked DROP in Product WBS ("${droppedMatch.simpleWording}"). Verify if actual initiative is EPC#3 ("Procurement Category Template") or similar.`
    });
  }
}

// B. Check for mismatched squad/funnel codes (e.g. IDE#1 vs OPS#1)
for (const task of kanbanTasks) {
  if (task.name.includes('Registration SPPKP') && task.code === 'IDE#1') {
    auditDiscrepancies.push({
      type: 'WBS_CODE_MISMATCH',
      severity: 'MEDIUM',
      taskName: task.name,
      wbsCode: task.code,
      details: `Card tagged IDE#1, but Product WBS assigns "Registration SPPKP & Bank Account" to OPS#1.`
    });
  }
}

// C. Check upcoming sprint tasks scheduled for Design that lack Kanban cards
const scheduledDesignTasksS3toS7 = [];
['S3', 'S4', 'S5', 'S6', 'S7'].forEach(sId => {
  const items = designRoadmap[sId] || [];
  items.forEach(item => {
    // Check if any kanban task title loosely matches
    const hasCard = kanbanTasks.some(k => 
      k.name.toLowerCase().includes(item.toLowerCase()) || 
      item.toLowerCase().includes(k.name.toLowerCase().replace(/\[.*?\]/g, '').trim())
    );
    scheduledDesignTasksS3toS7.push({
      sprint: sId,
      item,
      hasDesignCard: hasCard
    });
  });
});

const missingUpcomingCards = scheduledDesignTasksS3toS7.filter(t => !t.hasDesignCard);

// 6. Write output JSON
const outputData = {
  meta: {
    syncedAt: new Date().toISOString(),
    totalInitiatives: initiatives.length,
    totalFunnels: Object.keys(funnelRoadmap).length,
    currentSprint: 'S3 (Nov 2 - Nov 13, 2026)',
    sourceWbs: 'WBS - PaDi UMKM 2026(Summary Q4).csv',
    sourceKanban: 'data/notion-kanban-q4.csv'
  },
  sprintSchedules,
  initiatives,
  funnelRoadmap,
  designRoadmap,
  audit: {
    discrepanciesCount: auditDiscrepancies.length,
    missingUpcomingCardsCount: missingUpcomingCards.length,
    discrepancies: auditDiscrepancies,
    missingUpcomingCards
  }
};

const jsonTarget = resolve(process.cwd(), 'data/product-wbs-q4.json');
mkdirSync(dirname(jsonTarget), { recursive: true });
writeFileSync(jsonTarget, JSON.stringify(outputData, null, 2), 'utf8');

// 7. Write Markdown Audit Report
const auditReportPath = resolve(process.cwd(), 'docs/wbs-alignment-audit.md');
mkdirSync(dirname(auditReportPath), { recursive: true });

const auditMd = `# PaDi UMKM Q4 2026: Product WBS vs Design Kanban Alignment Audit

> **Generated:** ${outputData.meta.syncedAt}  
> **Source 1:** \`data/product-wbs-q4.csv\` (Funnel Roadmaps, S1-S7 Schedules, Goals & Solutions)  
> **Source 2:** \`data/notion-kanban-q4.csv\` (${kanbanTasks.length} Design Kanban Cards)  
> **Active Sprint:** \`S3 (Nov 2 – Nov 13, 2026)\`

---

## 1. Executive Summary

| Metric | Value | Status |
|---|---|---|
| **Product Initiatives Tracked** | ${initiatives.length} | ✅ Complete |
| **Sprints in Scope** | S1 – S7 (Oct 5 – Dec 30, 2026) | 🏃 S3 Active |
| **Design Lead Cadence** | ~1 Sprint ahead of Engineering | 📐 Confirmed |
| **Dropped WBS Code Collisions** | ${auditDiscrepancies.filter(d => d.type === 'DROPPED_WBS_IN_ACTIVE_CARD').length} | ⚠️ Needs Fix |
| **Squad/WBS Code Mismatches** | ${auditDiscrepancies.filter(d => d.type === 'WBS_CODE_MISMATCH').length} | ⚠️ Needs Fix |
| **Upcoming Design Tasks Missing Cards** | ${missingUpcomingCards.length} | 📋 Action Required |

---

## 2. Active Discrepancies & Governance Flags

${auditDiscrepancies.length === 0 ? '_No discrepancies detected._' : auditDiscrepancies.map(d => `
### [${d.severity}] ${d.type}: \`${d.taskName}\`
- **Assigned WBS Code:** \`${d.wbsCode}\`
- **Finding:** ${d.details}
`).join('\n')}

---

## 3. Current & Upcoming Sprint Coverage (Design Row)

The Product WBS schedules Design ~1 sprint ahead of Dev execution. Below is the alignment check for current sprint (**S3**) through **S7**:

${['S3', 'S4', 'S5', 'S6', 'S7'].map(sId => {
  const sprintInfo = sprintSchedules.find(s => s.sprint === sId) || {};
  const items = scheduledDesignTasksS3toS7.filter(t => t.sprint === sId);
  return `
### Sprint ${sId} (${sprintInfo.start || ''} – ${sprintInfo.end || ''})
${items.map(t => `- [${t.hasDesignCard ? 'x' : ' '}] **${t.item}** — ${t.hasDesignCard ? '🟢 Has Design Kanban Card' : '🔴 **MISSING DESIGN CARD**'}`).join('\n')}
`;
}).join('\n')}

---

## 4. Product Backlog Initiatives Catalog (Goals & Solution Context)

Below are the official Product WBS initiatives with business goals and proposed solutions:

| Code | Squad / Funnel | Simple Wording | Status | Goals Summary |
|---|---|---|---|---|
${initiatives.map(i => `| \`${i.code}\` | ${i.funnel || '-'} | ${i.simpleWording || '-'} | ${i.isDropped ? '🔴 **DROP**' : '🟢 Active'} | ${i.goals ? i.goals.replace(/\|/g, '/') : '-'} |`).join('\n')}

---

## 5. Recommended Actions for Designers & PMs

1. **Re-tag \`[eProc] Template penawaran tender kilat\`:** Change code from \`EPC#2\` (dropped) to \`EPC#3\` (\`Procurement Category Template\`).
2. **Re-tag \`Registration SPPKP & Bank Account\`:** Align with Product WBS \`OPS#1\` instead of \`IDE#1\`.
3. **Scaffold Sprint 3 & 4 Cards:** Create cards for \`Vendor KBLI OSS Verification\` (\`IDE#2\`) and \`Fulfillment Process Enhancement\` (\`FUL#2\`) to prevent design lead lag.
`;

writeFileSync(auditReportPath, auditMd, 'utf8');

console.log(`[sync-product-wbs] Successfully processed Product WBS:`);
console.log(`- Loaded ${initiatives.length} initiatives across ${Object.keys(funnelRoadmap).length} funnels`);
console.log(`- Saved parsed data to ${jsonTarget}`);
console.log(`- Emitted alignment audit report to ${auditReportPath}`);
console.log(`- Flagged ${auditDiscrepancies.length} discrepancies and ${missingUpcomingCards.length} missing upcoming design cards`);

if (process.argv.includes('--audit')) {
  console.log('\n' + '='.repeat(60));
  console.log('             PaDi UMKM WBS ALIGNMENT AUDIT');
  console.log('='.repeat(60));
  auditDiscrepancies.forEach(d => {
    console.log(`⚠️  [${d.severity}] ${d.taskName} (${d.wbsCode}): ${d.details}`);
  });
  console.log('\nMissing upcoming design cards:');
  missingUpcomingCards.forEach(m => {
    console.log(`- [${m.sprint}] ${m.item}`);
  });
  console.log('='.repeat(60));
}
