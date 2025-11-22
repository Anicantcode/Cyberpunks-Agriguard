function Dashboard() {
    const metrics = [
        { label: 'Scans Today', value: '128', color: 'var(--primary)' },
        { label: 'Diseases Detected', value: '42', color: 'var(--warning)' },
        { label: 'Accuracy Rate', value: '96.8%', color: 'var(--accent)' },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {metrics.map((metric, index) => (
                <div key={index} className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>
                        {metric.value}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {metric.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
