import React, { useState } from 'react';

const CaptionHashtagPage: React.FC = () => {
  const [deskripsi, setDeskripsi] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCaption('');
    setHashtags('');
    if (!deskripsi.trim() || !platform.trim()) {
      setError('Deskripsi dan platform wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/generate-caption-hashtag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deskripsi, platform }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal generate');
      setCaption(data.caption);
      setHashtags(data.hashtags);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth:500, margin:"0 auto", padding:24}}>
      <h2>Caption & Hashtag Otomatis</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Deskripsi Produk/Konten</label>
          <textarea value={deskripsi} onChange={e => setDeskripsi(e.target.value)} rows={3} style={{width:"100%"}} required />
        </div>
        <div>
          <label>Platform</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)} style={{width:"100%"}}>
            <option>Instagram</option>
            <option>TikTok</option>
            <option>Facebook</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Memproses...' : 'Generate Caption & Hashtag'}</button>
      </form>
      {error && <div style={{color:"red", marginTop:12}}>{error}</div>}
      {caption && (<div style={{marginTop:16}}><b>Caption:</b><p>{caption}</p></div>)}
      {hashtags && (<div style={{marginTop:8}}><b>Hashtag:</b><p>{hashtags}</p></div>)}
    </div>
  );
};
export default CaptionHashtagPage;
