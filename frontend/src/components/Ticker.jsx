const items = [
  'In-Country Representation',
  'AI Student Analytics',
  'Predictive Lead Scoring',
  'Paid Media & Performance',
  'CRM & Marketing Automation',
  'Social Media Strategy',
  'UI/UX & Conversion Design',
  'Data-Driven Enrolment',
];

const TickerDot = () => (
  <span style={{ width: 5, height: 5, background: '#E50914', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} aria-hidden="true" />
);

const Ticker = () => {
  const allItems = [...items, ...items]; // duplicate for seamless loop

  return (
    <div
      style={{ background: '#0A0A0A', padding: '18px 0', overflow: 'hidden' }}
      data-testid="ticker-bar"
      aria-hidden="true"
    >
      <div className="ticker-track">
        {allItems.map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 24, padding: '0 24px', whiteSpace: 'nowrap' }}
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#555' }}>
              {item}
            </span>
            <TickerDot />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
