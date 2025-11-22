import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResultCard from './components/ResultCard';
import LandingPage from './components/LandingPage';
import './index.css';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="app-container animate-fade-in">
      {/* Background Grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, pointerEvents: 'none', zIndex: 0 }}>
        {[10, 25, 40, 55, 70, 85].map((pos, i) => (<div key={`h-${i}`} style={{ position: 'absolute', top: `${pos}%`, left: 0, right: 0, height: '1px', background: '#4a7c59' }} />))}
        {[15, 30, 45, 60, 75, 90].map((pos, i) => (<div key={`v-${i}`} style={{ position: 'absolute', left: `${pos}%`, top: 0, bottom: 0, width: '1px', background: '#4a7c59' }} />))}
      </div>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', paddingTop: '1rem', position: 'relative', zIndex: 10 }}>
        <div
          onClick={() => setShowLanding(true)}
          style={{ cursor: 'pointer' }}
        >
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
            fontWeight: '600',
            marginBottom: '0.2rem',
            color: 'var(--text-light)'
          }}>
            AGRIGUARD
          </div>
          <p className="subtitle" style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8, color: 'var(--text-muted)' }}>AI-Powered Early Plant Disease Triage</p>
        </div>
        <button
          className="btn btn-outline"
          onClick={() => setShowLanding(true)}
          style={{ fontSize: '0.75rem', padding: '0.8rem 2rem' }}
        >
          Back to Home
        </button>
      </header>

      <main style={{ position: 'relative', zIndex: 1 }}>
        {!result && (
          <div className="animate-fade-in" style={{
            animationDelay: '0.1s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh'
          }}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
              <ImageUpload onImageSelect={handleImageSelect} loading={loading} />
            </div>
          </div>
        )}

        {error && (
          <div className="glass-panel animate-fade-in" style={{ padding: '1rem', color: 'var(--danger)', marginTop: '1rem' }}>
            Error: {error}
          </div>
        )}

        {result && (
          <div className="animate-fade-in">
            <ResultCard result={result} onReset={resetAnalysis} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
