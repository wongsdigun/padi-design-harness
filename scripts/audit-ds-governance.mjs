#!/usr/bin/env node
/* scripts/audit-ds-governance.mjs
 * 5-State Design System Governance Auditor
 * Scans active PaDi prototype sources for component usage, token fidelity, and raw drift
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative, dirname } from 'node:path';

const rootDir = process.cwd();
const ledgerPath = resolve(rootDir, 'src/systems/padi/ds-ledger.json');
const prototypesDir = resolve(rootDir, 'src/prototypes');
const padiSystemId = 'pnwxw7a9qemg0kg4';

if (!existsSync(ledgerPath)) {
  console.error(`[ds-audit] Error: Cannot find ds-ledger.json at ${ledgerPath}`);
  process.exit(1);
}

const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));

// Helper to crawl directory recursively
function crawlFiles(dir, extensions = ['.tsx', '.jsx', '.css']) {
  let results = [];
  if (!existsSync(dir)) return results;
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(crawlFiles(fullPath, extensions));
      }
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

// Find all prototype root directories that have a meta.json
function getPrototypeMeta(filePath) {
  let cur = dirname(filePath);
  while (cur.startsWith(prototypesDir)) {
    const metaFile = join(cur, 'meta.json');
    if (existsSync(metaFile)) {
      try {
        return { meta: JSON.parse(readFileSync(metaFile, 'utf8')), dir: cur };
      } catch (e) {
        return null;
      }
    }
    cur = dirname(cur);
  }
  return null;
}

const allFiles = crawlFiles(prototypesDir);
// Filter for files assigned to PaDi system or under active contributor workspaces
const files = allFiles.filter(file => {
  const pMeta = getPrototypeMeta(file);
  if (!pMeta) {
    // If inside a user directory like wongsdigun, include by default
    return file.includes('/prototypes/wongsdigun/');
  }
  // Check if systemId matches PaDi or default
  return pMeta.meta.systemId === padiSystemId || file.includes('/prototypes/wongsdigun/');
});

console.log(`[ds-audit] Auditing ${files.length} active PaDi prototype files across src/prototypes/ ...`);

const detectedDrift = [];
const componentUsages = new Map();

// Known rogue Tailwind patterns that escape PaDi DS tokens
const tailwindPattern = /\b(bg-[a-z]+-\d+|text-[a-z]+-\d+|border-[a-z]+-\d+|shadow-(?:sm|md|lg|xl)|rounded-(?:sm|md|lg|full))\b/g;
// Hardcoded hex colors outside var() declarations and standard CSS colors
const hexPattern = /(?<!var\([^)]*)#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const relPath = relative(rootDir, file);

  // Check rogue Tailwind classes
  let twMatch;
  while ((twMatch = tailwindPattern.exec(content)) !== null) {
    detectedDrift.push({
      type: 'tailwind-leak',
      file: relPath,
      matched: twMatch[0],
      rule: 'Rogue Tailwind utility found. Use native PaDi tokens and CSS classes under .padi-theme.'
    });
  }

  // Check hardcoded hex colors
  let hexMatch;
  while ((hexMatch = hexPattern.exec(content)) !== null) {
    detectedDrift.push({
      type: 'hardcoded-color',
      file: relPath,
      matched: hexMatch[0],
      rule: 'Hardcoded hex color found. Use var(--tosca-*), var(--neutral-*), or semantic tokens.'
    });
  }

  // Track component imports
  const padiImports = [...content.matchAll(/import\s+\{([^}]+)\}\s+from\s+['"]@\/systems\/padi\/components(?:\/[^'"]+)?['"]/g)];
  for (const imp of padiImports) {
    const names = imp[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0]);
    for (const name of names) {
      if (name && name[0] === name[0].toUpperCase()) {
        componentUsages.set(name, (componentUsages.get(name) || 0) + 1);
      }
    }
  }
}

// Update ledger
ledger.lastAudited = new Date().toISOString();
ledger.components.rawDrift = detectedDrift;
ledger.summary.rawDriftCount = detectedDrift.length;
ledger.summary.productionCount = ledger.components.production.length;
ledger.summary.improvementCount = ledger.components.improvements.length;
ledger.summary.proposedCount = ledger.components.proposals.length;
ledger.summary.overrideCount = ledger.components.overrides.length;

writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2) + '\n', 'utf8');

// Console Reporting
console.log('\n============================================================');
console.log('   PaDi UMKM 5-State Design System Governance Audit');
console.log('============================================================');
console.log(`🟢 Production Components: ${ledger.summary.productionCount} verified`);
console.log(`🟡 Pending Improvements:  ${ledger.summary.improvementCount} tracked`);
console.log(`🔵 Proposed Components:   ${ledger.summary.proposedCount} nominated`);
console.log(`🟠 Approved Overrides:    ${ledger.summary.overrideCount} documented`);
console.log(`🔴 Raw Token Drift:       ${ledger.summary.rawDriftCount} detected`);
console.log('------------------------------------------------------------');

if (detectedDrift.length > 0) {
  console.error('\n🔴 [GOVERNANCE HARD FAIL] Unregistered raw drift detected:');
  for (const drift of detectedDrift) {
    console.error(`  - [${drift.type}] in ${drift.file}: "${drift.matched}" (${drift.rule})`);
  }
  if (process.argv.includes('--ci') || process.argv.includes('--check')) {
    process.exit(1);
  }
} else {
  console.log('✅ [GOVERNANCE PASS] 100% PaDi token compliance! Zero raw drift.');
}
console.log('============================================================\n');
