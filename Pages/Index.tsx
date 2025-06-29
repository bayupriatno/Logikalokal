'use client';
import Link from 'next/link';

const tools = [
  {
    slug: 'deskripsi-produk',
    nama: '🛒 Deskripsi Produk',
    deskripsi: 'Buat deskripsi produk menarik dan persuasif untuk marketplace.',
  },
  {
    slug: 'chat-pelanggan',
    nama: '💬 Balasan Pelanggan',
    deskripsi: 'Balas pertanyaan pelanggan dengan gaya ramah, profesional, atau lucu.',
  },
  {
    slug: 'nama-brand',
    nama: '✨ Nama Brand',
    deskripsi: 'Dapatkan ide nama brand singkat, unik, dan bermakna.',
  },
  {
    slug: 'judul-viral',
    nama: '🔥 Judul Viral',
    deskripsi: 'Buat judul konten yang menarik perhatian di IG, TikTok, dan lainnya.',
  },
  {
    slug: 'favorit',
    nama: '⭐ Favorit Saya',
    deskripsi: 'Lihat dan kelola alat-alat favorit kamu.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">🌿 LogikaLokal AI Tools</h1>
      <p className="mb-6 text-gray-700">
        Platform alat bantu berbasis AI untuk UMKM dan kreator lokal. Gunakan AI untuk membantu bisnis dan konten kamu berkembang lebih cepat!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}>
            <div className="border rounded-xl p-4 hover:bg-green-50 transition cursor-pointer shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{tool.nama}</h2>
              <p className="text-gray-600">{tool.deskripsi}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
{
  slug: 'ide-konten',
  nama: '🧠 Ide Konten Harian',
  deskripsi: 'Dapatkan 5 ide konten segar berdasarkan topik dan target audiensmu.'
},