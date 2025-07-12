import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Brain, 
  Users, 
  Target, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Star, 
  Quote,
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Shield
} from 'lucide-react';
import Footer from './components/Footer';
import LegalPages from './components/LegalPages';

function App() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      navigate('/');
    } else if (page === 'legal') {
      navigate('/mentions-legales');
    } else if (page === 'privacy') {
      navigate('/politique-confidentialite');
    } else if (page === 'cookies') {
      navigate('/politique-cookies');
    } else {
      setCurrentPage(page);
    }
    setIsMenuOpen(false);
  };

  const handleBackToHome = () => {
    navigate('/');
    setCurrentPage('home');
  };

  // Main content component
  const MainContent = () => {
    const content = {
      fr: {
        nav: {
          home: "Accueil",
          about: "À propos",
          services: "Services",
          contact: "Contact"
        },
        hero: {
          title: "Révolutionnez votre coaching avec l'IA",
          subtitle: "Transformez votre potentiel en performance grâce à notre coach virtuel intelligent",
          cta: "Découvrir la démo",
          expert: "Demander un expert"
        },
        features: {
          title: "Pourquoi choisir notre Coach IA ?",
          subtitle: "Une approche révolutionnaire du développement personnel et professionnel",
          items: [
            {
              icon: Brain,
              title: "Intelligence Artificielle Avancée",
              description: "Notre IA analyse vos besoins et adapte le coaching en temps réel pour maximiser votre progression."
            },
            {
              icon: Users,
              title: "Personnalisation Complète",
              description: "Chaque session est unique, adaptée à votre profil, vos objectifs et votre rythme d'apprentissage."
            },
            {
              icon: Target,
              title: "Résultats Mesurables",
              description: "Suivez vos progrès avec des métriques précises et des recommandations d'amélioration continue."
            },
            {
              icon: Zap,
              title: "Disponibilité 24/7",
              description: "Votre coach virtuel est disponible à tout moment pour vous accompagner dans votre développement."
            }
          ]
        },
        stats: {
          title: "Des résultats qui parlent",
          items: [
            { number: "95%", label: "Satisfaction client" },
            { number: "3x", label: "Amélioration des performances" },
            { number: "24/7", label: "Disponibilité" },
            { number: "500+", label: "Entreprises accompagnées" }
          ]
        },
        testimonials: {
          title: "Ce que disent nos clients",
          items: [
            {
              name: "Marie Dubois",
              role: "Directrice RH, TechCorp",
              content: "Le coach IA a transformé notre approche du développement des talents. Nos équipes sont plus engagées et performantes.",
              rating: 5
            },
            {
              name: "Pierre Martin",
              role: "CEO, StartupInnovante",
              content: "Incroyable ! En 3 mois, j'ai développé des compétences de leadership que je n'aurais jamais imaginées.",
              rating: 5
            },
            {
              name: "Sophie Laurent",
              role: "Manager, GlobalServices",
              content: "L'IA comprend parfaitement mes défis et propose des solutions concrètes. C'est révolutionnaire !",
              rating: 5
            }
          ]
        },
        contact: {
          title: "Prêt à transformer votre potentiel ?",
          subtitle: "Contactez-nous pour découvrir comment notre Coach IA peut révolutionner votre développement",
          form: {
            name: "Nom complet",
            email: "Email professionnel",
            company: "Entreprise",
            message: "Décrivez vos objectifs",
            submit: "Envoyer ma demande"
          },
          info: {
            title: "Informations de contact",
            address: "123 Avenue de l'Innovation\n75001 Paris, France",
            phone: "+33 1 23 45 67 89",
            email: "contact@peoplefirst.tech"
          }
        }
      },
      en: {
        nav: {
          home: "Home",
          about: "About",
          services: "Services",
          contact: "Contact"
        },
        hero: {
          title: "Revolutionize your coaching with AI",
          subtitle: "Transform your potential into performance with our intelligent virtual coach",
          cta: "Discover the demo",
          expert: "Ask an Expert"
        },
        features: {
          title: "Why choose our AI Coach?",
          subtitle: "A revolutionary approach to personal and professional development",
          items: [
            {
              icon: Brain,
              title: "Advanced Artificial Intelligence",
              description: "Our AI analyzes your needs and adapts coaching in real-time to maximize your progress."
            },
            {
              icon: Users,
              title: "Complete Personalization",
              description: "Each session is unique, adapted to your profile, goals and learning pace."
            },
            {
              icon: Target,
              title: "Measurable Results",
              description: "Track your progress with precise metrics and continuous improvement recommendations."
            },
            {
              icon: Zap,
              title: "24/7 Availability",
              description: "Your virtual coach is available anytime to support your development journey."
            }
          ]
        },
        stats: {
          title: "Results that speak for themselves",
          items: [
            { number: "95%", label: "Client satisfaction" },
            { number: "3x", label: "Performance improvement" },
            { number: "24/7", label: "Availability" },
            { number: "500+", label: "Companies supported" }
          ]
        },
        testimonials: {
          title: "What our clients say",
          items: [
            {
              name: "Marie Dubois",
              role: "HR Director, TechCorp",
              content: "The AI coach transformed our approach to talent development. Our teams are more engaged and performant.",
              rating: 5
            },
            {
              name: "Pierre Martin",
              role: "CEO, StartupInnovante",
              content: "Amazing! In 3 months, I developed leadership skills I never imagined possible.",
              rating: 5
            },
            {
              name: "Sophie Laurent",
              role: "Manager, GlobalServices",
              content: "The AI perfectly understands my challenges and offers concrete solutions. It's revolutionary!",
              rating: 5
            }
          ]
        },
        contact: {
          title: "Ready to transform your potential?",
          subtitle: "Contact us to discover how our AI Coach can revolutionize your development",
          form: {
            name: "Full name",
            email: "Professional email",
            company: "Company",
            message: "Describe your goals",
            submit: "Send my request"
          },
          info: {
            title: "Contact information",
            address: "123 Innovation Avenue\n75001 Paris, France",
            phone: "+33 1 23 45 67 89",
            email: "contact@peoplefirst.tech"
          }
        }
      }
    };

    const t = content[language];

    const renderPage = () => {
      switch (currentPage) {
        case 'about':
          return (
            <div className="min-h-screen bg-gray-50 pt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {language === 'fr' ? 'À propos de nous' : 'About us'}
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    {language === 'fr' 
                      ? 'People First Technologies révolutionne le coaching avec l\'intelligence artificielle pour créer des expériences d\'apprentissage personnalisées et impactantes.'
                      : 'People First Technologies revolutionizes coaching with artificial intelligence to create personalized and impactful learning experiences.'
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      {language === 'fr' ? 'Notre mission' : 'Our mission'}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {language === 'fr'
                        ? 'Nous croyons que chaque individu possède un potentiel unique. Notre mission est de démocratiser l\'accès au coaching de qualité grâce à l\'intelligence artificielle, permettant à chacun de révéler et développer ses talents.'
                        : 'We believe that every individual has unique potential. Our mission is to democratize access to quality coaching through artificial intelligence, enabling everyone to reveal and develop their talents.'
                      }
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">
                          {language === 'fr' ? 'Coaching personnalisé par IA' : 'AI-powered personalized coaching'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">
                          {language === 'fr' ? 'Disponibilité 24/7' : '24/7 availability'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">
                          {language === 'fr' ? 'Résultats mesurables' : 'Measurable results'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <Brain className="w-16 h-16 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold mb-2">
                            {language === 'fr' ? 'IA Avancée' : 'Advanced AI'}
                          </h3>
                          <p className="text-purple-100">
                            {language === 'fr' 
                              ? 'Technologie de pointe pour un coaching optimal'
                              : 'Cutting-edge technology for optimal coaching'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'services':
          return (
            <div className="min-h-screen bg-gray-50 pt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {language === 'fr' ? 'Nos services' : 'Our services'}
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    {language === 'fr' 
                      ? 'Découvrez notre gamme complète de solutions de coaching IA adaptées à vos besoins.'
                      : 'Discover our complete range of AI coaching solutions tailored to your needs.'
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Users,
                      title: language === 'fr' ? 'Coaching Individuel' : 'Individual Coaching',
                      description: language === 'fr' 
                        ? 'Sessions personnalisées adaptées à vos objectifs spécifiques'
                        : 'Personalized sessions adapted to your specific goals'
                    },
                    {
                      icon: Target,
                      title: language === 'fr' ? 'Coaching d\'Équipe' : 'Team Coaching',
                      description: language === 'fr' 
                        ? 'Développement collectif pour améliorer la performance d\'équipe'
                        : 'Collective development to improve team performance'
                    },
                    {
                      icon: TrendingUp,
                      title: language === 'fr' ? 'Leadership' : 'Leadership',
                      description: language === 'fr' 
                        ? 'Développez vos compétences de leader avec l\'IA'
                        : 'Develop your leadership skills with AI'
                    },
                    {
                      icon: Award,
                      title: language === 'fr' ? 'Performance' : 'Performance',
                      description: language === 'fr' 
                        ? 'Optimisez vos performances professionnelles'
                        : 'Optimize your professional performance'
                    },
                    {
                      icon: Clock,
                      title: language === 'fr' ? 'Gestion du Temps' : 'Time Management',
                      description: language === 'fr' 
                        ? 'Maîtrisez votre temps et votre productivité'
                        : 'Master your time and productivity'
                    },
                    {
                      icon: Sparkles,
                      title: language === 'fr' ? 'Créativité' : 'Creativity',
                      description: language === 'fr' 
                        ? 'Libérez votre potentiel créatif'
                        : 'Unleash your creative potential'
                    }
                  ].map((service, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'contact':
          return (
            <div className="min-h-screen bg-gray-50 pt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {t.contact.title}
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    {t.contact.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.contact.form.name}
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder={t.contact.form.name}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.contact.form.email}
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder={t.contact.form.email}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.contact.form.company}
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder={t.contact.form.company}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.contact.form.message}
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder={t.contact.form.message}
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {t.contact.form.submit}
                      </button>
                    </form>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.info.title}</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-purple-500 mr-3 mt-1" />
                          <div>
                            <p className="text-gray-600 whitespace-pre-line">{t.contact.info.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-purple-500 mr-3" />
                          <p className="text-gray-600">{t.contact.info.phone}</p>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-purple-500 mr-3" />
                          <p className="text-gray-600">{t.contact.info.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <>
              {/* Hero Section */}
              <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Background Effects */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <div className="animate-fadeIn">
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-200 text-sm font-medium mb-8">
                      <Sparkles className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Nouvelle génération de coaching' : 'Next generation coaching'}
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                      <span className="gradient-text">{t.hero.title}</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                      {t.hero.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center">
                        <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                        {t.hero.cta}
                      </button>
                      
                      <button
                        onClick={() => handleNavigate('contact')}
                        className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center"
                      >
                        <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                        Demander un expert
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <ChevronDown className="w-6 h-6 text-white/60" />
                </div>
              </section>

              {/* Features Section */}
              <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16 animate-slideUp">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {t.features.title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      {t.features.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.features.items.map((feature, index) => (
                      <div key={index} className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Stats Section */}
              <section className="py-24 bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      {t.stats.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.stats.items.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                          {stat.number}
                        </div>
                        <div className="text-purple-100 text-lg font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonials Section */}
              <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {t.testimonials.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.testimonials.items.map((testimonial, index) => (
                      <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-gray-700 mb-6 italic">
                          <Quote className="w-6 h-6 text-purple-500 mb-2" />
                          "{testimonial.content}"
                        </blockquote>
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-gray-600 text-sm">{testimonial.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          );
      }
    };

    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">People First Technologies</h1>
                  <p className="text-xs text-purple-600">Coach Virtuel IA</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => handleNavigate('home')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'home' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {t.nav.home}
                </button>
                <button
                  onClick={() => handleNavigate('about')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'about' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {t.nav.about}
                </button>
                <button
                  onClick={() => handleNavigate('services')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'services' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {t.nav.services}
                </button>
                <button
                  onClick={() => handleNavigate('contact')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'contact' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {t.nav.contact}
                </button>
              </div>

              {/* Language Toggle & CTA */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                  className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md border transition-all duration-200 border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {language.toUpperCase()}
                </button>

                <button
                  onClick={() => handleNavigate('contact')}
                  className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 group border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50"
                >
                  <Mail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  Demander un expert
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200">
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigate('home')}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                  >
                    {t.nav.home}
                  </button>
                  <button
                    onClick={() => handleNavigate('about')}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                  >
                    {t.nav.about}
                  </button>
                  <button
                    onClick={() => handleNavigate('services')}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                  >
                    {t.nav.services}
                  </button>
                  <button
                    onClick={() => handleNavigate('contact')}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                  >
                    {t.nav.contact}
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {renderPage()}
        </main>

        {/* Footer */}
        <Footer language={language} onNavigate={handleNavigate} />
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route 
        path="/mentions-legales" 
        element={<LegalPages page="legal" language={language} onBack={handleBackToHome} />} 
      />
      <Route 
        path="/politique-confidentialite" 
        element={<LegalPages page="privacy" language={language} onBack={handleBackToHome} />} 
      />
      <Route 
        path="/politique-cookies" 
        element={<LegalPages page="cookies" language={language} onBack={handleBackToHome} />} 
      />
    </Routes>
  );
}

export default App;