import React from 'react';

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
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 32 }}>
      <h1>Logikalokal AI Tools</h1>
      <p>Solusi cerdas untuk UMKM & konten kreator. Pilih fitur berikut:</p>
      <ul style={{ lineHeight: 2 }}>
        <li>
          <Link href="/tools/caption-hashtag">
            📄 Caption & Hashtag Otomatis
          </Link>
        </li>
        <li>
          <Link href="/tools/scheduler">
            🗓️ Jadwalkan Posting (Scheduler)
          </Link>
        </li>
        <li>
          <Link href="/tools/analytics">
            📊 Analisis Performa Konten
          </Link>
        </li>
        <li>
          <Link href="/tools/templates">
            🗂️ Template & Ide Viral
          </Link>
        </li>
        <li>
          <Link href="/tools/video-script">
            🎬 AI Video Script & Voice Over
          </Link>
        </li>
        <li>
          <Link href="/tools/favorit">
            ⭐ Favorit Saya
          </Link>
        </li>
        {/* Tambahkan tools lain jika ada */}
      </ul>
      <footer style={{ marginTop: 32, fontSize: 14, color: '#aaa' }}>
        &copy; {new Date().getFullYear()} Logikalokal. Powered by AI & Supabase.
      </footer>
    </div>
  );
  }

const IndexPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1>Daftar Tools Logikalokal</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tools.map((tool) => (
          <li key={tool.slug} style={{ marginBottom: 24, border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
            <h2 style={{ margin: '0 0 8px 0' }}>{tool.nama}</h2>
            <p style={{ margin: 0 }}>{tool.deskripsi}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
