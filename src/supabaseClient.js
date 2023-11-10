import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iqazssmzpvxscwdpdnvy.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxYXpzc216cHZ4c2N3ZHBkbnZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODc0NTg4MSwiZXhwIjoyMDE0MzIxODgxfQ.353F2hUzsvSzhRu2hoPiMg-MYkdvmeMAehJdOK_Kpms';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
