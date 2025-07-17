import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// More comprehensive check for valid Supabase configuration
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseUrl !== 'your_supabase_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseAnonKey !== 'your_anon_key_here' &&
  supabaseAnonKey !== 'your_supabase_anon_key_here' &&
  supabaseUrl.includes('supabase.co') &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 50 // Supabase anon keys are typically longer

if (!isSupabaseConfigured) {
  console.error('❌ Supabase Configuration Error:')
  console.error('Current VITE_SUPABASE_URL:', supabaseUrl || 'NOT SET')
  console.error('Current VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'NOT SET')
  console.error('Please update your .env file with valid Supabase credentials from your project dashboard.')
  console.error('1. Go to https://supabase.com/dashboard')
  console.error('2. Select your project')
  console.error('3. Go to Settings > API')
  console.error('4. Copy the Project URL and anon/public key to your .env file')
}

// Create client with fallback for development
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => isSupabaseConfigured

// Types pour l'authentification
export interface User {
  id: string
  email: string
  created_at: string
}

export interface AuthError {
  message: string
}