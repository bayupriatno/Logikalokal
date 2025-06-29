'use client';
import { useState } from 'react';
import BookmarkButton from '@/components/BookmarkButton';

export default function ChatPelanggan() {
  const [pertanyaan, setPertanyaan] = useState('');
  const [gaya, setGaya] = useState('ramah dan sopan');
  const [jawaban, setJawaban] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateReply() {
    setLoading(true);
    const res = await fetch('/api/generate-chat-pelanggan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pertanyaan, gaya }),
    });
    const data = await res.json();
    setJawaban(data.jawaban);
    setLoading(false);
  }

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex justify-between">
        💬 Balasan Pelanggan
        <BookmarkButton slug="chat-pelanggan" />
      </h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Pertanyaan pelanggan"
        value={pertanyaan}
        onChange={(e) => setPertanyaan(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Gaya jawaban (contoh: ramah, formal)"
        value={gaya}
        onChange={(e) => setGaya(e.target.value)}
      />
      <button
        onClick={generateReply}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Menjawab...' : 'Buat Jawaban'}
      </button>
      {jawaban && <div className="mt-4 p-4 bg-gray-100 border rounded">{jawaban}</div>}
    </div>
  );
}