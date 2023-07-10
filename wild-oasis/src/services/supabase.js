import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://gajgkvgubluimiivcggj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhamdrdmd1Ymx1aW1paXZjZ2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg3MTM0NTAsImV4cCI6MjAwNDI4OTQ1MH0.G7qF5AKxRx7T_HzDdKRzy0vdcUf2eK5FUszr9pTwRgA'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;