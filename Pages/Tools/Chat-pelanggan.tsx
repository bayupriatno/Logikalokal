import React, { useState } from 'react';

const ChatPelangganPage: React.FC = () => {
  const [pertanyaan, setPertanyaan] = useState('');
  const [gaya, setGaya] = useState('');
  const [jawaban, setJawaban] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setJawaban('');

    if (!pertanyaan.trim() || !gaya.trim()) {
      setError('Pertanyaan dan gaya wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-chat-pelanggan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pertanyaan, gaya }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Terjadi masalah koneksi');
      setJawaban(data.jawaban);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1>Balas Chat Pelanggan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pertanyaan Pelanggan</label>
          <textarea
            value={pertanyaan}
            onChange={e => setPertanyaan(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
            required
          />
        </div>
        <div>
          <label>Gaya Bahasa</label>
          <input
            value={gaya}
            onChange={e => setGaya(e.target.value)}
            placeholder="Contoh: ramah, profesional, lucu"
            style={{ width: '100%' }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Buat Balasan'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {jawaban && (
        <div style={{ marginTop: 16, background: '#f8f9fa', padding: 12, borderRadius: 8 }}>
          <b>Balasan:</b>
          <p>{jawaban}</p>
        </div>
      )}
    </div>
  );
};

export default ChatPelangganPage;
