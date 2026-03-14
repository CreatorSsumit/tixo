import { useEffect, useRef } from 'react';
import { Search, BarChart3, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Search,
    name: 'Discover',
    desc: 'Deep-dive into your enrolment objectives, target markets, and programme portfolio. We run AI-powered market scans and competitor audits to map the international student landscape before we recommend a single tactic.',
  },
  {
    num: '02',
    icon: BarChart3,
    name: 'Strategise',
    desc: 'Our team builds a bespoke, data-driven international student recruitment plan — combining in-country representation, predictive targeting, and digital activation into one cohesive roadmap tied to your intake calendar.',
  },
  {
    num: '03',
    icon: Rocket,
    name: 'Execute',
    desc: 'In-country teams and AI-optimised digital campaigns deployed simultaneously — with full reporting transparency, weekly performance reviews, and real-time dashboards at every milestone.',
  },
  {
    num: '04',
    icon: TrendingUp,
    name: 'Optimise & Scale',
    desc: 'Results delivered against agreed enrolment KPIs — then continuously compounded as our models learn. Each intake cycle outperforms the last, building a student recruitment engine that grows with you.',
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
        {/* Header */}
        <div className="section-label reveal">Our Process</div>
        <h2
          className="font-heading reveal reveal-d1"
          style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#0A0A0A', marginBottom: 12 }}
        >
          How We Build Student Enrolment Pipelines
        </h2>
        <p className="reveal reveal-d2" style={{ fontSize: '1rem', color: '#64748B', maxWidth: 580, lineHeight: 1.75, marginBottom: 56 }}>
          Every engagement follows the same rigorous, data-first approach — whether you're entering a new source market or launching a full enrolment campaign.
        </p>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#E5E7EB', border: '1px solid #E5E7EB', gap: 1 }} className="process-grid">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`process-step reveal reveal-d${i + 1}`}
                data-testid={`process-step-${i}`}
              >
                {/* Big number */}
                <div
                  className="font-heading"
                  style={{ fontSize: '5rem', color: 'rgba(229,9,20,0.07)', lineHeight: 1, marginBottom: 14, transition: 'color 0.3s' }}
                  aria-hidden="true"
                >
                  {s.num}
                </div>

                {/* Icon in red circle */}
                <div style={{
                  width: 44, height: 44, background: '#E50914',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', marginBottom: 16
                }}>
                  <Icon size={20} color="#fff" strokeWidth={2} />
                </div>

                <div
                  style={{ fontFamily: 'Inter', fontSize: '1.0rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10, color: '#0A0A0A', letterSpacing: '0.04em' }}
                >
                  {s.name}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.72 }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .process-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .process-grid { grid-template-columns: 1fr !important; } }
        .process-step { border-right: none !important; }
      `}</style>
    </section>
  );
};

export default Process;
