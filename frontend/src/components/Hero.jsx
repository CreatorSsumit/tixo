import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import GlobeCanvas from './GlobeCanvas';

/* ── Animated counter ── */
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

const stats = [
  { prefix: '', value: 42, suffix: '%', label: 'Avg. Cost-Per-Lead Reduction', sub: 'Within First 90 Days' },
  { prefix: '', value: 3,  suffix: '×', label: 'Enrolment Lift',               sub: 'Avg. vs Prior Baseline' },
  { prefix: '+', value: 34, suffix: '%', label: 'Application Completion',       sub: 'Post UX Optimisation' },
];

const heroCards = [
  { badge: 'Flagship Capability',         title: 'In-Country Student Representation',  desc: 'Embedded local teams in South Asia, Middle East & Africa — boots on the ground with real cultural intelligence.' },
  { badge: 'AI-Powered Intelligence',     title: 'Predictive Student Analytics',        desc: 'Machine learning models that identify high-intent student segments before your competitors.' },
  { badge: 'Full-Funnel Growth',          title: 'Paid Media · Social · Automation · UX', desc: 'An integrated digital engine that converts international student enquiries at every touchpoint.' },
];

const Hero = () => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      style={{ minHeight: '100vh', background: '#F7F7F7', paddingTop: 72, overflow: 'hidden', position: 'relative' }}
    >
      {/* Background gradient orbs */}
      <div style={{ position: 'absolute', top: '15%', right: '5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(229,9,20,0.08) 0%, transparent 62%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '0%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(229,9,20,0.04) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="section-wrap" style={{ paddingTop: 18, paddingBottom: 64 }}>
        {/* Full-width tag above grid */}
        <div
          className="section-label"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'none' : 'translateY(12px)',
            transition: 'all 0.5s ease',
            marginBottom: 10,
          }}
          data-testid="hero-tag"
        >
          AI-Powered International Student Recruitment Agency
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }} className="hero-grid">

          {/* ── Left ── */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* H1 */}
            <h1
              className="font-heading"
              data-testid="hero-title"
              style={{
                fontSize: 'clamp(3.4rem, 6vw, 4.8rem)',
                lineHeight: 0.93,
                color: '#0A0A0A',
                marginBottom: 24,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(24px)',
                transition: 'all 0.6s ease 0.1s',
              }}
            >
              Enrol More Students.<br />
              <span style={{ color: '#E50914' }}>Powered by AI &amp; Data.</span>
            </h1>

            {/* Sub */}
            <p
              data-testid="hero-description"
              style={{
                fontSize: '1.03rem', color: '#64748B', lineHeight: 1.78, maxWidth: 480, marginBottom: 12,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.2s',
              }}
            >
              Tixo Global is an AI-powered education marketing agency helping universities and higher education institutions build high-converting international student pipelines — combining in-country representation with predictive analytics, AI-driven lead scoring, and data-led digital marketing strategies.
            </p>
            <p
              style={{
                fontSize: '1.0rem', color: '#1A1A1A', fontWeight: 600, marginBottom: 40,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.22s',
              }}
            >
              Your students are searching right now. Will they find you first?
            </p>

            {/* Stats — 3-col grid */}
            <div
              data-testid="hero-stats"
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: 36,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.3s',
              }}
            >
              {stats.map((s, si) => (
                <div
                  key={s.label}
                  data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, '-')}`}
                  style={{
                    padding: '20px 16px',
                    background: '#fff',
                    border: '1px solid #E5E7EB',
                    borderTop: '3px solid #E50914',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                  <div className="font-heading" style={{ fontSize: '2.8rem', color: '#E50914', lineHeight: 1 }}>
                    <AnimatedCounter target={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', marginTop: 5 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              style={{
                display: 'flex', gap: 14, flexWrap: 'wrap',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.4s',
              }}
            >
              <a href="#contact" className="btn-primary" data-testid="hero-cta-primary">
                Book a Free Strategy Call <ArrowRight size={14} />
              </a>
              <a href="#services" className="btn-outline" data-testid="hero-cta-secondary">
                Our Services
              </a>
            </div>
          </div>

          {/* ── Right: Globe ── */}
          <div
            style={{
              position: 'relative', zIndex: 1,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(24px)',
              transition: 'all 0.8s ease 0.3s',
            }}
            data-testid="hero-right"
          >
            {/* Globe container */}
            <div style={{ position: 'relative', borderRadius: '50%', overflow: 'visible', height: 480 }}>
              <div className="globe-glow" />
              <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
                <GlobeCanvas />
              </div>
            </div>

            {/* Floating cards below globe */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              {heroCards.map((card, i) => (
                <div
                  key={i}
                  data-testid={`hero-card-${i}`}
                  style={{
                    background: '#fff',
                    border: '1px solid #E5E7EB',
                    borderLeft: '4px solid #E50914',
                    padding: '18px 22px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    animation: `float-y ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'none' : 'translateY(16px)',
                    transition: `all 0.6s ease ${0.45 + i * 0.1}s`,
                  }}
                >
                  <div style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#E50914', fontWeight: 700, marginBottom: 3 }}>{card.badge}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.92rem', fontWeight: 700, color: '#0A0A0A', marginBottom: 3 }}>{card.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>{card.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
