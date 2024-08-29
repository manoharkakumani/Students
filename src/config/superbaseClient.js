import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnnoKey = import.meta.env.SUPABASE_ANNON_KEY;

console.log(supabaseUrl, supabaseAnnoKey);

const supabase = createClient(supabaseUrl, supabaseAnnoKey);

export default supabase;
