import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  User, 
  Bot, 
  Clock, 
  CheckCircle, 
  UserCheck, 
  ArrowLeft, 
  RefreshCw, 
  Users, 
  RotateCcw, 
  FileText, 
  Handshake, 
  Award, 
  Plus,
  Paperclip,
  Image,
  File,
  Smile,
  MoreHorizontal,
  Zap,
  Sparkles,
  MessageCircle,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCw,
  ArrowRight,
  Shield,
  Target,
  Lightbulb,
  TrendingUp,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAudio?: boolean;
  duration?: string;
}

interface ChatInterfaceProps {
  language: 'fr' | 'en';
}

export default function ChatInterface({ language }: ChatInterfaceProps) {
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

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAttachments, setShowAttachments] = useState(false);
  const [currentSuggestionGroup, setCurrentSuggestionGroup] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const content = {
    fr: {
      welcome: {
        greeting: "Bonjour",
        name: "Philippe",
        title: "Comment puis-je vous aider aujourd'hui ?",
        subtitle: "Je suis votre Coach Virtuel IA spécialisé dans le management et l'engagement d'équipe. Posez-moi vos questions sur le modèle 5R® ou demandez des conseils personnalisés.",
        placeholder: "Posez votre question sur le management, l'engagement d'équipe..."
      },
      quickQuestions: "Suggestions",
      quickButtonsGroups: [
        // Groupe 1 - Original (5R®)
        [
          { 
            text: "Comment améliorer les rôles dans mon équipe ?", 
            category: "Rôles",
            icon: Users,
            description: "Clarification des responsabilités"
          },
          { 
            text: "Quelles routines mettre en place ?", 
            category: "Routines",
            icon: RotateCcw,
            description: "Processus et rituels efficaces"
          },
          { 
            text: "Comment définir des règles claires ?", 
            category: "Règles",
            icon: FileText,
            description: "Cadre de fonctionnement"
          },
          { 
            text: "Comment cultiver le respect ?", 
            category: "Respect",
            icon: Handshake,
            description: "Environnement de confiance"
          },
          { 
            text: "Comment valoriser les contributions ?", 
            category: "Reconnaissance",
            icon: Award,
            description: "Célébration des succès"
          },
          { 
            text: "Stratégies de transformation digitale", 
            category: "Transformation",
            icon: Zap,
            description: "Accompagnement du changement"
          }
        ],
        // Groupe 2 - Communication & Gestion
        [
          {
            text: "Comment renforcer la communication dans mon équipe ?",
            category: "Communication",
            icon: MessageCircle,
            description: "Création de canaux et de feedback"
          },
          {
            text: "Comment gérer les conflits efficacement ?",
            category: "Conflits",
            icon: Shield,
            description: "Médiation et résolution proactive"
          },
          {
            text: "Comment développer l'autonomie des collaborateurs ?",
            category: "Autonomie",
            icon: UserCheck,
            description: "Responsabilisation et délégation"
          },
          {
            text: "Comment fixer des objectifs motivants ?",
            category: "Objectifs",
            icon: Target,
            description: "Méthode SMART et suivi régulier"
          },
          {
            text: "Comment instaurer une culture de feedback ?",
            category: "Feedback",
            icon: RefreshCw,
            description: "Retours constructifs en continu"
          },
          {
            text: "Comment accompagner l'onboarding des nouveaux ?",
            category: "Onboarding",
            icon: User,
            description: "Intégration et mentoring"
          }
        ],
        // Groupe 3 - Innovation & Performance
        [
          {
            text: "Comment stimuler l'innovation ?",
            category: "Innovation",
            icon: Lightbulb,
            description: "Encouragement à l'expérimentation"
          },
          {
            text: "Comment favoriser l'apprentissage continu ?",
            category: "Apprentissage",
            icon: TrendingUp,
            description: "Plan de formation et ressources"
          },
          {
            text: "Comment valoriser la diversité et l'inclusion ?",
            category: "Diversité",
            icon: Heart,
            description: "Sensibilisation et pratiques égalitaires"
          },
          {
            text: "Comment mesurer l'engagement de l'équipe ?",
            category: "Engagement",
            icon: CheckCircle,
            description: "Indicateurs et sondages réguliers"
          },
          {
            text: "Comment optimiser la prise de décision ?",
            category: "Décision",
            icon: Zap,
            description: "Processus collaboratifs"
          },
          {
            text: "Comment équilibrer charge de travail et bien-être ?",
            category: "Bien-être",
            icon: Clock,
            description: "Gestion du stress et flexibilité"
          }
        ],
        // Groupe 4 - Leadership & Optimisation
        [
          {
            text: "Comment encourager l'esprit d'équipe à distance ?",
            category: "Remote",
            icon: Users,
            description: "Outils virtuels et rituels online"
          },
          {
            text: "Comment piloter la performance individuelle ?",
            category: "Performance",
            icon: Target,
            description: "Entretiens et KPI personnalisés"
          },
          {
            text: "Comment renforcer la confiance mutuelle ?",
            category: "Confiance",
            icon: Handshake,
            description: "Transparence et cohérence"
          },
          {
            text: "Comment anticiper et gérer le changement ?",
            category: "Changement",
            icon: RefreshCw,
            description: "Communication et participation"
          },
          {
            text: "Comment promouvoir le leadership distribué ?",
            category: "Leadership",
            icon: Award,
            description: "Encouragement des initiatives"
          },
          {
            text: "Comment optimiser les réunions ?",
            category: "Réunions",
            icon: MessageCircle,
            description: "Agenda clair et animation participative"
          }
        ]
      ],
      typing: "Coach IA écrit...",
      online: "En ligne",
      back: "Retour",
      refresh: "Actualiser les suggestions",
      newConversation: "Nouvelle conversation",
      footer: "Coach Virtuel IA by People First Technologies • Modèle 5R® de Cécile Dejoux"
    },
    en: {
      welcome: {
        greeting: "Hello",
        name: "Philippe",
        title: "How can I help you today?",
        subtitle: "I'm your AI Virtual Coach specialized in management and team engagement. Ask me questions about the 5R® model or request personalized advice.",
        placeholder: "Ask your question about management, team engagement..."
      },
      quickQuestions: "Suggestions",
      quickButtonsGroups: [
        // Group 1 - Original (5R®)
        [
          { 
            text: "How to improve roles in my team?", 
            category: "Roles",
            icon: Users,
            description: "Responsibility clarification"
          },
          { 
            text: "What routines should I implement?", 
            category: "Routines",
            icon: RotateCcw,
            description: "Effective processes and rituals"
          },
          { 
            text: "How to define clear rules?", 
            category: "Rules",
            icon: FileText,
            description: "Operating framework"
          },
          { 
            text: "How to cultivate respect?", 
            category: "Respect",
            icon: Handshake,
            description: "Trust environment"
          },
          { 
            text: "How to value contributions?", 
            category: "Recognition",
            icon: Award,
            description: "Success celebration"
          },
          { 
            text: "Digital transformation strategies", 
            category: "Transformation",
            icon: Zap,
            description: "Change management"
          }
        ],
        // Group 2 - Communication & Management
        [
          {
            text: "How to strengthen team communication?",
            category: "Communication",
            icon: MessageCircle,
            description: "Channels and feedback creation"
          },
          {
            text: "How to manage conflicts effectively?",
            category: "Conflicts",
            icon: Shield,
            description: "Mediation and proactive resolution"
          },
          {
            text: "How to develop employee autonomy?",
            category: "Autonomy",
            icon: UserCheck,
            description: "Empowerment and delegation"
          },
          {
            text: "How to set motivating objectives?",
            category: "Objectives",
            icon: Target,
            description: "SMART method and regular follow-up"
          },
          {
            text: "How to establish a feedback culture?",
            category: "Feedback",
            icon: RefreshCw,
            description: "Continuous constructive feedback"
          },
          {
            text: "How to support new employee onboarding?",
            category: "Onboarding",
            icon: User,
            description: "Integration and mentoring"
          }
        ],
        // Group 3 - Innovation & Performance
        [
          {
            text: "How to stimulate innovation?",
            category: "Innovation",
            icon: Lightbulb,
            description: "Encouraging experimentation"
          },
          {
            text: "How to promote continuous learning?",
            category: "Learning",
            icon: TrendingUp,
            description: "Training plan and resources"
          },
          {
            text: "How to value diversity and inclusion?",
            category: "Diversity",
            icon: Heart,
            description: "Awareness and equal practices"
          },
          {
            text: "How to measure team engagement?",
            category: "Engagement",
            icon: CheckCircle,
            description: "Indicators and regular surveys"
          },
          {
            text: "How to optimize decision-making?",
            category: "Decision",
            icon: Zap,
            description: "Collaborative processes"
          },
          {
            text: "How to balance workload and well-being?",
            category: "Well-being",
            icon: Clock,
            description: "Stress management and flexibility"
          }
        ],
        // Group 4 - Leadership & Optimization
        [
          {
            text: "How to encourage remote team spirit?",
            category: "Remote",
            icon: Users,
            description: "Virtual tools and online rituals"
          },
          {
            text: "How to manage individual performance?",
            category: "Performance",
            icon: Target,
            description: "Interviews and personalized KPIs"
          },
          {
            text: "How to strengthen mutual trust?",
            category: "Trust",
            icon: Handshake,
            description: "Transparency and consistency"
          },
          {
            text: "How to anticipate and manage change?",
            category: "Change",
            icon: RefreshCw,
            description: "Communication and participation"
          },
          {
            text: "How to promote distributed leadership?",
            category: "Leadership",
            icon: Award,
            description: "Encouraging initiatives"
          },
          {
            text: "How to optimize meetings?",
            category: "Meetings",
            icon: MessageCircle,
            description: "Clear agenda and participative facilitation"
          }
        ]
      ],
      typing: "AI Coach is typing...",
      online: "Online",
      back: "Back",
      refresh: "Refresh suggestions",
      newConversation: "New conversation",
      footer: "AI Virtual Coach by People First Technologies • Cécile Dejoux's 5R® Model"
    }
  };

  const t = content[language];
  const currentButtons = t.quickButtonsGroups[currentSuggestionGroup];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    setShowWelcome(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Generate contextual AI response based on the specific question
    setTimeout(() => {
      const getContextualResponse = (question: string, lang: 'fr' | 'en') => {
        const lowerQuestion = question.toLowerCase();
        
        if (lang === 'fr') {
          if (lowerQuestion.includes('rôle')) {
            return "Pour améliorer les **rôles**, organisez un atelier collaboratif où l'équipe co-construit les définitions de poste. Définissez ensemble les responsabilités, les objectifs et les indicateurs de performance. Cela favorise l'appropriation et la clarté des missions.";
          } else if (lowerQuestion.includes('routine')) {
            return "Pour améliorer les **routines**, établissez des rituels d'équipe réguliers : réunions hebdomadaires, points de synchronisation, célébrations des succès. La régularité crée un cadre sécurisant et renforce la cohésion.";
          } else if (lowerQuestion.includes('règle')) {
            return "Pour améliorer les **règles**, impliquez l'équipe dans l'élaboration de la charte de fonctionnement. Définissez ensemble les valeurs, les comportements attendus et les processus de décision. L'adhésion est plus forte quand chacun participe.";
          } else if (lowerQuestion.includes('respect')) {
            return "Pour améliorer le **respect**, cultivez l'écoute active, la reconnaissance des différences et la valorisation des contributions de chacun. Instaurez des moments d'échange et de feedback constructif.";
          } else if (lowerQuestion.includes('reconnaissance')) {
            return "Pour améliorer la **reconnaissance**, célébrez les réussites, individuelles et collectives. Mettez en place un système de feedback positif régulier et valorisez les efforts autant que les résultats.";
          } else {
            return "Pour améliorer votre équipe selon le modèle 5R®, il est important de travailler sur les 5 piliers : les rôles, les routines, les règles, le respect et la reconnaissance. Pouvez-vous préciser sur quel aspect vous souhaitez vous concentrer ?";
          }
        } else {
          if (lowerQuestion.includes('role')) {
            return "To improve **roles**, organize a collaborative workshop where the team co-builds job definitions. Define responsibilities, objectives and performance indicators together. This promotes ownership and clarity of missions.";
          } else if (lowerQuestion.includes('routine')) {
            return "To improve **routines**, establish regular team rituals: weekly meetings, synchronization points, success celebrations. Regularity creates a secure framework and strengthens cohesion.";
          } else if (lowerQuestion.includes('rule')) {
            return "To improve **rules**, involve the team in developing the operating charter. Define values, expected behaviors and decision-making processes together. Adherence is stronger when everyone participates.";
          } else if (lowerQuestion.includes('respect')) {
            return "To improve **respect**, cultivate active listening, recognition of differences and valuing everyone's contributions. Establish moments for exchange and constructive feedback.";
          } else if (lowerQuestion.includes('recognition')) {
            return "To improve **recognition**, celebrate successes, both individual and collective. Implement a regular positive feedback system and value efforts as much as results.";
          } else {
            return "To improve your team according to the 5R® model, it's important to work on the 5 pillars: roles, routines, rules, respect and recognition. Can you specify which aspect you'd like to focus on?";
          }
        }
      };

      const responseText = getContextualResponse(text.trim(), language);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleNewConversation = () => {
    setShowWelcome(true);
    setMessages([]);
    setInputText('');
    setIsTyping(false);
  };

  const handleRefreshSuggestions = () => {
    setCurrentSuggestionGroup((prev) => (prev + 1) % t.quickButtonsGroups.length);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Premium Header */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 sticky top-0 z-50 shadow-xl">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="group flex items-center justify-center w-12 h-12 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-lg"
              >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" />
              </Link>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25 ring-2 ring-white dark:ring-gray-800">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">Coach Virtuel IA</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-tight font-medium">Basé sur le modèle 5R®</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!showWelcome && (
                <button
                  onClick={handleNewConversation}
                  className="group flex items-center space-x-3 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 bg-gray-100 dark:bg-gray-700 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                  <span>{t.newConversation}</span>
                </button>
              )}
              
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 'En ligne' : 'Online'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-6">
        {showWelcome ? (
          /* Premium Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-8">
            <div className="text-center space-y-6 max-w-3xl">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  {t.welcome.greeting} <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t.welcome.name}</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                  {t.welcome.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.welcome.subtitle}
                </p>
              </div>
            </div>

            {/* Premium Suggestion Cards */}
            <div className="w-full max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>{t.quickQuestions}</span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({currentSuggestionGroup + 1}/{t.quickButtonsGroups.length})
                  </span>
                </h3>
                <button 
                  onClick={handleRefreshSuggestions}
                  className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-2 rounded-lg"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t.refresh}</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(button.text)}
                    className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 transition-all duration-300 text-left hover:scale-[1.02] hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:from-purple-100 group-hover:to-purple-200 dark:group-hover:from-purple-900/50 dark:group-hover:to-purple-800/50 transition-all duration-300">
                        <button.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 mb-1">
                          {button.text}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {button.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Premium Chat Messages */
          <div className="flex-1 py-8">
            <div className="space-y-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-4 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/25' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/25'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <MessageCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    
                    <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-6 py-4 rounded-3xl shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/20'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-lg'
                      }`}>
                        {message.sender === 'user' ? (
                          <div className="text-sm leading-relaxed font-medium">
                            {message.text}
                          </div>
                        ) : (
                          <div 
                            className="text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-purple-600 dark:text-purple-400">$1</strong>') 
                            }}
                          />
                        )}
                      </div>
                      
                      <div className={`flex items-center space-x-3 mt-2 px-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(message.timestamp)}</span>
                        {message.sender === 'user' && (
                          <CheckCircle className="w-3 h-3 text-blue-500" />
                        )}
                        {message.sender === 'bot' && (
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-colors">
                              <Copy className="w-3 h-3" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-500 rounded transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors">
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-4 max-w-3xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl px-6 py-4 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t.typing}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Premium Input Area */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Attachment Menu */}
          {showAttachments && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-4 gap-3">
                <button className="flex flex-col items-center space-y-2 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <Image className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Image</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <File className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Document</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <Mic className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Audio</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                    <Smile className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Emoji</span>
                </button>
              </div>
            </div>
          )}
          
          <div className="flex items-end space-x-4">
            {/* Attachment Button */}
            <button
              onClick={toggleAttachments}
              className={`p-3 rounded-2xl transition-all duration-200 flex-shrink-0 ${
                showAttachments 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            {/* Input Container */}
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder={t.welcome.placeholder}
                className="w-full px-6 py-4 pr-20 border border-gray-300 dark:border-gray-600 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 shadow-sm scrollbar-hide"
                style={{ minHeight: '56px', maxHeight: '120px' }}
                rows={1}
              />
              
              {/* Voice Input Button */}
              <button
                onClick={toggleRecording}
                className={`absolute right-6 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${
                  isRecording 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="h-14 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex-shrink-0 flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t.footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}