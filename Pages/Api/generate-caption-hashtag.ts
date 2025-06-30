import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });
  const { deskripsi, platform } = req.body || {};
  if (!deskripsi || !platform)
    return res.status(400).json({ error: 'Deskripsi dan platform wajib diisi.' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            `Kamu adalah ahli social media marketing. Buatkan caption dan 10 hashtag populer untuk "${platform}".`,
        },
        {
          role: 'user',
          content: deskripsi,
        },
      ],
      temperature: 0.8,
    });

    const output = completion.choices?.[0]?.message?.content || '';
    // Pisahkan caption & hashtag (asumsi output: Caption:\n...\nHashtag:\n#... #...)
    const [captionBlock, hashtagBlock] = output.split('Hashtag:');
    const caption = (captionBlock || '').replace('Caption:', '').trim();
    const hashtags = (hashtagBlock || '').trim();
    res.status(200).json({ caption, hashtags });
  } catch (e) {
    res.status(500).json({ error: 'Gagal generate caption/hashtag.' });
  }
    }
