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
      console.log('Auth state changed:', event, session?.user?.email);
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
      console.log('Fetching profile for user:', userId);
      
      // First, check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('Profile not found, creating new profile');
        const { data: authUser } = await supabase.auth.getUser();
        
        if (authUser.user) {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              email: authUser.user.email,
              full_name: authUser.user.user_metadata?.full_name || authUser.user.email,
              role: authUser.user.email === 'onnyonje@gmail.com' ? 'admin' : 'user'
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating profile:', createError);
            return;
          }

          if (newProfile) {
            setUser({
              id: newProfile.id,
              email: newProfile.email,
              full_name: newProfile.full_name,
              avatar_url: newProfile.avatar_url,
              role: newProfile.role
            });
            
            // Fetch user subscription
            await fetchUserSubscription(userId);
          }
        }
      } else if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      } else if (profile) {
        console.log('Profile found:', profile);
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
      console.log('Fetching subscription for user:', userId);
      
      const { data: subscription, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          tier:subscription_tiers(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (error && error.code === 'PGRST116') {
        // No subscription found, create free subscription
        console.log('No subscription found, creating free subscription');
        
        const { data: newSubscription, error: createError } = await supabase
          .from('user_subscriptions')
          .insert({
            user_id: userId,
            tier_id: 'free',
            status: 'active'
          })
          .select(`
            *,
            tier:subscription_tiers(*)
          `)
          .single();

        if (createError) {
          console.error('Error creating free subscription:', createError);
          return;
        }

        setSubscription(newSubscription || null);
      } else if (error) {
        console.error('Error fetching subscription:', error);
        return;
      } else {
        console.log('Subscription found:', subscription);
        setSubscription(subscription || null);
      }
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
      console.log('Signing up user:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          },
          emailRedirectTo: undefined // Disable email confirmation for demo
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      console.log('Sign up successful:', data);
      return { error: null };
    } catch (error) {
      console.error('Sign up exception:', error);
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      console.log('Sign in successful:', data);
      return { error: null };
    } catch (error) {
      console.error('Sign in exception:', error);
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user');
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
    if (user?.role === 'admin' || user?.email === 'onnyonje@gmail.com') {
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