import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

import { profile } from '@/config/profile.config';

gsap.registerPlugin(ScrollTrigger);

function About({ id }: { id?: string }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from('.about-image', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
        .from(
          '.about-eyebrow',
          { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.6'
        )
        .from(
          '.about-heading',
          { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        )
        .from(
          '.about-text',
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
          '-=0.5'
        )
        .from(
          '.about-pillar',
          { y: 16, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
          '-=0.5'
        )
        .from(
          '.about-stat',
          { y: 16, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.6)' },
          '-=0.4'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative section-padding text-white overflow-hidden"
    >
      {/* Aurora glow */}
      <div className="aurora-blob bg-aurora-violet/15 top-20 -left-32 w-[420px] h-[420px]" aria-hidden />
      <div className="aurora-blob bg-aurora-cyan/10 bottom-10 -right-20 w-[380px] h-[380px]" aria-hidden />

      <div className="relative z-10 container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Image / portrait card */}
          <div className="lg:col-span-5">
            <div className="about-image relative group max-w-md mx-auto lg:max-w-none lg:sticky lg:top-28">
              <div className="absolute -inset-2 bg-aurora rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-space-light aspect-[4/5]">
                <img
                  src={profile.headshot}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-void via-transparent to-transparent" />

                {/* Overlay tag */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-aurora-cyan font-mono">
                      Currently
                    </div>
                    <div className="text-base font-medium text-white mt-1">
                      Building NWMC, Thought Ops & more
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="about-eyebrow inline-flex items-center gap-2 text-xs sm:text-sm text-aurora-violet font-mono uppercase tracking-[0.3em]">
              <span className="h-px w-8 bg-aurora-violet/60" />
              About
            </div>

            <h2 className="about-heading font-display text-display-2 font-bold text-white">
              The story behind <span className="text-aurora-static">the work.</span>
            </h2>

            <div className="about-text relative pl-6 border-l-2 border-aurora-violet/60">
              <Quote className="absolute -left-3 -top-2 h-6 w-6 text-aurora-violet bg-space-void rounded-full p-1" />
              <p className="text-xl md:text-2xl font-display italic text-white leading-snug">
                {profile.philosophy}
              </p>
            </div>

            <p className="about-text text-base md:text-lg text-text-secondary leading-relaxed">
              {profile.overview}
            </p>

            {/* Pillars */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.pillars.map((pillar) => (
                <li
                  key={pillar}
                  className="about-pillar flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-text-secondary"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-aurora-cyan shadow-glow-cyan flex-shrink-0" />
                  {pillar}
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="about-stat glass-card glass-card-hover rounded-2xl p-4 sm:p-5 text-center"
                >
                  <div className="font-display text-2xl sm:text-3xl font-bold text-aurora-static">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-text-muted leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
