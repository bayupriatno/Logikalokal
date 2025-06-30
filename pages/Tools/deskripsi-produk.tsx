import React, { useState } from 'react';

const DeskripsiProdukPage: React.FC = () => {
  const [produk, setProduk] = useState('');
  const [keunggulan, setKeunggulan] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDeskripsi('');

    if (!produk.trim() || !keunggulan.trim()) {
      setError('Nama produk dan keunggulan wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-deskripsi-produk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produk, keunggulan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Terjadi masalah koneksi');
      setDeskripsi(data.deskripsi);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1>Buat Deskripsi Produk</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Produk</label>
          <input
            value={produk}
            onChange={e => setProduk(e.target.value)}
            style={{ width: '100%' }}
            required
          />
        </div>
        <div>
          <label>Keunggulan Produk</label>
          <textarea
            value={keunggulan}
            onChange={e => setKeunggulan(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Buat Deskripsi'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {deskripsi && (
        <div style={{ marginTop: 16, background: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <b>Deskripsi:</b>
          <p>{deskripsi}</p>
        </div>
      )}
    </div>
  );
};

export default DeskripsiProdukPage;
