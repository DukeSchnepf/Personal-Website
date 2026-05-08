import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { profile } from '@/config/profile.config';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-space-void/60 backdrop-blur-sm">
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2.5"
              aria-label="Back to top"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-aurora text-space-void font-mono text-sm">
                DS
              </span>
              <span className="font-display text-lg font-bold text-white group-hover:text-aurora-static transition-colors">
                Duke Schnepf
              </span>
            </button>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-xs">
              {profile.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-text-muted font-mono mb-4">
              Sections
            </div>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-text-secondary hover:text-white transition-colors link-underline"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / socials */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-text-muted font-mono mb-4">
              Connect
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="block text-sm text-white hover:text-aurora-cyan transition-colors link-underline mb-2"
            >
              {profile.email}
            </a>
            <div className="text-sm text-text-secondary mb-5">{profile.location}</div>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white hover:text-aurora-violet hover:border-aurora-violet/40 transition-all"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white hover:text-aurora-cyan hover:border-aurora-cyan/40 transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.email}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white hover:text-aurora-pink hover:border-aurora-pink/40 transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Built with React, TypeScript &amp; Tailwind.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-text-secondary hover:text-white transition-colors"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
