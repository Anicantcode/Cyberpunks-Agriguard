import { useState, useRef, useEffect } from 'react';
import IntegrityVerifier from './IntegrityVerifier';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ResultCard({ result, onReset }) {
    const isHealthy = result.prediction.toLowerCase().includes('healthy');
    const [showVerifier, setShowVerifier] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleExportPDF = async () => {
        if (!cardRef.current) return;

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: '#121212',
                useCORS: true,
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const imgPixelWidth = canvas.width;
            const imgPixelHeight = canvas.height;

            const widthRatio = pageWidth / imgPixelWidth;
            const heightRatio = pageHeight / imgPixelHeight;
            const ratio = Math.min(widthRatio, heightRatio);

            const imgWidth = imgPixelWidth * ratio;
            const imgHeight = imgPixelHeight * ratio;

            const marginX = (pageWidth - imgWidth) / 2;
            const marginY = (pageHeight - imgHeight) / 2;

            pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
            pdf.save(`agriguard-report-${result.filename || 'analysis'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    const handleCopy = () => {
        if (!result.integrity_hash) return;
        navigator.clipboard.writeText(result.integrity_hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div
                ref={cardRef}
                className="minimal-card"
                style={{
                    maxWidth: isMobile ? '100%' : '1200px',
                    margin: isMobile ? '1rem 0' : '0 auto',
                    padding: isMobile ? '0 1rem' : '0',
                    // no overflow: 'hidden' here so html2canvas can see full height
                    textAlign: 'left',
                    borderRadius: '12px',
                }}
            >
                {/* HEADER */}
                <div
                    style={{
                        padding: isMobile ? '1.25rem 1rem' : '2rem',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: isMobile ? '0.75rem' : '0',
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <span
                            style={{
                                fontSize: '0.7rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                color: '#666',
                            }}
                        >
                            Analysis Result
                        </span>
                        <h2
                            style={{
                                margin: '0.35rem 0 0 0',
                                fontSize: isMobile ? '1.4rem' : '2.3rem',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: '400',
                                wordBreak: 'break-word',
                            }}
                        >
                            {result.prediction.replace(/_/g, ' ')}
                        </h2>
                    </div>

                    <div
                        style={{
                            textAlign: isMobile ? 'left' : 'right',
                            marginTop: isMobile ? '0.25rem' : 0,
                        }}
                    >
                        <div
                            style={{
                                fontSize: isMobile ? '1.8rem' : '3rem',
                                fontWeight: '300',
                                fontFamily: 'var(--font-heading)',
                            }}
                        >
                            {(result.confidence * 100).toFixed(1)}%
                        </div>
                        <div
                            style={{
                                fontSize: '0.7rem',
                                color: '#666',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            Confidence Score
                        </div>

                        {result.severity !== null && result.severity !== undefined && (
                            <div style={{ marginTop: '0.75rem' }}>
                                <div
                                    style={{
                                        fontSize: isMobile ? '1rem' : '1.4rem',
                                        fontWeight: '300',
                                        fontFamily: 'var(--font-heading)',
                                        color:
                                            result.severity > 0.5
                                                ? 'var(--danger)'
                                                : 'var(--warning)',
                                    }}
                                >
                                    {(result.severity * 100).toFixed(1)}%
                                </div>
                                <div
                                    style={{
                                        fontSize: '0.7rem',
                                        color: '#666',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                    }}
                                >
                                    Severity Score
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* MAIN GRID */}
                <div
                    style={{
                        padding: isMobile ? '1.25rem 1rem 1.5rem 1rem' : '3rem',
                        display: 'grid',
                        gap: isMobile ? '1.75rem' : '3rem',
                        gridTemplateColumns: isMobile
                            ? '1fr'
                            : 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
                    }}
                >
                    {/* LEFT: RECOMMENDATION + HASH */}
                    <div>
                        <h3
                            style={{
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '1.25rem',
                                color: 'var(--primary)',
                            }}
                        >
                            Protocol / Recommendation
                        </h3>
                        <p
                            style={{
                                lineHeight: '1.7',
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                color: '#ccc',
                                fontWeight: '300',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {result.recommendation}
                        </p>

                        <div style={{ marginTop: '2rem' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: '0.6rem',
                                    padding: '0.9rem',
                                    border: '1px solid var(--border)',
                                    fontFamily: 'monospace',
                                    fontSize: '0.78rem',
                                    color: '#888',
                                    position: 'relative',
                                    background: 'rgba(255,255,255,0.02)',
                                }}
                            >
                                <span
                                    style={{
                                        color: 'var(--primary)',
                                        marginBottom: isMobile ? '0.1rem' : 0,
                                    }}
                                >
                                    ● SHA256 VERIFIED
                                </span>
                                <span
                                    style={{
                                        wordBreak: 'break-all',
                                        flex: 1,
                                        width: '100%',
                                    }}
                                >
                                    {result.integrity_hash}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: copied ? 'var(--primary)' : '#aaa',
                                        cursor: 'pointer',
                                        fontSize: '0.78rem',
                                        padding: '0.15rem 0.4rem',
                                        alignSelf: isMobile ? 'flex-start' : 'center',
                                        transition: 'color 0.3s',
                                    }}
                                    title="Copy Hash"
                                >
                                    {copied ? 'COPIED' : 'COPY'}
                                </button>
                            </div>
                            <button
                                onClick={() => setShowVerifier(true)}
                                style={{
                                    marginTop: '0.4rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#777',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                Verify this hash manually
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: HEATMAP + META */}
                    <div
                        style={{
                            borderLeft: isMobile ? 'none' : '1px solid var(--border)',
                            paddingLeft: isMobile ? '0' : '2rem',
                            borderTop: isMobile ? '1px solid var(--border)' : 'none',
                            paddingTop: isMobile ? '1.5rem' : '0',
                        }}
                    >
                        {result.heatmap_b64 && (
                            <div style={{ marginBottom: '1.75rem' }}>
                                <h3
                                    style={{
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        marginBottom: '0.9rem',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    Visual Analysis (XAI)
                                </h3>
                                <div
                                    style={{
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '1px solid var(--border)',
                                        position: 'relative',
                                    }}
                                >
                                    <img
                                        src={`data:image/jpeg;base64,${result.heatmap_b64}`}
                                        alt="Disease Heatmap"
                                        style={{ width: '100%', display: 'block' }}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'rgba(0,0,0,0.7)',
                                            padding: '0.5rem',
                                            fontSize: '0.7rem',
                                            color: '#fff',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Grad-CAM Heatmap
                                    </div>
                                </div>
                                <p
                                    style={{
                                        fontSize: '0.8rem',
                                        color: '#888',
                                        marginTop: '0.45rem',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    Highlighted regions indicate areas influencing the model&apos;s
                                    decision.
                                </p>
                            </div>
                        )}

                        <ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                fontSize: '0.9rem',
                                color: '#888',
                            }}
                        >
                            <li
                                style={{
                                    paddingBottom: '0.9rem',
                                    marginBottom: '0.9rem',
                                    borderBottom: '1px solid var(--border)',
                                }}
                            >
                                <strong
                                    style={{
                                        color: '#fff',
                                        display: 'block',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    Status
                                </strong>
                                {isHealthy ? 'Healthy Specimen' : 'Pathology Detected'}
                            </li>
                            <li
                                style={{
                                    paddingBottom: '0.9rem',
                                    marginBottom: '0.9rem',
                                    borderBottom: '1px solid var(--border)',
                                }}
                            >
                                <strong
                                    style={{
                                        color: '#fff',
                                        display: 'block',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    Model Architecture
                                </strong>
                                EfficientNetV2-S
                            </li>
                            <li
                                style={{
                                    paddingBottom: '0.9rem',
                                    marginBottom: '0.9rem',
                                    borderBottom: '1px solid var(--border)',
                                }}
                            >
                                <strong
                                    style={{
                                        color: '#fff',
                                        display: 'block',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    Filename
                                </strong>
                                {result.filename}
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: '#fff',
                                        display: 'block',
                                        marginBottom: '0.25rem',
                                    }}
                                >
                                    Timestamp
                                </strong>
                                {new Date().toLocaleString()}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* FOOTER BUTTONS */}
                <div
                    style={{
                        padding: isMobile ? '1.25rem 1rem 1.5rem 1rem' : '2rem',
                        borderTop: '1px solid var(--border)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'center',
                        gap: isMobile ? '0.7rem' : '1rem',
                    }}
                >
                    <button
                        className="btn btn-outline"
                        onClick={onReset}
                        style={{
                            width: isMobile ? '100%' : 'auto',
                            minWidth: isMobile ? '0' : '180px',
                        }}
                    >
                        Analyze New Specimen
                    </button>
                    <button
                        className="btn"
                        onClick={handleExportPDF}
                        style={{
                            width: isMobile ? '100%' : 'auto',
                            minWidth: isMobile ? '0' : '180px',
                        }}
                    >
                        Export PDF Report
                    </button>
                </div>
            </div>

            {showVerifier && <IntegrityVerifier onClose={() => setShowVerifier(false)} />}
        </>
    );
}

export default ResultCard;
