import { createClient } from '@supabase/supabase-js'

// Environment variables with fallback to mock values
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mock-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key'

// Create a mock client for development if no real credentials are provided
let supabaseClient;

try {
  if (SUPABASE_URL === 'https://mock-project.supabase.co' || SUPABASE_ANON_KEY === 'mock-anon-key') {
    console.warn('⚠️ Using mock Supabase client - authentication disabled for development');
    
    // Mock Supabase client for development
    supabaseClient = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: (callback) => {
          callback('SIGNED_OUT', null);
          return { data: { subscription: { unsubscribe: () => {} } } };
        },
        signInWithOAuth: () => Promise.resolve({ data: null, error: new Error('Mock mode - authentication disabled') }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Mock mode - authentication disabled') }),
        signUp: () => Promise.resolve({ data: null, error: new Error('Mock mode - authentication disabled') }),
        signOut: () => Promise.resolve({ error: null }),
        updateUser: () => Promise.resolve({ data: null, error: new Error('Mock mode - authentication disabled') })
      }
    };
  } else {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  }
} catch (error) {
  console.error('Supabase client creation failed:', error);
  
  // Fallback mock client
  supabaseClient = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: (callback) => {
        callback('SIGNED_OUT', null);
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      signInWithOAuth: () => Promise.resolve({ data: null, error: new Error('Supabase unavailable') }),
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase unavailable') }),
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase unavailable') }),
      signOut: () => Promise.resolve({ error: null }),
      updateUser: () => Promise.resolve({ data: null, error: new Error('Supabase unavailable') })
    }
  };
}

export default supabaseClient;