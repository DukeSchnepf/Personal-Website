import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { smoothScrollTo } from '@/utils/helpers';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track scroll for nav background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Determine active section
      const sections = ['home', ...siteConfig.navigation.map((n) => n.href.replace('#', ''))];
      const offset = window.innerHeight * 0.4;
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    smoothScrollTo(sectionId);
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-space-void/70 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={handleHomeClick}
            className="group flex items-center gap-2.5 font-display text-base md:text-lg font-bold tracking-tight"
            aria-label="Home"
          >
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-aurora text-space-void font-mono text-sm transition-transform duration-300 group-hover:scale-105">
              DS
            </span>
            <span className="hidden sm:inline text-white group-hover:text-aurora-static transition-colors">
              Duke Schnepf
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {siteConfig.navigation.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 w-6 rounded-full bg-aurora" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="rounded-full bg-white text-space-void px-5 py-2 text-sm font-medium hover:bg-aurora-cyan transition-colors"
            >
              Let’s talk
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-space-void/80 backdrop-blur-2xl"
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`relative flex flex-col h-full pt-24 px-6 pb-12 transition-transform duration-500 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <ul className="flex flex-col gap-2">
            {siteConfig.navigation.map((item, index) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`group flex items-center justify-between w-full py-4 px-2 border-b border-white/[0.06] text-left transition-colors ${
                      isActive ? 'text-white' : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-text-muted">
                        0{index + 1}
                      </span>
                      <span className="font-display text-2xl font-semibold">
                        {item.name}
                      </span>
                    </span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-aurora-cyan" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-8">
            <a
              href={siteConfig.social.email}
              className="block w-full text-center rounded-full bg-aurora px-6 py-4 font-medium text-space-void"
            >
              Let’s talk
            </a>
            <p className="mt-4 text-center text-xs text-text-muted">
              {siteConfig.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
