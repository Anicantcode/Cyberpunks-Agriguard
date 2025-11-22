function ResultCard({ result, onReset }) {
    const isHealthy = result.prediction.toLowerCase().includes('healthy');

    return (
        <div className="minimal-card" style={{ maxWidth: '800px', margin: '0 auto', overflow: 'hidden', textAlign: 'left' }}>
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
                </div>
            </div>

            <div style={{ padding: '3rem', display: 'grid', gap: '4rem', gridTemplateColumns: '1.5fr 1fr' }}>
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
                            color: '#666'
                        }}>
                            <span style={{ color: 'var(--primary)' }}>● SHA256 VERIFIED</span>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {result.integrity_hash}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '2rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#888' }}>
                        <li style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                            <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>Status</strong>
                            {isHealthy ? 'Healthy Specimen' : 'Pathology Detected'}
                        </li>
                        <li style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                            <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>Model Architecture</strong>
                            MobileNetV2
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
            </div>
        </div>
    );
}

export default ResultCard;
