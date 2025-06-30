import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { pertanyaan, gaya } = req.body || {};
  if (!pertanyaan || !gaya) {
    return res.status(400).json({ error: 'Input tidak lengkap. Mohon sertakan pertanyaan dan gaya.' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Kamu adalah admin toko online yang profesional. Tugasmu menjawab chat pelanggan secara sopan dan persuasif. Gunakan gaya yang diberikan.',
        },
        {
          role: 'user',
          content: `Pertanyaan: ${pertanyaan}\nGaya: ${gaya}`,
        },
      ],
      temperature: 0.7,
    });

    const jawaban = completion.choices?.[0]?.message?.content || '';
    res.status(200).json({ jawaban });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan.' });
  }
      }
