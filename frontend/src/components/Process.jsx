import { useEffect, useRef } from 'react';
import { Search, BarChart3, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    num: '01', icon: Search, name: 'Discover',
    desc: 'Deep-dive into your enrolment objectives, target markets, and programme portfolio. We run AI-powered market scans and competitor audits to map the international student landscape before we recommend a single tactic.',
    metric: 'AI Market Scan',
  },
  {
    num: '02', icon: BarChart3, name: 'Strategise',
    desc: 'Our team builds a bespoke, data-driven international student recruitment plan — combining in-country representation, predictive targeting, and digital activation into one cohesive roadmap tied to your intake calendar.',
    metric: 'Custom Roadmap',
  },
  {
    num: '03', icon: Rocket, name: 'Execute',
    desc: 'In-country teams and AI-optimised digital campaigns deployed simultaneously — with full reporting transparency, weekly performance reviews, and real-time dashboards at every milestone.',
    metric: 'Full Activation',
  },
  {
    num: '04', icon: TrendingUp, name: 'Optimise & Scale',
    desc: 'Results delivered against agreed enrolment KPIs — then continuously compounded as our models learn. Each intake cycle outperforms the last, building a student recruitment engine that grows with you.',
    metric: 'Compound Growth',
  },
];

const Process = () => {
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
    <section id="process" data-testid="process-section" style={{ background: '#F7F7F7', padding: '96px 0' }} ref={sectionRef}>
      <div className="section-wrap">
        <div className="section-label reveal">Our Process</div>
        <h2 className="font-heading reveal reveal-d1" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#0A0A0A', marginBottom: 12 }}>
          How We Build Student Enrolment Pipelines
        </h2>
        <p className="reveal reveal-d2" style={{ fontSize: '1rem', color: '#64748B', maxWidth: 580, lineHeight: 1.75, marginBottom: 56 }}>
          Every engagement follows the same rigorous, data-first approach — whether you're entering a new source market or launching a full enrolment campaign.
        </p>

        {/* Step connector line */}
        <div style={{ position: 'relative' }}>
          {/* Horizontal connector */}
          <div className="hidden lg:block" style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(to right, transparent, #E50914 20%, #E50914 80%, transparent)', zIndex: 0, opacity: 0.3 }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, position: 'relative', zIndex: 1 }} className="process-grid">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className={`reveal reveal-d${i + 1}`}
                  data-testid={`process-step-${i}`}
                  style={{
                    background: '#fff',
                    border: '1px solid #E5E7EB',
                    borderTop: '3px solid transparent',
                    padding: '36px 28px 32px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-top-color 0.3s, box-shadow 0.3s, transform 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderTopColor = '#E50914';
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(229,9,20,0.1)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderTopColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Step number — large, red, top left */}
                  <div
                    className="font-heading"
                    style={{ fontSize: '4.2rem', color: 'rgba(229,9,20,0.10)', lineHeight: 1, marginBottom: 18, userSelect: 'none' }}
                    aria-hidden="true"
                  >
                    {s.num}
                  </div>

                  {/* Icon in red circle */}
                  <div style={{
                    width: 48, height: 48, background: '#E50914', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 18,
                    boxShadow: '0 4px 16px rgba(229,9,20,0.3)',
                  }}>
                    <Icon size={20} color="#fff" strokeWidth={2} />
                  </div>

                  {/* Name */}
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '1.0rem', fontWeight: 700,
                    textTransform: 'uppercase', marginBottom: 12, color: '#0A0A0A',
                    letterSpacing: '0.04em',
                  }}>
                    {s.name}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.72, marginBottom: 20 }}>
                    {s.desc}
                  </p>

                  {/* Metric tag at bottom */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(229,9,20,0.07)',
                    padding: '5px 12px',
                    fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase',
                    color: '#E50914', fontWeight: 700,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#E50914', display: 'inline-block' }} />
                    {s.metric}
                  </div>

                  {/* Step number indicator at bottom right */}
                  <div
                    className="font-heading"
                    style={{
                      position: 'absolute', bottom: 12, right: 20,
                      fontSize: '0.68rem', color: '#ccc', letterSpacing: '3px',
                    }}
                    aria-hidden="true"
                  >
                    {s.num}/04
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .process-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .process-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Process;
