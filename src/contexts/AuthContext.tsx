import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, User, Profile, UserSubscription, SubscriptionTier } from '../lib/supabase';
import { Session, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  subscription: UserSubscription | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: AuthError | null }>;
  hasAccess: (feature: string) => boolean;
  refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setSubscription(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (profile) {
        setUser({
          id: profile.id,
          email: profile.email,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          role: profile.role
        });
        
        // Fetch user subscription
        await fetchUserSubscription(userId);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const fetchUserSubscription = async (userId: string) => {
    try {
      const { data: subscription, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          tier:subscription_tiers(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching subscription:', error);
        return;
      }

      setSubscription(subscription || null);
    } catch (error) {
      console.error('Error in fetchUserSubscription:', error);
    }
  };

  const refreshSubscription = async () => {
    if (user) {
      await fetchUserSubscription(user.id);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setSubscription(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) {
        return { error: new Error('No user logged in') as AuthError };
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (!error) {
        // Update local user state
        setUser(prev => prev ? { ...prev, ...updates } : null);
      }

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const hasAccess = (feature: string): boolean => {
    // Admin has access to everything
    if (user?.role === 'admin') {
      return true;
    }

    // No subscription means free tier
    if (!subscription || !subscription.tier) {
      return feature === 'chapter_1';
    }

    const tierFeatures = subscription.tier.features || [];
    
    // Check specific feature access
    if (feature.startsWith('chapter_')) {
      const chapterNum = parseInt(feature.split('_')[1]);
      if (chapterNum === 1) return true; // Chapter 1 is always free
      return tierFeatures.includes('all_chapters');
    }

    return tierFeatures.includes(feature);
  };

  const isAdmin = user?.role === 'admin' || user?.email === 'onnyonje@gmail.com';

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      subscription,
      isAdmin,
      loading, 
      signUp, 
      signIn, 
      signOut, 
      updateProfile,
      hasAccess,
      refreshSubscription
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}