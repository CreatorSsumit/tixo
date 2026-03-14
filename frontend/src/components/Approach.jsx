import { useEffect, useRef } from 'react';

const steps = [
  {
    step: 'Research',
    name: 'AI Market Intelligence',
    desc: 'We map your target geographies using live data — search trends, competitor positioning, student mobility patterns — before a single campaign goes live.',
  },
  {
    step: 'Plan',
    name: 'Data-Led Strategy',
    desc: 'Predictive models identify your highest-value student segments. We build a bespoke enrolment plan spanning representation, paid media, and automation aligned to your intake calendar.',
  },
  {
    step: 'Execute',
    name: 'Full Activation',
    desc: 'In-country teams and AI-optimised digital campaigns deployed simultaneously — with full reporting transparency, weekly performance reviews, and real-time dashboards at every milestone.',
  },
  {
    step: 'Optimise',
    name: 'Continuous AI Improvement',
    desc: 'Our machine learning models retrain on your live data — improving lead quality, reducing cost-per-enrolment, and compounding performance across every subsequent intake.',
  },
];

const Approach = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="approach"
      data-testid="approach-section"
      style={{ background: '#0A0A0A', padding: '96px 0' }}
      ref={sectionRef}
    >
      <div className="section-wrap">
        {/* Header */}
        <div className="section-label reveal" style={{ color: '#E50914' }}>How We Work</div>
        <h2
          className="font-heading reveal reveal-d1"
          style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 0.95, color: '#fff', marginBottom: 56 }}
        >
          <span style={{ color: '#E50914' }}>Smarter</span> Intelligence.{' '}
          <span style={{ color: '#E50914' }}>Sharper</span> Targeting.<br />
          <span style={{ color: '#E50914' }}>Stronger</span> Enrolment Pipelines.
        </h2>

        {/* Grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#1E1E1E', border: '1px solid #1E1E1E' }}
          className="approach-grid"
        >
          {steps.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-d${i + 1}`}
              data-testid={`approach-item-${i}`}
              style={{
                background: '#0F0F0F',
                padding: '44px 32px',
                transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                borderTop: '2px solid transparent',
                borderLeft: i === 0 ? 'none' : '1px solid #1A1A1A',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#151515';
                e.currentTarget.style.borderTopColor = '#E50914';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0F0F0F';
                e.currentTarget.style.borderTopColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Step number watermark */}
              <div
                className="font-heading"
                style={{ position: 'absolute', bottom: -10, right: 16, fontSize: '7rem', color: 'rgba(229,9,20,0.05)', lineHeight: 1, userSelect: 'none' }}
                aria-hidden="true"
              >
                0{i+1}
              </div>

              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter', fontSize: '0.65rem', color: '#E50914', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20, background: 'rgba(229,9,20,0.1)', padding: '5px 12px', borderRadius: 2 }}
              >
                <span>{s.step}</span>
              </div>
              <div
                style={{ fontFamily: 'Inter', fontSize: '1.05rem', fontWeight: 700, textTransform: 'uppercase', color: '#fff', marginBottom: 14, letterSpacing: '0.04em', lineHeight: 1.2 }}
              >
                {s.name}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.72, position: 'relative', zIndex: 1 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .approach-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .approach-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Approach;
