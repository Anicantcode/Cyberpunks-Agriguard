import { useState } from 'react';

function IntegrityVerifier({ onClose }) {
    const [file, setFile] = useState(null);
    const [hash, setHash] = useState('');
    const [expectedHash, setExpectedHash] = useState('');
    const [match, setMatch] = useState(null);
    const [calculating, setCalculating] = useState(false);

    const calculateHash = async (file) => {
        setCalculating(true);
        try {
            const buffer = await file.arrayBuffer();
            const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setHash(hashHex);
            if (expectedHash) {
                setMatch(hashHex === expectedHash);
            }
        } catch (error) {
            console.error("Hashing failed:", error);
        } finally {
            setCalculating(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            calculateHash(selectedFile);
        }
    };

    const handleExpectedChange = (e) => {
        const val = e.target.value.trim();
        setExpectedHash(val);
        if (hash) {
            setMatch(hash === val);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '2rem', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer'
                    }}
                >
                    ×
                </button>

                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Integrity Verifier</h3>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#888' }}>
                        1. Paste Hash from Report
                    </label>
                    <input
                        type="text"
                        value={expectedHash}
                        onChange={handleExpectedChange}
                        placeholder="Paste SHA256 hash here..."
                        style={{
                            width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border)', color: '#fff', borderRadius: '4px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#888' }}>
                        2. Select Original File
                    </label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ width: '100%', color: '#ccc' }}
                    />
                </div>

                {calculating && <div style={{ color: 'var(--primary)' }}>Calculating hash...</div>}

                {hash && (
                    <div style={{
                        padding: '1rem',
                        background: match === true ? 'rgba(0, 255, 0, 0.1)' : match === false ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${match === true ? 'var(--primary)' : match === false ? 'var(--danger)' : 'var(--border)'}`,
                        borderRadius: '4px'
                    }}>
                        <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' }}>CALCULATED HASH</div>
                        <div style={{ fontFamily: 'monospace', wordBreak: 'break-all', fontSize: '0.9rem' }}>{hash}</div>

                        {match !== null && (
                            <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: match ? 'var(--primary)' : 'var(--danger)' }}>
                                {match ? '✅ HASH MATCHED - FILE IS AUTHENTIC' : '❌ HASH MISMATCH - FILE MODIFIED'}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default IntegrityVerifier;
