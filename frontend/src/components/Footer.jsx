import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const footerServices = [
  'In-Country Representation',
  'Predictive Analytics',
  'Paid Media',
  'Social Media Marketing',
  'UI/UX Design',
  'CRM Automation',
];

const footerCompany = [
  { label: 'Why Tixo Global', href: '#why' },
  { label: 'Our Work',        href: '#work' },
  { label: 'Process',         href: '#process' },
  { label: 'FAQ',             href: '#faq' },
  { label: 'Contact',         href: '#contact' },
];

const socials = [
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/tixoglobal',  label: 'LinkedIn' },
  { icon: Twitter,   href: '#',                                             label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/tixoglobal',         label: 'Instagram' },
  { icon: Youtube,   href: '#',                                             label: 'YouTube' },
];

const Footer = () => (
  <footer
    style={{ background: '#0A0A0A', padding: '64px 0 32px' }}
    role="contentinfo"
    data-testid="footer"
  >
    <div className="section-wrap">
      {/* Top grid */}
      <div
        style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid #1E1E1E' }}
        className="footer-top"
      >
        {/* Brand */}
        <div>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'baseline', gap: 5, textDecoration: 'none', marginBottom: 14 }} data-testid="footer-logo">
            <span className="font-heading" style={{ fontSize: '2rem', color: '#E50914', letterSpacing: '2px', lineHeight: 1 }}>TIXO</span>
            <span style={{ fontFamily: 'Inter', fontSize: '0.72rem', letterSpacing: '5px', color: '#555', fontWeight: 700, textTransform: 'uppercase' }}>Global</span>
          </a>
          <p style={{ fontSize: '0.87rem', color: '#555', lineHeight: 1.75, maxWidth: 240 }}>
            Tixo Global is an AI-powered international student recruitment agency. We help universities attract, engage, and enrol international students through in-country representation, predictive analytics, and full-funnel digital marketing across South Asia, Middle East, Africa and Southeast Asia.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: 'Inter', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#fff', marginBottom: 18, fontWeight: 700 }}>
            Services
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }} role="list">
            {footerServices.map((s) => (
              <li key={s} role="listitem">
                <a
                  href="#services"
                  data-testid={`footer-service-${s.toLowerCase().replace(/\s/g, '-')}`}
                  style={{ fontSize: '0.87rem', color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = '#E50914')}
                  onMouseLeave={(e) => (e.target.style.color = '#555')}
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontFamily: 'Inter', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#fff', marginBottom: 18, fontWeight: 700 }}>
            Company
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }} role="list">
            {footerCompany.map((l) => (
              <li key={l.label} role="listitem">
                <a
                  href={l.href}
                  data-testid={`footer-company-${l.label.toLowerCase().replace(/\s/g, '-')}`}
                  style={{ fontSize: '0.87rem', color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = '#E50914')}
                  onMouseLeave={(e) => (e.target.style.color = '#555')}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h4 style={{ fontFamily: 'Inter', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#fff', marginBottom: 18, fontWeight: 700 }}>
            Get in Touch
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }} role="list">
            <li role="listitem">
              <a
                href="mailto:hello@tixoglobal.com"
                data-testid="footer-email"
                style={{ fontSize: '0.87rem', color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = '#E50914')}
                onMouseLeave={(e) => (e.target.style.color = '#555')}
              >
                hello@tixoglobal.com
              </a>
            </li>
            <li role="listitem">
              <a
                href="#contact"
                className="btn-primary"
                data-testid="footer-book-call"
                style={{ marginTop: 8, fontSize: '0.78rem', padding: '10px 22px' }}
              >
                Book a Call
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ fontSize: '0.78rem', color: '#3A3A3A' }}>
          © 2026 Tixo Global. All Rights Reserved. | AI-Powered International Student Recruitment &amp; Education Marketing Agency
        </p>

        {/* Socials */}
        <div style={{ display: 'flex', gap: 10 }} data-testid="footer-socials">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              data-testid={`footer-social-${label.toLowerCase()}`}
              style={{
                width: 36, height: 36,
                border: '1px solid #222',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', color: '#444',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E50914'; e.currentTarget.style.color = '#E50914'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#444'; }}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 1024px) { .footer-top { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
      @media (max-width: 640px)  { .footer-top { grid-template-columns: 1fr !important; } }
    `}</style>
  </footer>
);

export default Footer;
