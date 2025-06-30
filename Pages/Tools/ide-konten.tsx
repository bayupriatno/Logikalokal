import React, { useState } from 'react';

const IdeKontenPage: React.FC = () => {
  const [topik, setTopik] = useState('');
  const [audiens, setAudiens] = useState('');
  const [ideList, setIdeList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIdeList([]);

    if (!topik.trim() || !audiens.trim()) {
      setError('Topik dan target audiens wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-ide-konten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topik, audiens }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Terjadi masalah koneksi');
      setIdeList(data.ideList || []);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1>Ide Konten Harian</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Topik Konten</label>
          <input
            value={topik}
            onChange={e => setTopik(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        <div>
          <label>Target Audiens</label>
          <input
            value={audiens}
            onChange={e => setAudiens(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Dapatkan Ide'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {ideList.length > 0 && (
        <div style={{ marginTop: 16, background: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <b>Ide Konten:</b>
          <ul>
            {ideList.map((ide, i) => (
              <li key={i}>{ide}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IdeKontenPage;
