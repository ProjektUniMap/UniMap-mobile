import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
  User as SupabaseUser,
} from '@supabase/supabase-js';
import { Profile } from '../types';
import { getProfileById } from '../api/profile.api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  full_name: string;
}

interface AuthContextProps {
  user: SupabaseUser | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: ({
    email,
    password,
  }: SignInCredentials) => Promise<AuthTokenResponsePassword>;
  signUp: ({
    email,
    password,
    full_name,
  }: SignUpCredentials) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setProfile(await getProfileById(data.session?.user?.id!));
        setIsLoading(false);
        //   console.log(profile);
      } catch (error) {
        console.error('Error getting session', error);
        setIsLoading(false);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setSession(session);
          setUser(session?.user ?? null);
          setProfile(await getProfileById(session?.user?.id!));
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      },
    );
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (response.error) {
      setUser(null);
      setSession(null);
      setProfile(null);
    } else {
      setUser(response.data.user!);
      setSession(response.data.session);
      setProfile(await getProfileById(response.data.user!.id));
    }
    return response;
  };

  const signUp = async ({ email, password, full_name }: SignUpCredentials) => {
    const response = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name } },
    });
    if (response.error) {
      setUser(null);
      setSession(null);
      setProfile(null);
    } else {
      setUser(response.data.user!);
      setSession(response.data.session);
      setProfile(await getProfileById(response.data.user!.id));
    }
    return response;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, session, isLoading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
