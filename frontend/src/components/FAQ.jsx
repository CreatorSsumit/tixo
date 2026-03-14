import { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

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
    a: 'For digital campaigns, you\'ll see measurable lead quality and cost-per-lead improvements within the first 30–45 days as our AI models calibrate to your data. In-country representation typically shows qualified application uplift within the first full recruitment cycle. Confirmed enrolment gains are clearest at the intake point — and compound intake over intake as our systems learn more about your best student profiles.',
  },
  {
    q: 'Do you work with universities of all sizes?',
    a: 'Yes. We partner with institutions from boutique specialist colleges targeting 50 international students per intake to global research universities seeking thousands. Our engagement models scale accordingly — from targeted single-market representation to full multi-market, multi-channel enrolment programmes. We\'ll recommend what makes commercial sense for your institution\'s size and ambition.',
  },
  {
    q: 'How does Tixo Global begin working with a new university partner?',
    a: 'We start with a free strategy consultation — no commitment required. From there, we run our AI market scan across your target geographies, analyse your current digital footprint and lead data, and deliver a tailored enrolment strategy before we ask you to sign anything. You see our full plan, our data, and our projections — before you decide.',
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
    <section id="faq" data-testid="faq-section" style={{ background: '#fff', padding: '96px 0' }} ref={sectionRef}>
      <div className="section-wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="faq-layout">

          {/* Left */}
          <div style={{ position: 'sticky', top: 96 }}>
            <div className="section-label reveal">Common Questions</div>
            <h2
              className="font-heading reveal reveal-d1"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#0A0A0A', marginBottom: 18 }}
            >
              Frequently Asked Questions About Student Recruitment
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.78, maxWidth: 420, marginBottom: 36 }}>
              Straightforward answers to the questions universities ask us most before partnering with Tixo Global.
            </p>
            <a href="#contact" className="btn-primary reveal reveal-d3" data-testid="faq-cta-btn">
              Book a Strategy Call
            </a>
          </div>

          {/* Right: accordion */}
          <div data-testid="faq-list">
            <div style={{ borderTop: '1px solid #E5E7EB' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{ borderBottom: '1px solid #E5E7EB', transitionDelay: `${i * 0.06}s` }}
                  data-testid={`faq-item-${i}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    data-testid={`faq-btn-${i}`}
                    aria-expanded={openIndex === i}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '24px 0', cursor: 'pointer', gap: 20, textAlign: 'left',
                      transition: 'color 0.2s',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter', fontSize: '0.95rem', fontWeight: 600,
                        color: openIndex === i ? '#E50914' : '#0A0A0A',
                        lineHeight: 1.4,
                        transition: 'color 0.2s',
                      }}
                    >
                      {faq.q}
                    </span>
                    <span
                      style={{
                        flexShrink: 0, color: '#E50914',
                        transition: 'transform 0.3s ease',
                        transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <Plus size={18} />
                    </span>
                  </button>

                  <div className={`faq-answer${openIndex === i ? ' open' : ''}`} data-testid={`faq-answer-${i}`}>
                    <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.82, maxWidth: 620 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .faq-layout { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  );
};

export default FAQ;
