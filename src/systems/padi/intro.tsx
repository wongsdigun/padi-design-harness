import * as React from 'react';
import type { SystemIntro } from '#studio/system';
import ledgerData from './ds-ledger.json';

function ImprovementBoard() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'production' | 'improvements' | 'proposals' | 'overrides'>('overview');
  const [search, setSearch] = React.useState('');

  const summary = ledgerData.summary;
  const components = ledgerData.components;

  const filteredProduction = components.production.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.slug.includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily: 'var(--font-family-sans, Ubuntu, sans-serif)',
        border: '1px solid var(--neutral-200, #E5E7EB)',
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Board Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: 'var(--neutral-900, #1A1A1A)' }}>
              PaDi DS 5-State Governance & Improvement Board
            </h2>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '999px',
                backgroundColor: '#DEF7EC',
                color: '#03543F',
                border: '1px solid #BCF0DA',
              }}
            >
              100% Token Compliant
            </span>
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--neutral-600, #4B5563)' }}>
            Live bidirectional synchronization between prototype views, Figma v3.0 tokens, and @frontend-shared/padi-ds.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href="http://localhost:6006"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--tosca-600, #007E87)',
              backgroundColor: 'var(--tosca-25, #99D3DE33)',
              borderRadius: '6px',
              textDecoration: 'none',
              border: '1px solid var(--tosca-100, #66BECD)',
            }}
          >
            📖 Open Storybook
          </a>
        </div>
      </div>

      {/* KPI Metric Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div
          onClick={() => setActiveTab('production')}
          style={{
            cursor: 'pointer',
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: activeTab === 'production' ? '#E6F8F9' : '#FAFAFA',
            border: activeTab === 'production' ? '1px solid #009EA9' : '1px solid #E5E7EB',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#007E87' }}>🟢 PRODUCTION</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A1A', margin: '4px 0' }}>{summary.productionCount}</div>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>Verified Components</div>
        </div>

        <div
          onClick={() => setActiveTab('improvements')}
          style={{
            cursor: 'pointer',
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: activeTab === 'improvements' ? '#FFFBEB' : '#FAFAFA',
            border: activeTab === 'improvements' ? '1px solid #F59E0B' : '1px solid #E5E7EB',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#B45309' }}>🟡 IMPROVEMENTS</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A1A', margin: '4px 0' }}>{summary.improvementCount}</div>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>Pending Upstream PRs</div>
        </div>

        <div
          onClick={() => setActiveTab('proposals')}
          style={{
            cursor: 'pointer',
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: activeTab === 'proposals' ? '#EFF6FF' : '#FAFAFA',
            border: activeTab === 'proposals' ? '1px solid #3B82F6' : '1px solid #E5E7EB',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#1D4ED8' }}>🔵 PROPOSALS</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A1A', margin: '4px 0' }}>{summary.proposedCount}</div>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>Nominated for Core</div>
        </div>

        <div
          onClick={() => setActiveTab('overrides')}
          style={{
            cursor: 'pointer',
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: activeTab === 'overrides' ? '#FFF7ED' : '#FAFAFA',
            border: activeTab === 'overrides' ? '1px solid #F97316' : '1px solid #E5E7EB',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#C2410C' }}>🟠 OVERRIDES</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A1A', margin: '4px 0' }}>{summary.overrideCount}</div>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>Documented in UX Spec</div>
        </div>

        <div
          style={{
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: summary.rawDriftCount === 0 ? '#F0FDF4' : '#FEF2F2',
            border: summary.rawDriftCount === 0 ? '1px solid #86EFAC' : '1px solid #F87171',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 600, color: summary.rawDriftCount === 0 ? '#15803D' : '#B91C1C' }}>
            🔴 RAW DRIFT
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: summary.rawDriftCount === 0 ? '#15803D' : '#B91C1C', margin: '4px 0' }}>
            {summary.rawDriftCount}
          </div>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>{summary.rawDriftCount === 0 ? 'Hard Gate: Passed' : 'Build Blocked'}</div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #E5E7EB', marginBottom: '20px' }}>
        {[
          { key: 'overview', label: 'Dashboard Overview' },
          { key: 'production', label: `Production (${summary.productionCount})` },
          { key: 'improvements', label: `Improvements (${summary.improvementCount})` },
          { key: 'proposals', label: `Proposals (${summary.proposedCount})` },
          { key: 'overrides', label: `Overrides (${summary.overrideCount})` },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as never)}
            style={{
              padding: '8px 14px',
              border: 'none',
              background: 'transparent',
              fontSize: '13px',
              fontWeight: activeTab === t.key ? 600 : 400,
              color: activeTab === t.key ? '#007E87' : '#6B7280',
              borderBottom: activeTab === t.key ? '2px solid #009EA9' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: '-1px',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                Active Governance Pipeline (Q4 2026)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {components.improvements.map((imp) => (
                  <div
                    key={imp.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #FEF08A',
                      backgroundColor: '#FEFCE8',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#854D0E' }}>
                        🟡 Improvement: {imp.component}
                      </div>
                      <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
                        {imp.description}
                      </div>
                      <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                        Affected Tasks: {imp.affectedTasks.join(', ')}
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#FEF08A', color: '#713F12' }}>
                      {imp.status}
                    </span>
                  </div>
                ))}

                {components.proposals.map((prop) => (
                  <div
                    key={prop.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1E40AF' }}>
                        🔵 Proposed: {prop.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
                        {prop.description}
                      </div>
                      <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                        Origin Task: {prop.originTask} · Figma Node: {prop.figmaNodeId}
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#DBEAFE', color: '#1E40AF' }}>
                      {prop.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prototype HUD Callout */}
            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
                🛠 Prototype Live Inspector
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.5', margin: '0 0 12px' }}>
                Press <kbd style={{ padding: '2px 6px', background: '#E2E8F0', borderRadius: '4px', fontWeight: 600 }}>Alt + D</kbd> anywhere in a prototype view to open the <strong>PaDi Inspector HUD</strong>.
              </p>
              <ul style={{ fontSize: '12px', color: '#475569', paddingLeft: '16px', margin: '0 0 12px', lineHeight: '1.6' }}>
                <li>Live hover inspection of components</li>
                <li>Instant token health & drift detection</li>
                <li>One-click UX spec export</li>
                <li>Figma node parity check</li>
              </ul>
              <div style={{ fontSize: '11px', color: '#007E87', fontWeight: 600 }}>
                Import: <code>&lt;PadiInspectorHUD /&gt;</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Production Components */}
      {activeTab === 'production' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                fontSize: '13px',
                width: '260px',
              }}
            />
            <span style={{ fontSize: '12px', color: '#6B7280' }}>
              Showing {filteredProduction.length} of {components.production.length} production components
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {filteredProduction.map((c) => (
              <div
                key={c.slug}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#FAFAFA',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{c.name}</span>
                    <span style={{ fontSize: '10px', color: '#007E87', fontWeight: 600, backgroundColor: '#E6F8F9', padding: '1px 6px', borderRadius: '4px' }}>
                      🟢 Native
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'monospace', marginTop: '6px' }}>
                    {c.tokens.slice(0, 3).join(', ')}
                  </div>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <a
                    href={c.storybook}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '11px', color: '#007E87', textDecoration: 'none', fontWeight: 500 }}
                  >
                    View Docs →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Improvements */}
      {activeTab === 'improvements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {components.improvements.map((imp) => (
            <div key={imp.id} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #FEF08A', backgroundColor: '#FEFCE8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#854D0E' }}>
                  {imp.component} Enhancement ({imp.id})
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', backgroundColor: '#FEF08A', color: '#713F12' }}>
                  {imp.status}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#374151', margin: '8px 0' }}>{imp.description}</p>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>
                Pull Request: <a href={imp.prUrl} target="_blank" rel="noreferrer" style={{ color: '#007E87' }}>{imp.prUrl}</a> · Affected Tasks: {imp.affectedTasks.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Proposals */}
      {activeTab === 'proposals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {components.proposals.map((prop) => (
            <div key={prop.id} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#1E40AF' }}>
                  Proposed: {prop.name} ({prop.id})
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', backgroundColor: '#DBEAFE', color: '#1E40AF' }}>
                  {prop.status}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#374151', margin: '8px 0' }}>{prop.description}</p>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>
                Origin Task: <strong>{prop.originTask}</strong> · Figma Node: <code>{prop.figmaNodeId}</code>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Overrides */}
      {activeTab === 'overrides' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {components.overrides.map((ovr) => (
            <div key={ovr.id} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #FED7AA', backgroundColor: '#FFF7ED' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#9A3412' }}>
                  Override: {ovr.component} ({ovr.id})
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', backgroundColor: '#FFEDD5', color: '#9A3412' }}>
                  Approved in {ovr.task}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#374151', margin: '8px 0 4px' }}><strong>Description:</strong> {ovr.description}</p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: '0 0 8px' }}><strong>Justification:</strong> {ovr.justification}</p>
              <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Specification: {ovr.specRef}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default {
  summary: 'Official PaDi UMKM Design System: 23 synchronized components, 5-State token governance, and strict theme isolation under .padi-theme.',
  overview: {
    guidance: 'All prototypes built with PaDi Design System must enforce 100% token fidelity under .padi-theme with zero Tailwind classes. Overlay components (Modal, Select, Tooltip) use usePortalContainer() to preserve scope.',
    code: 'Powered by @frontend-shared/padi-ds v1.0.3 and @base-ui/react, providing Ubuntu typography, Tosca brand tokens, and accessible interactive primitives.',
    curation: {
      stage: 'ready',
      summary: '23 PaDi DS components wrapped with data-padi-ds and portal scoping. Synchronized with Figma v3.0 tokens.',
      nextStep: 'Build interactive prototypes in src/prototypes/wongsdigun/ with 100% native PaDi DS components.',
      sources: [
        { label: 'PaDi DS Storybook', url: 'http://localhost:6006' },
        { label: 'PaDi DS Repository', url: 'https://github.com/wongsdigun/padi-design-harness' },
      ],
    },
  },
  intro: <ImprovementBoard />,
} satisfies SystemIntro;
