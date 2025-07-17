import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, isSupabaseAvailable } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  language: 'fr' | 'en';
}

export default function ProtectedRoute({ children, language }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // ALWAYS check for demo user first
      const demoUser = localStorage.getItem('demo_user');
      if (demoUser) {
          const parsedDemoUser = JSON.parse(demoUser);
          console.log('Demo user found:', parsedDemoUser);
          setUser(parsedDemoUser);
        setLoading(false);
        return;
      }
        
        // Only check Supabase if no demo user and Supabase is available
        if (isSupabaseAvailable()) {
          const { data: { session } } = await supabase.auth.getSession();
          setUser(session?.user ?? null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes only if Supabase is available
    let subscription: any = null;
    if (isSupabaseAvailable()) {
      const { data } = supabase.auth.onAuthStateChange(
        (event, session) => {
          // Don't override demo user with Supabase auth changes
          const demoUser = localStorage.getItem('demo_user');
          if (!demoUser) {
            setUser(session?.user ?? null);
          }
          setLoading(false);
        }
      );
      subscription = data.subscription;
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Listen for localStorage changes (for demo user)
  useEffect(() => {
    const handleStorageChange = () => {
      const demoUser = localStorage.getItem('demo_user');
      if (demoUser) {
        setUser(JSON.parse(demoUser));
        setLoading(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            {language === 'fr' ? 'Vérification...' : 'Checking...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  console.log('User authenticated:', user);
  return <>{children}</>;
}