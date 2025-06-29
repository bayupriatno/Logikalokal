'use client';
import { useState } from 'react';
import BookmarkButton from '@/components/BookmarkButton';

export default function IdeKonten() {
  const [topik, setTopik] = useState('');
  const [audiens, setAudiens] = useState('');
  const [hasil, setHasil] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generateIdeas() {
    setLoading(true);
    const res = await fetch('/api/generate-ide-konten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topik, audiens }),
    });
    const data = await res.json();
    setHasil(data.ideList || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex justify-between">
        🧠 Ide Konten Harian
        <BookmarkButton slug="ide-konten" />
      </h1>
      <input
        type="text"
        placeholder="Topik konten (contoh: minuman sehat)"
        value={topik}
        onChange={(e) => setTopik(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Target audiens (contoh: remaja, pekerja kantoran)"
        value={audiens}
        onChange={(e) => setAudiens(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
      <button
        onClick={generateIdeas}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Menghasilkan...' : 'Buat Ide Konten'}
      </button>
      {hasil.length > 0 && (
        <div className="mt-6 space-y-2 bg-gray-100 border p-4 rounded">
          <p className="font-semibold">Rekomendasi Ide Konten:</p>
          <ul className="list-disc ml-5">
            {hasil.map((ide, i) => (
              <li key={i}>{ide}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}