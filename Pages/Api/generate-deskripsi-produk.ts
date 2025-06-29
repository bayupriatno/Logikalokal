import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { produk, keunggulan } = req.body;

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

  const deskripsi = completion.choices[0].message.content || '';
  res.status(200).json({ deskripsi });
}