import { NextApiRequest, NextApiResponse } from 'next';

// Penyimpanan sementara di memory (reset jika server restart)
let favoritList: string[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Ambil semua favorit
    return res.status(200).json({ favorit: favoritList });
  }
  if (req.method === 'POST') {
    const { item } = req.body || {};
    if (!item || typeof item !== 'string' || !item.trim()) {
      return res.status(400).json({ error: 'Item favorit tidak boleh kosong.' });
    }
    favoritList.push(item);
    return res.status(200).json({ favorit: favoritList });
  }
  if (req.method === 'DELETE') {
    const { index } = req.body || {};
    if (typeof index !== 'number' || index < 0 || index >= favoritList.length) {
      return res.status(400).json({ error: 'Index tidak valid.' });
    }
    favoritList.splice(index, 1);
    return res.status(200).json({ favorit: favoritList });
  }
  return res.status(405).json({ error: 'Method not allowed.' });
}
