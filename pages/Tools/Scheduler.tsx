import React, { useState } from 'react';

const SchedulerPage: React.FC = () => {
  const [caption, setCaption] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [datetime, setDatetime] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  // Untuk demo: simpan ke supabase, implementasikan API sesuai kebutuhan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setError('');
    if (!caption.trim() || !platform || !datetime) {
      setError('Semua field wajib diisi');
      return;
    }
    setLoading(true);
    try {
      // Demo: Simulasikan sukses
      setTimeout(() => {
        setLoading(false);
        setMsg('Jadwal posting berhasil disimpan! (API posting belum diimplementasi)');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth:500, margin:"0 auto", padding:24}}>
      <h2>Jadwalkan Posting Sosial Media</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Caption/Konten</label>
          <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={3} style={{width:"100%"}} required />
        </div>
        <div>
          <label>Platform</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)} style={{width:"100%"}}>
            <option>Instagram</option>
            <option>TikTok</option>
            <option>Facebook</option>
          </select>
        </div>
        <div>
          <label>Waktu Posting</label>
          <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} style={{width:"100%"}} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Menjadwalkan...' : 'Jadwalkan Posting'}</button>
      </form>
      {msg && <div style={{color:"green", marginTop:12}}>{msg}</div>}
      {error && <div style={{color:"red", marginTop:12}}>{error}</div>}
    </div>
  );
};

export default SchedulerPage;
