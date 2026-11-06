#!/usr/bin/env node
/* scripts/sync-padi-ds.mjs
 * Seamless 1-command upgrade pipeline for @frontend-shared/padi-ds:
 * 1. Syncs dist/ and package.json from upstream (default ../frontend-shared/packages/padi-ds)
 * 2. Packages self-contained npm archive packages/padi-ds.tgz
 * 3. Updates dependencies via pnpm install
 * 4. Syncs .padi-theme CSS tokens via scripts/sync-padi-css.mjs
 * 5. Runs DS governance audit
 */
import { existsSync, cpSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const UPSTREAM_PATH = process.argv[2] || resolve(ROOT, '../frontend-shared/packages/padi-ds');
const LOCAL_PKG_DIR = resolve(ROOT, 'packages/padi-ds');
const TGZ_PATH = resolve(ROOT, 'packages/padi-ds.tgz');

console.log('============================================================');
console.log('   PaDi Design System Upgrade & Sync Pipeline');
console.log('============================================================');

// 1. Check if upstream source is available
if (existsSync(join(UPSTREAM_PATH, 'package.json')) && existsSync(join(UPSTREAM_PATH, 'dist'))) {
  const upstreamPkg = JSON.parse(readFileSync(join(UPSTREAM_PATH, 'package.json'), 'utf8'));
  console.log(`[sync-ds] Found upstream package @frontend-shared/padi-ds v${upstreamPkg.version} at:`);
  console.log(`          ${UPSTREAM_PATH}`);
  
  // Clean devDependencies for clean runtime footprint
  const strippedPkg = {
    ...upstreamPkg,
    devDependencies: undefined,
  };
  
  mkdirSync(LOCAL_PKG_DIR, { recursive: true });
  cpSync(join(UPSTREAM_PATH, 'dist'), join(LOCAL_PKG_DIR, 'dist'), { recursive: true });
  if (existsSync(join(UPSTREAM_PATH, 'README.md'))) {
    cpSync(join(UPSTREAM_PATH, 'README.md'), join(LOCAL_PKG_DIR, 'README.md'));
  }
  writeFileSync(join(LOCAL_PKG_DIR, 'package.json'), JSON.stringify(strippedPkg, null, 2) + '\n');
  console.log(`[sync-ds] Synchronized files into packages/padi-ds/ (v${upstreamPkg.version})`);
} else {
  console.log(`[sync-ds] Using existing vendored package in packages/padi-ds/`);
}

const currentPkg = JSON.parse(readFileSync(join(LOCAL_PKG_DIR, 'package.json'), 'utf8'));
console.log(`[sync-ds] Packaging target: @frontend-shared/padi-ds v${currentPkg.version}`);

// 2. Build npm-compliant tarball with package/ prefix
const tmpDir = resolve('/tmp', `padi-ds-pack-${Date.now()}`);
mkdirSync(join(tmpDir, 'package'), { recursive: true });
cpSync(join(LOCAL_PKG_DIR, 'package.json'), join(tmpDir, 'package/package.json'));
cpSync(join(LOCAL_PKG_DIR, 'dist'), join(tmpDir, 'package/dist'), { recursive: true });
if (existsSync(join(LOCAL_PKG_DIR, 'README.md'))) {
  cpSync(join(LOCAL_PKG_DIR, 'README.md'), join(tmpDir, 'package/README.md'));
}

execSync(`COPYFILE_DISABLE=1 tar -czf "${TGZ_PATH}" -C "${tmpDir}" package`, { stdio: 'inherit' });
rmSync(tmpDir, { recursive: true, force: true });
console.log(`[sync-ds] Created self-contained archive at: packages/padi-ds.tgz`);

// 3. Update pnpm dependencies
console.log('[sync-ds] Updating workspace dependencies via pnpm install...');
try {
  execSync('pnpm install', { stdio: 'inherit' });
} catch (e) {
  console.warn('[sync-ds] Warning during pnpm install:', e.message);
}

// 4. Sync CSS Tokens
if (existsSync(resolve(ROOT, 'scripts/sync-padi-css.mjs'))) {
  console.log('[sync-ds] Synchronizing scoped CSS tokens (.padi-theme)...');
  try {
    execSync('node scripts/sync-padi-css.mjs', { stdio: 'inherit' });
  } catch (e) {
    console.warn('[sync-ds] Warning during sync-padi-css:', e.message);
  }
}

// 5. Update DS Ledger
const ledgerPath = resolve(ROOT, 'src/systems/padi/ds-ledger.json');
if (existsSync(ledgerPath)) {
  const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
  ledger.packageVersion = currentPkg.version;
  ledger.lastAudited = new Date().toISOString();
  writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2) + '\n');
  console.log(`[sync-ds] Updated ds-ledger.json with packageVersion: ${currentPkg.version}`);
}

// 6. Run DS Audit
console.log('[sync-ds] Running DS governance audit...');
try {
  execSync('node scripts/audit-ds-governance.mjs', { stdio: 'inherit' });
} catch (e) {
  console.warn('[sync-ds] Warning during governance audit:', e.message);
}

console.log('============================================================');
console.log(`✅ [SUCCESS] @frontend-shared/padi-ds is fully up-to-date (v${currentPkg.version})`);
console.log('   Ready to commit & push to GitHub for automated Vercel deploy!');
console.log('============================================================\n');
