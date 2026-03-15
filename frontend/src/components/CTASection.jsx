import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const AnimatedCounter = ({ target, prefix = '', suffix = '', duration = 1800 }) => {
  const [count,   setCount]   = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = null, raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const ctaStats = [
  { val: 3,  suffix: '×',   label: 'Enrolment Lift' },
  { val: 42, suffix: '%',   label: 'Lower Cost-Per-Lead' },
  { val: 90, suffix: '',    label: 'Days to First Results' },
  { val: 24, suffix: 'h',   label: 'Guaranteed Response' },
];

const CTASection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.2 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="cta"
      data-testid="cta-section"
      style={{ background: '#E50914', padding: '88px 0', position: 'relative', overflow: 'hidden' }}
      ref={sectionRef}
    >
      {/* Background TIXO watermark */}
      <div
        className="font-heading"
        style={{
          position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
          fontSize: '18rem', color: 'rgba(0,0,0,0.07)', lineHeight: 1,
          pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        }}
        aria-hidden="true"
      >
        TIXO
      </div>

      {/* Sweep light effect */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.0) 100%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div className="section-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'center' }} className="cta-grid">

          {/* Left */}
          <div>
            <div className="reveal" style={{ fontSize: '0.68rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', fontWeight: 700, marginBottom: 14 }}>
              Ready to stop guessing and start growing?
            </div>
            <h2
              className="font-heading reveal reveal-d1"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', lineHeight: 0.95, color: '#fff', marginBottom: 16 }}
            >
              Your Students Are Searching.<br />Let's Make Sure They Find You First.
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', maxWidth: 520, lineHeight: 1.78, marginBottom: 40 }}>
              Institutions working with Tixo Global see an average 3× lift in international enrolments, 42% reduction in cost-per-lead, and measurable pipeline growth within the first intake cycle — all powered by AI, data, and people who know your markets.
            </p>

            {/* Stats row */}
            <div
              className="reveal reveal-d3"
              data-testid="cta-stats"
              style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}
            >
              {ctaStats.map((s) => (
                <div key={s.label} data-testid={`cta-stat-${s.label.toLowerCase().replace(/\s/g, '-')}`}>
                  <div
                    className="font-heading"
                    style={{ fontSize: '2.6rem', color: '#fff', lineHeight: 1 }}
                  >
                    <AnimatedCounter target={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="reveal reveal-d2" data-testid="cta-button-wrap">
            <a
              href="#contact"
              className="btn-white cta-sweep-btn"
              data-testid="cta-primary-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}
            >
              Book a Discovery Call <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .cta-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) {
          [data-testid="cta-section"] { padding: 64px 0; }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
