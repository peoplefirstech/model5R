import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCheck, 
  Users, 
  Target, 
  Zap, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Star,
  Globe,
  Moon,
  Sun,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  Shield,
  Lightbulb,
  Heart,
  Sparkles,
  Clock,
  HeadphonesIcon,
  Headphones
} from 'lucide-react';
import Footer from './Footer';
import PreFooter from './PreFooter';
import ContactForm from './ContactForm';

// Hook pour détecter les appareils mobiles
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Composant pour l'animation de frappe
const TypingAnimation = ({ text, speed = 50, language }: { text: string; speed?: number; language: 'fr' | 'en' }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorTimer);
  }, []);
  
  return (
    <span>
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default function LandingPage() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const isMobile = useIsMobile();
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
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDark]);

  const content = {
    fr: {
      nav: {
        askExpert: "Demander un Expert"
      },
      hero: {
        title: "Révolutionnez votre coaching avec l'",
        titleHighlight: "Intelligence Artificielle",
        subtitle: "Transformez votre potentiel en performance grâce à notre Coach Virtuel IA basé sur le modèle 5R® de Cécile Dejoux. Une approche scientifique pour un développement humain authentique.",
        cta: "Commencer maintenant",
        tryChat: "Essayer le chat",
        trustIndicators: {
          launch: "Lancement 2024",
          satisfaction: "95% de satisfaction",
          support: "Support 24/7"
        },
        certifications: {
          iso: "ISO 27001",
          ai: "IA Certifiée",
          gdpr: "RGPD Conforme"
        },
        chatDemo: {
          greeting: "Bonjour ! Je suis votre Coach Virtuel IA. Posez-moi vos questions sur le management, l'engagement d'équipe et la transformation. Recevez des conseils personnalisés basés sur le modèle 5R®.",
          userQuestion: "Comment améliorer les règles dans mon équipe ?",
          response: "Pour améliorer les **règles**, organisez un atelier collaboratif où l'équipe co-construit..."
        }
      },
      features: {
        title: "Pourquoi choisir notre Coach Virtuel IA ?",
        subtitle: "Une approche révolutionnaire qui combine intelligence artificielle et expertise humaine",
        items: [
          {
            icon: UserCheck,
            title: "Intelligence Artificielle Avancée",
            description: "Algorithmes de pointe pour un coaching personnalisé et adaptatif"
          },
          {
            icon: Target,
            title: "Résultats Mesurables",
            description: "Suivi précis de vos progrès avec des métriques détaillées"
          },
          {
            icon: Users,
            title: "Approche Humaine",
            description: "L'IA au service de l'humain pour un développement authentique"
          }
        ]
      },
      model5r: {
        title: "Le Modèle 5R® de Cécile Dejoux",
        subtitle: "Une méthode scientifiquement prouvée pour l'engagement et la performance",
        description: "Notre Coach Virtuel IA s'appuie sur le modèle révolutionnaire 5R® développé par le Professeur Cécile Dejoux, une référence mondiale en management et transformation digitale.",
        pillars: [
          {
            title: "Rôles",
            description: "Clarifier les responsabilités et missions de chaque membre de l'équipe",
            color: "from-blue-500 to-cyan-500"
          },
          {
            title: "Routines",
            description: "Établir des processus et rituels efficaces pour optimiser la collaboration",
            color: "from-purple-500 to-pink-500"
          },
          {
            title: "Règles",
            description: "Définir un cadre de fonctionnement clair et des valeurs partagées",
            color: "from-green-500 to-emerald-500"
          },
          {
            title: "Respect",
            description: "Cultiver un environnement de confiance et de bienveillance mutuelle",
            color: "from-orange-500 to-red-500"
          },
          {
            title: "Reconnaissance",
            description: "Valoriser les contributions et célébrer les succès individuels et collectifs",
            color: "from-yellow-500 to-orange-500"
          }
        ]
      },
      testimonials: {
        title: "Ce que disent nos utilisateurs",
        subtitle: "Des milliers de professionnels ont déjà transformé leur approche du coaching",
        items: [
          {
            name: "Marie Dubois",
            role: "Directrice RH, TechCorp",
            content: "Le Coach Virtuel IA a révolutionné notre approche du développement des talents. Les résultats sont impressionnants !",
            rating: 5,
            avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
          },
          {
            name: "Jean Martin",
            role: "Manager, InnovateNow",
            content: "Une solution exceptionnelle qui combine parfaitement technologie et approche humaine. Mes équipes sont plus engagées que jamais.",
            rating: 5,
            avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
          },
          {
            name: "Sophie Laurent",
            role: "Coach Professionnelle",
            content: "Le modèle 5R® intégré dans l'IA offre une structure solide pour accompagner mes clients vers l'excellence.",
            rating: 5,
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
          }
        ]
      },
      cta: {
        title: "Prêt à transformer votre potentiel ?",
        subtitle: "Rejoignez des milliers de professionnels qui ont déjà révolutionné leur approche du coaching",
        button: "Commencer gratuitement",
        contact: "Parler à un expert"
      }
    },
    en: {
      nav: {
        askExpert: "Ask an Expert"
      },
      hero: {
        title: "Revolutionize your coaching with ",
        titleHighlight: "Artificial Intelligence",
        subtitle: "Transform your potential into performance with our AI Virtual Coach based on Cécile Dejoux's 5R® model. A scientific approach for authentic human development.",
        cta: "Get started now",
        tryChat: "Try the chat",
        trustIndicators: {
          launch: "Launched 2024",
          satisfaction: "95% satisfaction",
          support: "24/7 support"
        },
        certifications: {
          iso: "ISO 27001",
          ai: "AI Certified",
          gdpr: "GDPR Compliant"
        },
        chatDemo: {
          greeting: "Hello! I'm your AI Virtual Coach. Ask me questions about management, team engagement and transformation. Get personalized advice based on the 5R® model.",
          userQuestion: "How to improve rules in my team?",
          response: "To improve **rules**, organize a collaborative workshop where the team co-builds..."
        }
      },
      features: {
        title: "Why choose our AI Virtual Coach?",
        subtitle: "A revolutionary approach that combines artificial intelligence and human expertise",
        items: [
          {
            icon: UserCheck,
            title: "Advanced Artificial Intelligence",
            description: "Cutting-edge algorithms for personalized and adaptive coaching"
          },
          {
            icon: Target,
            title: "Measurable Results",
            description: "Precise tracking of your progress with detailed metrics"
          },
          {
            icon: Users,
            title: "Human Approach",
            description: "AI serving humanity for authentic development"
          }
        ]
      },
      model5r: {
        title: "Cécile Dejoux's 5R® Model",
        subtitle: "A scientifically proven method for engagement and performance",
        description: "Our AI Virtual Coach is based on the revolutionary 5R® model developed by Professor Cécile Dejoux, a global reference in management and digital transformation.",
        pillars: [
          {
            title: "Roles",
            description: "Clarify the responsibilities and missions of each team member",
            color: "from-blue-500 to-cyan-500"
          },
          {
            title: "Routines",
            description: "Establish effective processes and rituals to optimize collaboration",
            color: "from-purple-500 to-pink-500"
          },
          {
            title: "Rules",
            description: "Define a clear operating framework and shared values",
            color: "from-green-500 to-emerald-500"
          },
          {
            title: "Respect",
            description: "Cultivate an environment of trust and mutual benevolence",
            color: "from-orange-500 to-red-500"
          },
          {
            title: "Recognition",
            description: "Value contributions and celebrate individual and collective successes",
            color: "from-yellow-500 to-orange-500"
          }
        ]
      },
      testimonials: {
        title: "What our users say",
        subtitle: "Thousands of professionals have already transformed their coaching approach",
        items: [
          {
            name: "Marie Dubois",
            role: "HR Director, TechCorp",
            content: "The AI Virtual Coach has revolutionized our talent development approach. The results are impressive!",
            rating: 5,
            avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
          },
          {
            name: "Jean Martin",
            role: "Manager, InnovateNow",
            content: "An exceptional solution that perfectly combines technology and human approach. My teams are more engaged than ever.",
            rating: 5,
            avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
          },
          {
            name: "Sophie Laurent",
            role: "Professional Coach",
            content: "The 5R® model integrated into AI provides a solid structure to guide my clients towards excellence.",
            rating: 5,
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
          }
        ]
      },
      cta: {
        title: "Ready to transform your potential?",
        subtitle: "Join thousands of professionals who have already revolutionized their coaching approach",
        button: "Start for free",
        contact: "Talk to an expert"
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">People First Technologies</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Coach Virtuel IA</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center space-x-1 text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              {/* Séparateur visuel */}
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              
              <a
                href="#contact"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl ${!isMobile ? 'animate-pulse-slow' : ''}`}></div>
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl ${!isMobile ? 'animate-pulse-slow' : ''}`} style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${!isMobile ? 'animate-fadeIn' : ''}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'fr' ? 'Modèle 5R® de Cécile Dejoux' : 'Cécile Dejoux\'s 5R® Model'}</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  {t.hero.title}
                  <span className="gradient-text">{t.hero.titleHighlight}</span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>
              
              {/* CTA Principal Amélioré */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/chat"
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105 shadow-2xl hover:shadow-purple-500/30 ring-2 ring-purple-500/20 hover:ring-purple-500/40"
                >
                  <span>{t.hero.cta}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              
              {/* Indicateurs de confiance */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold">{t.hero.trustIndicators.launch}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{t.hero.trustIndicators.satisfaction}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Headphones className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">{t.hero.trustIndicators.support}</span>
                  </div>
                </div>
              </div>
              
              {/* Certifications */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 pt-2">
                <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                  <Shield className="w-3 h-3" />
                  <span>{t.hero.certifications.iso}</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                  <Zap className="w-3 h-3" />
                  <span>{t.hero.certifications.ai}</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  <span>{t.hero.certifications.gdpr}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'fr' ? 'Gratuit pendant 14 jours' : 'Free for 14 days'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'fr' ? 'Aucune carte requise' : 'No card required'}</span>
                </div>
              </div>
            </div>
            
            {/* Chat Mockup Interactif */}
            <div className={`relative ${!isMobile ? 'animate-slideUp' : ''}`}>
              <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-10 dark:opacity-20 ${!isMobile ? 'animate-pulse-slow' : ''}`}></div>
                <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-10 dark:opacity-20 ${!isMobile ? 'animate-pulse-slow' : ''}`} style={{ animationDelay: '1s' }}></div>
                
                <div className="relative space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Coach Virtuel IA</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Basé sur le modèle 5R®</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">En ligne</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700/80 rounded-lg p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <TypingAnimation 
                          text={t.hero.chatDemo.greeting}
                          speed={30}
                          language={language}
                        />
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                        {language === 'fr' ? '23:51' : '11:51 PM'}
                      </span>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white rounded-lg p-4 max-w-xs">
                        <p className="text-sm">
                          {t.hero.chatDemo.userQuestion}
                        </p>
                        <span className="text-xs opacity-75 mt-2 block">
                          {language === 'fr' ? '23:52' : '11:52 PM'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/80 rounded-lg p-4">
                      <p 
                        className="text-sm text-gray-700 dark:text-gray-300"
                        dangerouslySetInnerHTML={{
                          __html: t.hero.chatDemo.response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={language === 'fr' ? "Tapez votre message..." : "Type your message..."}
                        className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled
                      />
                      <button className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <React.Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse"></div>}>
        <section id="solutions" className="relative py-12 bg-gradient-to-b from-purple-50/30 via-white to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
        {/* Structured Background */}
        <div className="absolute inset-0">
          {/* Smooth transition from hero */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-gray-800/80 dark:to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with better structure */}
          <div className={`relative text-center mb-12 ${!isMobile ? 'animate-fadeIn' : ''}`}>
            <div className="inline-flex items-center space-x-2 bg-purple-100/80 dark:bg-purple-900/30 backdrop-blur-sm border border-purple-300/50 dark:border-purple-600/50 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-md">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>{language === 'fr' ? 'Vos avantages' : 'Your benefits'}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t.features.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t.features.subtitle}
            </p>
          </div>
          
          {/* Connected Cards Container */}
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200/80 dark:border-gray-600/80 shadow-xl">
            {/* Connecting lines background */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
                <line x1="16.5" y1="50" x2="50" y2="50" stroke="url(#connectionGradient)" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="83.5" y2="50" stroke="url(#connectionGradient)" strokeWidth="0.5" />
              </svg>
            </div>
            
            {/* Cards Grid with connection */}
            <div className="relative grid md:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className={`group ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-300/80 dark:border-gray-600/80 text-center h-full transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 group-hover:scale-105 group-hover:-translate-y-2">
                    
                    <div className="relative">
                      {/* Structured Icon Design */}
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>
      </React.Suspense>


      {/* 5R Model Section */}
      <React.Suspense fallback={<div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse"></div>}>
        <section className="relative py-12 bg-gradient-to-b from-white via-gray-50/50 to-gray-100/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          {/* Smooth connection from features */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className={`relative text-center mb-12 ${!isMobile ? 'animate-fadeIn' : ''}`}>
            <div className="inline-flex items-center space-x-2 bg-purple-100/80 dark:bg-purple-900/30 backdrop-blur-sm border border-purple-300/50 dark:border-purple-600/50 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-md">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <span className="tracking-wide">{language === 'fr' ? 'Méthode scientifique' : 'Scientific method'}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {t.model5r.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              {t.model5r.subtitle}
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t.model5r.description}
            </p>
          </div>
          
          {/* Connected 5R Cards */}
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200/80 dark:border-gray-600/80 shadow-xl">
            {/* Connection lines for 5R */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="fiveRGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="25%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#22c55e" />
                    <stop offset="75%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                </defs>
                <line x1="10" y1="50" x2="90" y2="50" stroke="url(#fiveRGradient)" strokeWidth="0.8" />
              </svg>
            </div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.model5r.pillars.map((pillar, index) => (
              <div key={index} className={`group ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg h-full border-2 border-gray-300/80 dark:border-gray-600/80 transition-all duration-500 ease-out hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 hover:scale-[1.02] hover:-translate-y-1">
                  
                  <div className={`relative w-12 h-12 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center mb-4 shadow-md mx-auto transition-all duration-500 ease-out`}>
                    <span className="text-white font-bold text-base">{pillar.title[0]}</span>
                  </div>
                  
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 text-center">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed text-center">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      </React.Suspense>

      {/* Testimonials Section */}
      <React.Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-900 animate-pulse"></div>}>
        <section className="relative py-12 bg-gradient-to-b from-gray-100/50 to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0">
          {/* Smooth connection from 5R */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-gray-800 dark:to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${!isMobile ? 'animate-fadeIn' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t.testimonials.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </div>
          
          {/* Connected testimonials container */}
          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border-2 border-gray-200/80 dark:border-gray-600/80 shadow-xl">
            <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((testimonial, index) => (
              <div key={index} className={`group ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-300/80 dark:border-gray-600/80 h-full hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed italic text-sm">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      </React.Suspense>

      {/* PreFooter */}
      <PreFooter language={language} />

      {/* Contact Form */}
      <ContactForm language={language} />

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}