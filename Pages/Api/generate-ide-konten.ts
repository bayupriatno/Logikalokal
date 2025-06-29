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
          'Kamu adalah ahli konten kreatif. Buat 5 ide konten harian menarik, singkat, dan sesuai dengan topik dan target audiens.',
      },
      {
        role: 'user',
        content: `Topik: ${topik}\nTarget Audiens: ${audiens}`,
      },
    ],
    temperature: 0.85,
  });

  const output = completion.choices[0].message.content || '';
  const ideList = output
    .split('\n')
    .map((item) => item.replace(/^[0-9]+\W*/, '').trim())
    .filter(Boolean);

  res.status(200).json({ ideList });
}