import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { topik, audiens } = req.body;

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

  const output = completion.choices[0]?.message?.content || '';
  const judulList = output
    .split('\\n')
    .map((item) => item.replace(/^\\d+[\\).\\s-]*/, '').trim())
    .filter(Boolean);

  res.status(200).json({ judulList });
}