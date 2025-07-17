import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Zap } from 'lucide-react';

interface DemoLoginBypassProps {
  language: 'fr' | 'en';
}

export default function DemoLoginBypass({ language }: DemoLoginBypassProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate demo user login immediately
    const demoUser = {
      id: 'demo-user-id',
      email: 'philippe@gmail.com',
      created_at: new Date().toISOString()
    };

    // Set demo user in localStorage
    localStorage.setItem('demo_user', JSON.stringify(demoUser));

    // Redirect to chat after a short delay for visual feedback
    const timer = setTimeout(() => {
      navigate('/chat', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const content = {
    fr: {
      title: "Connexion automatique...",
      subtitle: "Accès direct au Coach Virtuel IA",
      message: "Redirection vers le chat en cours..."
    },
    en: {
      title: "Auto-connecting...",
      subtitle: "Direct access to AI Virtual Coach",
      message: "Redirecting to chat..."
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/25 animate-pulse">
            <UserCheck className="w-10 h-10 text-white" />
          </div>
          
          {/* Animated rings */}
          <div className="absolute inset-0 w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-2 border-purple-300 dark:border-purple-600 rounded-3xl animate-ping"></div>
            <div className="absolute inset-2 border-2 border-pink-300 dark:border-pink-600 rounded-2xl animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.subtitle}
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            {t.message}
          </span>
        </div>

        {/* Demo badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
          <Zap className="w-4 h-4" />
          <span>Mode Démo</span>
        </div>
      </div>
    </div>
  );
}