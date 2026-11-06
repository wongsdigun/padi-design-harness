#!/usr/bin/env node
/* scripts/sync-padi-ds.mjs
 * Seamless 1-command upgrade pipeline for @frontend-shared/padi-ds:
 * 1. Checks GitLab Package Registry for all published versions and dist-tags (including 'legacy')
 * 2. Resolves the highest semver version (major.minor.patch)
 * 3. Updates dependencies in root package.json and src/systems/padi/package.json
 * 4. Refreshes scoped CSS tokens (.padi-theme) via scripts/sync-padi-css.mjs
 * 5. Updates ds-ledger.json and runs DS governance audit
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import semver from 'semver';

const ROOT = process.cwd();

console.log('============================================================');
console.log('   PaDi Design System GitLab Registry Upgrade Pipeline');
console.log('============================================================');

try {
  console.log('[sync-ds] Querying GitLab registry for @frontend-shared/padi-ds...');
  const viewRaw = execSync('npm view @frontend-shared/padi-ds --json', { encoding: 'utf8' });
  const pkgMeta = JSON.parse(viewRaw);
  
  const allVersions = Array.isArray(pkgMeta.versions) ? pkgMeta.versions : [pkgMeta.version];
  const distTags = pkgMeta['dist-tags'] || {};
  
  console.log(`[sync-ds] Available versions in registry: ${allVersions.join(', ')}`);
  console.log(`[sync-ds] Dist-tags: ${JSON.stringify(distTags)}`);
  
  // Sort versions by semver descending to get the highest major.minor.patch
  const sorted = allVersions
    .filter(v => semver.valid(v))
    .sort((a, b) => semver.rcompare(a, b));
  
  const latestVersion = sorted[0];
  console.log(`[sync-ds] Highest published version resolved: v${latestVersion}`);
  
  // Read current installed version from package.json
  const rootPkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
  const currentReq = rootPkg.devDependencies?.['@frontend-shared/padi-ds'] || '';
  console.log(`[sync-ds] Current version requirement: ${currentReq}`);
  
  // Install the resolved version
  console.log(`[sync-ds] Installing @frontend-shared/padi-ds@${latestVersion} across workspace...`);
  execSync(`pnpm add -D @frontend-shared/padi-ds@${latestVersion}`, { stdio: 'inherit' });
  execSync(`pnpm --filter @studio-system/pnwxw7a9qemg0kg4 add @frontend-shared/padi-ds@${latestVersion}`, { stdio: 'inherit' });
  
  // Refresh CSS tokens
  console.log('[sync-ds] Synchronizing scoped CSS tokens (.padi-theme)...');
  execSync('node scripts/sync-padi-css.mjs', { stdio: 'inherit' });
  
  // Update DS ledger
  const ledgerPath = resolve(ROOT, 'src/systems/padi/ds-ledger.json');
  if (existsSync(ledgerPath)) {
    const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
    ledger.packageVersion = latestVersion;
    ledger.lastAudited = new Date().toISOString();
    writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2) + '\n');
    console.log(`[sync-ds] Updated ds-ledger.json to version ${latestVersion}`);
  }
  
  // Run governance audit
  console.log('[sync-ds] Running DS governance audit...');
  execSync('node scripts/audit-ds-governance.mjs', { stdio: 'inherit' });
  
  console.log('============================================================');
  console.log(`✅ [SUCCESS] Upgraded to @frontend-shared/padi-ds@${latestVersion}`);
  console.log('============================================================\n');
} catch (error) {
  console.error('[sync-ds] Error during upgrade:', error.message);
  process.exit(1);
}
