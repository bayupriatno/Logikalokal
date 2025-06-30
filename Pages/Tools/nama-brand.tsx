import React, { useState } from 'react';

const NamaBrandPage: React.FC = () => {
  const [bidang, setBidang] = useState('');
  const [nilai, setNilai] = useState('');
  const [namaList, setNamaList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNamaList([]);

    if (!bidang.trim() || !nilai.trim()) {
      setError('Bidang dan nilai brand wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-nama-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bidang, nilai }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Terjadi masalah koneksi');
      setNamaList(data.namaList || []);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1>Nama Brand</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bidang Brand</label>
          <input
            value={bidang}
            onChange={e => setBidang(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        <div>
          <label>Nilai Brand</label>
          <input
            value={nilai}
            onChange={e => setNilai(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Buat Nama'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {namaList.length > 0 && (
        <div style={{ marginTop: 16, background: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <b>Ide Nama:</b>
          <ul>
            {namaList.map((nama, i) => (
              <li key={i}>{nama}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NamaBrandPage;
