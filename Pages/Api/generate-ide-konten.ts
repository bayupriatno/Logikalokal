import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { topik, audiens } = req.body || {};
  if (!topik || !audiens) {
    return res.status(400).json({ error: 'Input tidak lengkap. Mohon sertakan topik dan target audiens.' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Kamu adalah ahli konten kreatif. Buat 5 ide konten harian menarik, singkat, dan sesuai dengan topik dan target audiens.',
        },
        {
          role: 'user',
          content: `Topik: ${topik}\nTarget Audiens: ${audiens}`,
        },
      ],
      temperature: 0.85,
    });

    const output = completion.choices?.[0]?.message?.content || '';
    const ideList = output
      .split('\n')
      .map((item) => item.replace(/^[0-9]+[\).\s-]*/, '').trim())
      .filter(Boolean);

    res.status(200).json({ ideList });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
  }
      }
