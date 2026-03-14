import { useEffect, useRef } from 'react';
import { Globe, BrainCircuit, TrendingUp, Share2, Monitor, Zap } from 'lucide-react';

const services = [
  {
    num: '01', badge: 'Tixo Flagship', icon: Globe, accent: true,
    metric: '61% Application Uplift',
    name: 'In-Country Student Representation',
    desc: 'Establish a trusted local presence in South Asia, Middle East, and Africa. Our in-country teams use real-time behavioural data and local intelligence to identify high-intent students, attend education fairs, and close enrolments on your behalf.',
  },
  {
    num: '02', badge: 'AI-Powered', icon: BrainCircuit, accent: true,
    metric: '42% Cost-Per-Lead Reduction',
    name: 'Predictive Student Analytics',
    desc: 'Our proprietary AI models analyse millions of data signals — search intent, application patterns, geo-demographics — to identify your highest-converting student segments before a single ad is placed.',
  },
  {
    num: '03', badge: null, icon: TrendingUp, accent: false,
    metric: '3× Enrolment Lift',
    name: 'Paid Media & Performance Marketing',
    desc: 'AI-optimised advertising across Meta, Google, YouTube, and LinkedIn — precision-targeted to the student geographies, degree programmes, and intent signals that matter most.',
  },
  {
    num: '04', badge: null, icon: Share2, accent: false,
    metric: '+340% Social Reach',
    name: 'Social Media Marketing for Universities',
    desc: 'Data-driven social strategies built around platform-specific international student behaviour. We build social presence that generates real enquiries, not just engagement metrics.',
  },
  {
    num: '05', badge: null, icon: Monitor, accent: false,
    metric: '34% Completion Rate Lift',
    name: 'UI/UX & Conversion Design',
    desc: 'We audit, redesign, and A/B test your application portal using heatmap data and session analytics to remove friction and dramatically improve application completion rates.',
  },
  {
    num: '06', badge: null, icon: Zap, accent: false,
    metric: '24/7 Lead Nurture',
    name: 'CRM & Enrolment Marketing Automation',
    desc: 'AI-powered nurture sequences and automated follow-up workflows that keep every international student lead engaged from first enquiry to confirmed enrolment.',
  },
];

/* Dot grid pattern as a CSS background */
const dotPattern = `radial-gradient(circle, rgba(229,9,20,0.08) 1px, transparent 1px)`;

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const Icon = service.icon;

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${cy * -8}deg) rotateY(${cx * 8}deg) translateY(-8px)`;
    card.style.boxShadow = '0 24px 64px rgba(0,0,0,0.14), 0 0 0 1px rgba(229,9,20,0.15)';
  };
  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    card.style.boxShadow = 'none';
  };

  return (
    <article
      ref={cardRef}
      data-testid={`service-card-${index}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="reveal"
      style={{
        background: '#fff',
        borderTop: '3px solid #E50914',
        border: '1px solid #E5E7EB',
        borderTop: '3px solid #E50914',
        padding: '40px 32px 32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.08s ease, box-shadow 0.3s ease',
        transitionDelay: `${index * 0.06}s`,
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Dot grid background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: dotPattern, backgroundSize: '20px 20px', opacity: 0.6, pointerEvents: 'none' }} />

      {/* Big number watermark */}
      <span
        className="font-heading"
        aria-hidden="true"
        style={{ position: 'absolute', top: 8, right: 16, fontSize: '4.5rem', color: 'rgba(229,9,20,0.06)', lineHeight: 1, userSelect: 'none' }}
      >
        {service.num}
      </span>

      {/* Top row: badge + icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22, position: 'relative', zIndex: 1 }}>
        {service.badge ? (
          <span style={{ background: '#E50914', color: '#fff', fontSize: '0.58rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, padding: '3px 10px', alignSelf: 'flex-start' }}>
            {service.badge}
          </span>
        ) : (
          <div style={{ width: 24, height: 3, background: '#E5E7EB' }} />
        )}

        {/* Icon square */}
        <div style={{
          width: 48, height: 48, background: service.accent ? '#E50914' : '#F7F7F7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: service.accent ? 'none' : '1.5px solid #E5E7EB',
          transition: 'background 0.3s, border-color 0.3s',
        }}>
          <Icon size={20} color={service.accent ? '#fff' : '#E50914'} strokeWidth={1.8} />
        </div>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'Inter, sans-serif', fontSize: '1.0rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.04em',
        color: '#0A0A0A', lineHeight: 1.3, marginBottom: 10,
        position: 'relative', zIndex: 1,
      }}>
        {service.name}
      </h3>

      {/* Desc */}
      <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.75, flex: 1, position: 'relative', zIndex: 1, marginBottom: 24 }}>
        {service.desc}
      </p>

      {/* Bottom: metric + link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1, borderTop: '1px solid #F0F0F0', paddingTop: 16 }}>
        <span style={{
          fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1px',
          textTransform: 'uppercase', color: '#E50914',
          background: 'rgba(229,9,20,0.07)', padding: '4px 10px',
        }}>
          {service.metric}
        </span>
        <a
          href="#contact"
          data-testid={`service-learn-more-${index}`}
          style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#0A0A0A', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color 0.2s, gap 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#E50914'; e.currentTarget.style.gap = '12px'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.gap = '6px'; }}
        >
          Learn more →
        </a>
      </div>
    </article>
  );
};

const Services = () => {
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
    <section id="services" data-testid="services-section" style={{ background: '#F7F7F7', padding: '96px 0' }} ref={sectionRef}>
      <div className="section-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="section-label">Student Recruitment Services</div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#0A0A0A', marginBottom: 10 }}>
              Six Integrated Capabilities
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B', maxWidth: 520, lineHeight: 1.75 }}>
              Your students are searching right now. The question is whether they find you — or someone else.
            </p>
          </div>
          <a href="#contact" className="btn-outline" data-testid="services-get-started-btn">Get Started</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="services-grid">
          {services.map((s, i) => <ServiceCard key={s.num} service={s} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Services;
