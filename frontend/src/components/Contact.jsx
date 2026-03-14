import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

const services = [
  'In-Country Representation',
  'Predictive Student Analytics',
  'Paid Media & Performance',
  'Social Media Marketing',
  'UI/UX & Conversion Design',
  'CRM & Marketing Automation',
  'Full Partnership',
];

const Contact = () => {
  const [form, setForm]   = useState({ name: '', email: '', institution: '', service: '', goals: '' });
  const [sent, setSent]   = useState(false);
  const sectionRef        = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    border: '1px solid #E5E7EB',
    background: '#F7F7F7',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    color: '#1A1A1A',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  };

  return (
    <section id="contact" data-testid="contact-section" style={{ background: '#F7F7F7', padding: '96px 0' }} ref={sectionRef}>
      <div className="section-wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="contact-grid">

          {/* ── Left: info ── */}
          <div>
            <div className="section-label reveal">Book a Call</div>
            <h2
              className="font-heading reveal reveal-d1"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 0.95, color: '#0A0A0A', marginBottom: 18 }}
            >
              Let's Talk About Your Next Enrolment Season.
            </h2>
            <p className="reveal reveal-d2" style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, maxWidth: 430, marginBottom: 48 }}>
              You don't need another agency pitch. You need a real conversation about where your students are, what data is saying about their intent, and how to put your institution in front of them first — with AI-backed precision. That's exactly what this call is for.
            </p>

            {/* Contact info rows */}
            {[
              { icon: Mail,    label: 'Email',          val: 'hello@tixoglobal.com', href: 'mailto:hello@tixoglobal.com' },
              { icon: MapPin,  label: 'Where We Work',  val: 'South Asia · Middle East · Africa · Southeast Asia', href: null },
              { icon: Clock,   label: 'Response Time',  val: 'We reply within 24 hours, guaranteed', href: null },
            ].map(({ icon: Icon, label, val, href }, i) => (
              <div
                key={i}
                className={`reveal reveal-d${i + 2}`}
                data-testid={`contact-info-${i}`}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}
              >
                <div style={{ width: 42, height: 42, border: '1.5px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: '#fff' }}>
                  <Icon size={16} color="#E50914" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 700, marginBottom: 3 }}>{label}</div>
                  {href
                    ? <a href={href} style={{ fontSize: '0.95rem', color: '#0A0A0A', fontWeight: 500, textDecoration: 'none' }}
                        onMouseEnter={(e) => (e.target.style.color = '#E50914')}
                        onMouseLeave={(e) => (e.target.style.color = '#0A0A0A')}
                        data-testid="contact-email-link"
                      >{val}</a>
                    : <div style={{ fontSize: '0.95rem', color: '#0A0A0A', fontWeight: 500 }}>{val}</div>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: form ── */}
          <div
            className="reveal reveal-d2"
            style={{ background: '#fff', border: '1px solid #E5E7EB', padding: '44px', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
            data-testid="contact-form-card"
          >
            <div style={{ fontFamily: 'Inter', fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0A0A0A', marginBottom: 28 }}>
              Book a Free Strategy Call
            </div>

            {sent ? (
              <div
                data-testid="form-success-message"
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: '0.95rem', fontWeight: 500 }}
              >
                ✓ Message Sent — we'll be in touch within 24 hours
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-testid="contact-form">
                {/* Full Name */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: '0.67rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 700, marginBottom: 7 }}>
                    Full Name
                  </label>
                  <input
                    type="text" name="name" required placeholder="Your Name"
                    value={form.name} onChange={handleChange}
                    data-testid="form-name-input"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#E50914'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F7F7F7'; }}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: '0.67rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 700, marginBottom: 7 }}>
                    Email Address
                  </label>
                  <input
                    type="email" name="email" required placeholder="you@institution.edu"
                    value={form.email} onChange={handleChange}
                    data-testid="form-email-input"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#E50914'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F7F7F7'; }}
                  />
                </div>

                {/* Institution */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: '0.67rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 700, marginBottom: 7 }}>
                    Institution / Organisation
                  </label>
                  <input
                    type="text" name="institution" placeholder="University Name"
                    value={form.institution} onChange={handleChange}
                    data-testid="form-institution-input"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#E50914'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F7F7F7'; }}
                  />
                </div>

                {/* Service */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: '0.67rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 700, marginBottom: 7 }}>
                    Service of Interest
                  </label>
                  <select
                    name="service"
                    value={form.service} onChange={handleChange}
                    data-testid="form-service-select"
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={(e) => { e.target.style.borderColor = '#E50914'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F7F7F7'; }}
                  >
                    <option value="">Select a service…</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Goals */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontSize: '0.67rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 700, marginBottom: 7 }}>
                    Tell us about your enrolment goals
                  </label>
                  <textarea
                    name="goals" rows={4}
                    placeholder="Which markets are you targeting? What are your international enrolment targets?"
                    value={form.goals} onChange={handleChange}
                    data-testid="form-goals-textarea"
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
                    onFocus={(e) => { e.target.style.borderColor = '#E50914'; e.target.style.background = '#fff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F7F7F7'; }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} data-testid="form-submit-btn">
                  Book a Free Strategy Call <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  );
};

export default Contact;
