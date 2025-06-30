import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('templates').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ templates: data });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
