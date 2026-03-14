import { useEffect, useRef } from 'react';
import { Globe, BrainCircuit, TrendingUp, Share2, Monitor, Zap } from 'lucide-react';

const services = [
  {
    num: '01', featured: true, badge: 'Tixo Flagship',
    icon: Globe,
    name: 'In-Country Student Representation',
    desc: 'Establish a trusted, authoritative local presence in South Asia, Middle East, and Africa without the overhead of a subsidiary. Our in-country teams use real-time behavioural data and local intelligence to identify high-intent students, attend education fairs, manage counsellor networks, and close enrolments on your behalf.',
  },
  {
    num: '02', featured: true, badge: 'AI-Powered',
    icon: BrainCircuit,
    name: 'Predictive Student Analytics',
    desc: 'Our proprietary AI models analyse millions of data signals — search intent, application patterns, geo-demographics, and behavioural triggers — to identify your highest-converting international student segments before a single ad is placed. Stop spending on guesswork. Start investing where the enrolments are.',
  },
  {
    num: '03', featured: false, badge: null,
    icon: TrendingUp,
    name: 'Paid Media & Performance Marketing',
    desc: 'AI-optimised advertising across Meta, Google, YouTube, and LinkedIn — precision-targeted to the student geographies, degree programmes, and intent signals that matter most. Every higher education campaign is built on data, managed with machine learning, and measured against real enrolment outcomes.',
  },
  {
    num: '04', featured: false, badge: null,
    icon: Share2,
    name: 'Social Media Marketing for Universities',
    desc: 'Data-driven social content strategies built around platform-specific international student behaviour. From Instagram campaigns targeting South Asian applicants to LinkedIn strategies for postgraduate professionals — we build social presence that generates real enquiries, not just engagement metrics.',
  },
  {
    num: '05', featured: false, badge: null,
    icon: Monitor,
    name: 'UI/UX & Conversion Design',
    desc: 'Your international student application portal is the final hurdle — and most institutions lose 40% of applicants at this stage. We audit, redesign, and A/B test your digital touchpoints using heatmap data and session analytics to remove friction and dramatically improve application completion rates.',
  },
  {
    num: '06', featured: false, badge: null,
    icon: Zap,
    name: 'CRM & Enrolment Marketing Automation',
    desc: 'AI-powered nurture sequences, automated student follow-up workflows, and CRM pipelines that keep every international student lead engaged from first enquiry to confirmed enrolment. We build systems that run 24/7 — so your recruitment team focuses on relationships, not repetition.',
  },
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const Icon = service.icon;

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -6;
    const ry = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)';
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
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
        background: service.featured ? '#FFFCFC' : '#fff',
        borderTop: '3px solid #E50914',
        borderBottom: '1px solid #E5E7EB',
        borderLeft: '1px solid #E5E7EB',
        borderRight: '1px solid #E5E7EB',
        padding: '40px 32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.08s ease, box-shadow 0.3s ease, background 0.2s ease',
        transitionDelay: `${index * 0.07}s`,
        cursor: 'default',
      }}
    >
      {/* Big number watermark */}
      <span
        className="font-heading"
        style={{ position: 'absolute', top: 12, right: 20, fontSize: '5rem', color: 'rgba(0,0,0,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}
        aria-hidden="true"
      >
        {service.num}
      </span>

      {/* Badge */}
      {service.badge && (
        <span style={{ display: 'inline-block', background: '#E50914', color: '#fff', fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, padding: '3px 10px', marginBottom: 16 }}>
          {service.badge}
        </span>
      )}

      {/* Icon */}
      <div
        style={{
          width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1.5px solid #E5E7EB', marginBottom: 20,
          transition: 'border-color 0.3s, background 0.3s',
        }}
        className="service-icon-wrap"
      >
        <Icon size={20} color="#E50914" strokeWidth={1.8} />
      </div>

      {/* Name */}
      <h3
        style={{ fontFamily: 'Inter', fontSize: '1.0rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10, color: '#0A0A0A', lineHeight: 1.3 }}
      >
        {service.name}
      </h3>

      {/* Desc */}
      <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.75, marginBottom: 22 }}>{service.desc}</p>

      {/* Link */}
      <a
        href="#contact"
        data-testid={`service-learn-more-${index}`}
        style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#E50914', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'gap 0.2s' }}
        onMouseEnter={(e) => (e.currentTarget.style.gap = '14px')}
        onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
      >
        Learn more →
      </a>

      {/* Bottom accent line */}
      <div
        style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: '#E50914', width: 0, transition: 'width 0.35s ease' }}
        className="card-bottom-line"
      />

      <style>{`
        article[data-testid="service-card-${index}"]:hover .card-bottom-line { width: 100%; }
      `}</style>
    </article>
  );
};

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );
    const cards = sectionRef.current?.querySelectorAll('.reveal');
    cards?.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" data-testid="services-section" style={{ background: '#F7F7F7', padding: '96px 0' }} ref={sectionRef}>
      <div className="section-wrap">
        {/* Header */}
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

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#E5E7EB', border: '1px solid #E5E7EB' }} className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
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
