import React, { useState } from 'react';

const VideoScriptPage: React.FC = () => {
  const [tema, setTema] = useState('');
  const [gaya, setGaya] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setScript('');
    if (!tema.trim()) {
      setError('Tema wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/generate-video-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema, gaya }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal generate');
      setScript(data.script);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth:500, margin:"0 auto", padding:24}}>
      <h2>AI Video Script & Voice Over</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tema Video</label>
          <input value={tema} onChange={e => setTema(e.target.value)} style={{width:"100%"}} required />
        </div>
        <div>
          <label>Gaya (opsional)</label>
          <input value={gaya} onChange={e => setGaya(e.target.value)} style={{width:"100%"}} />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Memproses...' : 'Generate Script'}</button>
      </form>
      {error && <div style={{color:"red", marginTop:12}}>{error}</div>}
      {script && (
        <div style={{marginTop:16, background:"#f8f9fa", padding:12, borderRadius:8}}>
          <b>Script:</b>
          <p>{script}</p>
        </div>
      )}
    </div>
  );
};

export default VideoScriptPage;
