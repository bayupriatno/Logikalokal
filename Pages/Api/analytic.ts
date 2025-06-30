import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

// Contoh: analitik sederhana (jumlah post, engagement)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method not allowed' });
  try {
    // Contoh: hitung jumlah posting per platform
    const { data, error } = await supabase
      .from('posts')
      .select('platform, engagement')
    if (error) throw error;

    const summary: Record<string, { total: number; engagement: number }> = {};
    (data || []).forEach((row) => {
      const plat = row.platform;
      if (!summary[plat]) summary[plat] = { total: 0, engagement: 0 };
      summary[plat].total += 1;
      summary[plat].engagement += row.engagement || 0;
    });
    res.status(200).json({ summary });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
      }
