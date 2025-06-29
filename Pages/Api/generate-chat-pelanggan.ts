import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pertanyaan, gaya } = req.body;

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

  const jawaban = completion.choices[0].message.content || '';
  res.status(200).json({ jawaban });
}