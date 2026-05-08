import { useRef, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { profile } from '@/config/profile.config';
import { siteConfig } from '@/config/site.config';

interface HeroProps {
  showContent?: boolean;
}

const Hero = ({ showContent = true }: HeroProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      if (showContent) {
        const tl = gsap.timeline({ delay: 0.15 });
        tl.fromTo(
          '.hero-eyebrow',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        )
          .fromTo(
            '.hero-title',
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo(
            '.hero-tagline',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            '-=0.5'
          )
          .fromTo(
            '.hero-cta',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
            '-=0.4'
          )
          .fromTo(
            '.hero-meta',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
            '-=0.3'
          );
      } else {
        gsap.to(contentRef.current, { opacity: 0, y: 16, duration: 0.3 });
      }
    }, contentRef);

    return () => ctx.revert();
  }, [showContent]);

  useEffect(() => {
    if (!scrollIndicatorRef.current || !showContent) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.6 }
      );
    }, scrollIndicatorRef);
    return () => ctx.revert();
  }, [showContent]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center"
    >
      {/* Aurora background blobs */}
      <div
        className="aurora-blob bg-aurora-violet/20 -top-40 -left-20 w-[480px] h-[480px]"
        aria-hidden
      />
      <div
        className="aurora-blob bg-aurora-cyan/15 top-1/3 -right-20 w-[420px] h-[420px]"
        aria-hidden
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" aria-hidden />

      <div className="relative z-10 w-full container-wide px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div ref={contentRef} className="max-w-4xl">
          {/* Eyebrow / status */}
          <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs sm:text-sm text-text-secondary backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-mint/70 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-mint" />
            </span>
            <span className="font-mono tracking-wide">
              Available for new ventures &amp; collabs
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title font-display font-bold text-display-1 text-white">
            <span className="block">Duke</span>
            <span className="block text-aurora">Schnepf.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-tagline mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed">
            {profile.tagline}{' '}
            <span className="text-text-primary">
              Founder, operator, and full-stack builder shipping ideas that bring people together.
            </span>
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="hero-cta group relative inline-flex items-center justify-center gap-2 rounded-full bg-aurora px-7 py-4 font-medium text-space-void shadow-glow-violet transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>See what I’m building</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="hero-cta group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-aurora-violet/50 hover:bg-white/[0.06]"
            >
              <Mail className="h-4 w-4 text-aurora-violet" />
              <span>Get in touch</span>
            </a>
          </div>

          {/* Meta row: location + socials */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="hero-meta flex items-center gap-2 text-text-secondary text-sm">
              <MapPin className="h-4 w-4 text-aurora-cyan" />
              <span>{profile.location}</span>
            </div>

            <div className="hero-meta flex items-center gap-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-secondary hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-secondary hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="text-text-secondary hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {showContent && (
        <div
          ref={scrollIndicatorRef}
          style={{ opacity: 0 }}
          className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
            <div className="h-10 w-6 rounded-full border-2 border-white/20 flex justify-center p-1">
              <div className="h-2 w-1 bg-white/60 rounded-full animate-scroll" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
