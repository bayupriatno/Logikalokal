'use client';
import { useEffect, useState } from 'react';

export default function BookmarkButton({ slug }: { slug: string }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarkedTools') || '[]');
    setBookmarked(saved.includes(slug));
  }, [slug]);

  const toggleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem('bookmarkedTools') || '[]');
    let updated;
    if (saved.includes(slug)) {
      updated = saved.filter((item: string) => item !== slug);
    } else {
      updated = [...saved, slug];
    }
    localStorage.setItem('bookmarkedTools', JSON.stringify(updated));
    setBookmarked(updated.includes(slug));
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`text-sm px-3 py-1 rounded border ${bookmarked ? 'bg-yellow-400 text-black' : 'bg-gray-200'}`}
    >
      {bookmarked ? '⭐ Disimpan' : '☆ Simpan'}
    </button>
  );
}