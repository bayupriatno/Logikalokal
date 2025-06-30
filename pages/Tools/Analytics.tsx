import React, { useEffect, useState } from 'react';

const AnalyticsPage: React.FC = () => {
  const [summary, setSummary] = useState<Record<string, { total: number; engagement: number }>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => setSummary(data.summary || {}))
      .catch(() => setError('Gagal mengambil data'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{maxWidth:500, margin:"0 auto", padding:24}}>
      <h2>Analisis Performa Konten</h2>
      {loading && <p>Memuat...</p>}
      {error && <div style={{color:"red"}}>{error}</div>}
      {summary && Object.keys(summary).length > 0 && (
        <table>
          <thead>
            <tr><th>Platform</th><th>Jumlah Post</th><th>Total Engagement</th></tr>
          </thead>
          <tbody>
            {Object.entries(summary).map(([plat, v]) => (
              <tr key={plat}>
                <td>{plat}</td>
                <td>{v.total}</td>
                <td>{v.engagement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AnalyticsPage;
