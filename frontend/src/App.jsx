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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
        <div
          onClick={() => setShowLanding(true)}
          style={{ cursor: 'pointer' }}
        >
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            letterSpacing: '0.2em',
            fontWeight: '500',
            marginBottom: '0.5rem'
          }}>
            AGRIGUARD
          </div>
          <p className="subtitle" style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>AI-Powered Early Plant Disease Triage</p>
        </div>
        <button
          className="btn btn-outline"
          onClick={() => setShowLanding(true)}
          style={{ fontSize: '0.75rem', padding: '0.8rem 2rem' }}
        >
          Back to Home
        </button>
      </header>

      <main>
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
