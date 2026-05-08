import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
    onComplete: () => void;
}

export interface LoadingScreenRef {
    triggerExit: () => Promise<void>;
}

export const LoadingScreen = forwardRef<LoadingScreenRef, LoadingScreenProps>(
    ({ onComplete }, ref) => {
        const wrapperRef = useRef<HTMLDivElement>(null);
        const [progress, setProgress] = useState(0);
        const [isPageLoaded, setIsPageLoaded] = useState(false);
        const [canExit, setCanExit] = useState(false);

        // Expose exit animation to parent
        useImperativeHandle(ref, () => ({
            triggerExit: () =>
                new Promise<void>((resolve) => {
                    const el = wrapperRef.current;
                    if (!el) {
                        resolve();
                        return;
                    }
                    gsap.to(el, {
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        onComplete: resolve,
                    });
                }),
        }));

        // Track real page load
        useEffect(() => {
            if (document.readyState === 'complete') {
                setIsPageLoaded(true);
                return;
            }
            const onLoad = () => setIsPageLoaded(true);
            window.addEventListener('load', onLoad);
            return () => window.removeEventListener('load', onLoad);
        }, []);

        // Animate fake progress to a soft cap, finish only when page actually loaded
        useEffect(() => {
            let start: number | null = null;
            const cap = isPageLoaded ? 100 : 92;
            const duration = isPageLoaded ? 800 : 2200;
            const fromProgress = progress;

            let raf = 0;
            const tick = (t: number) => {
                if (start === null) start = t;
                const elapsed = t - start;
                const ratio = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - ratio, 3);
                const next = fromProgress + (cap - fromProgress) * eased;
                setProgress(next);
                if (ratio < 1) raf = requestAnimationFrame(tick);
                else if (isPageLoaded && next >= 99.5) setCanExit(true);
            };
            raf = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(raf);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isPageLoaded]);

        // Auto-complete when ready
        useEffect(() => {
            if (canExit) {
                const t = setTimeout(() => onComplete(), 250);
                return () => clearTimeout(t);
            }
        }, [canExit, onComplete]);

        const pct = Math.round(progress);

        return (
            <div
                ref={wrapperRef}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-space-void"
            >
                {/* Aurora glow */}
                <div className="aurora-blob bg-aurora-violet/25 top-1/4 left-1/2 -translate-x-1/2 w-[460px] h-[460px]" aria-hidden />
                <div className="aurora-blob bg-aurora-cyan/20 bottom-1/4 left-1/2 -translate-x-1/2 w-[420px] h-[420px]" aria-hidden />

                <div className="relative flex flex-col items-center">
                    {/* Logo mark with rotating aurora ring */}
                    <div className="relative">
                        <div className="absolute -inset-3 rounded-full bg-aurora opacity-40 blur-xl animate-pulse-glow" />

                        <svg
                            width="140"
                            height="140"
                            viewBox="0 0 140 140"
                            className="relative animate-spin-slow"
                        >
                            <defs>
                                <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="50%" stopColor="#a78bfa" />
                                    <stop offset="100%" stopColor="#f472b6" />
                                </linearGradient>
                            </defs>
                            <circle
                                cx="70"
                                cy="70"
                                r="62"
                                fill="none"
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="2"
                            />
                            <circle
                                cx="70"
                                cy="70"
                                r="62"
                                fill="none"
                                stroke="url(#ring)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="389"
                                strokeDashoffset={389 - (389 * pct) / 100}
                                style={{ transition: 'stroke-dashoffset 0.2s ease-out' }}
                                transform="rotate(-90 70 70)"
                            />
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-aurora text-space-void font-display font-bold text-xl shadow-glow-violet">
                                DS
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="mt-10 font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Duke Schnepf
                    </div>

                    {/* Tagline */}
                    <div className="mt-2 text-xs sm:text-sm text-text-muted font-mono uppercase tracking-[0.4em]">
                        {canExit ? 'Welcome' : 'Initializing'}
                    </div>

                    {/* Progress meter */}
                    <div className="mt-8 w-56 sm:w-64 flex items-center gap-3 text-xs font-mono text-text-secondary">
                        <div className="flex-1 h-px bg-white/10 relative overflow-hidden rounded">
                            <div
                                className="absolute inset-y-0 left-0 bg-aurora rounded"
                                style={{
                                    width: `${pct}%`,
                                    transition: 'width 0.2s ease-out',
                                }}
                            />
                        </div>
                        <span className="tabular-nums w-9 text-right text-text-muted">{pct}%</span>
                    </div>
                </div>
            </div>
        );
    }
);

LoadingScreen.displayName = 'LoadingScreen';
