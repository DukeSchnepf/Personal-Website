import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, MapPin, Phone, Send, ArrowUpRight } from 'lucide-react';
import { profile } from '@/config/profile.config';
import { siteConfig } from '@/config/site.config';

gsap.registerPlugin(ScrollTrigger);

function Contact({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useGSAP(
    () => {
      gsap.from('.contact-anim', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || 'your site'}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ''}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const channels = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      accent: 'text-aurora-cyan',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^\d+]/g, '')}`,
      accent: 'text-aurora-violet',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
      href: undefined,
      accent: 'text-aurora-pink',
    },
  ];

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative section-padding text-white overflow-hidden"
    >
      <div className="aurora-blob bg-aurora-violet/15 top-0 -right-20 w-[480px] h-[480px]" aria-hidden />
      <div className="aurora-blob bg-aurora-cyan/15 bottom-0 -left-20 w-[480px] h-[480px]" aria-hidden />

      <div className="relative z-10 container-wide">
        <div className="contact-anim max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-aurora-cyan font-mono uppercase tracking-[0.3em] mb-4">
            <span className="h-px w-8 bg-aurora-cyan/60" />
            Contact
          </div>
          <h2 className="font-display text-display-2 font-bold">
            Let’s build something <span className="text-aurora-static">worth showing up to.</span>
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg leading-relaxed">
            Whether it’s a new venture, a partnership, an event, or just a conversation — I’d love to hear what you’re working on.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Channels */}
          <div className="lg:col-span-2 space-y-4">
            {channels.map(({ icon: Icon, label, value, href, accent }) => {
              const Tag = (href ? 'a' : 'div') as 'a' | 'div';
              return (
                <Tag
                  key={label}
                  // @ts-ignore polymorphic href
                  href={href}
                  className={`contact-anim glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-4 ${
                    href ? 'cursor-pointer' : ''
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] ${accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-[0.2em] text-text-muted font-mono">
                      {label}
                    </div>
                    <div className="mt-0.5 text-base text-white truncate">{value}</div>
                  </div>
                  {href && (
                    <ArrowUpRight className={`h-4 w-4 ${accent} opacity-60`} />
                  )}
                </Tag>
              );
            })}

            <div className="contact-anim glass-card rounded-2xl p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted font-mono mb-3">
                Around the web
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white hover:text-aurora-cyan hover:border-aurora-cyan/40 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white hover:text-aurora-violet hover:border-aurora-violet/40 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.social.email}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white hover:text-aurora-pink hover:border-aurora-pink/40 transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-anim lg:col-span-3 glass-card rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-[0.2em] text-text-muted font-mono mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-space-deep border border-white/10 focus:border-aurora-cyan focus:ring-2 focus:ring-aurora-cyan/30 outline-none transition-all text-white placeholder-text-muted"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-[0.2em] text-text-muted font-mono mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-space-deep border border-white/10 focus:border-aurora-cyan focus:ring-2 focus:ring-aurora-cyan/30 outline-none transition-all text-white placeholder-text-muted"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs uppercase tracking-[0.2em] text-text-muted font-mono mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-space-deep border border-white/10 focus:border-aurora-cyan focus:ring-2 focus:ring-aurora-cyan/30 outline-none transition-all resize-none text-white placeholder-text-muted"
                placeholder="Tell me what you’re working on…"
              />
            </div>

            <button
              type="submit"
              className="group relative w-full inline-flex items-center justify-center gap-2 rounded-xl bg-aurora px-6 py-4 font-medium text-space-void shadow-glow-violet transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Send className="h-4 w-4" />
              <span>Send message</span>
            </button>

            <p className="text-xs text-text-muted text-center">
              This will open your email client. Or just reach out directly to{' '}
              <a
                href={`mailto:${profile.email}`}
                className="text-aurora-cyan hover:underline"
              >
                {profile.email}
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
