import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, User, Bot, Clock, CheckCircle, UserCheck, ArrowLeft, RefreshCw, Users, RotateCcw, FileText, Handshake, Award, Plus } from 'lucide-react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const content = {
    fr: {
      welcome: {
        greeting: "Bonjour",
        name: "Philippe",
        title: "Que souhaiteriez-vous savoir ?",
        subtitle: "Posez vos questions sur le management, l'engagement d'équipe et la transformation. Recevez des conseils personnalisés basés sur le modèle 5R®.",
        placeholder: "Posez votre question sur le management, l'engagement d'équipe..."
      },
      quickQuestions: "Questions rapides",
      quickButtons: [
        { 
          text: "Améliorer les Rôles", 
          category: "Rôles",
          icon: Users,
          description: "Question rapide"
        },
        { 
          text: "Améliorer les Routines", 
          category: "Routines",
          icon: RotateCcw,
          description: "Question rapide"
        },
        { 
          text: "Améliorer les Règles", 
          category: "Règles",
          icon: FileText,
          description: "Question rapide"
        },
        { 
          text: "Améliorer le Respect", 
          category: "Respect",
          icon: Handshake,
          description: "Question rapide"
        },
        { 
          text: "Améliorer la Reconnaissance", 
          category: "Reconnaissance",
          icon: Award,
          description: "Question rapide"
        }
      ],
      typing: "Coach IA écrit...",
      online: "En ligne",
      back: "Retour",
      refresh: "Actualiser les suggestions",
      newConversation: "Nouvelle conversation",
      footer: "Coach Virtuel IA by People First Technologies • +33 632 00 06 84 • info@peoplefirst-technologies.com"
    },
    en: {
      welcome: {
        greeting: "Hello",
        name: "Philippe",
        title: "What would you like to know?",
        subtitle: "Ask your questions about management, team engagement and transformation. Get personalized advice based on the 5R® model.",
        placeholder: "Ask your question about management, team engagement..."
      },
      quickQuestions: "Quick questions",
      quickButtons: [
        { 
          text: "Improve Roles", 
          category: "Roles",
          icon: Users,
          description: "Quick question"
        },
        { 
          text: "Improve Routines", 
          category: "Routines",
          icon: RotateCcw,
          description: "Quick question"
        },
        { 
          text: "Improve Rules", 
          category: "Rules",
          icon: FileText,
          description: "Quick question"
        },
        { 
          text: "Improve Respect", 
          category: "Respect",
          icon: Handshake,
          description: "Quick question"
        },
        { 
          text: "Improve Recognition", 
          category: "Recognition",
          icon: Award,
          description: "Quick question"
        }
      ],
      typing: "AI Coach is typing...",
      online: "Online",
      back: "Back",
      refresh: "Refresh suggestions",
      newConversation: "New conversation",
      footer: "AI Virtual Coach by People First Technologies • +1-860-217-0198 • lshivaswamy@peoplefirst-technologies.com"
    }
  };

  const t = content[language];

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Coach Virtuel IA</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'fr' ? 'Basé sur le modèle 5R®' : 'Based on the 5R® model'}
                  </p>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {language === 'fr' ? 'En ligne' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!showWelcome && (
                <button
                  onClick={handleNewConversation}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.newConversation}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showWelcome ? (
          /* Welcome Screen */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {t.welcome.greeting} <span className="gradient-text">{t.welcome.name}</span> !
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                {t.welcome.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {t.welcome.subtitle}
              </p>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
              {t.quickButtons.slice(0, 6).map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(button.text)}
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg transition-all duration-300 text-left hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                      <button.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {button.text}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {button.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">{t.refresh}</span>
            </button>
          </div>
        ) : (
          /* Chat Messages */
          <div className="space-y-6 mb-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <UserCheck className="w-5 h-5 text-white" />
                    )}
                  </div>
                  
                  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-sm'
                    }`}>
                      {message.sender === 'user' ? (
                        <div className="text-sm leading-relaxed">
                          {message.text}
                        </div>
                      ) : (
                        <div 
                          className="text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ 
                            __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                          }}
                        />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-1 px-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && (
                        <CheckCircle className="w-3 h-3 text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t.typing}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder={t.welcome.placeholder}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 scrollbar-hide"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                  rows={1}
                />
              </div>
              
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100 shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Footer */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.footer}
              </p>
            </div>
          </div>
        </div>

        {/* Spacer for fixed input */}
        <div className="h-32"></div>
      </div>
    </div>
  );
}