import { useState, useEffect, useRef } from 'react';

const faqs = [
  {
    q: 'How is Tixo Global different from a traditional education recruitment agency?',
    a: 'Traditional agencies rely on agent networks and relationship management. We do that too — but we layer AI-powered lead scoring, predictive student analytics, and full-funnel digital capability on top. This means every in-country touchpoint is informed by data, and every digital campaign is guided by real enrolment intelligence. You get the human presence and the machine precision in one partner.',
  },
  {
    q: 'What markets does Tixo Global operate in?',
    a: 'Our primary in-country representation spans South Asia (India, Pakistan, Bangladesh, Sri Lanka, Nepal), the Middle East & GCC (UAE, Saudi Arabia, Qatar, Oman, Kuwait), and Sub-Saharan Africa (Nigeria, Ghana, Kenya, Zimbabwe). Our digital capabilities — paid media, analytics, automation — are deployed globally, wherever your target students are searching.',
  },
  {
    q: 'How does the AI predictive analytics actually work?',
    a: 'Our models are trained on aggregated enrolment data across hundreds of institutions and millions of student interactions. They analyse search behaviour, programme affinity, geo-demographic signals, application timing patterns, and engagement sequences to assign a predictive enrolment likelihood score to every lead. This tells your team — and ours — exactly where to focus time and budget for maximum conversion.',
  },
  {
    q: 'How quickly can we expect to see results?',
    a: "For digital campaigns, you'll see measurable lead quality and cost-per-lead improvements within the first 30–45 days as our AI models calibrate to your data. In-country representation typically shows qualified application uplift within the first full recruitment cycle. Confirmed enrolment gains are clearest at the intake point — and compound intake over intake as our systems learn more about your best student profiles.",
  },
  {
    q: 'Do you work with universities of all sizes?',
    a: "Yes. We partner with institutions from boutique specialist colleges targeting 50 international students per intake to global research universities seeking thousands. Our engagement models scale accordingly — from targeted single-market representation to full multi-market, multi-channel enrolment programmes. We'll recommend what makes commercial sense for your institution's size and ambition.",
  },
  {
    q: 'How does Tixo Global begin working with a new university partner?',
    a: "We start with a free strategy consultation — no commitment required. From there, we run our AI market scan across your target geographies, analyse your current digital footprint and lead data, and deliver a tailored enrolment strategy before we ask you to sign anything. You see our full plan, our data, and our projections — before you decide.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
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
    <section id="faq" data-testid="faq-section" style={{ background: '#0A0A0A', padding: '96px 0' }} ref={sectionRef}>
      <div className="section-wrap">
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }} className="faq-layout">

          {/* Left sticky */}
          <div style={{ position: 'sticky', top: 96 }}>
            <div className="section-label reveal" style={{ color: '#E50914' }}>Common Questions</div>
            <h2
              className="font-heading reveal reveal-d1"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#fff', marginBottom: 18 }}
            >
              Frequently Asked Questions About Student Recruitment
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: '1rem', color: '#555', lineHeight: 1.78, maxWidth: 380, marginBottom: 36 }}>
              Straightforward answers to the questions universities ask us most before partnering with Tixo Global.
            </p>
            <a href="#contact" className="btn-primary reveal reveal-d3" data-testid="faq-cta-btn">
              Book a Strategy Call
            </a>
          </div>

          {/* Right: accordion */}
          <div data-testid="faq-list">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="reveal"
                  data-testid={`faq-item-${i}`}
                  style={{
                    marginBottom: 8,
                    background: isOpen ? '#111' : '#0F0F0F',
                    border: `1px solid ${isOpen ? 'rgba(229,9,20,0.5)' : 'rgba(255,255,255,0.06)'}`,
                    borderLeft: `3px solid ${isOpen ? '#E50914' : 'transparent'}`,
                    transition: 'all 0.3s ease',
                    transitionDelay: `${i * 0.05}s`,
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    data-testid={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '20px 24px', cursor: 'pointer', gap: 16, textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      {/* Q number */}
                      <span
                        className="font-heading"
                        style={{
                          fontSize: '1.1rem', color: '#E50914', flexShrink: 0,
                          lineHeight: 1, marginTop: 2,
                          opacity: isOpen ? 1 : 0.5,
                          transition: 'opacity 0.2s',
                        }}
                      >
                        Q{String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontFamily: 'Inter', fontSize: '0.92rem', fontWeight: 600,
                        color: isOpen ? '#fff' : '#e0e0e0',
                        lineHeight: 1.4, transition: 'color 0.2s',
                      }}>
                        {faq.q}
                      </span>
                    </div>
                    {/* Toggle indicator */}
                    <div style={{
                      flexShrink: 0, width: 28, height: 28,
                      border: `1px solid ${isOpen ? '#E50914' : 'rgba(255,255,255,0.15)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isOpen ? '#E50914' : '#555',
                      fontSize: '1rem', fontWeight: 300,
                      transition: 'all 0.3s ease',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      borderRadius: 2,
                    }}>
                      +
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    className={`faq-answer${isOpen ? ' open' : ''}`}
                    data-testid={`faq-answer-${i}`}
                  >
                    <div style={{ padding: '0 24px 0 60px' }}>
                      <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.82, maxWidth: 560 }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .faq-layout { grid-template-columns: 1fr !important; gap: 48px !important; } }
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease; }
        .faq-answer.open { max-height: 320px; padding-bottom: 20px; }
      `}</style>
    </section>
  );
};

export default FAQ;
