import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aurfraclqzsxntlcptwi.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_l4DpyVh2XhOrC2fuk5ljjw_1oLbQ6CS';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);