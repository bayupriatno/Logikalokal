import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { produk, keunggulan } = req.body || {};
  if (!produk || !keunggulan) {
    return res.status(400).json({ error: 'Input tidak lengkap. Mohon sertakan nama produk dan keunggulan.' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Kamu adalah copywriter handal. Buat deskripsi produk menarik dan persuasif maksimal 100 kata, cocok untuk marketplace dan sosial media.',
        },
        {
          role: 'user',
          content: `Nama Produk: ${produk}\nKeunggulan: ${keunggulan}`,
        },
      ],
      temperature: 0.8,
    });

    const deskripsi = completion.choices?.[0]?.message?.content || '';
    res.status(200).json({ deskripsi });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
  }
}
