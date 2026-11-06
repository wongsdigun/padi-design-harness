import * as React from 'react';

export interface PadiInspectorHUDProps {
  taskCode?: string;
  figmaUrl?: string;
}

interface InspectedElement {
  tag: string;
  componentName: string | null;
  rect: DOMRect;
  styles: {
    fontFamily: string;
    fontSize: string;
    color: string;
    backgroundColor: string;
    borderRadius: string;
    padding: string;
  };
  tokensUsed: string[];
  hasDrift: boolean;
}

export function PadiInspectorHUD({ taskCode = 'CURRENT_TASK', figmaUrl }: PadiInspectorHUDProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inspectMode, setInspectMode] = React.useState(false);
  const [inspected, setInspected] = React.useState<InspectedElement | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [auditStats, setAuditStats] = React.useState({ totalElements: 0, padiComponents: 0, driftCount: 0 });

  // Toggle on Alt + D
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Run DOM token audit
  const runAudit = React.useCallback(() => {
    const all = document.querySelectorAll('.padi-theme *');
    let total = all.length;
    let padi = 0;
    let drift = 0;

    all.forEach((el) => {
      const comp = el.getAttribute('data-padi-ds');
      if (comp) padi++;
      // Rough check if non-empty inline background/color without variable
      if (el instanceof HTMLElement && el.style.backgroundColor && !el.style.backgroundColor.includes('var(')) {
        drift++;
      }
    });

    setAuditStats({ totalElements: total, padiComponents: padi, driftCount: drift });
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      runAudit();
    }
  }, [isOpen, runAudit]);

  // Hover inspector
  React.useEffect(() => {
    if (!inspectMode) {
      setInspected(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest('[data-padi-hud="true"]')) return;

      const comp = target.closest('[data-padi-ds]')?.getAttribute('data-padi-ds') || null;
      const rect = target.getBoundingClientRect();
      const style = window.getComputedStyle(target);

      setInspected({
        tag: target.tagName.toLowerCase(),
        componentName: comp,
        rect,
        styles: {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          color: style.color,
          backgroundColor: style.backgroundColor,
          borderRadius: style.borderRadius,
          padding: style.padding,
        },
        tokensUsed: comp ? [`padi-ds:${comp}`] : ['native-dom'],
        hasDrift: target.style.color !== '' && !target.style.color.includes('var('),
      });
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [inspectMode]);

  const copyUxSpecSnippet = () => {
    const snippet = `### PaDi DS Component Inspection (${taskCode})
- **Component**: \`${inspected?.componentName || 'Custom Container'}\`
- **DOM Element**: \`<${inspected?.tag}>\`
- **Governance Status**: \`${inspected?.componentName ? '🟢 padi-ds-production' : '🟠 padi-ds-override'}\`
- **Computed Font**: \`${inspected?.styles.fontFamily}\` (${inspected?.styles.fontSize})
- **Colors**: Foreground: \`${inspected?.styles.color}\`, Background: \`${inspected?.styles.backgroundColor}\`
- **Figma Reference**: ${figmaUrl || 'https://figma.com'}
- **Audit Timestamp**: ${new Date().toISOString()}
`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div data-padi-hud="true">
      {/* Floating trigger pill */}
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#1E293B',
          color: '#F8FAFC',
          borderRadius: '999px',
          padding: '6px 14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          cursor: 'pointer',
          fontFamily: 'Ubuntu, sans-serif',
          fontSize: '12px',
          fontWeight: 600,
          userSelect: 'none',
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: auditStats.driftCount === 0 ? '#10B981' : '#EF4444' }} />
        <span>PaDi HUD</span>
        <span style={{ backgroundColor: '#334155', borderRadius: '4px', padding: '1px 5px', fontSize: '10px' }}>Alt+D</span>
      </div>

      {/* Hover highlight overlay */}
      {inspectMode && inspected && (
        <div
          style={{
            position: 'fixed',
            top: inspected.rect.top,
            left: inspected.rect.left,
            width: inspected.rect.width,
            height: inspected.rect.height,
            border: inspected.hasDrift ? '2px dashed #EF4444' : '2px solid #009EA9',
            backgroundColor: inspected.hasDrift ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0, 158, 169, 0.12)',
            pointerEvents: 'none',
            zIndex: 999998,
            transition: 'all 0.05s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -24,
              left: 0,
              backgroundColor: inspected.hasDrift ? '#EF4444' : '#007E87',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {inspected.componentName ? `🟢 <${inspected.componentName} />` : `<${inspected.tag}>`}
          </div>
        </div>
      )}

      {/* Main HUD Modal/Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 60,
            right: 16,
            width: '380px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
            border: '1px solid #E2E8F0',
            fontFamily: 'Ubuntu, sans-serif',
            zIndex: 999999,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#005F65',
              color: '#FFFFFF',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>PaDi Inspector HUD</div>
              <div style={{ fontSize: '11px', opacity: 0.85 }}>Task: {taskCode}</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '16px' }}
            >
              ✕
            </button>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '12px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Elements</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>{auditStats.totalElements}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>PaDi DS</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#009EA9' }}>{auditStats.padiComponents}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Raw Drift</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: auditStats.driftCount === 0 ? '#10B981' : '#EF4444' }}>
                {auditStats.driftCount}
              </div>
            </div>
          </div>

          {/* Mode Switch */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 500 }}>Live Hover Inspector</span>
            <button
              onClick={() => setInspectMode((prev) => !prev)}
              style={{
                backgroundColor: inspectMode ? '#009EA9' : '#E2E8F0',
                color: inspectMode ? '#FFFFFF' : '#475569',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {inspectMode ? 'Active (Inspecting)' : 'Turn On'}
            </button>
          </div>

          {/* Inspected Details */}
          {inspected ? (
            <div style={{ padding: '12px 16px', fontSize: '12px', color: '#334155' }}>
              <div style={{ fontWeight: 600, marginBottom: '6px', color: '#005F65' }}>
                Target: {inspected.componentName ? `<${inspected.componentName} />` : `<${inspected.tag}>`}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '8px' }}>
                <div>Font: <span style={{ fontFamily: 'monospace' }}>{inspected.styles.fontSize}</span></div>
                <div>Radius: <span style={{ fontFamily: 'monospace' }}>{inspected.styles.borderRadius}</span></div>
                <div>Pad: <span style={{ fontFamily: 'monospace' }}>{inspected.styles.padding}</span></div>
                <div>Color: <span style={{ fontFamily: 'monospace' }}>{inspected.styles.color.slice(0, 15)}</span></div>
              </div>
              <button
                onClick={copyUxSpecSnippet}
                style={{
                  width: '100%',
                  backgroundColor: '#009EA9',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {copied ? '✓ Copied to Clipboard!' : '📋 Copy UX Spec Snippet'}
              </button>
            </div>
          ) : (
            <div style={{ padding: '16px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
              {inspectMode ? 'Hover over any UI element on screen to inspect tokens.' : 'Activate Live Hover Inspector to examine DOM elements.'}
            </div>
          )}

          {/* Footer Shortcuts */}
          <div style={{ padding: '10px 16px', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
            <a
              href="http://localhost:6006"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#007E87', textDecoration: 'none', fontWeight: 600 }}
            >
              📖 Open Storybook
            </a>
            {figmaUrl && (
              <a
                href={figmaUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#007E87', textDecoration: 'none', fontWeight: 600 }}
              >
                🎨 Open in Figma
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
