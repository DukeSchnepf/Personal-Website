import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Code2,
  Megaphone,
  Wrench,
  Calendar,
  type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level?: string;
}

interface TechArsenalProps {
  id?: string;
}

type CategoryKey = 'leadership' | 'product' | 'marketing' | 'tech' | 'operations';

interface CategoryDef {
  key: CategoryKey;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
  skills: Skill[];
}

const CATEGORIES: CategoryDef[] = [
  {
    key: 'leadership',
    label: 'Leadership & Community',
    description: 'Building teams, communities, and momentum.',
    icon: Users,
    accent: 'text-aurora-cyan',
    glow: 'rgba(34, 211, 238, 0.6)',
    skills: [
      { name: 'Community Building' },
      { name: 'Team Leadership' },
      { name: 'Mentorship' },
      { name: 'Public Speaking' },
      { name: 'Networking' },
      { name: 'Volunteer Coordination' },
    ],
  },
  {
    key: 'product',
    label: 'Product & Strategy',
    description: 'Turning ideas into shipped, scaled products.',
    icon: Code2,
    accent: 'text-aurora-violet',
    glow: 'rgba(167, 139, 250, 0.6)',
    skills: [
      { name: 'Founding & 0→1' },
      { name: 'Product Strategy' },
      { name: 'Go-to-Market' },
      { name: 'Partnerships' },
      { name: 'Pricing & Packaging' },
      { name: 'Roadmapping' },
    ],
  },
  {
    key: 'marketing',
    label: 'Marketing & Brand',
    description: 'Growing audiences and building brand gravity.',
    icon: Megaphone,
    accent: 'text-aurora-pink',
    glow: 'rgba(244, 114, 182, 0.6)',
    skills: [
      { name: 'Social Media' },
      { name: 'Sponsorship' },
      { name: 'Brand Identity' },
      { name: 'Content Strategy' },
      { name: 'Event Marketing' },
      { name: 'Storytelling' },
    ],
  },
  {
    key: 'tech',
    label: 'Tech & Engineering',
    description: 'Hands-on with the stack from code to cloud.',
    icon: Wrench,
    accent: 'text-aurora-mint',
    glow: 'rgba(94, 234, 212, 0.6)',
    skills: [
      { name: 'TypeScript / React' },
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'Tailwind CSS' },
      { name: 'IT Support' },
      { name: 'Hardware Repair' },
    ],
  },
  {
    key: 'operations',
    label: 'Operations & Events',
    description: 'On-site execution, planning, and problem solving.',
    icon: Calendar,
    accent: 'text-aurora-gold',
    glow: 'rgba(251, 191, 36, 0.6)',
    skills: [
      { name: 'Event Planning' },
      { name: 'On-site Operations' },
      { name: 'Logistics' },
      { name: 'Crisis Resolution' },
      { name: 'Vendor Management' },
      { name: 'Customer Service' },
    ],
  },
];

export default function TechArsenal({ id }: TechArsenalProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | CategoryKey>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Header / filter reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header > *', {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });

      if (filtersRef.current) {
        gsap.from(filtersRef.current.children, {
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.skill-category-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [activeFilter]);

  const visible =
    activeFilter === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.key === activeFilter);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative section-padding text-white overflow-hidden"
    >
      <div className="aurora-blob bg-aurora-cyan/10 top-20 right-10 w-[420px] h-[420px]" aria-hidden />
      <div className="aurora-blob bg-aurora-violet/10 bottom-10 left-10 w-[420px] h-[420px]" aria-hidden />

      <div className="relative z-10 container-wide">
        {/* Header */}
        <div ref={headerRef} className="skills-header max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-aurora-mint font-mono uppercase tracking-[0.3em] mb-4">
            <span className="h-px w-8 bg-aurora-mint/60" />
            Skills
          </div>
          <h2 className="font-display text-display-2 font-bold">
            What I bring to <span className="text-aurora-static">the table.</span>
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg leading-relaxed">
            A blend of leadership, marketing instincts, and hands-on technical work — refined across years of running ventures and shipping events that people actually show up for.
          </p>
        </div>

        {/* Filter pills */}
        <div ref={filtersRef} className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
              activeFilter === 'all'
                ? 'bg-aurora text-space-void border-transparent shadow-glow-violet'
                : 'bg-white/[0.03] text-text-secondary border-white/10 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                activeFilter === cat.key
                  ? 'bg-aurora text-space-void border-transparent shadow-glow-violet'
                  : 'bg-white/[0.03] text-text-secondary border-white/10 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Categories grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
        >
          {visible.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.key}
                className="skill-category-card group glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden"
              >
                {/* hover glow */}
                <div
                  className="pointer-events-none absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${cat.glow.replace('0.6', '0.08')} 0%, transparent 60%)`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] ${cat.accent}`}
                      style={{ boxShadow: `0 0 24px ${cat.glow.replace('0.6', '0.18')}` }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {cat.label}
                      </h3>
                      <p className="text-sm text-text-muted mt-0.5 leading-snug">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="text-xs sm:text-[13px] font-medium px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-text-secondary hover:text-white hover:border-white/20 transition-colors"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
