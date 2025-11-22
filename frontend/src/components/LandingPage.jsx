import React from 'react';


function LandingPage({ onStart }) {
    const [hoveredNav, setHoveredNav] = React.useState(null);
    const [hoveredFooter, setHoveredFooter] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState({});


    React.useEffect(() => {
        // Trigger animations on mount
        const timer = setTimeout(() => {
            setIsVisible({
                hero: true,
                stats: true,
                feature: true
            });
        }, 100);


        return () => clearTimeout(timer);
    }, []);


    // CSS keyframes as a style tag
    const styles = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }


        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }


        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }


        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }


        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }


        @keyframes drawLine {
            from {
                width: 0;
            }
            to {
                width: 150px;
            }
        }


        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }


        .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }


        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }


        .btn:active {
            transform: translateY(0);
        }
    `;


    return (
        <div style={{ width: '100%', overflowX: 'hidden' }}>
            <style>{styles}</style>


            {/* Navigation - Minimal & Sticky */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'clamp(1rem, 3vw, 2rem) clamp(1.5rem, 5vw, 4rem)',
                borderBottom: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                background: 'var(--bg-color)',
                zIndex: 100,
                gap: '2rem',
                flexWrap: 'wrap',
                animation: 'fadeIn 0.8s ease-out'
            }}>
                <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    letterSpacing: '0.2em',
                    fontWeight: '500',
                    animation: 'fadeInUp 0.6s ease-out'
                }}>
                    AGRIGUARD
                </div>
                <div style={{ display: 'flex', gap: '4rem' }}>
                    {['Specs', 'Technology', 'Team'].map((item, index) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onMouseEnter={() => setHoveredNav(item)}
                            onMouseLeave={() => setHoveredNav(null)}
                            style={{
                                color: 'var(--text-color)',
                                textDecoration: 'none',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                opacity: hoveredNav === item ? 1 : 0.7,
                                transition: 'opacity 0.3s ease, transform 0.3s ease',
                                transform: hoveredNav === item ? 'translateY(-2px)' : 'translateY(0)',
                                animation: `fadeInUp 0.6s ease-out ${0.1 + index * 0.1}s backwards`
                            }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
                <button
                    className="btn"
                    onClick={onStart}
                    style={{
                        padding: '0.8rem 2rem',
                        fontSize: '0.75rem',
                        animation: 'fadeInUp 0.6s ease-out 0.4s backwards'
                    }}
                >
                    Launch Platform
                </button>
            </nav>


            {/* Hero Section - Editorial Style */}
            <section style={{
                minHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(2rem, 5vw, 4rem)',
                borderBottom: '1px solid var(--border)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Grid */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.15,
                    pointerEvents: 'none',
                    zIndex: 0
                }}>
                    {/* Horizontal lines */}
                    {[10, 25, 40, 55, 70, 85].map((pos, i) => (
                        <div key={`h-${i}`} style={{
                            position: 'absolute',
                            top: `${pos}%`,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: '#333',
                            animation: isVisible.hero ? `fadeIn 1.5s ease-out ${1 + i * 0.15}s backwards` : 'none'
                        }} />
                    ))}
                    {/* Vertical lines */}
                    {[15, 30, 45, 60, 75, 90].map((pos, i) => (
                        <div key={`v-${i}`} style={{
                            position: 'absolute',
                            left: `${pos}%`,
                            top: 0,
                            bottom: 0,
                            width: '1px',
                            background: '#333',
                            animation: isVisible.hero ? `fadeIn 1.5s ease-out ${1 + i * 0.15}s backwards` : 'none'
                        }} />
                    ))}
                </div>


                <div style={{ maxWidth: '1200px', position: 'relative', zIndex: 2 }}>
                    <h1 style={{
                        fontFamily: 'var(--font-body)',
                        lineHeight: '0.95',
                        margin: '0 0 2rem 0',
                        animation: isVisible.hero ? 'fadeInUp 1s ease-out 0.2s backwards' : 'none'
                    }}>
                        <div style={{
                            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                            fontWeight: '900',
                            color: '#FFFFFF',
                            marginBottom: '0.3rem',
                            letterSpacing: '-0.03em'
                        }}>Precision</div>
                        <div style={{
                            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                            fontWeight: '900',
                            background: 'linear-gradient(135deg, #00d4aa 0%, #0088ff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: '0.3rem',
                            letterSpacing: '-0.04em'
                        }}>Agriculture</div>
                        <div style={{
                            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                            fontWeight: '900',
                            color: '#FFFFFF',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase'
                        }}>Intelligence</div>
                    </h1>


                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: '4rem',
                        flexWrap: 'wrap',
                        gap: '2rem'
                    }}>
                        <p style={{
                            maxWidth: '500px',
                            fontSize: '1.1rem',
                            lineHeight: '1.7',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-body)',
                            fontWeight: '600',
                            animation: isVisible.hero ? 'fadeInUp 1s ease-out 0.8s backwards' : 'none'
                        }}>
                            Deploying advanced neural networks for real-time crop pathology analysis.
                            Secure, offline-capable, and designed for the modern agricultural enterprise.
                        </p>


                        <div style={{
                            display: 'flex',
                            gap: '2rem',
                            alignItems: 'center',
                            animation: isVisible.hero ? 'fadeInUp 1s ease-out 1s backwards' : 'none'
                        }}>
                            <div style={{
                                width: '150px',
                                height: '1px',
                                background: 'var(--primary)',
                                animation: isVisible.hero ? 'drawLine 1.2s ease-out 1.2s backwards' : 'none'
                            }}></div>
                            <span style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.8rem',
                                letterSpacing: '0.1em',
                                animation: isVisible.hero ? 'pulse 2s ease-in-out 2s infinite' : 'none'
                            }}>SCROLL TO EXPLORE</span>
                        </div>
                    </div>
                </div>
            </section>


            {/* Statistics / Grid Section */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                borderBottom: '1px solid var(--border)'
            }}>
                {[
                    { label: 'Diagnostic Accuracy', value: '96.8%' },
                    { label: 'Pathogens Detectable', value: '38+' },
                    { label: 'Processing Time', value: '<100ms' }
                ].map((stat, i) => (
                    <div key={i} style={{
                        padding: '4rem',
                        borderRight: i !== 2 ? '1px solid var(--border)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        minHeight: '300px',
                        animation: isVisible.stats ? `fadeInUp 0.8s ease-out ${0.2 + i * 0.2}s backwards` : 'none',
                        transition: 'transform 0.3s ease, background 0.3s ease',
                        cursor: 'default'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <span style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: '#666',
                            marginBottom: '1rem'
                        }}>{stat.label}</span>
                        <span style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(3rem, 6vw, 6rem)',
                            fontWeight: '600',
                            lineHeight: '1',
                            letterSpacing: '-0.02em'
                        }}>{stat.value}</span>
                    </div>
                ))}
            </section>


            {/* Model Specification Section */}
            <section id="specs" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
                minHeight: '80vh',
                borderBottom: '1px solid var(--border)'
            }}>
                <div style={{
                    padding: 'clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 4rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    animation: isVisible.feature ? 'slideInLeft 1s ease-out' : 'none'
                }}>
                    <span style={{
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        marginBottom: '2rem',
                        letterSpacing: '0.1em',
                        animation: isVisible.feature ? 'fadeIn 1s ease-out 0.2s backwards' : 'none'
                    }}>● MODEL SPECIFICATIONS</span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                        marginBottom: '3rem',
                        lineHeight: '1.1',
                        fontWeight: '400',
                        animation: isVisible.feature ? 'fadeInUp 1s ease-out 0.4s backwards' : 'none'
                    }}>
                        Performance <br /> Metrics.
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                        marginBottom: '4rem',
                        animation: isVisible.feature ? 'fadeInUp 1s ease-out 0.6s backwards' : 'none'
                    }}>
                        <div>
                            <div style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>DEVICE</div>
                            <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-body)' }}>NVIDIA CUDA</div>
                        </div>
                        <div>
                            <div style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>DATASET</div>
                            <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-body)' }}>PlantVillage (38 Classes)</div>
                        </div>
                        <div>
                            <div style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>TRAINING ACCURACY</div>
                            <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-body)', color: 'var(--primary)' }}>98.30%</div>
                        </div>
                        <div>
                            <div style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>VALIDATION ACCURACY</div>
                            <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-body)' }}>92.96%</div>
                        </div>
                    </div>


                </div>
                <div style={{
                    background: '#111',
                    borderLeft: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: isVisible.feature ? 'slideInRight 1s ease-out' : 'none'
                }}>
                    <img
                        src="/training_graph.jpg"
                        alt="Training Accuracy Graph"
                        style={{
                            width: '85%',
                            height: 'auto',
                            filter: 'grayscale(100%) contrast(1.2)',
                            opacity: 0.9,
                            border: '1px solid #333',
                            animation: isVisible.feature ? 'scaleIn 1s ease-out 0.4s backwards' : 'none'
                        }}
                    />
                </div>
            </section>

            {/* Technology Section */}
            <section id="technology" style={{
                padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 5vw, 4rem)',
                borderBottom: '1px solid var(--border)',
                background: 'var(--surface)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={{
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        marginBottom: '2rem',
                        display: 'block',
                        letterSpacing: '0.1em'
                    }}>● TECH STACK</span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                        marginBottom: '4rem',
                        maxWidth: '800px'
                    }}>
                        Built on robust, scalable <br /> infrastructure.
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '4rem'
                    }}>
                        {[
                            { title: 'Architecture', desc: 'MobileNetV2 CNN', detail: 'Optimized for edge devices with low latency inference.' },
                            { title: 'Backend', desc: 'FastAPI', detail: 'High-performance asynchronous Python framework.' },
                            { title: 'Security', desc: 'SHA256 Hashing', detail: 'Cryptographic integrity verification for every upload.' },
                            { title: 'Frontend', desc: 'React + Vite', detail: 'Modern, component-based UI with minimal overhead.' }
                        ].map((tech, i) => (
                            <div key={i} style={{
                                borderTop: '1px solid var(--border)',
                                paddingTop: '2rem',
                                animation: isVisible.feature ? `fadeInUp 0.8s ease-out ${0.2 + i * 0.1}s backwards` : 'none'
                            }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{tech.title}</h3>
                                <div style={{ fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '0.5rem', fontWeight: '500' }}>{tech.desc}</div>
                                <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>{tech.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" style={{
                padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 5vw, 4rem)',
                borderBottom: '1px solid var(--border)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem', flexWrap: 'wrap', gap: '2rem' }}>
                        <div>
                            <span style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'block', letterSpacing: '0.1em' }}>● THE TEAM</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', margin: 0 }}>
                                Cyberpunks.
                            </h2>
                        </div>
                        <p style={{ maxWidth: '400px', color: '#888', lineHeight: '1.6' }}>
                            A collective of engineers dedicated to solving agricultural challenges through advanced machine learning.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem'
                    }}>
                        {['Aniket Thorat', 'Pawan Bhandari', 'Rahul Bramhankar', 'Soham Thakor'].map((member, i) => (
                            <div key={i} style={{
                                padding: '2rem',
                                border: '1px solid var(--border)',
                                background: 'rgba(255,255,255,0.02)',
                                transition: 'all 0.3s ease',
                                animation: isVisible.feature ? `fadeInUp 0.8s ease-out ${0.4 + i * 0.1}s backwards` : 'none'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{ width: '50px', height: '50px', background: '#222', borderRadius: '50%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                    {member.charAt(0)}
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '500' }}>{member}</h3>
                                <div style={{ fontSize: '0.8rem', color: '#666', letterSpacing: '0.05em' }}>ENGINEER</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <footer style={{
                padding: 'clamp(2rem, 5vw, 4rem)',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '2rem',
                animation: 'fadeIn 1s ease-out'
            }}>
                <div style={{
                    animation: 'fadeInUp 0.8s ease-out 0.2s backwards'
                }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>AGRIGUARD</div>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>© 2025 RESEARCH DIVISION</div>
                </div>
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    animation: 'fadeInUp 0.8s ease-out 0.4s backwards'
                }}>
                    {['PRIVACY', 'TERMS', 'CONTACT'].map(link => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            onMouseEnter={() => setHoveredFooter(link)}
                            onMouseLeave={() => setHoveredFooter(null)}
                            style={{
                                color: hoveredFooter === link ? 'var(--text-color)' : '#666',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                transition: 'color 0.3s ease, transform 0.3s ease',
                                display: 'inline-block',
                                transform: hoveredFooter === link ? 'translateY(-2px)' : 'translateY(0)'
                            }}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </footer>
        </div >
    );
}


export default LandingPage;
