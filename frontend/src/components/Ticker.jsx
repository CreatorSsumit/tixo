const items = [
  'In-Country Representation',
  'AI Student Analytics',
  'Predictive Lead Scoring',
  'Paid Media & Performance',
  'CRM & Marketing Automation',
  'Social Media Strategy',
  'UI/UX Conversion Design',
  'Data-Driven Enrolment',
];

const Ticker = () => {
  const all = [...items, ...items];

  return (
    <div
      style={{
        background: '#0A0A0A',
        padding: '22px 0',
        overflow: 'hidden',
        borderTop: '2px solid rgba(229,9,20,0.55)',
        borderBottom: '2px solid rgba(229,9,20,0.55)',
        position: 'relative',
      }}
      data-testid="ticker-bar"
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #0A0A0A, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #0A0A0A, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div className="ticker-track">
        {all.map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 20, padding: '0 20px' }}
          >
            {/* Red marker */}
            <span
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#E50914',
                boxShadow: '0 0 8px rgba(229,9,20,0.7)',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                color: i % 8 < 4 ? '#aaa' : '#E50914',
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
