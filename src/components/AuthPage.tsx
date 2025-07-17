import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseAvailable } from '../lib/supabase';
import { 
  UserCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Shield,
  Zap,
  Users,
  Globe,
  Sun,
  Moon
} from 'lucide-react';

interface AuthPageProps {
  language: 'fr' | 'en';
}

export default function AuthPage({ language }: AuthPageProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const content = {
    fr: {
      title: isLogin ? "Connexion" : "Créer un compte",
      subtitle: isLogin ? "Accédez à votre Coach Virtuel IA" : "Commencez votre transformation avec l'IA",
      email: "Adresse email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      loginButton: "Se connecter",
      signupButton: "Créer mon compte",
      switchToSignup: "Pas encore de compte ?",
      switchToLogin: "Déjà un compte ?",
      signupLink: "S'inscrire",
      loginLink: "Se connecter",
      loading: "Chargement...",
      back: "Retour",
      features: {
        title: "Pourquoi rejoindre People First Technologies ?",
        items: [
          {
            icon: Sparkles,
            title: "Coach IA Personnalisé",
            description: "Accès à notre Coach Virtuel basé sur le modèle 5R®"
          },
          {
            icon: Shield,
            title: "Sécurisé & Confidentiel",
            description: "Vos données sont protégées et chiffrées"
          },
          {
            icon: Zap,
            title: "Résultats Immédiats",
            description: "Conseils personnalisés en temps réel"
          }
        ]
      },
      validation: {
        emailRequired: "L'email est requis",
        emailInvalid: "Format d'email invalide",
        passwordRequired: "Le mot de passe est requis",
        passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
        passwordMismatch: "Les mots de passe ne correspondent pas"
      },
      success: {
        signup: "Compte créé avec succès ! Vérifiez votre email.",
        login: "Connexion réussie ! Redirection..."
      },
      freemium: {
        badge: "Gratuit",
        title: "Commencez gratuitement",
        description: "Essayez notre Coach IA avec 10 questions gratuites",
        upgrade: "Passer au Premium"
      }
    },
    en: {
      title: isLogin ? "Sign In" : "Create Account",
      subtitle: isLogin ? "Access your AI Virtual Coach" : "Start your transformation with AI",
      email: "Email address",
      password: "Password",
      confirmPassword: "Confirm password",
      loginButton: "Sign In",
      signupButton: "Create Account",
      switchToSignup: "Don't have an account?",
      switchToLogin: "Already have an account?",
      signupLink: "Sign up",
      loginLink: "Sign in",
      loading: "Loading...",
      back: "Back",
      features: {
        title: "Why join People First Technologies?",
        items: [
          {
            icon: Sparkles,
            title: "Personalized AI Coach",
            description: "Access to our Virtual Coach based on the 5R® model"
          },
          {
            icon: Shield,
            title: "Secure & Confidential",
            description: "Your data is protected and encrypted"
          },
          {
            icon: Zap,
            title: "Immediate Results",
            description: "Personalized advice in real-time"
          }
        ]
      },
      validation: {
        emailRequired: "Email is required",
        emailInvalid: "Invalid email format",
        passwordRequired: "Password is required",
        passwordTooShort: "Password must be at least 6 characters",
        passwordMismatch: "Passwords don't match"
      },
      success: {
        signup: "Account created successfully! Check your email.",
        login: "Login successful! Redirecting..."
      },
      freemium: {
        badge: "Free",
        title: "Start for free",
        description: "Try our AI Coach with 10 free questions",
        upgrade: "Upgrade to Premium"
      }
    }
  };

  const t = content[language];

  const validateForm = () => {
    if (!email) {
      setMessage({ type: 'error', text: t.validation.emailRequired });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: 'error', text: t.validation.emailInvalid });
      return false;
    }
    if (!password) {
      setMessage({ type: 'error', text: t.validation.passwordRequired });
      return false;
    }
    if (password.length < 6) {
      setMessage({ type: 'error', text: t.validation.passwordTooShort });
      return false;
    }
    if (!isLogin && password !== confirmPassword) {
      setMessage({ type: 'error', text: t.validation.passwordMismatch });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      // Check if Supabase is properly configured - MUST be first check
      if (!isSupabaseAvailable()) {
        // Demo mode - simulate authentication
        if (isLogin) {
          // Check demo credentials
          if (email === 'philippe@gmail.com' && password === 'pft2025#') {
            setMessage({ 
              type: 'success', 
              text: language === 'fr' 
                ? 'Connexion démo réussie ! Redirection...' 
                : 'Demo login successful! Redirecting...'
            });
            
            // Simulate user session in localStorage for demo
            localStorage.setItem('demo_user', JSON.stringify({
              id: 'demo-user-id',
              email: 'philippe@gmail.com',
              created_at: new Date().toISOString()
            }));
            
            setTimeout(() => navigate('/chat'), 1500);
            setLoading(false);
            return;
          } else {
            setMessage({ 
              type: 'error', 
              text: language === 'fr' 
                ? 'Mode démo actif. Utilisez philippe@gmail.com / pft2025# pour vous connecter.' 
                : 'Demo mode active. Use philippe@gmail.com / pft2025# to login.'
            });
            setLoading(false);
            return;
          }
        } else {
          // Signup not available in demo mode
          setMessage({ 
            type: 'error', 
            text: language === 'fr' 
              ? 'Mode démo actif. Seule la connexion avec philippe@gmail.com / pft2025# est disponible.' 
              : 'Demo mode active. Only login with philippe@gmail.com / pft2025# is available.'
          });
          setLoading(false);
          return;
        }
      }
      
      // Normal Supabase authentication - only reached if Supabase is available
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage({ type: 'success', text: t.success.login });
        setTimeout(() => navigate('/chat'), 1500);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        setMessage({ type: 'success', text: t.success.signup });
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      setMessage({ 
        type: 'error', 
        text: language === 'fr' 
          ? 'Erreur d\'authentification. Vérifiez vos identifiants.' 
          : 'Authentication error. Please check your credentials.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 shadow-lg pt-safe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[56px] sm:h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="group flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 bg-gray-100 dark:bg-gray-700 rounded-xl transition-all duration-200 ease-out"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-2 transition-transform duration-300" />
                <span>{t.back}</span>
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-gray-900">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">People First Technologies</h1>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 leading-tight">Management coaching</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 sm:p-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Features */}
            <div className="hidden lg:block space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>{t.freemium.badge}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  {t.features.title}
                </h2>
              </div>
              
              <div className="space-y-6">
                {t.features.items.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Freemium Badge */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.freemium.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {t.freemium.description}
                </p>
              </div>
            </div>
            
            {/* Right Side - Auth Form */}
            <div className="w-full max-w-md mx-auto lg:max-w-none">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50">
                
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t.subtitle}
                  </p>
                </div>

                {/* Message */}
                {message && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                    message.type === 'success' 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
                  }`}>
                    {message.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{message.text}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.email}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={t.email}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.password}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={t.password}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password (only for signup) */}
                  {!isLogin && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.confirmPassword}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder={t.confirmPassword}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                  >
                    {loading ? t.loading : (isLogin ? t.loginButton : t.signupButton)}
                  </button>
                </form>

                {/* Switch Form */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    {isLogin ? t.switchToSignup : t.switchToLogin}{' '}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setMessage(null);
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                      }}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
                    >
                      {isLogin ? t.signupLink : t.loginLink}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}