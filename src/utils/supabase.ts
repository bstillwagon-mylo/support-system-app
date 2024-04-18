import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY || ''

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
)

// Helper functions for interacting with Supabase

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  if (data.user) {
    localStorage.setItem('supabaseUser', JSON.stringify(data.user))
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  localStorage.removeItem('supabaseUser')
  localStorage.clear()

  if (error) {
    throw error
  }
}
