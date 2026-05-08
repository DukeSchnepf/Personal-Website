import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { projects, type Project } from '@/config/projects.config';

gsap.registerPlugin(ScrollTrigger);

const ACCENT_MAP = {
  cyan: {
    text: 'text-aurora-cyan',
    border: 'hover:border-aurora-cyan/40',
    bgSoft: 'bg-aurora-cyan/10',
    bgGlow: 'rgba(34, 211, 238, 0.18)',
    chip: 'bg-aurora-cyan/10 text-aurora-cyan border-aurora-cyan/20',
  },
  violet: {
    text: 'text-aurora-violet',
    border: 'hover:border-aurora-violet/40',
    bgSoft: 'bg-aurora-violet/10',
    bgGlow: 'rgba(167, 139, 250, 0.2)',
    chip: 'bg-aurora-violet/10 text-aurora-violet border-aurora-violet/25',
  },
  pink: {
    text: 'text-aurora-pink',
    border: 'hover:border-aurora-pink/40',
    bgSoft: 'bg-aurora-pink/10',
    bgGlow: 'rgba(244, 114, 182, 0.2)',
    chip: 'bg-aurora-pink/10 text-aurora-pink border-aurora-pink/25',
  },
  gold: {
    text: 'text-aurora-gold',
    border: 'hover:border-aurora-gold/40',
    bgSoft: 'bg-aurora-gold/10',
    bgGlow: 'rgba(251, 191, 36, 0.2)',
    chip: 'bg-aurora-gold/10 text-aurora-gold border-aurora-gold/25',
  },
} as const;

function ProjectCard({ project }: { project: Project }) {
  const accent = ACCENT_MAP[project.accent];

  const statusLabel =
    project.status === 'active'
      ? 'Currently Active'
      : project.status === 'launching'
      ? 'Launching Soon'
      : 'Past Venture';

  return (
    <article
      className={`project-card group relative glass-card rounded-2xl p-6 sm:p-7 transition-all duration-500 border-white/[0.06] ${accent.border} hover:-translate-y-1`}
      style={{ boxShadow: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -16px rgba(0,0,0,0.5)' }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(800px circle at var(--mx, 50%) var(--my, 0%), ${accent.bgGlow}, transparent 40%)`,
        }}
      />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider ${accent.chip}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${accent.bgSoft}`} style={{ background: 'currentColor' }} />
              {statusLabel}
            </span>
            <span className="text-xs text-text-muted font-mono">{project.year}</span>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-all duration-300 group-hover:border-white/30 group-hover:rotate-[-12deg] ${accent.text}`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
          {project.title}
        </h3>
        <p className={`mt-1.5 text-sm font-medium ${accent.text}`}>
          {project.tagline}
        </p>

        <p className="mt-4 text-sm md:text-[15px] text-text-secondary leading-relaxed">
          {project.description}
        </p>

        <div className="mt-5">
          <div className="text-[11px] uppercase tracking-[0.25em] text-text-muted mb-2 font-mono">
            Highlights
          </div>
          <ul className="space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-text-secondary">
                <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${accent.text}`} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 pt-5 border-t border-white/[0.06] flex flex-wrap gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted font-mono mr-2 self-center">
            {project.role}
          </span>
          {project.technologies.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Projects({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.projects-header > *', {
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

      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 32,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.05,
          ease: 'power3.out',
        });

        // Cursor-tracking glow position
        const handleMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mx', `${x}%`);
          card.style.setProperty('--my', `${y}%`);
        };
        card.addEventListener('mousemove', handleMove);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative section-padding text-white overflow-hidden"
    >
      <div className="aurora-blob bg-aurora-pink/10 top-1/4 -left-32 w-[420px] h-[420px]" aria-hidden />
      <div className="aurora-blob bg-aurora-violet/15 bottom-20 -right-20 w-[420px] h-[420px]" aria-hidden />

      <div className="relative z-10 container-wide">
        <div ref={headerRef} className="projects-header max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-aurora-pink font-mono uppercase tracking-[0.3em] mb-4">
            <span className="h-px w-8 bg-aurora-pink/60" />
            Ventures
          </div>
          <h2 className="font-display text-display-2 font-bold">
            Things I’ve built &amp; <span className="text-aurora-static">am still building.</span>
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg leading-relaxed">
            A snapshot of the ventures, communities, and services I’ve founded and operated. Real outcomes, real people, real-world execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
