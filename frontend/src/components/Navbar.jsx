import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#why' },
  { label: 'Work',     href: '#work' },
  { label: 'Process',  href: '#process' },
  { label: 'FAQ',      href: '#faq' },
];

const Logo = ({ height = 40 }) => (
  <img
    src="/tixo-logo.png"
    alt="Tixo Global"
    style={{ height, width: 'auto', objectFit: 'contain', display: 'block', maxWidth: 'none' }}
    data-testid="tixo-logo-img"
  />
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHeight, setLogoHeight] = useState(160);
  const [marginTop, setMarginTop] = useState(30);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateSizes = () => {
      const isMobile = window.innerWidth <= 768;
      setLogoHeight(isMobile ? 80 : 160);
      setMarginTop(isMobile ? 15 : 30);
    };
    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  return (
    <>
      <header className={`nav-root${scrolled ? ' scrolled' : ''}`} role="banner" data-testid="navbar">
        <div className="nav-inner">
          {/* Logo */}
          <a href="#" data-testid="nav-logo" aria-label="Tixo Global home" style={{ display: 'flex', alignItems: 'center', marginTop }}>
            <Logo height={logoHeight} />
          </a>

          {/* Desktop nav */}
          <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-9">
            <ul className="flex gap-9 list-none m-0 p-0" role="list">
              {navLinks.map((link) => (
                <li key={link.label} role="listitem">
                  <a
                    href={link.href}
                    data-testid={`nav-link-${link.label.toLowerCase()}`}
                    style={{ color: '#3d3d3d', textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.target.style.color = '#E50914')}
                    onMouseLeave={(e) => (e.target.style.color = '#3d3d3d')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contact" className="btn-primary hidden lg:inline-flex" data-testid="nav-cta-button">
            Book a Call
          </a>

          <button
            className="lg:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-testid="nav-hamburger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[998]" onClick={() => setMenuOpen(false)} data-testid="mobile-menu-overlay" />
      )}

      <div className={`mobile-menu-panel fixed top-0 right-0 bottom-0 w-72 bg-white z-[999] flex flex-col p-8 shadow-2xl${menuOpen ? ' open' : ''}`} data-testid="mobile-menu">
        <div className="flex justify-between items-center mb-10">
          <Logo height={64} />
          <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Close menu">
            <X size={22} color="#1A1A1A" />
          </button>
        </div>
        <nav>
          <ul className="list-none flex flex-col gap-6" role="list">
            {navLinks.map((link) => (
              <li key={link.label} role="listitem">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  style={{ color: '#1A1A1A', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-8" data-testid="mobile-nav-cta" style={{ fontSize: '0.9rem', padding: '10px 24px' }}>
          Book a Call
        </a>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .btn-primary {
            font-size: 12px !important;
          padding: 10px 24px !important;
          }
        }
      `}</style>    </>
  );
};

export default Navbar;
