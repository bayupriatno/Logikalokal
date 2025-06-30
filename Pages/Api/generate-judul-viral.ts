import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { topik, audiens } = req.body || {};
  if (!topik || !audiens) {
    return res.status(400).json({ error: 'Input tidak lengkap. Mohon sertakan topik dan audiens.' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Kamu adalah pakar konten viral. Tugasmu membuat 5 judul konten IG/TikTok yang menarik, pendek, dan clickbait tapi tetap etis. Gunakan emoji dan bahasa gaul ringan.',
        },
        {
          role: 'user',
          content: `Topik: ${topik}\nAudiens: ${audiens}`,
        },
      ],
      temperature: 0.9,
    });

    const output = completion.choices?.[0]?.message?.content || '';
    const judulList = output
      .split('\n')
      .map((item) => item.replace(/^[0-9]+[\).\s-]*/, '').trim())
      .filter(Boolean);

    res.status(200).json({ judulList });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
  }
}
