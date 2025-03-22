import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;  
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;  

// Vérification des variables d'environnement
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or key is missing.');
} else {
  const supabase = createClient(supabaseUrl, supabaseKey);
  export default supabase;
}
