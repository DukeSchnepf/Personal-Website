import { useMemo } from 'react';

interface CSSStarFieldProps {
    experienceStarted?: boolean;
}

export function CSSStarField({ experienceStarted = false }: CSSStarFieldProps) {
    const generateBoxShadow = (n: number, palette: string[] = ['#FFF']) => {
        const randomX = () => Math.random() * 5000;
        const randomY = () => Math.random() * 2000;
        const pick = () => palette[(Math.random() * palette.length) | 0];

        let value = `${randomX()}px ${randomY()}px ${pick()}`;
        for (let i = 2; i <= n; i++) {
            value += `, ${randomX()}px ${randomY()}px ${pick()}`;
        }
        return value;
    };

    const shadowsSmall = useMemo(() => generateBoxShadow(700, ['#FFF', '#cffafe', '#e9d5ff']), []);
    const shadowsMedium = useMemo(() => generateBoxShadow(200, ['#FFF', '#a5f3fc']), []);
    const shadowsBig = useMemo(() => generateBoxShadow(80, ['#FFF', '#f0abfc']), []);
    const shadowsTwinkle = useMemo(() => generateBoxShadow(40, ['#FFF']), []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[radial-gradient(ellipse_at_top,_#0a0c14_0%,_#05060a_60%,_#020308_100%)]">
            {/* Star layers */}
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
                <div
                    className="absolute w-[1px] h-[1px] bg-transparent animate-animStar"
                    style={{
                        boxShadow: shadowsSmall,
                        animationDuration: '60s',
                    }}
                >
                    <div
                        className="absolute top-[2000px] w-[1px] h-[1px] bg-transparent"
                        style={{ boxShadow: shadowsSmall }}
                    />
                </div>

                <div
                    className="absolute w-[2px] h-[2px] bg-transparent animate-animStar"
                    style={{
                        boxShadow: shadowsMedium,
                        animationDuration: '110s',
                    }}
                >
                    <div
                        className="absolute top-[2000px] w-[2px] h-[2px] bg-transparent"
                        style={{ boxShadow: shadowsMedium }}
                    />
                </div>

                <div
                    className="absolute w-[3px] h-[3px] bg-transparent animate-animStar"
                    style={{
                        boxShadow: shadowsBig,
                        animationDuration: '170s',
                    }}
                >
                    <div
                        className="absolute top-[2000px] w-[3px] h-[3px] bg-transparent"
                        style={{ boxShadow: shadowsBig }}
                    />
                </div>

                <div
                    className="absolute w-[2px] h-[2px] bg-transparent animate-twinkle"
                    style={{
                        boxShadow: shadowsTwinkle,
                        animationDuration: '4s',
                    }}
                />
            </div>

            {/* Subtle aurora wash overlay */}
            <div
                className="absolute inset-0 opacity-50 mix-blend-screen"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 20% 0%, rgba(167,139,250,0.18), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(34,211,238,0.12), transparent 60%)',
                    zIndex: 2,
                }}
            />

            {/* Shooting stars */}
            {experienceStarted && (
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
                    {[...Array(3)].map((_, i) => {
                        const topOffset = 10 + Math.random() * 40;
                        const leftOffset = 10 + Math.random() * 70;
                        const duration = 4 + Math.random() * 3;
                        const delay = 2 + i * 5;
                        return (
                            <div
                                key={i}
                                className="absolute"
                                style={{ top: `${topOffset}%`, left: `${leftOffset}%` }}
                            >
                                <div
                                    className="w-1 h-1 bg-white rounded-full"
                                    style={{
                                        boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.8)',
                                        animation: `shooting-star ${duration}s ease-out infinite`,
                                        animationDelay: `${delay}s`,
                                        opacity: 0,
                                    }}
                                >
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-[180px] h-[2px]"
                                        style={{
                                            background:
                                                'linear-gradient(90deg, rgba(167, 139, 250, 0.8), transparent)',
                                            filter: 'blur(1px)',
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
