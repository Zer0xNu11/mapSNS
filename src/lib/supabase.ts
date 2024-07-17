import { createClient } from '@supabase/supabase-js'
 
const supabaseUrl = process.env.SUPABASE_STRAGE_URL as string
const supabaseAnonKey = process.env.SUPABASE_ACCESSKEY as string
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
