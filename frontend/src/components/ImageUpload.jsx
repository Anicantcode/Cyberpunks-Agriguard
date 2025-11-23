import { useState, useRef } from 'react';

function ImageUpload({ onImageSelect, loading }) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onImageSelect(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div
            className={minimal-card ${dragActive ? 'drag-active' : ''}}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
                padding: '4rem 2rem',
                border: dragActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                transition: 'all 0.2s',
                cursor: 'pointer',
                maxWidth: '600px',
                margin: '0 auto',
                background: 'var(--surface)'
            }}
            onClick={onButtonClick}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
            />

            <div style={{ pointerEvents: 'none' }}>
                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="loading-spinner" style={{
                            width: '40px', height: '40px',
                            border: '2px solid #333', borderTopColor: 'var(--text-color)', borderRadius: '50%'
                        }}></div>
                        <p style={{ fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Processing Specimen...</p>
                    </div>
                ) : (
                    <>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.8 }}>⊕</div>
                        <h3 style={{
                            fontSize: '1.2rem',
                            margin: '0 0 0.5rem 0',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '400'
                        }}>Upload Specimen</h3>
                        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.9rem' }}>Drag and drop or click to browse</p>
                        
                        <button className="btn" style={{ pointerEvents: 'auto' }}>
                            Select File
                        </button>

                        {/* Added instruction line */}
                        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#777' }}>
                            Please upload one leaf with a clear background for maximum results.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default ImageUpload;
