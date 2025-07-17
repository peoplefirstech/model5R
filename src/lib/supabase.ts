import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if we have valid Supabase configuration
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.includes('supabase.co')

if (!isSupabaseConfigured) {
  console.warn('Supabase is not properly configured. Please update your .env file with valid Supabase credentials.')
}

// Create client with fallback for development
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => isSupabaseConfigured && supabase !== null

// Types pour l'authentification
export interface User {
  id: string
  email: string
  created_at: string
}

export interface AuthError {
  message: string
}