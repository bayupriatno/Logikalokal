import React from 'react';
import Link from 'next/link';

type Tool = {
  slug: string;
  nama: string;
  deskripsi: string;
};

const tools: Tool[] = [
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
  {
    slug: 'ide-konten',
    nama: '🧠 Ide Konten Harian',
    deskripsi: 'Dapatkan 5 ide konten segar berdasarkan topik dan target audiensmu.',
  },
  // Tambahkan tools custom lain di sini
];

const fiturUtama = [
  { slug: 'caption-hashtag', label: '📄 Caption & Hashtag Otomatis' },
  { slug: 'scheduler', label: '🗓️ Jadwalkan Posting (Scheduler)' },
  { slug: 'analytics', label: '📊 Analisis Performa Konten' },
  { slug: 'templates', label: '🗂️ Template & Ide Viral' },
  { slug: 'video-script', label: '🎬 AI Video Script & Voice Over' },
  { slug: 'favorit', label: '⭐ Favorit Saya' },
];

const IndexPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 650, margin: '0 auto', padding: 32 }}>
      <h1>Logikalokal AI Tools</h1>
      <p>Solusi cerdas untuk UMKM & konten kreator. Pilih fitur berikut:</p>
      <ul style={{ lineHeight: 2, marginBottom: 32 }}>
        {fiturUtama.map((fitur) => (
          <li key={fitur.slug}>
            <Link href={`/tools/${fitur.slug}`}>{fitur.label}</Link>
          </li>
        ))}
      </ul>

      <h2 style={{ margin: '32px 0 16px 0', fontSize: 22 }}>Daftar Tools Lainnya:</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tools.map((tool) => (
          <li key={tool.slug} style={{ marginBottom: 24, border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
            <h3 style={{ margin: '0 0 8px 0' }}>
              <Link href={`/tools/${tool.slug}`} style={{ textDecoration: 'none', color: '#222' }}>
                {tool.nama}
              </Link>
            </h3>
            <p style={{ margin: 0 }}>{tool.deskripsi}</p>
          </li>
        ))}
      </ul>
      <footer style={{ marginTop: 32, fontSize: 14, color: '#aaa' }}>
        &copy; {new Date().getFullYear()} Logikalokal. Powered by AI & Supabase.
      </footer>
    </div>
  );
};

export default IndexPage;
