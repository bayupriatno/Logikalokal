import React, { useState } from 'react';

const JudulViralPage: React.FC = () => {
  const [topik, setTopik] = useState('');
  const [audiens, setAudiens] = useState('');
  const [judulList, setJudulList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setJudulList([]);

    if (!topik.trim() || !audiens.trim()) {
      setError('Topik dan audiens wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-judul-viral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topik, audiens }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Terjadi masalah koneksi');
      setJudulList(data.judulList || []);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1>Judul Viral IG/TikTok</h1>
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
          <label>Audiens</label>
          <input
            value={audiens}
            onChange={e => setAudiens(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Buat Judul'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {judulList.length > 0 && (
        <div style={{ marginTop: 16, background: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <b>Judul Viral:</b>
          <ul>
            {judulList.map((judul, i) => (
              <li key={i}>{judul}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JudulViralPage;
