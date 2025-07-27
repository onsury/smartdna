// Mock Supabase client - NO REAL SUPABASE NEEDED
const mockSupabase = {
  auth: {
    getSession: async () => ({ 
      data: { 
        session: { 
          user: { id: '123', email: 'test@example.com' } 
        } 
      }, 
      error: null 
    }),
    getUser: async () => ({ 
      data: { user: { id: '123', email: 'test@example.com' } }, 
      error: null 
    }),
    signOut: async () => ({ error: null }),
    signInWithPassword: async () => ({ 
      data: { user: { id: '123', email: 'test@example.com' } }, 
      error: null 
    }),
    signUp: async () => ({ 
      data: { user: { id: '123', email: 'test@example.com' } }, 
      error: null 
    }),
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: () => ({
          execute: async () => ({ data: null, error: null })
        })
      })
    })
  })
};

export const supabase = mockSupabase as any;

export const authHelpers = {
  async getCurrentUser() {
    return { id: '123', email: 'test@example.com' };
  },
  
  async signOut() {
    console.log('Mock sign out');
  },
  
  async signIn(email: string, password: string) {
    console.log('Mock sign in:', email);
    return { user: { id: '123', email } };
  },
  
  async signUp(email: string, password: string, fullName: string, companyName: string) {
    console.log('Mock sign up:', email);
    return { user: { id: '123', email } };
  },
  
  async checkDNACompleted(userId: string) {
    return false;
  }
};