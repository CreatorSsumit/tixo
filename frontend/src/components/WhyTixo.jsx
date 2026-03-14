import { useEffect, useRef } from 'react';
import { useState } from 'react';

const pillars = [
  {
    num: '01',
    title: 'Education-Only Focus',
    desc: 'Unlike generalist agencies, every model we build, every campaign we run, and every market insight we provide is calibrated exclusively for higher education student recruitment.',
  },
  {
    num: '02',
    title: 'AI + Human Intelligence',
    desc: 'Our in-country teams generate qualitative insight that feeds our AI models — and our data surfaces the patterns that inform our people. The two work in concert, not in silos.',
  },
  {
    num: '03',
    title: 'Enrolment-Tied Accountability',
    desc: 'We don\'t stop at leads or applications. Our success metrics are tied to confirmed enrolments — because that\'s the only number that matters to your institution.',
  },
  {
    num: '04',
    title: 'End-to-End Ownership',
    desc: 'From market intelligence through representation, paid media, automation, and UX — we own every step so nothing falls through the cracks between your vendors.',
  },
];

const metrics = [
  {
    val: 'Global',
    label: 'Multi-Market Intelligence',
    desc: 'Active in-country networks across South Asia, Middle East, Africa & Southeast Asia — delivering ground-level insight no remote agency can replicate.',
  },
  {
    val: 'KPI',
    label: 'Enrolment-Tied Accountability',
    desc: 'We don\'t optimise for clicks or applications. Every metric we track is tied to confirmed enrolments — the only number that matters.',
  },
  {
    val: 'AI',
    label: 'Predictive AI at the Core',
    desc: 'Proprietary machine learning models that score, segment, and prioritise your student leads — so your team focuses on the ones most likely to convert.',
  },
  {
    val: '+∞',
    label: 'Compounding Results',
    desc: 'Every intake, our models learn more about your best students. Performance compounds — because a great recruitment engine gets smarter, not stale.',
  },
];

const gradients = [
  'linear-gradient(145deg, #ffffff 0%, #fff5f5 100%)',
  'linear-gradient(145deg, #ffffff 0%, #f0f4ff 100%)',
  'linear-gradient(145deg, #ffffff 0%, #f5fff8 100%)',
  'linear-gradient(145deg, #ffffff 0%, #fffbf0 100%)',
];

const WhyTixo = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="why" data-testid="why-section" style={{ background: '#fff', padding: '96px 0' }} ref={sectionRef}>
      <div className="section-wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="why-grid">

          {/* ── Left: pillars ── */}
          <div>
            <div className="section-label reveal">Why Tixo Global</div>
            <h2
              className="font-heading reveal reveal-d1"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', lineHeight: 0.95, color: '#0A0A0A', marginBottom: 14 }}
            >
              Why Universities Choose Tixo Global for Student Recruitment
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, marginBottom: 36 }}>
              We combine on-the-ground human intelligence with machine learning, behavioural data, and a full digital stack — to deliver enrolment outcomes that are measurable, accountable, and built to compound. No guesswork. Just results you can see from week one.
            </p>

            {/* Pillars — blocked cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pillars.map((p, i) => (
                <div
                  key={p.num}
                  className={`reveal reveal-d${i + 1}`}
                  data-testid={`pillar-${i}`}
                  style={{
                    background: '#fff',
                    border: '1px solid #E5E7EB',
                    borderLeft: '4px solid #E50914',
                    padding: '22px 24px',
                    display: 'flex',
                    gap: 18,
                    alignItems: 'flex-start',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.25s, border-left-color 0.25s, transform 0.25s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(229,9,20,0.1)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span className="font-heading" style={{ fontSize: '2rem', color: 'rgba(229,9,20,0.2)', lineHeight: 1, flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                    {p.num}
                  </span>
                  <div>
                    <strong style={{ display: 'block', fontFamily: 'Inter', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, color: '#0A0A0A', fontWeight: 700 }}>
                      {p.title}
                    </strong>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.68, margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: metrics panel ── */}
          <div
            className="reveal reveal-d2"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: '#D1D5DB', border: '1px solid #D1D5DB', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
            data-testid="metrics-panel"
          >
            {metrics.map((m, i) => (
              <div
                key={i}
                data-testid={`metric-${i}`}
                style={{
                  background: gradients[i],
                  padding: '36px 32px',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  borderTop: '3px solid transparent',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(229,9,20,0.1)';
                  e.currentTarget.style.borderTopColor = '#E50914';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderTopColor = 'transparent';
                }}
              >
                {/* Subtle bg pattern dot */}
                <div style={{ position: 'absolute', bottom: -20, right: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(229,9,20,0.04)', pointerEvents: 'none' }} />
                <div
                  className="font-heading"
                  style={{ fontSize: '3.2rem', color: '#E50914', lineHeight: 1, marginBottom: 10 }}
                >
                  {m.val}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0A0A0A', marginBottom: 8 }}>
                  {m.label}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#9CA3AF', lineHeight: 1.55 }}>{m.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  );
};

export default WhyTixo;
