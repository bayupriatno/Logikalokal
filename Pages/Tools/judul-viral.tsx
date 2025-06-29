'use client';
import { useState } from 'react';
import BookmarkButton from '@/components/BookmarkButton';

export default function JudulViral() {
  const [topik, setTopik] = useState('');
  const [audiens, setAudiens] = useState('');
  const [judulList, setJudulList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generateJudul() {
    setLoading(true);
    const res = await fetch('/api/generate-judul-viral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topik, audiens }),
    });
    const data = await res.json();
    setJudulList(data.judulList || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex justify-between">
        🔥 Judul Viral
        <BookmarkButton slug="judul-viral" />
      </h1>
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Topik konten"
        value={topik}
        onChange={(e) => setTopik(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Target audiens (misal: remaja, ibu rumah tangga)"
        value={audiens}
        onChange={(e) => setAudiens(e.target.value)}
      />
      <button
        onClick={generateJudul}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Menghasilkan...' : 'Buat Judul'}
      </button>

      {judulList.length > 0 && (
        <div className="mt-6 space-y-2 bg-gray-100 border p-4 rounded">
          <p className="font-semibold">Rekomendasi Judul:</p>
          <ul className="list-disc ml-5">
            {judulList.map((judul, i) => (
              <li key={i}>{judul}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}