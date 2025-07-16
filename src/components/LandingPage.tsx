import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';
import PullToRefresh from './PullToRefresh';
import { useHapticFeedback } from './HapticFeedback';
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
  const { triggerLight, triggerMedium, triggerSelection } = useHapticFeedback();
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

  const handleRefresh = async () => {
    triggerMedium();
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    triggerSelection();
  };

  const handleLanguageChange = () => {
    triggerLight();
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const handleThemeChange = () => {
    triggerLight();
    setIsDark(!isDark);
  };

  const content = {
    fr: {
      nav: {
        askExpert: "Demander un Expert"
      },
      hero: {
        title: "Transformez votre management avec l'",
        titleHighlight: "Intelligence Artificielle",
        subtitle: "Transformez votre potentiel en performance grâce à notre Coach Virtuel IA basé sur le modèle 5R® de Cécile Dejoux. Une approche scientifique pour un développement humain authentique.",
        cta: "Commencer ma session",
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
        description: "Notre Coach Virtuel IA s'appuie sur le modèle révolutionnaire 5R® développé par Cécile Dejoux, une référence mondiale en management et transformation digitale.",
        description: "Notre Coach Virtuel IA s'appuie sur le modèle 5R® développé par Cécile Dejoux, une référence internationale en management et transformation digitale.",
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
        subtitle: "De nombreux professionnels ont déjà transformé leur approche du management",
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
        title: "Revolutionize your management with ",
        titleHighlight: "Artificial Intelligence",
        subtitle: "Transform your potential into performance with our AI Virtual Coach based on Cécile Dejoux's 5R® model.",
        cta: "Start my session",
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
        description: "Our AI Virtual Coach is based on the 5R® model developed by Cécile Dejoux, an international reference in management and digital transformation.",
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
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Navigation - Outside PullToRefresh for proper fixed positioning */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 shadow-lg pt-safe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[56px] sm:h-16 md:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-gray-900">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight">People First Technologies</h1>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 leading-tight">Coach Virtuel IA</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={handleLanguageChange}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 px-2 sm:px-3 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 font-medium"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-semibold">{language.toUpperCase()}</span>
              </button>
              
              <button
                onClick={handleThemeChange}
                className="p-2 sm:p-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              
              <a
                href="#contact"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contact</span>
              </a>
            </div>
            
            {/* Mobile Controls */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={handleLanguageChange}
                className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 font-medium min-h-[40px]"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-semibold">{language.toUpperCase()}</span>
              </button>
              
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              
              <button
                onClick={handleThemeChange}
                className="flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 min-h-[40px] min-w-[40px]"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              
              <a
                href="#contact"
                className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 min-h-[40px] min-w-[40px]"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <PullToRefresh onRefresh={handleRefresh} language={language}>
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-8 sm:pb-16 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl ${!isMobile ? 'animate-pulse-slow' : ''}`}></div>
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl ${!isMobile ? 'animate-pulse-slow' : ''}`} style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-8 ${!isMobile ? 'animate-fadeIn' : ''}`}>
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span className="tracking-wide">{language === 'fr' ? 'Modèle 5R® de Cécile Dejoux' : 'Cécile Dejoux\'s 5R® Model'}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  {t.hero.title}
                  <span className="gradient-text">{t.hero.titleHighlight}</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Transformez votre potentiel en performance grâce à notre Coach Virtuel IA basé sur le modèle 5R® de Cécile Dejoux.
                </p>
              </div>
              
              {/* CTA Principal Amélioré */}
              <div className="flex flex-col gap-4">
                <Link
                  to="/chat"
                  onClick={() => triggerMedium()}
                  className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl transition-all duration-500 ease-out flex items-center justify-center space-x-3 shadow-2xl shadow-purple-500/25 ring-2 ring-purple-500/20 hover:shadow-3xl hover:shadow-purple-500/40 hover:ring-purple-500/50 hover:-translate-y-1 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-700 before:to-pink-700 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
                >
                  <span className="relative z-10">{t.hero.cta}</span>
                  <ArrowRight className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
                </Link>
              </div>
              
              {/* Indicateurs simplifiés */}
              <div className="flex flex-col sm:flex-row items-start justify-start gap-4 sm:gap-6 pt-4 sm:pt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'fr' ? 'Gratuit pendant 14 jours' : 'Free for 14 days'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{language === 'fr' ? 'Aucune carte requise' : 'No card required'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>{language === 'fr' ? 'RGPD Conforme' : 'GDPR Compliant'}</span>
                </div>
              </div>
            </div>
            
            {/* Chat Mockup Interactif */}
            <div className={`relative ${!isMobile ? 'animate-slideUp' : ''}`}>
              {/* Bulle décorative animée en bas - exacte comme la capture */}
              <div className="hidden sm:block absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-br from-blue-400/40 via-purple-500/50 to-purple-600/60 rounded-full blur-2xl animate-float"></div>
              
              <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-8 border border-gray-200/50 dark:border-gray-700/50">
                
                <div className="relative space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Coach Virtuel IA</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Basé sur le modèle 5R®</p>
                    </div>
                    
                    {/* Statut En ligne - Position absolue à droite */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {language === 'fr' ? 'En ligne' : 'Online'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700/80 rounded-lg p-4">
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
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
                        <p className="text-xs sm:text-sm">
                          {t.hero.chatDemo.userQuestion}
                        </p>
                        <span className="text-xs opacity-75 mt-2 block">
                          {language === 'fr' ? '23:52' : '11:52 PM'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/80 rounded-lg p-4">
                      <p 
                        className="text-xs sm:text-sm text-gray-700 dark:text-gray-300"
                        dangerouslySetInnerHTML={{
                          __html: t.hero.chatDemo.response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 sm:pt-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={language === 'fr' ? "Tapez votre message..." : "Type your message..."}
                        className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled
                      />
                      <button className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
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
        <section id="solutions" className="relative py-8 sm:py-12 bg-gradient-to-b from-purple-50/30 via-white to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
        {/* Structured Background */}
        <div className="absolute inset-0">
          {/* Smooth transition from hero */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-gray-800/80 dark:to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with better structure */}
          <div className={`relative text-center mb-12 ${!isMobile ? 'animate-fadeIn' : ''}`}>
            <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="tracking-wide">{language === 'fr' ? 'Vos avantages' : 'Your benefits'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {t.features.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t.features.subtitle}
            </p>
          </div>
          
          {/* Connected Cards Container */}
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-gray-200/80 dark:border-gray-600/80 shadow-xl">
            {/* Connecting lines background */}
            <div className="hidden md:block absolute inset-0 opacity-10 dark:opacity-20">
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
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className={`group ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-300/80 dark:border-gray-600/80 text-center h-full transition-all duration-500 ease-out hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group-hover:scale-[1.02] group-hover:-translate-y-1">
                    
                    <div className="relative">
                      {/* Structured Icon Design */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg transition-all duration-500 ease-out">
                        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                        {feature.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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
        <section className="relative py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          {/* Subtle background effects */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className={`relative text-center mb-12 ${!isMobile ? 'animate-fadeIn' : ''}`}>
            <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <span className="tracking-wide">{language === 'fr' ? 'Méthode scientifique' : 'Scientific method'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {t.model5r.title}
            </h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.model5r.subtitle}
            </p>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t.model5r.description}
            </p>
          </div>
          
          {/* Connected 5R Cards */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {t.model5r.pillars.map((pillar, index) => (
              <div key={index} className={`group ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg h-full border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ease-out hover:shadow-xl hover:border-purple-300/60 dark:hover:border-purple-400/60 hover:-translate-y-1">
                  
                  {/* Premium Icon Container */}
                  <div className="relative mb-3 sm:mb-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center mx-auto shadow-lg transition-all duration-300 ease-out`}>
                      <span className="text-white font-bold text-lg sm:text-xl">{pillar.title[0]}</span>
                    </div>
                  </div>
                  
                  <h3 className={`text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-center transition-all duration-300 ${
                    index === 0 ? 'group-hover:text-blue-600' :
                    index === 1 ? 'group-hover:text-purple-600' :
                    index === 2 ? 'group-hover:text-green-600' :
                    index === 3 ? 'group-hover:text-orange-600' :
                    'group-hover:text-yellow-600'
                  }`}>
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed text-center px-1 sm:px-2">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </React.Suspense>

      {/* Disclaimer Section */}
      <React.Suspense fallback={<div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse"></div>}>
        <section className="relative py-12 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className={`text-center mb-12 ${!isMobile ? 'animate-fadeIn' : ''}`}>
              <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="tracking-wide">{language === 'fr' ? 'Utilisation optimale' : 'Optimal usage'}</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                {language === 'fr' ? 'Comprendre votre Coach IA' : 'Understanding your AI Coach'}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {language === 'fr' 
                  ? "Découvrez comment tirer le meilleur parti de votre Coach Virtuel IA pour une expérience optimale"
                  : "Discover how to get the most out of your AI Virtual Coach for an optimal experience"
                }
              </p>
            </div>
            
            {/* Modern Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {/* Assistant, pas remplaçant */}
              <div className={`group ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: '0.1s' }}>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-blue-300/60 dark:border-blue-500/60 h-full transition-all duration-300 hover:border-blue-400/80 dark:hover:border-blue-400/80 hover:shadow-xl hover:shadow-blue-500/15 dark:hover:shadow-blue-500/25 hover:-translate-y-2 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-300">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {language === 'fr' ? 'Assistant, pas remplaçant' : 'Assistant, not replacement'}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {language === 'fr' 
                          ? "Le Coach Virtuel IA complète mais ne remplace pas l'accompagnement humain d'un expert"
                          : "The AI Virtual Coach complements but does not replace human expert guidance"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Conseils génériques */}
              <div className={`group ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: '0.2s' }}>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-purple-300/60 dark:border-purple-500/60 h-full transition-all duration-300 hover:border-purple-400/80 dark:hover:border-purple-400/80 hover:shadow-xl hover:shadow-purple-500/15 dark:hover:shadow-purple-500/25 hover:-translate-y-2 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-300">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {language === 'fr' ? 'Conseils génériques' : 'Generic advice'}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {language === 'fr' 
                          ? "Les recommandations sont générales et peuvent nécessiter une adaptation à votre contexte spécifique"
                          : "Recommendations are general and may require adaptation to your specific context"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pas de diagnostic personnalisé */}
              <div className={`group ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: '0.3s' }}>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-emerald-300/60 dark:border-emerald-500/60 h-full transition-all duration-300 hover:border-emerald-400/80 dark:hover:border-emerald-400/80 hover:shadow-xl hover:shadow-emerald-500/15 dark:hover:shadow-emerald-500/25 hover:-translate-y-2 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-300">
                      <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {language === 'fr' ? 'Expertise approfondie disponible' : 'In-depth expertise available'}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {language === 'fr' 
                          ? "Pour un diagnostic approfondi et un plan d'action sur-mesure, contactez nos experts"
                          : "For in-depth diagnosis and customized action plan, contact our experts"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action Premium */}
            <div className={`relative bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-900/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {language === 'fr' ? 'Maximisez votre expérience' : 'Maximize your experience'}
                  </h3>
                  <div className="space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300">
                    <p className="text-base sm:text-lg leading-relaxed">
                      {language === 'fr' 
                        ? "Notre Coach Virtuel IA, basé sur le modèle 5R® de Cécile Dejoux, vous accompagne avec des conseils personnalisés et des bonnes pratiques éprouvées."
                        : "Our AI Virtual Coach, based on Cécile Dejoux's 5R® model, guides you with personalized advice and proven best practices."
                      }
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed">
                      {language === 'fr' 
                        ? "Pour aller plus loin avec un accompagnement personnalisé, nos experts People First Technologies sont à votre disposition."
                        : "To go further with personalized support, our People First Technologies experts are at your disposal."
                      }
                    </p>
                    <div className="pt-3 sm:pt-4">
                      <a 
                        href="#contact" 
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
                      >
                        <span>{language === 'fr' ? 'Parler à un expert' : 'Talk to an expert'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Suspense>

      {/* Testimonials Section */}
      <React.Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-900 animate-pulse"></div>}>
        <section className="relative py-8 sm:py-12 bg-gradient-to-b from-gray-100/50 to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0">
          {/* Smooth connection from 5R */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-gray-800 dark:to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${!isMobile ? 'animate-fadeIn' : ''}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t.testimonials.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </div>
          
          {/* Connected testimonials container */}
          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-gray-200/80 dark:border-gray-600/80 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {t.testimonials.items.map((testimonial, index) => (
              <div key={index} className={`group ${!isMobile ? 'animate-slideUp' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-gray-300/80 dark:border-gray-600/80 h-full">
                  {/* Badge premium au lieu des étoiles */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>{language === 'fr' ? 'Témoignage vérifié' : 'Verified testimonial'}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed italic text-xs sm:text-sm">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
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
      
      {/* Mobile Navigation */}
      <MobileNavigation 
        language={language}
        isDark={isDark}
        onLanguageChange={handleLanguageChange}
        onThemeChange={handleThemeChange}
      />
      </PullToRefresh>
    </div>
  );
}