import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { bidang, nilai } = req.body || {};
  if (!bidang || !nilai) {
    return res.status(400).json({ error: 'Input tidak lengkap. Mohon sertakan bidang dan nilai brand.' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Kamu adalah ahli branding kreatif. Buat 5 nama brand singkat, mudah diingat, dan mencerminkan bidang serta nilai brand.',
        },
        {
          role: 'user',
          content: `Bidang: ${bidang}\nNilai: ${nilai}`,
        },
      ],
      temperature: 0.85,
    });

    const output = completion.choices?.[0]?.message?.content || '';
    const namaList = output
      .split('\n')
      .map((item) => item.replace(/^[0-9]+[\).\s-]*/, '').trim())
      .filter(Boolean);

    res.status(200).json({ namaList });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
  }
}
