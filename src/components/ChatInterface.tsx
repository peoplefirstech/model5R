import React, { useState, useRef, useEffect } from 'react';
import LoadingStates from './LoadingStates';
import { useHapticFeedback } from './HapticFeedback';
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
  Heart,
  Moon,
  Sun,
  Home
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
  const { triggerLight, triggerMedium, triggerSuccess, triggerSelection } = useHapticFeedback();
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const content = {
    fr: {
      welcome: {
        greeting: "Bonjour",
        name: "Philippe",
        title: "Comment puis-je vous aider aujourd'hui ?",
        placeholder: "Posez votre question..."
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
        ],
        // Groupe 2 - Communication & Gestion
        [
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
          },
          {
            text: "Comment renforcer la communication ?",
            category: "Communication",
            icon: MessageCircle,
            description: "Canaux et feedback efficaces"
          },
          {
            text: "Comment gérer les conflits ?",
            category: "Conflits",
            icon: Shield,
            description: "Médiation et résolution"
          }
        ],
        // Groupe 3 - Innovation & Performance
        [
          {
            text: "Comment développer l'autonomie ?",
            category: "Autonomie",
            icon: UserCheck,
            description: "Responsabilisation et délégation"
          },
          {
            text: "Comment fixer des objectifs motivants ?",
            category: "Objectifs",
            icon: Target,
            description: "Méthode SMART et suivi"
          },
          {
            text: "Comment stimuler l'innovation ?",
            category: "Innovation",
            icon: Lightbulb,
            description: "Encouragement créatif"
          },
          {
            text: "Comment mesurer l'engagement de l'équipe ?",
            category: "Engagement",
            icon: CheckCircle,
            description: "Indicateurs et sondages"
          }
        ],
        // Groupe 4 - Leadership & Optimisation
        [
          {
            text: "Comment favoriser l'apprentissage ?",
            category: "Apprentissage",
            icon: TrendingUp,
            description: "Formation continue"
          },
          {
            text: "Comment optimiser les décisions ?",
            category: "Décision",
            icon: Zap,
            description: "Processus collaboratifs"
          },
          {
            text: "Comment équilibrer travail et bien-être ?",
            category: "Bien-être",
            icon: Clock,
            description: "Gestion du stress"
          },
          {
            text: "Comment anticiper et gérer le changement ?",
            category: "Changement",
            icon: RefreshCw,
            description: "Communication du changement"
          }
        ]
      ],
      typing: "Coach IA écrit...",
      online: "En ligne",
      back: "Retour",
      refresh: "Actualiser les suggestions",
      newConversation: "Nouvelle conversation",
      footer: "Coach Virtuel IA by People First Technologies • Modèle 5R®"
    },
    en: {
      welcome: {
        greeting: "Hello",
        name: "Philippe",
        title: "How can I help you today?",
        placeholder: "Ask your question..."
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
        ],
        // Group 2 - Communication & Management
        [
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
          },
          {
            text: "How to strengthen communication?",
            category: "Communication",
            icon: MessageCircle,
            description: "Effective channels and feedback"
          },
          {
            text: "How to manage conflicts?",
            category: "Conflicts",
            icon: Shield,
            description: "Mediation and resolution"
          }
        ],
        // Group 3 - Innovation & Performance
        [
          {
            text: "How to develop autonomy?",
            category: "Autonomy",
            icon: UserCheck,
            description: "Empowerment and delegation"
          },
          {
            text: "How to set motivating objectives?",
            category: "Objectives",
            icon: Target,
            description: "SMART method and tracking"
          },
          {
            text: "How to stimulate innovation?",
            category: "Innovation",
            icon: Lightbulb,
            description: "Creative encouragement"
          },
          {
            text: "How to measure team engagement?",
            category: "Engagement",
            icon: CheckCircle,
            description: "Indicators and surveys"
          }
        ],
        // Group 4 - Leadership & Optimization
        [
          {
            text: "How to foster learning?",
            category: "Learning",
            icon: TrendingUp,
            description: "Continuous training"
          },
          {
            text: "How to optimize decisions?",
            category: "Decision",
            icon: Zap,
            description: "Collaborative processes"
          },
          {
            text: "How to balance work and well-being?",
            category: "Well-being",
            icon: Heart,
            description: "Stress management"
          },
          {
            text: "How to anticipate and manage change?",
            category: "Change",
            icon: RefreshCw,
            description: "Change communication"
          }
        ]
      ],
      typing: "AI Coach is typing...",
      online: "Online",
      back: "Back",
      refresh: "Refresh suggestions",
      newConversation: "New conversation",
      footer: "AI Virtual Coach by People First Technologies • 5R® Model"
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

    triggerLight();
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
    triggerSelection();
    handleSendMessage(question);
  };

  const handleNewConversation = () => {
    triggerMedium();
    setShowWelcome(true);
    setMessages([]);
    setInputText('');
    setIsTyping(false);
  };

  const handleRefreshSuggestions = () => {
    triggerLight();
    setCurrentSuggestionGroup((prev) => (prev + 1) % t.quickButtonsGroups.length);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      triggerLight();
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
    triggerMedium();
    setIsRecording(!isRecording);
  };

  const toggleAttachments = () => {
    triggerLight();
    setShowAttachments(!showAttachments);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = () => {
    triggerSelection();
    imageInputRef.current?.click();
  };

  const handleDocumentUpload = () => {
    triggerSelection();
    fileInputRef.current?.click();
  };

  const handleAudioUpload = () => {
    triggerSelection();
    audioInputRef.current?.click();
  };

  const handleEmojiClick = () => {
    triggerLight();
    setShowEmojiPicker(!showEmojiPicker);
    setShowAttachments(false);
  };

  const insertEmoji = (emoji: string) => {
    triggerSelection();
    setInputText(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulation - on affiche juste le nom du fichier sélectionné
      console.log(`${type} sélectionné:`, file.name);
      // Ici on pourrait ajouter une notification ou un aperçu
    }
    // Reset l'input pour permettre de sélectionner le même fichier à nouveau
    event.target.value = '';
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden pb-safe">
      {/* Premium Header */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 sticky top-0 z-50 shadow-xl pt-safe">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex justify-between items-center min-h-[48px] sm:h-14">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                onClick={() => triggerLight()}
                className="group flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-600 bg-gray-100 dark:bg-gray-700 rounded-xl transition-all duration-300 ease-out shadow-sm hover:shadow-md border border-transparent hover:border-gray-200 dark:hover:border-gray-500"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-2 transition-transform duration-300" />
              </Link>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25 ring-2 ring-white dark:ring-gray-800">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Coach Virtuel IA</h1>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 leading-tight">Basé sur le modèle 5R®</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!showWelcome && (
                <button
                  onClick={handleNewConversation}
                  className="group flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 bg-gray-100 dark:bg-gray-700 rounded-xl transition-all duration-500 ease-out shadow-md hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  <span className="hidden md:inline">{t.newConversation}</span>
                </button>
              )}
              
              {/* Mobile Controls */}
              <div className="md:hidden flex items-center space-x-1">
                <button
                  onClick={() => {
                    triggerLight();
                    setIsDark(!isDark);
                  }}
                  className="flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 active:scale-95 min-h-[40px] min-w-[40px]"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                
                <Link
                  to="/"
                  className="flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 active:scale-95 min-h-[40px] min-w-[40px]"
                >
                  <Home className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 hidden sm:inline">
                  {language === 'fr' ? 'En ligne' : 'Online'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 overflow-hidden">
        {showWelcome ? (
          /* Premium Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center py-4 sm:py-6 space-y-4 sm:space-y-6 overflow-y-auto">
            <div className="text-center space-y-3 max-w-3xl">
              
              <div className="space-y-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  {t.welcome.greeting} <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t.welcome.name}</span>
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                  {t.welcome.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {language === 'fr' 
                    ? "Posez-moi vos questions sur le modèle 5R® ou demandez des conseils personnalisés."
                    : "Ask me questions about the 5R® model or request personalized advice."
                  }
                </p>
              </div>
            </div>

            {/* Premium Suggestion Cards */}
            <div className="w-full max-w-4xl">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>{t.quickQuestions}</span>
                  <span className="text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({currentSuggestionGroup + 1}/6)
                  </span>
                </h3>
                <button 
                  onClick={handleRefreshSuggestions}
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/20 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                >
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{t.refresh}</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {currentButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(button.text)}
                    className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 text-left"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:from-purple-100 group-hover:to-purple-200 dark:group-hover:from-purple-900/50 dark:group-hover:to-purple-800/50 transition-all duration-300 flex-shrink-0">
                        <button.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 mb-1 text-xs sm:text-sm">
                          {button.text}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                          {button.description}
                        </p>
                      </div>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-purple-500 transition-colors duration-200 flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Premium Chat Messages */
          <div className="flex-1 py-2 sm:py-4 overflow-y-auto scrollbar-hide">
            <div className="space-y-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-4 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-blue-500/25' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/25'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      )}
                    </div>
                    
                    <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 sm:px-6 py-3 sm:py-4 rounded-3xl shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/20'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-lg'
                      }`}>
                        {message.sender === 'user' ? (
                          <div className="text-xs sm:text-sm leading-relaxed font-medium">
                            {message.text}
                          </div>
                        ) : (
                          <div 
                            className="text-xs sm:text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-purple-600 dark:text-purple-400">$1</strong>') 
                            }}
                          />
                        )}
                      </div>
                      
                      <div className={`flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-2 px-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(message.timestamp)}</span>
                        {message.sender === 'user' && (
                          <CheckCircle className="w-3 h-3 text-blue-500" />
                        )}
                        {message.sender === 'bot' && (
                          <div className="hidden sm:flex items-center space-x-2">
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
                <LoadingStates type="typing" language={language} />
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Premium Input Area */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-4 flex-shrink-0 pb-safe">
        <div className="max-w-5xl mx-auto">
          {/* Attachment Menu */}
          {showAttachments && (
            <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-4 gap-3">
                <button 
                  onClick={handleImageUpload}
                  className="flex flex-col items-center space-y-1 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <Image className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Image</span>
                </button>
                <button 
                  onClick={handleDocumentUpload}
                  className="flex flex-col items-center space-y-1 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <File className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Document</span>
                </button>
                <button 
                  onClick={handleAudioUpload}
                  className="flex flex-col items-center space-y-1 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <Mic className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Audio</span>
                </button>
                <button 
                  onClick={handleEmojiClick}
                  className="flex flex-col items-center space-y-1 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                    <Smile className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Emoji</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="mb-3 p-3 bg-white dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg">
              <div className="grid grid-cols-8 gap-2">
                {['😊', '😃', '😄', '😁', '😎', '😭', '😤', '❤️', 
                  '😂', '😢', '😠', '😖', '👍', '😮', '😋', '😉'].map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => insertEmoji(emoji)}
                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 active:scale-95"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Hidden File Inputs */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e, 'Image')}
            className="hidden"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.xlsx,.pptx"
            onChange={(e) => handleFileSelect(e, 'Document')}
            className="hidden"
          />
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileSelect(e, 'Audio')}
            className="hidden"
          />
          
          {/* Redesigned Input Container */}
          <div className="relative bg-white dark:bg-gray-700 rounded-3xl border-2 border-gray-200 dark:border-gray-600 focus-within:border-purple-500 dark:focus-within:border-purple-400 transition-all duration-300 shadow-lg focus-within:shadow-xl focus-within:shadow-purple-500/10">
            <div className="flex items-center p-2">
              {/* Left Actions */}
              <div className="flex items-center space-x-1 pl-2">
                <button
                  onClick={toggleAttachments}
                  className={`p-2 rounded-xl transition-all duration-200 active:scale-95 ${
                    showAttachments 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              
              {/* Input Field */}
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder={t.welcome.placeholder}
                className="flex-1 px-4 py-3 bg-transparent resize-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 scrollbar-hide text-sm"
                style={{ minHeight: '40px', maxHeight: '120px' }}
                rows={1}
              />
              
              {/* Right Actions */}
              <div className="flex items-center space-x-1 pr-2">
                <button
                  onClick={toggleRecording}
                  className={`p-2 rounded-xl transition-all duration-200 active:scale-95 ${
                    isRecording 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100 active:scale-95 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 p-2.5"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-3 text-center">
            <p className="text-[9px] sm:text-[10px] text-gray-400/50 dark:text-gray-500/40">
              {t.footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}