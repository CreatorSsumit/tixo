import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const cases = [
  {
    industry: 'In-Country Representation · South Asia',
    title: '47% Enrolment Growth From India & Pakistan',
    stat: '+47%',
    statLabel: 'Enrolment Growth',
    desc: 'A mid-sized UK university was generating high traffic from South Asia but converting less than 3% of enquiries. Tixo embedded in-country representatives in Mumbai, Lahore, and Dhaka — equipped with our AI lead-scoring dashboard. Within one intake cycle, qualified applications rose 61% and confirmed enrolments grew 47%, with cost-per-enrolment dropping by a third.',
    tags: ['India', 'Pakistan', 'In-Country Rep', 'AI Lead Scoring'],
  },
  {
    industry: 'Paid Media · AI Analytics · Middle East',
    title: '48% Drop in Cost-Per-Lead for GCC Student Campaign',
    stat: '-48%',
    statLabel: 'Cost-Per-Lead',
    desc: 'A Canadian university was overspending on broad-match Google campaigns targeting the UAE, Saudi Arabia, and Qatar with minimal segment intelligence. We rebuilt their paid strategy using our predictive audience engine — narrowing to high-intent student cohorts by programme, family income proxy, and academic profile. Cost-per-lead fell 48% within 90 days, with application quality rising significantly.',
    tags: ['UAE', 'Saudi Arabia', 'Paid Media', 'Predictive Targeting'],
  },
  {
    industry: 'CRM Automation · UI/UX · Africa',
    title: '34% Lift in Application Completion Rates',
    stat: '+34%',
    statLabel: 'Completion Rate',
    desc: 'An Australian institution was losing over 40% of African applicants at the portal stage. We conducted a full UX audit, rebuilt the application journey, and deployed an AI-powered follow-up sequence that triggered personalised messages based on drop-off behaviour. Application completion rates rose 34% in the first semester, with zero increase in staff workload.',
    tags: ['Africa', 'UI/UX Redesign', 'CRM Automation'],
  },
  {
    industry: 'Social Media · Paid Media · EdTech',
    title: 'Full-Funnel Growth for a Global EdTech Platform',
    stat: '+210%',
    statLabel: 'Qualified Sign-ups',
    desc: 'An EdTech platform entering Southeast Asia needed simultaneous brand awareness and lead generation. We ran data-modelled paid campaigns across Google and Meta, built AI-automated lead nurture workflows, and launched their social presence with platform-specific content strategies — delivering a 48% reduction in cost-per-lead and a 210% increase in qualified trial sign-ups within 90 days.',
    tags: ['EdTech', 'Southeast Asia', 'Paid Media', 'Automation'],
  },
];

const CaseStudies = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" data-testid="case-studies-section" style={{ background: '#F7F7F7', padding: '96px 0' }} ref={sectionRef}>
      <div className="section-wrap">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="section-label reveal">Case Studies</div>
            <h2 className="font-heading reveal reveal-d1" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#0A0A0A' }}>
              Student Recruitment Results
            </h2>
          </div>
          <a href="#contact" className="btn-outline reveal reveal-d1" data-testid="see-all-work-btn">See All Work</a>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="cases-grid">
          {cases.map((c, i) => (
            <article
              key={i}
              data-testid={`case-card-${i}`}
              className={`reveal reveal-d${i % 2 + 1}`}
              style={{
                background: 'linear-gradient(160deg, #0D0D0D 0%, #161616 100%)',
                border: '1px solid #222',
                padding: '44px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E50914';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(229,9,20,0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Background stat watermark */}
              <div
                className="font-heading"
                style={{
                  position: 'absolute', bottom: -10, right: 24,
                  fontSize: '6rem', color: 'rgba(229,9,20,0.05)',
                  lineHeight: 1, userSelect: 'none', pointerEvents: 'none'
                }}
                aria-hidden="true"
              >
                {c.stat}
              </div>

              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                {/* Red accent bar */}
                <div style={{ height: 3, background: '#E50914', width: 40 }} />
                {/* Stat pill */}
                <div style={{ textAlign: 'right' }}>
                  <div className="font-heading" style={{ fontSize: '2rem', color: '#E50914', lineHeight: 1 }}>{c.stat}</div>
                  <div style={{ fontSize: '0.62rem', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginTop: 2 }}>{c.statLabel}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#E50914', fontWeight: 700, marginBottom: 12, opacity: 0.85 }}>{c.industry}</div>
              <h3
                className="font-heading"
                style={{ fontSize: '1.55rem', textTransform: 'uppercase', marginBottom: 16, lineHeight: 1.08, color: '#fff' }}
              >
                {c.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.78, marginBottom: 28 }}>{c.desc}</p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: '1px solid #2A2A2A', padding: '4px 12px',
                      fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase',
                      color: '#555', background: '#111',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .cases-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default CaseStudies;
