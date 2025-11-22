import { useState, useRef } from 'react';
import IntegrityVerifier from './IntegrityVerifier';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ResultCard({ result, onReset }) {
    const isHealthy = result.prediction.toLowerCase().includes('healthy');
    const [showVerifier, setShowVerifier] = useState(false);
    const [copied, setCopied] = useState(false);
    const cardRef = useRef(null);

    const handleExportPDF = async () => {
        if (!cardRef.current) return;

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2, // Higher scale for better quality
                backgroundColor: '#121212', // Match the dark theme background
                useCORS: true,
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`agriguard-report-${result.filename || 'analysis'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result.integrity_hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div ref={cardRef} className="minimal-card" style={{ maxWidth: '1200px', margin: '0 auto', overflow: 'hidden', textAlign: 'left' }}>
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>
                    <div>
                        <span style={{
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: '#666'
                        }}>
                            Analysis Result
                        </span>
                        <h2 style={{
                            margin: '0.5rem 0 0 0',
                            fontSize: '2.5rem',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '400'
                        }}>
                            {result.prediction.replace(/_/g, ' ')}
                        </h2>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '3rem', fontWeight: '300', fontFamily: 'var(--font-heading)' }}>
                            {(result.confidence * 100).toFixed(1)}%
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confidence Score</div>

                        {result.severity !== null && (
                            <div style={{ marginTop: '1rem' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '300', fontFamily: 'var(--font-heading)', color: result.severity > 0.5 ? 'var(--danger)' : 'var(--warning)' }}>
                                    {(result.severity * 100).toFixed(1)}%
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Severity Score</div>
                            </div>
                        )}
                    </div>

                </div>

                <div style={{ padding: '3rem', display: 'grid', gap: '3rem', gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <h3 style={{
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '1.5rem',
                            color: 'var(--primary)'
                        }}>Protocol / Recommendation</h3>
                        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#ccc', fontWeight: '300' }}>
                            {result.recommendation}
                        </p>

                        <div style={{ marginTop: '3rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                border: '1px solid var(--border)',
                                fontFamily: 'monospace',
                                fontSize: '0.8rem',
                                color: '#666',
                                position: 'relative',
                                background: 'rgba(255,255,255,0.02)'
                            }}>
                                <span style={{ color: 'var(--primary)' }}>● SHA256 VERIFIED</span>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                                    {result.integrity_hash}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        background: 'none', border: 'none', color: copied ? 'var(--primary)' : '#888',
                                        cursor: 'pointer', fontSize: '0.8rem', padding: '0.2rem 0.5rem',
                                        transition: 'color 0.3s'
                                    }}
                                    title="Copy Hash"
                                >
                                    {copied ? 'COPIED' : 'COPY'}
                                </button>
                            </div>
                            <button
                                onClick={() => setShowVerifier(true)}
                                style={{
                                    marginTop: '0.5rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#666',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                Verify this hash manually
                            </button>
                        </div>
                    </div>

                    <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '2rem' }}>
                        {result.heatmap_b64 && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '1rem',
                                    color: 'var(--accent)'
                                }}>Visual Analysis (XAI)</h3>
                                <div style={{
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '1px solid var(--border)',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={`data:image/jpeg;base64,${result.heatmap_b64}`}
                                        alt="Disease Heatmap"
                                        style={{ width: '100%', display: 'block' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'rgba(0,0,0,0.7)',
                                        padding: '0.5rem',
                                        fontSize: '0.7rem',
                                        color: '#fff',
                                        textAlign: 'center'
                                    }}>
                                        Grad-CAM Heatmap
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem', fontStyle: 'italic' }}>
                                    Highlighted regions indicate areas influencing the model's decision.
                                </p>
                            </div>
                        )}

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#888' }}>
                            <li style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>Status</strong>
                                {isHealthy ? 'Healthy Specimen' : 'Pathology Detected'}
                            </li>
                            <li style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>Model Architecture</strong>
                                EfficientNetV2-S
                            </li>
                            <li style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>Filename</strong>
                                {result.filename}
                            </li>
                            <li>
                                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>Timestamp</strong>
                                {new Date().toLocaleTimeString()}
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ padding: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <button className="btn btn-outline" onClick={onReset}>
                        Analyze New Specimen
                    </button>
                    <button className="btn" onClick={handleExportPDF} style={{ marginLeft: '1rem' }}>
                        Export PDF Report
                    </button>
                </div>
            </div>
            {showVerifier && <IntegrityVerifier onClose={() => setShowVerifier(false)} />
            }
        </>
    );
}

export default ResultCard;
