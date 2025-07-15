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
  Sparkles
} from 'lucide-react';
import Footer from './Footer';
import PreFooter from './PreFooter';
import ContactForm from './ContactForm';

export default function LandingPage() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
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
        tryChat: "Essayer le chat"
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
        tryChat: "Try the chat"
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
              
              <Link
                to="#contact"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>Modèle 5R® de Cécile Dejoux</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  {t.hero.title}
                  <span className="gradient-text">{t.hero.titleHighlight}</span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/chat"
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  <span>{t.hero.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
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
            
            <div className="relative animate-slideUp">
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                
                <div className="relative space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Coach Virtuel IA</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Basé sur le modèle 5R®</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">En ligne</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {language === 'fr' 
                          ? "Bonjour ! Je suis votre Coach Virtuel IA. Posez-moi vos questions sur le management, l'engagement d'équipe et la transformation. Recevez des conseils personnalisés basés sur le modèle 5R®."
                          : "Hello! I'm your AI Virtual Coach. Ask me questions about management, team engagement and transformation. Get personalized advice based on the 5R® model."
                        }
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                        {language === 'fr' ? '23:51' : '11:51 PM'}
                      </span>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 max-w-xs">
                        <p className="text-sm">
                          {language === 'fr' 
                            ? "Comment améliorer les règles dans mon équipe ?"
                            : "How to improve rules in my team?"
                          }
                        </p>
                        <span className="text-xs opacity-75 mt-2 block">
                          {language === 'fr' ? '00:07' : '12:07 AM'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p 
                        className="text-sm text-gray-700 dark:text-gray-300"
                        dangerouslySetInnerHTML={{
                          __html: language === 'fr' 
                            ? "Pour améliorer les **règles**, organisez un atelier collaboratif où l'équipe co-construit...".replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            : "To improve **rules**, organize a collaborative workshop where the team co-builds...".replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
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
      <section id="solutions" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group text-center animate-slideUp hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5R Model Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.model5r.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t.model5r.subtitle}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t.model5r.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.model5r.pillars.map((pillar, index) => (
              <div key={index} className="group animate-slideUp hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 dark:border-gray-700">
                  <div className={`w-12 h-12 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white font-bold text-lg">{pillar.title[0]}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.testimonials.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <div key={index} className="group animate-slideUp hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
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
      </section>

      {/* PreFooter */}
      <PreFooter language={language} />

      {/* Contact Form */}
      <ContactForm language={language} />

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}