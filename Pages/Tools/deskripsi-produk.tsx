'use client';
import { useState } from 'react';
import BookmarkButton from '@/components/BookmarkButton';

export default function DeskripsiProduk() {
  const [produk, setProduk] = useState('');
  const [keunggulan, setKeunggulan] = useState('');
  const [hasil, setHasil] = useState('');
  const [loading, setLoading] = useState(false);

  async function buatDeskripsi() {
    setLoading(true);
    const res = await fetch('/api/generate-deskripsi-produk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produk, keunggulan }),
    });
    const data = await res.json();
    setHasil(data.deskripsi);
    setLoading(false);
  }

  return (
    <div className="min-h-screen p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex justify-between">
        🛒 Deskripsi Produk
        <BookmarkButton slug="deskripsi-produk" />
      </h1>
      <input
        className="w-full border p-2 mb-2"
        placeholder="Nama produk"
        value={produk}
        onChange={(e) => setProduk(e.target.value)}
      />
      <textarea
        className="w-full border p-2 mb-4"
        placeholder="Keunggulan produk"
        value={keunggulan}
        onChange={(e) => setKeunggulan(e.target.value)}
      />
      <button
        onClick={buatDeskripsi}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Membuat...' : 'Buat Deskripsi'}
      </button>
      {hasil && <div className="mt-4 p-4 bg-gray-100 border rounded">{hasil}</div>}
    </div>
  );
}