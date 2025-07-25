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
    
    // Reset textarea height after sending
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = '40px';
    }
    
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
          } else if (lowerQuestion.includes('communication')) {
            return "Pour améliorer la **communication**, établissez des canaux clairs et réguliers. Favorisez l'écoute active, le feedback constructif et la transparence. Organisez des réunions structurées et encouragez les échanges informels.";
          } else if (lowerQuestion.includes('conflit')) {
            return "Pour gérer les **conflits**, adoptez une approche de médiation neutre. Écoutez toutes les parties, identifiez les causes profondes et recherchez des solutions gagnant-gagnant. La prévention par une communication ouverte est essentielle.";
          } else if (lowerQuestion.includes('autonomie')) {
            return "Pour développer l'**autonomie**, déléguez progressivement avec un cadre clair. Fixez des objectifs précis, donnez les moyens nécessaires et instaurez un suivi régulier sans micro-management.";
          } else if (lowerQuestion.includes('objectif')) {
            return "Pour fixer des **objectifs** motivants, utilisez la méthode SMART (Spécifique, Mesurable, Atteignable, Réaliste, Temporel). Impliquez l'équipe dans leur définition et assurez un suivi régulier.";
          } else if (lowerQuestion.includes('innovation')) {
            return "Pour stimuler l'**innovation**, créez un environnement psychologiquement sûr où l'erreur est acceptée. Encouragez la créativité, allouez du temps pour l'expérimentation et valorisez les initiatives.";
          } else if (lowerQuestion.includes('engagement')) {
            return "Pour mesurer l'**engagement**, utilisez des sondages réguliers, observez les comportements (participation, initiative) et analysez les indicateurs RH (turnover, absentéisme). L'écoute directe reste essentielle.";
          } else if (lowerQuestion.includes('apprentissage')) {
            return "Pour favoriser l'**apprentissage**, créez une culture de formation continue. Encouragez le partage de connaissances, organisez des sessions de retour d'expérience et soutenez le développement personnel.";
          } else if (lowerQuestion.includes('décision')) {
            return "Pour optimiser les **décisions**, impliquez les parties prenantes concernées, collectez des données factuelles et utilisez des méthodes structurées. Communiquez clairement les décisions prises et leurs raisons.";
          } else if (lowerQuestion.includes('bien-être')) {
            return "Pour équilibrer travail et **bien-être**, promouvez la flexibilité, respectez les temps de repos et encouragez la déconnexion. Soyez attentif aux signes de stress et soutenez vos équipes.";
          } else if (lowerQuestion.includes('changement')) {
            return "Pour gérer le **changement**, communiquez la vision clairement, impliquez les équipes dans le processus et accompagnez la transition. Anticipez les résistances et célébrez les progrès.";
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
          } else if (lowerQuestion.includes('communication')) {
            return "To improve **communication**, establish clear and regular channels. Foster active listening, constructive feedback and transparency. Organize structured meetings and encourage informal exchanges.";
          } else if (lowerQuestion.includes('conflict')) {
            return "To manage **conflicts**, adopt a neutral mediation approach. Listen to all parties, identify root causes and seek win-win solutions. Prevention through open communication is essential.";
          } else if (lowerQuestion.includes('autonomy')) {
            return "To develop **autonomy**, delegate progressively with a clear framework. Set precise objectives, provide necessary resources and establish regular follow-up without micro-management.";
          } else if (lowerQuestion.includes('objective')) {
            return "To set motivating **objectives**, use the SMART method (Specific, Measurable, Achievable, Realistic, Time-bound). Involve the team in their definition and ensure regular follow-up.";
          } else if (lowerQuestion.includes('innovation')) {
            return "To stimulate **innovation**, create a psychologically safe environment where mistakes are accepted. Encourage creativity, allocate time for experimentation and value initiatives.";
          } else if (lowerQuestion.includes('engagement')) {
            return "To measure **engagement**, use regular surveys, observe behaviors (participation, initiative) and analyze HR indicators (turnover, absenteeism). Direct listening remains essential.";
          } else if (lowerQuestion.includes('learning')) {
            return "To foster **learning**, create a continuous training culture. Encourage knowledge sharing, organize experience feedback sessions and support personal development.";
          } else if (lowerQuestion.includes('decision')) {
            return "To optimize **decisions**, involve relevant stakeholders, collect factual data and use structured methods. Clearly communicate decisions made and their reasons.";
          } else if (lowerQuestion.includes('well-being') || lowerQuestion.includes('balance')) {
            return "To balance work and **well-being**, promote flexibility, respect rest times and encourage disconnection. Be attentive to stress signs and support your teams.";
          } else if (lowerQuestion.includes('change')) {
            return "To manage **change**, communicate the vision clearly, involve teams in the process and support the transition. Anticipate resistance and celebrate progress.";
          } else if (lowerQuestion.includes('transformation')) {
            return "For **digital transformation**, start with a clear strategy aligned with business objectives. Train teams, adapt processes gradually and maintain open communication throughout the transformation.";
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
      <div className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 z-50 shadow-xl pt-safe">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex justify-between items-center min-h-[48px] sm:h-14">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                onClick={() => triggerLight()}
                className="group flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 bg-gray-100 dark:bg-gray-700 rounded-xl transition-all duration-200 ease-out"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-2 transition-transform duration-300" />
              </Link>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-700 via-slate-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-500/20 ring-2 ring-white dark:ring-gray-800">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Coach Virtuel IA</h1>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-500 leading-tight">Management & RH</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!showWelcome && (
                <button
                  onClick={handleNewConversation}
                  className="group flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-750 bg-gray-100 dark:bg-gray-700 rounded-xl transition-all duration-200 ease-out"
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
                  className="flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-slate-600 dark:hover:text-slate-400 transition-all duration-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/20 active:scale-95 min-h-[40px] min-w-[40px]"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                
                <Link
                  to="/"
                  className="flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-slate-600 dark:hover:text-slate-400 transition-all duration-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/20 active:scale-95 min-h-[40px] min-w-[40px]"
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
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 overflow-hidden pt-16 sm:pt-20">
        {showWelcome ? (
          /* Premium Welcome Screen */
          <div className="flex-1 flex flex-col py-6 sm:py-8 space-y-6 sm:space-y-8 overflow-y-auto">
            {/* Hero Section - Plus compact et impactant */}
            <div className="text-center space-y-4 max-w-4xl mx-auto px-4">
              {/* Badge de statut premium */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">{language === 'fr' ? 'Modèle 5R®' : '5R® Model'}</span>
              </div>
              
              {/* Titre principal plus impactant */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  {t.welcome.greeting} <span className="bg-gradient-to-r from-slate-700 to-gray-800 dark:from-slate-300 dark:to-gray-200 bg-clip-text text-transparent">{t.welcome.name}</span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  {t.welcome.title}
                </h2>
              </div>
              
              {/* Description avec meilleur contraste */}
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                {language === 'fr' 
                  ? "Posez-moi vos questions sur le modèle 5R® ou demandez des conseils personnalisés pour améliorer votre management."
                  : "Ask me questions about the 5R® model or request personalized advice to improve your management."
                }
              </p>
            </div>

            {/* Section suggestions optimisée */}
            <div className="w-full max-w-5xl mx-auto px-4">
              {/* Header des suggestions amélioré */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span>{t.quickQuestions}</span>
                  <span className="text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                    ({currentSuggestionGroup + 1}/6)
                  </span>
                </h3>
                <button 
                  onClick={handleRefreshSuggestions}
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-slate-600 dark:hover:text-slate-400 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/20 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-slate-600 hover:scale-105 active:scale-95"
                >
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{t.refresh}</span>
                </button>
              </div>
              
              {/* Grille de suggestions optimisée */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(button.text)}
                    className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg hover:shadow-slate-500/10 dark:hover:shadow-slate-500/20 transition-all duration-300 text-left hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center group-hover:from-slate-200 group-hover:to-slate-300 dark:group-hover:from-slate-600 dark:group-hover:to-slate-500 transition-all duration-300 flex-shrink-0 shadow-sm group-hover:shadow-md">
                        <button.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300 mb-2 text-sm sm:text-base">
                          {button.text}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {button.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Indicateur de progression visuel */}
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {Array.from({ length: t.quickButtonsGroups.length }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSuggestionGroup
                          ? 'bg-slate-600 dark:bg-slate-400 w-6'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
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
                  <div className={`flex items-start space-x-3 sm:space-x-4 ${
                    message.sender === 'user' 
                     ? 'flex-row-reverse space-x-reverse space-x-3 sm:space-x-reverse sm:space-x-4 max-w-2xl' 
                     : 'space-x-3 max-w-4xl'
                  }`}>
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-slate-500/25 rounded-2xl ring-2 ring-white dark:ring-gray-800' 
                        : 'bg-gradient-to-br from-slate-700 to-gray-800 shadow-slate-500/30 rounded-2xl ring-2 ring-white dark:ring-gray-800'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm" />
                      ) : (
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      )}
                    </div>
                    
                    <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 sm:px-5 py-3 sm:py-4 shadow-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-2xl shadow-slate-500/30 ring-1 ring-slate-400/20'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl shadow-gray-500/15'
                      } ${message.sender === 'user' ? 'max-w-xs sm:max-w-md' : 'max-w-full'}`}>
                        {message.sender === 'user' ? (
                          <div className="text-sm sm:text-base leading-relaxed font-medium text-white/95">
                            {message.text}
                          </div>
                        ) : (
                          <div 
                            className="text-sm sm:text-base leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-purple-600 dark:text-purple-400">$1</strong>') 
                            }}
                          />
                        )}
                      </div>
                      
                      <div className={`flex items-center mt-2 px-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{formatTime(message.timestamp)}</span>
                        {message.sender === 'user' && (
                          <div className="flex items-center space-x-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-slate-300 drop-shadow-sm" />
                            <span className="text-xs text-gray-400 font-medium">{language === 'fr' ? 'Envoyé' : 'Sent'}</span>
                          </div>
                        )}
                        {message.sender === 'bot' && (
                          <div className="flex items-center space-x-2">
                            <button className="group p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 active:scale-95">
                              <Copy className="w-4 h-4" />
                            </button>
                            <button className="group p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 active:scale-95">
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button className="group p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 active:scale-95">
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                            <button className="group p-2 text-gray-400 hover:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/20 rounded-lg transition-all duration-200 active:scale-95">
                              <RotateCw className="w-4 h-4" />
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
      <div className="bg-white/98 dark:bg-gray-800/98 backdrop-blur-xl border-t border-gray-200/80 dark:border-gray-700/80 p-4 sm:p-6 flex-shrink-0 pb-safe shadow-2xl shadow-gray-900/5 dark:shadow-black/20">
        <div className="max-w-5xl mx-auto">
          {/* Attachment Menu */}
          {showAttachments && (
            <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-sm">
              <div className="grid grid-cols-4 gap-3">
                <button 
                  onClick={handleImageUpload}
                  className="flex flex-col items-center space-y-1 p-3 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700/30 rounded-xl flex items-center justify-center">
                    <Image className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Image</span>
                </button>
                <button 
                  onClick={handleDocumentUpload}
                  className="flex flex-col items-center space-y-1 p-3 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700/30 rounded-xl flex items-center justify-center">
                    <File className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Document</span>
                </button>
                <button 
                  onClick={handleAudioUpload}
                  className="flex flex-col items-center space-y-1 p-3 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700/30 rounded-xl flex items-center justify-center">
                    <Mic className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Audio</span>
                </button>
                <button 
                  onClick={handleEmojiClick}
                  className="flex flex-col items-center space-y-1 p-3 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700/30 rounded-xl flex items-center justify-center">
                    <Smile className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Emoji</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="mb-3 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-lg">
              <div className="grid grid-cols-8 gap-2">
                {['😊', '😃', '😄', '😁', '😎', '😭', '😤', '❤️', 
                  '😂', '😢', '😠', '😖', '👍', '😮', '😋', '😉'].map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => insertEmoji(emoji)}
                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 active:scale-95"
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
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-600 focus-within:border-slate-400 dark:focus-within:border-slate-500 transition-all duration-300 shadow-xl focus-within:shadow-2xl focus-within:shadow-slate-500/20">
            <div className="flex items-center p-3 min-h-[56px]">
              {/* Left Actions */}
              <div className="flex items-center space-x-2 pl-1">
                <button
                  onClick={toggleAttachments}
                  className={`p-2.5 rounded-xl transition-colors duration-200 ${
                    showAttachments 
                      ? 'bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400' 
                      : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
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
                className="flex-1 px-4 py-3 bg-transparent resize-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 scrollbar-hide text-sm font-normal leading-relaxed transition-none"
                style={{ minHeight: '40px', maxHeight: '120px' }}
                rows={1}
              />
              
              {/* Right Actions */}
              <div className="flex items-center space-x-2 pr-1">
                <button
                  onClick={toggleRecording}
                  className={`p-2.5 rounded-xl transition-colors duration-200 ${
                    isRecording 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse' 
                      : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/40 disabled:hover:shadow-lg p-3"
                >
                  <Send className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-[10px] sm:text-xs text-gray-400/60 dark:text-gray-500/50">
              {t.footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}