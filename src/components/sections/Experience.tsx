import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Sparkles, Users, Wrench, type LucideIcon } from 'lucide-react';
import { experience } from '@/config/experience.config';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
  id?: string;
}

// Map company name to a meaningful icon
const COMPANY_ICONS: Record<string, LucideIcon> = {
  'Duke Pro Max': Sparkles,
  'Northwest Motor Club': Users,
  'Thought Ops': Briefcase,
  "Duke's Helping Hands": Wrench,
};

const Experience = ({ id }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Header reveal
  useGSAP(
    () => {
      gsap.from('.exp-header > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });

      // Animate the timeline progress line based on scroll
      if (trackRef.current && lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 0.8,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative section-padding text-white overflow-hidden"
    >
      <div className="aurora-blob bg-aurora-cyan/10 top-1/3 -left-32 w-[420px] h-[420px]" aria-hidden />
      <div className="aurora-blob bg-aurora-violet/10 bottom-20 -right-20 w-[420px] h-[420px]" aria-hidden />

      <div className="relative z-10 container-wide">
        {/* Header */}
        <div className="exp-header max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-aurora-cyan font-mono uppercase tracking-[0.3em] mb-4">
            <span className="h-px w-8 bg-aurora-cyan/60" />
            Experience
          </div>
          <h2 className="font-display text-display-2 font-bold">
            A track record of building <span className="text-aurora-static">things people care about.</span>
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg leading-relaxed">
            From bootstrapped service work to co-founding ventures and managing a 3,500+ person community, here’s the path so far.
          </p>
        </div>

        {/* Timeline */}
        <div ref={trackRef} className="relative max-w-4xl mx-auto">
          {/* Spine - background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2" />
          {/* Spine - active progress */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2 origin-top bg-gradient-to-b from-aurora-cyan via-aurora-violet to-aurora-pink"
          />

          <div className="space-y-10 md:space-y-14">
            {experience.map((item, index) => {
              const Icon = COMPANY_ICONS[item.company] ?? Briefcase;
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={`${item.company}-${item.role}`}
                  className="exp-card relative grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
                >
                  {/* Spine node */}
                  <div className="absolute left-4 md:left-1/2 top-6 z-10 -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-aurora-violet blur-md opacity-60" />
                      <div className="relative h-9 w-9 rounded-full border border-white/15 bg-space-deep flex items-center justify-center text-aurora-violet">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card column */}
                  <div
                    className={`md:col-span-1 ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'
                    } pl-16 md:pl-0`}
                  >
                    <div className="glass-card glass-card-hover rounded-2xl p-5 md:p-6">
                      <div
                        className={`flex flex-wrap gap-2 items-center text-xs font-mono text-text-muted mb-3 ${
                          isLeft ? 'md:justify-end' : ''
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-aurora-cyan/10 px-2.5 py-1 text-aurora-cyan border border-aurora-cyan/20">
                          {item.start} – {item.end}
                        </span>
                      </div>

                      <h3 className="font-display text-xl md:text-2xl font-semibold text-white">
                        {item.role}
                      </h3>
                      <div className="mt-1 text-aurora-violet font-medium">{item.company}</div>

                      <ul
                        className={`mt-4 space-y-2 text-sm md:text-[15px] text-text-secondary leading-relaxed ${
                          isLeft ? 'md:text-right' : ''
                        }`}
                      >
                        {item.bullets.map((b, i) => (
                          <li
                            key={i}
                            className={`flex gap-2.5 ${
                              isLeft ? 'md:flex-row-reverse md:text-right' : ''
                            }`}
                          >
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-aurora-cyan/70" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer for alternating */}
                  <div className="hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
