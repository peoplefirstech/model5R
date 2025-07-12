import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, RotateCcw, Shield, Heart, Award, Send, Mail, ExternalLink, ArrowRight, AlertTriangle, CheckCircle, XCircle, Home, Sparkles, Brain, Target, Zap, Star, Globe, ChevronRight, Play, BookOpen, TrendingUp } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'presentation' | 'chat'>('presentation');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const pillars = [
    {
      id: 'roles',
      title: language === 'fr' ? 'Rôles' : 'Roles',
      subtitle: language === 'fr' ? 'Roles' : 'Rôles',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-400',
      description: language === 'fr' 
        ? 'Clarifier les rôles et responsabilités de chacun dans l\'équipe'
        : 'Clarify roles and responsibilities of each team member'
    },
    {
      id: 'routines',
      title: language === 'fr' ? 'Routines' : 'Routines',
      subtitle: language === 'fr' ? 'Routines' : 'Routines',
      icon: RotateCcw,
      gradient: 'from-purple-500 to-pink-400',
      description: language === 'fr'
        ? 'Instaurer des routines collectives et individuelles positives'
        : 'Establish positive collective and individual routines'
    },
    {
      id: 'rules',
      title: language === 'fr' ? 'Règles' : 'Rules',
      subtitle: language === 'fr' ? 'Rules' : 'Règles',
      icon: Shield,
      gradient: 'from-green-500 to-emerald-400',
      description: language === 'fr'
        ? 'Co-construire des règles de fonctionnement partagées'
        : 'Co-build shared operating rules'
    },
    {
      id: 'respect',
      title: language === 'fr' ? 'Respect' : 'Respect',
      subtitle: language === 'fr' ? 'Respect' : 'Respect',
      icon: Heart,
      gradient: 'from-red-500 to-pink-400',
      description: language === 'fr'
        ? 'Favoriser le respect et la bienveillance mutuelle'
        : 'Foster mutual respect and kindness'
    },
    {
      id: 'recognition',
      title: language === 'fr' ? 'Reconnaissance' : 'Recognition',
      subtitle: language === 'fr' ? 'Recognition' : 'Reconnaissance',
      icon: Award,
      gradient: 'from-yellow-500 to-orange-400',
      description: language === 'fr'
        ? 'Valoriser la reconnaissance et célébrer les réussites'
        : 'Value recognition and celebrate successes'
    }
  ];

  const useCases = [
    {
      title: language === 'fr' ? "Management d'équipe" : "Team Management",
      description: language === 'fr' ? "Améliorer l'engagement et la cohésion" : "Improve engagement and cohesion",
      icon: Users,
      gradient: 'from-blue-500 to-purple-600',
      examples: language === 'fr' 
        ? ["Clarifier les rôles après réorganisation", "Rituels d'équipe motivants", "Renforcer la reconnaissance"]
        : ["Clarify roles after reorganization", "Motivating team rituals", "Strengthen recognition"]
    },
    {
      title: language === 'fr' ? "Transformation digitale" : "Digital Transformation",
      description: language === 'fr' ? "Accompagner le changement avec 5R®" : "Support change with 5R®",
      icon: Zap,
      gradient: 'from-purple-500 to-pink-500',
      examples: language === 'fr'
        ? ["Adapter les routines aux outils", "Redéfinir les règles", "Maintenir l'engagement"]
        : ["Adapt routines to tools", "Redefine rules", "Maintain engagement"]
    },
    {
      title: language === 'fr' ? "Onboarding" : "Onboarding",
      description: language === 'fr' ? "Intégrer efficacement les nouveaux" : "Effectively integrate newcomers",
      icon: Target,
      gradient: 'from-green-500 to-blue-500',
      examples: language === 'fr'
        ? ["Présenter rôles et missions", "Transmettre la culture", "Environnement accueillant"]
        : ["Present roles and missions", "Transmit culture", "Welcoming environment"]
    },
    {
      title: language === 'fr' ? "Gestion de crise" : "Crisis Management",
      description: language === 'fr' ? "Maintenir la cohésion en difficulté" : "Maintain cohesion in difficulty",
      icon: Shield,
      gradient: 'from-red-500 to-orange-500',
      examples: language === 'fr'
        ? ["Clarifier les priorités", "Adapter les processus", "Renforcer le soutien"]
        : ["Clarify priorities", "Adapt processes", "Strengthen support"]
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: language === 'fr' ? "DRH, Fortune 500" : "HR Director, Fortune 500",
      content: language === 'fr' 
        ? "Le modèle 5R® a transformé notre approche managériale. +40% d'engagement en 6 mois."
        : "The 5R® model transformed our managerial approach. +40% engagement in 6 months.",
      company: "Air France"
    },
    {
      name: "Thomas Martin",
      role: language === 'fr' ? "Directeur Transformation" : "Transformation Director",
      content: language === 'fr'
        ? "Un cadre scientifique qui fonctionne vraiment. Nos équipes sont plus alignées que jamais."
        : "A scientific framework that really works. Our teams are more aligned than ever.",
      company: "Michelin"
    },
    {
      name: "Sophie Laurent",
      role: language === 'fr' ? "CEO Startup" : "Startup CEO",
      content: language === 'fr'
        ? "Simple, efficace, mesurable. Le 5R® nous a aidés à structurer notre croissance."
        : "Simple, effective, measurable. 5R® helped us structure our growth.",
      company: "TechCorp"
    }
  ];

  const chatResponses: Record<string, string> = {
    default: language === 'fr' 
      ? "Bonjour ! Je suis votre Coach Virtuel IA by People First Technologies, basé sur le modèle 5R® de la Professeure Cécile Dejoux. Je peux vous aider à améliorer l'engagement de votre équipe grâce aux 5 piliers : Rôles, Routines, Règles, Respect et Reconnaissance. Quelle dimension souhaitez-vous explorer ?"
      : "Hello! I'm your Virtual AI Coach by People First Technologies, based on Professor Cécile Dejoux's 5R® model. I can help you improve your team's engagement through the 5 pillars: Roles, Routines, Rules, Respect and Recognition. Which dimension would you like to explore?",
    roles: language === 'fr'
      ? "Pour clarifier les **Rôles** dans votre équipe, commencez par organiser une session de mapping des responsabilités. Chaque membre doit pouvoir exprimer sa compréhension de son rôle et celui des autres. Créez ensuite des fiches de poste évolutives et planifiez des points de clarification trimestriels."
      : "To clarify **Roles** in your team, start by organizing a responsibility mapping session. Each member should be able to express their understanding of their role and that of others. Then create evolving job descriptions and plan quarterly clarification points.",
    routines: language === 'fr'
      ? "Les **Routines** positives sont essentielles à l'engagement. Je recommande d'instaurer des rituels comme un stand-up hebdomadaire, des moments de célébration mensuelle, et des pauses café informelles. L'important est la régularité et l'adhésion de tous."
      : "Positive **Routines** are essential to engagement. I recommend establishing rituals like weekly stand-ups, monthly celebration moments, and informal coffee breaks. The important thing is regularity and everyone's buy-in.",
    rules: language === 'fr'
      ? "Pour les **Règles**, organisez un atelier collaboratif où l'équipe co-construit sa charte de fonctionnement. Définissez ensemble les modes de communication, les processus de décision, et les règles de résolution de conflits. L'appropriation collective est clé."
      : "For **Rules**, organize a collaborative workshop where the team co-builds its operating charter. Define together communication methods, decision-making processes, and conflict resolution rules. Collective ownership is key.",
    respect: language === 'fr'
      ? "Le **Respect** se cultive par des actions concrètes : sessions de formation à l'écoute active, mise en place d'une politique de feedback bienveillant, et création d'espaces d'expression sécurisés. Le leadership doit montrer l'exemple."
      : "**Respect** is cultivated through concrete actions: active listening training sessions, implementing a benevolent feedback policy, and creating safe expression spaces. Leadership must set the example.",
    recognition: language === 'fr'
      ? "La **Reconnaissance** peut prendre de nombreuses formes : feedback positif en temps réel, système de peer-to-peer recognition, célébration des jalons, ou encore valorisation des efforts d'apprentissage. L'important est la sincérité et la régularité."
      : "**Recognition** can take many forms: real-time positive feedback, peer-to-peer recognition systems, milestone celebrations, or valuing learning efforts. The important thing is sincerity and regularity.",
    engagement: language === 'fr'
      ? "L'engagement se construit en agissant simultanément sur les 5R®. Commencez par un diagnostic de l'existant sur chaque pilier, puis priorisez 2-3 actions concrètes par trimestre. L'important est la cohérence et la persévérance."
      : "Engagement is built by acting simultaneously on the 5R®. Start with a diagnosis of the existing situation on each pillar, then prioritize 2-3 concrete actions per quarter. The important thing is consistency and perseverance.",
    transformation: language === 'fr'
      ? "En période de transformation, le modèle 5R® offre un cadre stabilisant. Clarifiez les nouveaux rôles, adaptez les routines, redéfinissez les règles ensemble, maintenez le respect malgré l'incertitude, et reconnaissez les efforts d'adaptation."
      : "During transformation periods, the 5R® model offers a stabilizing framework. Clarify new roles, adapt routines, redefine rules together, maintain respect despite uncertainty, and recognize adaptation efforts."
  };

  // Charger le thème depuis localStorage au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Sauvegarder le thème dans localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Initialiser les messages avec le message par défaut
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: chatResponses.default,
        isBot: true,
        timestamp: new Date()
      }
    ]);
  }, [language]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const lowerInput = inputText.toLowerCase();
    let response = language === 'fr' 
      ? "Merci pour votre question ! Le modèle 5R® peut vous aider à résoudre ce défi. Pourriez-vous me préciser quel pilier vous intéresse le plus ? Ou contactez notre équipe pour un accompagnement personnalisé : contact@peoplefirst-technologies.com"
      : "Thank you for your question! The 5R® model can help you solve this challenge. Could you specify which pillar interests you most? Or contact our team for personalized support: contact@peoplefirst-technologies.com";

    if (lowerInput.includes('rôle') || lowerInput.includes('role')) {
      response = chatResponses.roles;
    } else if (lowerInput.includes('routine')) {
      response = chatResponses.routines;
    } else if (lowerInput.includes('règle') || lowerInput.includes('rule')) {
      response = chatResponses.rules;
    } else if (lowerInput.includes('respect')) {
      response = chatResponses.respect;
    } else if (lowerInput.includes('reconnaissance') || lowerInput.includes('recognition')) {
      response = chatResponses.recognition;
    } else if (lowerInput.includes('engagement')) {
      response = chatResponses.engagement;
    } else if (lowerInput.includes('transformation')) {
      response = chatResponses.transformation;
    }

    setTimeout(() => {
      const contactText = language === 'fr' 
        ? "\n\nPour un accompagnement personnalisé, n'hésitez pas à contacter notre équipe : contact@peoplefirst-technologies.com"
        : "\n\nFor personalized support, don't hesitate to contact our team: contact@peoplefirst-technologies.com";
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: response + contactText,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText('');
  };

  const themeClasses = {
    bg: isDarkMode ? 'bg-black' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    border: isDarkMode ? 'border-white/10' : 'border-gray-200',
    cardBg: isDarkMode ? 'bg-white/5' : 'bg-gray-50',
    headerBg: isDarkMode ? 'bg-black/80' : 'bg-white/80',
    inputBg: isDarkMode ? 'bg-white/10' : 'bg-gray-100',
    inputBorder: isDarkMode ? 'border-white/20' : 'border-gray-300',
    hoverBg: isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100',
    glassBg: isDarkMode ? 'bg-white/5 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm',
    gradientBg: isDarkMode ? 'from-purple-900/20 via-black to-blue-900/20' : 'from-blue-50 via-white to-purple-50'
  };

  const PresentationPage = () => (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg} ${themeClasses.text}`}>
      {/* Header avec navigation */}
      <header className={`relative z-50 ${isDarkMode ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-xl border-b sticky top-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="https://res.cloudinary.com/doo9fgw4x/image/upload/v1752331776/PFT_zizh77.png" 
                alt="People First Technologies" 
                className="h-8 w-auto"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Switch */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    language === 'fr' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🇫🇷 FR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    language === 'en' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🇬🇧 EN
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  {isDarkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  )}
                </svg>
              </button>
              
              {/* Contact Expert Button */}
              <button
                onClick={() => setCurrentPage('chat')}
                className={`inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 group ${
                  isDarkMode
                    ? 'border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white hover:bg-gray-800'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Mail className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Demander un expert' : 'Request an expert'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses.gradientBg}`}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section optimisé */}
          <section className="py-20 text-center animate-fadeIn">
            <div className={`inline-flex items-center px-4 py-2 ${themeClasses.glassBg} rounded-full text-sm ${themeClasses.textSecondary} mb-8 ${themeClasses.border} border`}>
              <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
              {language === 'fr' ? 'Powered by AI • Modèle 5R® Scientifique' : 'Powered by AI • Scientific 5R® Model'}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">{language === 'fr' ? 'Coach Virtuel IA' : 'Virtual AI Coach'}</span>
              <br />
              <span className={themeClasses.text}>5R®</span>
            </h1>
            
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto mb-12 leading-relaxed`}>
              {language === 'fr' 
                ? 'Transformez votre management par l\'engagement humain avec des conseils personnalisés basés sur le modèle scientifique 5R® de la Professeure Cécile Dejoux.'
                : 'Transform your management through human engagement with personalized advice based on Professor Cécile Dejoux\'s scientific 5R® model.'
              }
            </p>
            
            {/* CTA principal optimisé */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => setCurrentPage('chat')}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-pft-blue to-purple-600 text-white rounded-2xl hover:from-pft-blue/90 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                {language === 'fr' ? 'Essayez le Coach IA' : 'Try AI Coach'}
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Preuves sociales */}
            <div className={`flex flex-wrap items-center justify-center gap-8 text-sm ${themeClasses.textMuted}`}>
              <span className={`flex items-center ${themeClasses.glassBg} px-4 py-2 rounded-full ${themeClasses.border} border`}>
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                {language === 'fr' ? '500 000+ personnes formées' : '500,000+ people trained'}
              </span>
              <span className={`flex items-center ${themeClasses.glassBg} px-4 py-2 rounded-full ${themeClasses.border} border`}>
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                {language === 'fr' ? 'Fortune 500 partenaires' : 'Fortune 500 partners'}
              </span>
              <span className={`flex items-center ${themeClasses.glassBg} px-4 py-2 rounded-full ${themeClasses.border} border`}>
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                {language === 'fr' ? 'Recherche validée' : 'Validated research'}
              </span>
            </div>
          </section>

          {/* Section Modèle 5R® */}
          <section id="modele" className="py-20 animate-slideUp">
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
                {language === 'fr' ? 'Le Modèle 5R® de Cécile Dejoux' : 'Cécile Dejoux\'s 5R® Model'}
              </h2>
              <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
                {language === 'fr' 
                  ? 'Cinq piliers scientifiquement validés pour transformer l\'engagement et la performance de vos équipes'
                  : 'Five scientifically validated pillars to transform your teams\' engagement and performance'
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div 
                    key={pillar.id} 
                    className={`group ${themeClasses.glassBg} rounded-2xl p-8 ${themeClasses.border} border hover:border-opacity-40 transition-all duration-300 hover-lift animate-fadeIn cursor-pointer`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => {
                      setCurrentPage('chat');
                      setTimeout(() => {
                        const question = language === 'fr' 
                          ? `Comment améliorer les ${pillar.title.toLowerCase()} dans mon équipe ?`
                          : `How to improve ${pillar.title.toLowerCase()} in my team?`;
                        setInputText(question);
                      }, 500);
                    }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${pillar.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-2xl font-semibold ${themeClasses.text} mb-3`}>{pillar.title}</h3>
                    <p className={`${themeClasses.textMuted} leading-relaxed mb-4`}>{pillar.description}</p>
                    <div className="flex items-center text-purple-500 font-medium">
                      {language === 'fr' ? 'Explorer ce pilier' : 'Explore this pillar'}
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Caution Scientifique condensée */}
            <div className={`bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 ${themeClasses.border} border`}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className={`text-2xl font-bold mb-4 ${themeClasses.text} flex items-center`}>
                    <Star className="w-6 h-6 mr-3 text-yellow-500" />
                    {language === 'fr' ? 'Caution Scientifique' : 'Scientific Endorsement'}
                  </h3>
                  <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                    {language === 'fr'
                      ? 'Modèle développé par la Professeure Cécile Dejoux (CNAM, ESCP), expert reconnu en management et transformation digitale.'
                      : 'Model developed by Professor Cécile Dejoux (CNAM, ESCP), recognized expert in management and digital transformation.'
                    }
                  </p>
                  <a 
                    href="https://www.ceciledejoux.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-500 hover:text-purple-400 transition-colors font-medium"
                  >
                    {language === 'fr' ? 'Découvrir son profil' : 'Discover her profile'} 
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-2">500K+</div>
                    <div className={`text-sm ${themeClasses.textMuted}`}>
                      {language === 'fr' ? 'Personnes formées' : 'People trained'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">100+</div>
                    <div className={`text-sm ${themeClasses.textMuted}`}>
                      {language === 'fr' ? 'Entreprises' : 'Companies'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Cas d'Usage */}
          <section id="cas-usage" className="py-20">
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
                {language === 'fr' ? 'Cas d\'Usage du Coach Virtuel IA' : 'Virtual AI Coach Use Cases'}
              </h2>
              <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
                {language === 'fr'
                  ? 'Découvrez comment le modèle 5R® peut transformer votre management dans différents contextes'
                  : 'Discover how the 5R® model can transform your management in different contexts'
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <div 
                    key={index} 
                    className={`${themeClasses.glassBg} rounded-2xl p-8 ${themeClasses.border} border hover:border-opacity-40 transition-all duration-300 hover-lift animate-fadeIn`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${useCase.gradient} rounded-xl flex items-center justify-center mr-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold ${themeClasses.text}`}>{useCase.title}</h3>
                        <p className={themeClasses.textMuted}>{useCase.description}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className={`font-medium ${themeClasses.text}`}>
                        {language === 'fr' ? 'Exemples d\'application :' : 'Application examples:'}
                      </h4>
                      <ul className="space-y-2">
                        {useCase.examples.map((example, exIndex) => (
                          <li key={exIndex} className={`${themeClasses.textSecondary} flex items-start`}>
                            <CheckCircle className="w-4 h-4 mr-3 mt-1 text-green-500 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section Témoignages */}
          <section id="temoignages" className="py-20">
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
                {language === 'fr' ? 'Témoignages Clients' : 'Client Testimonials'}
              </h2>
              <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
                {language === 'fr'
                  ? 'Découvrez comment nos clients transforment leur management avec le modèle 5R®'
                  : 'Discover how our clients transform their management with the 5R® model'
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`${themeClasses.glassBg} rounded-2xl p-8 ${themeClasses.border} border hover:border-opacity-40 transition-all duration-300 hover-lift animate-fadeIn`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-6">
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className={`${themeClasses.text} leading-relaxed italic`}>
                      "{testimonial.content}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className={`font-semibold ${themeClasses.text}`}>{testimonial.name}</div>
                      <div className={`text-sm ${themeClasses.textMuted}`}>{testimonial.role}</div>
                      <div className="text-sm text-purple-500 font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Final optimisé */}
          <section className="py-20">
            <div className={`bg-gradient-to-r from-pft-blue/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 text-center ${themeClasses.border} border`}>
              <h2 className={`text-3xl font-bold mb-6 ${themeClasses.text}`}>
                {language === 'fr' ? 'Prêt à transformer votre management ?' : 'Ready to transform your management?'}
              </h2>
              <p className={`${themeClasses.textSecondary} mb-8 max-w-2xl mx-auto text-lg leading-relaxed`}>
                {language === 'fr'
                  ? 'Commencez dès maintenant avec notre Coach Virtuel IA ou bénéficiez d\'un accompagnement personnalisé.'
                  : 'Start now with our Virtual AI Coach or benefit from personalized support.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:contact@peoplefirst-technologies.com?subject=Demande de démo - Coach Virtuel IA 5R®"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pft-blue to-purple-600 text-white rounded-xl hover:from-pft-blue/90 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  {language === 'fr' ? 'Demander une démo' : 'Request a demo'}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer simplifié */}
      <footer className={`${themeClasses.glassBg} backdrop-blur-xl ${themeClasses.border} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className={`${themeClasses.textMuted}`}>
              {language === 'fr'
                ? '© 2025 People First Technologies. Coach Virtuel IA basé sur le modèle 5R® de la Professeure Cécile Dejoux.'
                : '© 2025 People First Technologies. Virtual AI Coach based on Professor Cécile Dejoux\'s 5R® model.'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  const ChatPage = () => (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg} ${themeClasses.text}`}>
      {/* Header avec breadcrumb */}
      <header className={`${isDarkMode ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-xl border-b sticky top-0 z-50 ${isDarkMode ? 'border-white/5' : 'border-gray-100'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://res.cloudinary.com/doo9fgw4x/image/upload/v1752331776/PFT_zizh77.png" 
                alt="People First Technologies" 
                className="h-8 w-auto cursor-pointer"
                onClick={() => setCurrentPage('presentation')}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Switch */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    language === 'fr' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🇫🇷 FR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    language === 'en' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🇬🇧 EN
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  {isDarkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  )}
                </svg>
              </button>
              
              {/* Contact Expert Button */}
              <button
                onClick={() => setCurrentPage('chat')}
                className={`inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 group ${
                  isDarkMode
                    ? 'border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white hover:bg-gray-800'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Essayer le Coach IA' : 'Try AI Coach'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className={`text-4xl font-bold ${themeClasses.text} mb-4`}>
            {language === 'fr' 
              ? <>Échangez avec votre <span className="gradient-text">Coach Virtuel IA</span></>
              : <>Chat with your <span className="gradient-text">Virtual AI Coach</span></>
            }
          </h1>
          <p className={`text-lg ${themeClasses.textSecondary} max-w-2xl mx-auto`}>
            {language === 'fr'
              ? 'Posez vos questions sur le management, l\'engagement d\'équipe et la transformation. Recevez des conseils personnalisés basés sur le modèle 5R®.'
              : 'Ask your questions about management, team engagement and transformation. Receive personalized advice based on the 5R® model.'
            }
          </p>
        </div>

        {/* Chat Interface améliorée */}
        <div className={`${themeClasses.glassBg} backdrop-blur-xl rounded-3xl ${themeClasses.border} border h-[600px] flex flex-col animate-slideUp`}>
          <div className={`p-6 ${themeClasses.border} border-b`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pft-blue to-purple-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`font-semibold ${themeClasses.text} text-lg`}>Coach Virtuel IA</h2>
                  <p className={`text-sm ${themeClasses.textMuted}`}>
                    {language === 'fr' ? 'Basé sur le modèle 5R® de Cécile Dejoux' : 'Based on Cécile Dejoux\'s 5R® model'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-sm ${themeClasses.textMuted}`}>
                  {language === 'fr' ? 'En ligne' : 'Online'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.isBot 
                    ? `${themeClasses.glassBg} ${themeClasses.text} ${themeClasses.border} border` 
                    : 'bg-gradient-to-r from-pft-blue to-purple-600 text-white'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-3 ${message.isBot ? themeClasses.textMuted : 'text-blue-100'}`}>
                    {message.timestamp.toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`p-6 ${themeClasses.border} border-t`}>
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={language === 'fr' 
                  ? "Posez votre question sur le management, l'engagement d'équipe..."
                  : "Ask your question about management, team engagement..."
                }
                className={`flex-1 px-4 py-3 ${themeClasses.inputBg} ${themeClasses.inputBorder} border rounded-xl focus:outline-none focus:ring-2 focus:ring-pft-blue focus:border-transparent ${themeClasses.text} placeholder-gray-400 backdrop-blur-sm`}
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-gradient-to-r from-pft-blue to-purple-600 text-white rounded-xl hover:from-pft-blue/90 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-blue-500/25"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className={`text-xs ${themeClasses.textMuted} mt-3 text-center`}>
              {language === 'fr'
                ? 'Coach Virtuel IA by People First Technologies • Pour un accompagnement personnalisé : contact@peoplefirst-technologies.com'
                : 'Virtual AI Coach by People First Technologies • For personalized support: contact@peoplefirst-technologies.com'
              }
            </p>
          </div>
        </div>

        {/* Quick Actions améliorées */}
        <div className="mt-8 animate-slideUp">
          <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4 text-center`}>
            {language === 'fr' ? 'Questions rapides' : 'Quick questions'}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.slice(0, 3).map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    const question = language === 'fr' 
                      ? `Comment améliorer les ${pillar.title.toLowerCase()} dans mon équipe ?`
                      : `How to improve ${pillar.title.toLowerCase()} in my team?`;
                    setInputText(question);
                    handleSendMessage();
                  }}
                  className={`p-4 ${themeClasses.glassBg} backdrop-blur-sm rounded-2xl ${themeClasses.border} border hover:border-opacity-40 ${themeClasses.hoverBg} transition-all duration-300 text-left group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${pillar.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-medium ${themeClasses.text}`}>
                        {language === 'fr' ? `Améliorer les ${pillar.title}` : `Improve ${pillar.title}`}
                      </h4>
                      <p className={`text-sm ${themeClasses.textMuted}`}>
                        {language === 'fr' ? 'Question rapide' : 'Quick question'}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return currentPage === 'presentation' ? <PresentationPage /> : <ChatPage />;
}

export default App;