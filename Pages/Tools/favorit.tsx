'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const toolInfo: Record<string, string> = {
  'deskripsi-produk': '🛒 Deskripsi Produk',
  'chat-pelanggan': '💬 Balasan Pelanggan',
  'nama-brand': '✨ Nama Brand',
  'judul-viral': '🔥 Judul Viral',
};

export default function Favorit() {
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarkedTools') || '[]');
    setBookmarked(saved);
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⭐ Alat Favorit</h1>
      {bookmarked.length === 0 ? (
        <p>Kamu belum menyimpan alat apa pun.</p>
      ) : (
        <ul className="list-disc ml-6 space-y-2">
          {bookmarked.map((slug) => (
            <li key={slug}>
              <Link href={`/tools/${slug}`} className="text-blue-600 underline">
                {toolInfo[slug] || slug}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}