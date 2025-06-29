'use client';
import { useState } from 'react';
import BookmarkButton from '@/components/BookmarkButton';

export default function NamaBrand() {
  const [bidang, setBidang] = useState('');
  const [nilai, setNilai] = useState('');
  const [hasil, setHasil] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function buatNamaBrand() {
    setLoading(true);
    const res = await fetch('/api/generate-nama-brand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bidang, nilai }),
    });
    const data = await res.json();
    setHasil(data.namaList || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex justify-between">
        ✨ Nama Brand
        <BookmarkButton slug="nama-brand" />
      </h1>
      <input
        type="text"
        placeholder="Bidang usaha (contoh: minuman kekinian)"
        value={bidang}
        onChange={(e) => setBidang(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Nilai brand (contoh: lokal, sehat, modern)"
        value={nilai}
        onChange={(e) => setNilai(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={buatNamaBrand}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Mencari nama...' : 'Cari Nama Brand'}
      </button>

      {hasil.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 border rounded space-y-2">
          <p className="font-semibold">Rekomendasi Nama:</p>
          <ul className="list-disc ml-5">
            {hasil.map((nama, i) => (
              <li key={i}>{nama}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}