import * as React from 'react';

export interface ComparisonSplitProps {
  title?: string;
  componentName: string;
  governanceState?: 'production' | 'improvement' | 'proposed' | 'override' | 'raw-drift';
  baseline: React.ReactNode;
  variation: React.ReactNode;
  tokenDiffs?: Array<{
    property: string;
    baselineToken: string;
    variationToken: string;
    status: 'match' | 'modified' | 'override' | 'drift';
  }>;
}

export function ComparisonSplit({
  title,
  componentName,
  governanceState = 'production',
  baseline,
  variation,
  tokenDiffs = [],
}: ComparisonSplitProps) {
  const [mode, setMode] = React.useState<'side-by-side' | 'slider' | 'tokens'>('side-by-side');
  const [sliderPos, setSliderPos] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const stateBadges = {
    production: { label: '🟢 Production (padi-ds)', bg: '#E6F8F9', text: '#005F65', border: '#80C9D6' },
    improvement: { label: '🟡 Improvement Pending', bg: '#FFF8E1', text: '#B78103', border: '#FFE082' },
    proposed: { label: '🔵 Proposed New Component', bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9' },
    override: { label: '🟠 Approved Override', bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
    'raw-drift': { label: '🔴 Raw Drift (Blocks Build)', bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A' },
  };

  const badge = stateBadges[governanceState] || stateBadges.production;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div
      style={{
        border: '1px solid var(--neutral-200, #E5E7EB)',
        borderRadius: '8px',
        backgroundColor: 'var(--neutral-25, #FCFCFD)',
        fontFamily: 'var(--font-family-sans, Ubuntu, sans-serif)',
        overflow: 'hidden',
        margin: '16px 0',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid var(--neutral-200, #E5E7EB)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--neutral-900, #1A1A1A)' }}>
            {title || `Component Comparator: ${componentName}`}
          </h3>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: badge.bg,
              color: badge.text,
              border: `1px solid ${badge.border}`,
            }}
          >
            {badge.label}
          </span>
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#F3F4F6', padding: '2px', borderRadius: '6px' }}>
          {(['side-by-side', 'slider', 'tokens'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                border: 'none',
                background: mode === m ? '#FFFFFF' : 'transparent',
                boxShadow: mode === m ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: mode === m ? 600 : 400,
                color: mode === m ? 'var(--neutral-900, #1A1A1A)' : 'var(--neutral-600, #4B5563)',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {m.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main comparison stage */}
      {mode === 'side-by-side' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '180px' }}>
          <div style={{ padding: '20px', borderRight: '1px solid var(--neutral-200, #E5E7EB)', backgroundColor: '#FAFAFA' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: '12px' }}>
              Baseline (@frontend-shared/padi-ds)
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
              {baseline}
            </div>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#007E87', textTransform: 'uppercase', marginBottom: '12px' }}>
              Prototype Variation (Active Task)
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
              {variation}
            </div>
          </div>
        </div>
      )}

      {mode === 'slider' && (
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          style={{
            position: 'relative',
            height: '240px',
            userSelect: 'none',
            overflow: 'hidden',
            cursor: 'ew-resize',
          }}
        >
          {/* Baseline full layer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#FAFAFA',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'absolute', top: 12, left: 16, fontSize: '11px', fontWeight: 600, color: '#6B7280' }}>
              BASELINE
            </div>
            {baseline}
          </div>

          {/* Variation clipped overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: `${sliderPos}%`,
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              borderRight: '2px solid var(--tosca-500, #009EA9)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'absolute', top: 12, left: 16, fontSize: '11px', fontWeight: 600, color: '#007E87' }}>
              VARIATION
            </div>
            <div style={{ width: containerRef.current?.offsetWidth || '800px', display: 'flex', justifyContent: 'center' }}>
              {variation}
            </div>
          </div>

          {/* Drag handle */}
          <div
            onMouseDown={() => setIsDragging(true)}
            style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPos}%`,
              transform: 'translate(-50%, -50%)',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--tosca-500, #009EA9)',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              cursor: 'ew-resize',
              zIndex: 10,
            }}
          >
            ↔
          </div>
        </div>
      )}

      {mode === 'tokens' && (
        <div style={{ padding: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--neutral-200, #E5E7EB)' }}>
                <th style={{ padding: '8px' }}>CSS Property</th>
                <th style={{ padding: '8px' }}>Baseline Token</th>
                <th style={{ padding: '8px' }}>Variation Token</th>
                <th style={{ padding: '8px' }}>Governance Status</th>
              </tr>
            </thead>
            <tbody>
              {tokenDiffs.length > 0 ? (
                tokenDiffs.map((diff, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--neutral-100, #F3F4F6)' }}>
                    <td style={{ padding: '8px', fontWeight: 500 }}>{diff.property}</td>
                    <td style={{ padding: '8px', color: '#6B7280', fontFamily: 'monospace' }}>{diff.baselineToken}</td>
                    <td style={{ padding: '8px', color: '#007E87', fontFamily: 'monospace' }}>{diff.variationToken}</td>
                    <td style={{ padding: '8px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 600,
                          backgroundColor: diff.status === 'match' ? '#DEF7EC' : '#FEF08A',
                          color: diff.status === 'match' ? '#03543F' : '#713F12',
                        }}
                      >
                        {diff.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '16px', textAlign: 'center', color: '#9CA3AF' }}>
                    100% Token Parity: No delta detected against @frontend-shared/padi-ds baseline.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
