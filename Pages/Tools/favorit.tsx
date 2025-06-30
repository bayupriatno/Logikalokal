import React, { useState, useEffect } from 'react';

const FavoritPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [favorit, setFavorit] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Ambil favorit saat pertama render
  useEffect(() => {
    setLoading(true);
    fetch('/api/favorit')
      .then(res => res.json())
      .then(data => setFavorit(data.favorit || []))
      .catch(() => setError('Gagal mengambil data favorit'))
      .finally(() => setLoading(false));
  }, []);

  // Tambah favorit (POST)
  const handleAddFavorit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!input.trim()) {
      setError('Input favorit tidak boleh kosong!');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/favorit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menambah favorit');
      setFavorit(data.favorit || []);
      setInput('');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  // Hapus favorit (DELETE)
  const handleRemove = async (idx: number) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/favorit', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: idx }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menghapus favorit');
      setFavorit(data.favorit || []);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1>Favorit Saya</h1>
      <form onSubmit={handleAddFavorit}>
        <div>
          <label>Tambah Favorit</label>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ width: '100%' }}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Tambah'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {favorit.length > 0 && (
        <div style={{ marginTop: 16, background: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <b>Daftar Favorit:</b>
          <ul>
            {favorit.map((item, i) => (
              <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{item}</span>
                <button
                  onClick={() => handleRemove(i)}
                  style={{
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    padding: '0 8px',
                    cursor: 'pointer',
                    marginLeft: 8
                  }}
                  aria-label={`Hapus favorit ${item}`}
                  disabled={loading}
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FavoritPage;
