import React from 'react';

function LandingPage({ onStart }) {
    const [hoveredNav, setHoveredNav] = React.useState(null);
    const [hoveredFooter, setHoveredFooter] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState({});
    const [isMobile, setIsMobile] = React.useState(false);
    const [specsVisible, setSpecsVisible] = React.useState(false);
    const [techVisible, setTechVisible] = React.useState(false);
    const [teamVisible, setTeamVisible] = React.useState(false);

    const specsRef = React.useRef(null);
    const techRef = React.useRef(null);
    const teamRef = React.useRef(null);

    const [text1, setText1] = React.useState('');
    const [text2, setText2] = React.useState('');
    const [text3, setText3] = React.useState('');
    const [showCursor, setShowCursor] = React.useState(1);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        const timer = setTimeout(() => {
            setIsVisible({ hero: true, stats: true, feature: true });
        }, 100);
        return () => {
            window.removeEventListener('resize', checkMobile);
            clearTimeout(timer);
        };
    }, []);

    React.useEffect(() => {
        const observerOptions = { threshold: 0.2 };

        const specsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) setSpecsVisible(true); });
        }, observerOptions);

        const techObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) setTechVisible(true); });
        }, observerOptions);

        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) setTeamVisible(true); });
        }, observerOptions);

        if (specsRef.current) specsObserver.observe(specsRef.current);
        if (techRef.current) techObserver.observe(techRef.current);
        if (teamRef.current) teamObserver.observe(teamRef.current);

        return () => {
            specsObserver.disconnect();
            techObserver.disconnect();
            teamObserver.disconnect();
        };
    }, []);

    React.useEffect(() => {
        const word1 = 'Precision';
        const word2 = 'Agriculture';
        const word3 = 'INTELLIGENCE';
        let i = 0, j = 0, k = 0;

        const type1 = setInterval(() => {
            if (i < word1.length) {
                setText1(word1.slice(0, i + 1));
                i++;
            } else {
                clearInterval(type1);
                setShowCursor(2);
                const type2 = setInterval(() => {
                    if (j < word2.length) {
                        setText2(word2.slice(0, j + 1));
                        j++;
                    } else {
                        clearInterval(type2);
                        setShowCursor(3);
                        const type3 = setInterval(() => {
                            if (k < word3.length) {
                                setText3(word3.slice(0, k + 1));
                                k++;
                            } else {
                                clearInterval(type3);
                                setShowCursor(0);
                            }
                        }, 80);
                    }
                }, 70);
            }
        }, 100);

        return () => clearInterval(type1);
    }, []);

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --primary: #00d4aa; --bg-dark: #0a2e1f; --bg-surface: #0d3a27; --text-light: #ffffff; --text-muted: #8fb5a3; --border: rgba(255,255,255,0.1); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes drawLine { from { width: 0; } to { width: 120px; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .btn { background: var(--primary); color: #0a2e1f; border: none; font-family: 'Space Grotesk', sans-serif; font-weight: 600; cursor: pointer; transition: all 0.3s ease; border-radius: 4px; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0, 212, 170, 0.3); }
        .cursor { display: inline-block; width: 4px; height: 1em; background: var(--primary); margin-left: 4px; animation: blink 0.8s infinite; vertical-align: middle; }
    `;

    const HeroImage = () => (
        <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: isMobile ? '240px' : '340px', height: 'auto' }}>
            <rect width="400" height="400" fill="#0d4a2f" />
            <g transform="translate(60, 40)">
                <rect x="0" y="0" width="70" height="70" rx="12" fill="#4a7c59" />
                <rect x="15" y="-8" width="8" height="12" fill="#4a7c59" /><rect x="32" y="-8" width="8" height="12" fill="#4a7c59" /><rect x="49" y="-8" width="8" height="12" fill="#4a7c59" />
                <rect x="15" y="66" width="8" height="12" fill="#4a7c59" /><rect x="32" y="66" width="8" height="12" fill="#4a7c59" /><rect x="49" y="66" width="8" height="12" fill="#4a7c59" />
                <rect x="-8" y="15" width="12" height="8" fill="#4a7c59" /><rect x="-8" y="32" width="12" height="8" fill="#4a7c59" /><rect x="-8" y="49" width="12" height="8" fill="#4a7c59" />
                <rect x="66" y="15" width="12" height="8" fill="#4a7c59" /><rect x="66" y="32" width="12" height="8" fill="#4a7c59" /><rect x="66" y="49" width="12" height="8" fill="#4a7c59" />
                <path d="M25 35 Q35 25 45 35 Q55 45 45 55 Q35 50 25 55 Q15 45 25 35" fill="none" stroke="#1a5c3a" strokeWidth="3" />
                <circle cx="30" cy="40" r="3" fill="#1a5c3a" /><circle cx="40" cy="40" r="3" fill="#1a5c3a" />
            </g>
            <g transform="translate(160, 80)">
                <rect x="0" y="0" width="180" height="260" rx="20" fill="#f5f0e6" /><rect x="70" y="12" width="40" height="6" rx="3" fill="#0d4a2f" /><rect x="12" y="30" width="156" height="200" rx="4" fill="#0d4a2f" />
                <path d="M30 55 L30 45 L45 45" fill="none" stroke="#f5f0e6" strokeWidth="3" strokeLinecap="square" /><path d="M150 45 L165 45 L165 55" fill="none" stroke="#f5f0e6" strokeWidth="3" strokeLinecap="square" />
                <path d="M30 205 L30 215 L45 215" fill="none" stroke="#f5f0e6" strokeWidth="3" strokeLinecap="square" /><path d="M150 215 L165 215 L165 205" fill="none" stroke="#f5f0e6" strokeWidth="3" strokeLinecap="square" />
            </g>
            <g>
                <path d="M40 380 Q80 320 120 280 Q160 240 200 200 Q240 160 280 140" fill="none" stroke="#8b7355" strokeWidth="8" strokeLinecap="round" />
                <path d="M80 320 Q60 290 40 280" fill="none" stroke="#8b7355" strokeWidth="5" strokeLinecap="round" /><path d="M100 290 Q75 270 55 275" fill="none" stroke="#8b7355" strokeWidth="4" strokeLinecap="round" />
                <g transform="translate(200, 150)"><ellipse rx="25" ry="40" fill="#7cb342" transform="rotate(-30)" /><path d="M-15 20 Q0 0 15 -20" fill="none" stroke="#558b2f" strokeWidth="2" /></g>
                <g transform="translate(250, 120)"><ellipse rx="22" ry="35" fill="#8bc34a" transform="rotate(-15)" /><path d="M-12 18 Q0 0 12 -18" fill="none" stroke="#558b2f" strokeWidth="2" /></g>
                <g transform="translate(290, 135)"><ellipse rx="20" ry="32" fill="#7cb342" transform="rotate(10)" /><path d="M-10 16 Q0 0 10 -16" fill="none" stroke="#558b2f" strokeWidth="2" /></g>
                <g transform="translate(260, 175)"><ellipse rx="18" ry="28" fill="#9ccc65" transform="rotate(25)" /></g>
                <g transform="translate(230, 200)"><ellipse rx="16" ry="26" fill="#8bc34a" transform="rotate(40)" /></g>
            </g>
        </svg>
    );

    return (
        <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-light)', fontFamily: "'Space Grotesk', sans-serif", overflowX: 'hidden' }}>
            <style>{styles}</style>

            <nav style={{ display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '1rem 1.5rem' : '1.5rem 4rem', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--bg-dark)', zIndex: 100, gap: isMobile ? '1rem' : '2rem' }}>
                <div style={{ fontSize: isMobile ? '0.85rem' : '1rem', letterSpacing: '0.2em', fontWeight: 500 }}>AGRIGUARD</div>
                <div style={{ display: 'flex', gap: isMobile ? '2rem' : '4rem', order: isMobile ? 3 : 0, width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                    {['Specs', 'Technology', 'Team'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} onMouseEnter={() => setHoveredNav(item)} onMouseLeave={() => setHoveredNav(null)}
                            style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: hoveredNav === item ? 1 : 0.7, transition: 'all 0.3s ease' }}>{item}</a>
                    ))}
                </div>
                <button className="btn" onClick={onStart} style={{ padding: isMobile ? '0.6rem 1.2rem' : '0.8rem 2rem', fontSize: '0.75rem' }}>Launch Platform</button>
            </nav>

            <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '2rem 1.5rem' : '4rem', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #0a2e1f 0%, #0d4a2f 50%, #0a2e1f 100%)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, pointerEvents: 'none' }}>
                    {[10, 25, 40, 55, 70, 85].map((pos, i) => (<div key={`h-${i}`} style={{ position: 'absolute', top: `${pos}%`, left: 0, right: 0, height: '1px', background: '#4a7c59' }} />))}
                    {[15, 30, 45, 60, 75, 90].map((pos, i) => (<div key={`v-${i}`} style={{ position: 'absolute', left: `${pos}%`, top: 0, bottom: 0, width: '1px', background: '#4a7c59' }} />))}
                </div>

                <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? '2rem' : '4rem' }}>
                        <div style={{ flex: isMobile ? 'none' : '1', textAlign: isMobile ? 'center' : 'left' }}>
                            <h1 style={{ lineHeight: 1.1, margin: 0 }}>
                                <div style={{ fontSize: isMobile ? '2.8rem' : '5.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: isMobile ? '0.3rem' : '0.5rem', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif", minHeight: isMobile ? '3.5rem' : '6.5rem' }}>
                                    {text1}{showCursor === 1 && <span className="cursor" style={{ height: isMobile ? '2.8rem' : '5.5rem' }}></span>}
                                </div>
                                <div style={{ fontSize: isMobile ? '3.2rem' : '6.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #00d4aa 0%, #00ff88 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: isMobile ? '0.3rem' : '0.5rem', letterSpacing: '-0.03em', fontFamily: "'Space Grotesk', sans-serif", minHeight: isMobile ? '4rem' : '7.5rem' }}>
                                    {text2}{showCursor === 2 && <span className="cursor" style={{ height: isMobile ? '3.2rem' : '6.5rem', background: '#00d4aa' }}></span>}
                                </div>
                                <div style={{ fontSize: isMobile ? '1.8rem' : '4rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.12em', fontFamily: "'Space Grotesk', sans-serif", minHeight: isMobile ? '2.3rem' : '4.5rem' }}>
                                    {text3}{showCursor === 3 && <span className="cursor" style={{ height: isMobile ? '1.8rem' : '4rem' }}></span>}
                                </div>
                            </h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', animation: isVisible.hero ? 'fadeInUp 1s ease-out 0.8s backwards' : 'none' }}><HeroImage /></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'center' : 'flex-end', marginTop: isMobile ? '2rem' : '4rem', gap: '2rem', textAlign: isMobile ? 'center' : 'left' }}>
                        <p style={{ maxWidth: '500px', fontSize: isMobile ? '0.95rem' : '1.1rem', lineHeight: '1.7', color: '#FFFFFF', fontWeight: 600, animation: isVisible.hero ? 'fadeInUp 1s ease-out 0.8s backwards' : 'none' }}>Deploying advanced neural networks for real-time crop pathology analysis. Secure, offline-capable, and designed for the modern agricultural enterprise.</p>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', animation: isVisible.hero ? 'fadeInUp 1s ease-out 1s backwards' : 'none' }}>
                            <div style={{ width: '120px', height: '1px', background: 'var(--primary)', animation: isVisible.hero ? 'drawLine 1.2s ease-out 1.2s backwards' : 'none' }} />
                            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-muted)', animation: isVisible.hero ? 'pulse 2s ease-in-out 2s infinite' : 'none' }}>SCROLL TO EXPLORE</span>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
                {[{ label: 'Diagnostic Accuracy', value: '96.8%' }, { label: 'Pathogens Detectable', value: '38+' }, { label: 'Processing Time', value: '<100ms' }].map((stat, i) => (
                    <div key={i} style={{ padding: isMobile ? '2.5rem 1.5rem' : '4rem', borderRight: !isMobile && i !== 2 ? '1px solid var(--border)' : 'none', borderBottom: isMobile && i !== 2 ? '1px solid var(--border)' : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: isMobile ? 'center' : 'flex-start', minHeight: isMobile ? 'auto' : '300px', animation: isVisible.stats ? `fadeInUp 0.8s ease-out ${0.2 + i * 0.2}s backwards` : 'none' }}>
                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1rem' }}>{stat.label}</span>
                        <span style={{ fontSize: isMobile ? '3rem' : '5rem', fontWeight: 600, lineHeight: 1, color: 'var(--primary)' }}>{stat.value}</span>
                    </div>
                ))}
            </section>

            <section id="specs" ref={specsRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', minHeight: isMobile ? 'auto' : '80vh', borderBottom: '1px solid var(--border)' }}>
                <div style={{ padding: isMobile ? '3rem 1.5rem' : '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '2rem', letterSpacing: '0.1em', opacity: specsVisible ? 1 : 0, transform: specsVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.1s' }}>● MODEL SPECIFICATIONS</span>
                    <h2 style={{ fontSize: isMobile ? '2.5rem' : '4rem', marginBottom: '3rem', lineHeight: '1.1', fontWeight: 400, opacity: specsVisible ? 1 : 0, transform: specsVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.2s' }}>Performance Metrics.</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div style={{ opacity: specsVisible ? 1 : 0, transform: specsVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.3s' }}><div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>DEVICE</div><div style={{ fontSize: '1.2rem' }}>NVIDIA CUDA</div></div>
                        <div style={{ opacity: specsVisible ? 1 : 0, transform: specsVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.4s' }}><div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>DATASET</div><div style={{ fontSize: '1.2rem' }}>PlantVillage (38 Classes)</div></div>
                        <div style={{ opacity: specsVisible ? 1 : 0, transform: specsVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.5s' }}><div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>TRAINING ACCURACY</div><div style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>98.30%</div></div>
                        <div style={{ opacity: specsVisible ? 1 : 0, transform: specsVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.6s' }}><div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>VALIDATION ACCURACY</div><div style={{ fontSize: '1.2rem' }}>92.96%</div></div>
                    </div>
                </div>
                <div style={{ background: '#071a12', borderLeft: isMobile ? 'none' : '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', padding: '1rem' }}>
                    <img src="/training.jpg" alt="Training Accuracy Graph" style={{ width: '100%', maxWidth: '900px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', opacity: specsVisible ? 1 : 0, transform: specsVisible ? 'scale(1)' : 'scale(0.95)', transition: 'all 1s ease-out 0.4s' }} />
                </div>
            </section>

            <section id="technology" ref={techRef} style={{ padding: isMobile ? '4rem 1.5rem' : '8rem 4rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'block', letterSpacing: '0.1em', opacity: techVisible ? 1 : 0, transform: techVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.1s' }}>● TECH STACK</span>
                    <h2 style={{ fontSize: isMobile ? '2rem' : '4rem', marginBottom: '4rem', fontWeight: 400, opacity: techVisible ? 1 : 0, transform: techVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.2s' }}>Built on robust, scalable infrastructure.</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? '2rem' : '4rem' }}>
                        {[{ title: 'Architecture', desc: 'MobileNetV2 CNN', detail: 'Optimized for edge devices.' }, { title: 'Backend', desc: 'FastAPI', detail: 'High-performance async Python.' }, { title: 'Security', desc: 'SHA256 Hashing', detail: 'Cryptographic verification.' }, { title: 'Frontend', desc: 'React + Vite', detail: 'Modern component-based UI.' }].map((tech, i) => (
                            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', opacity: techVisible ? 1 : 0, transform: techVisible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.8s ease-out ${0.3 + i * 0.1}s` }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 500 }}>{tech.title}</h3>
                                <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 500 }}>{tech.desc}</div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{tech.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="team" ref={teamRef} style={{ padding: isMobile ? '4rem 1.5rem' : '8rem 4rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: isMobile ? '3rem' : '6rem', gap: '2rem' }}>
                        <div>
                            <span style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'block', letterSpacing: '0.1em', opacity: teamVisible ? 1 : 0, transform: teamVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.1s' }}>● THE TEAM</span>
                            <h2 style={{ fontSize: isMobile ? '2.5rem' : '4rem', margin: 0, fontWeight: 400, opacity: teamVisible ? 1 : 0, transform: teamVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.2s' }}>Cyberpunks.</h2>
                        </div>
                        <p style={{ maxWidth: '400px', color: 'var(--text-muted)', lineHeight: '1.6', opacity: teamVisible ? 1 : 0, transform: teamVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out 0.3s' }}>A collective of engineers dedicated to solving agricultural challenges through ML.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {['Aniket Thorat', 'Pawan Bhandari', 'Rahul Bramhankar', 'Soham Thakor'].map((member, i) => (
                            <div key={i} style={{ padding: '2rem', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', transition: 'all 0.3s ease', opacity: teamVisible ? 1 : 0, transform: teamVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)', transitionDelay: `${0.4 + i * 0.1}s` }}>
                                <div style={{ width: '50px', height: '50px', background: '#1a3d2e', borderRadius: '50%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>{member.charAt(0)}</div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 500 }}>{member}</h3>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>ENGINEER</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer style={{ padding: isMobile ? '2rem 1.5rem' : '4rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'center' : 'flex-end', gap: '2rem', textAlign: isMobile ? 'center' : 'left' }}>
                <div>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 500 }}>AGRIGUARD</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2025 RESEARCH DIVISION</div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    {['PRIVACY', 'TERMS', 'CONTACT'].map(link => (
                        <a key={link} href="#" onMouseEnter={() => setHoveredFooter(link)} onMouseLeave={() => setHoveredFooter(null)}
                            style={{ color: hoveredFooter === link ? 'var(--text-light)' : 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>{link}</a>
                    ))}
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
