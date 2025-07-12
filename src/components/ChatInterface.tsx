import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, User, Bot, Clock, CheckCircle, UserCheck, ArrowLeft } from 'lucide-react';
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

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'fr' 
        ? "Bonjour ! Je suis votre Coach Virtuel IA de People First Technologies, basé sur le modèle 5R® du Professeur Cécile Dejoux. Je peux vous aider à améliorer l'engagement de votre équipe à travers les 5 piliers : Rôles, Routines, Règles, Respect et Reconnaissance. Quelle dimension souhaitez-vous explorer ?"
        : "Hello! I'm your Virtual AI Coach by People First Technologies, based on Professor Cécile Dejoux's 5R® model. I can help you improve your team's engagement through the 5 pillars: Roles, Routines, Rules, Respect and Recognition. Which dimension would you like to explore?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 300000)
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const content = {
    fr: {
      placeholder: "Posez votre question sur le management, l'engagement d'équipe et la transformation...",
      send: "Envoyer",
      recording: "Enregistrement...",
      quickQuestions: "Questions rapides",
      quickButtons: [
        { text: "Améliorer les Rôles", category: "Rôles" },
        { text: "Améliorer les Routines", category: "Routines" },
        { text: "Améliorer les Règles", category: "Règles" },
        { text: "Améliorer le Respect", category: "Respect" },
        { text: "Améliorer la Reconnaissance", category: "Reconnaissance" }
      ],
      typing: "Coach IA écrit...",
      online: "En ligne",
      back: "Retour"
    },
    en: {
      placeholder: "Ask your questions about management, team engagement and transformation...",
      send: "Send",
      recording: "Recording...",
      quickQuestions: "Quick questions",
      quickButtons: [
        { text: "Improve Roles", category: "Roles" },
        { text: "Improve Routines", category: "Routines" },
        { text: "Improve Rules", category: "Rules" },
        { text: "Improve Respect", category: "Respect" },
        { text: "Improve Recognition", category: "Recognition" }
      ],
      typing: "AI Coach is typing...",
      online: "Online",
      back: "Back"
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

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        fr: [
          "Pour **Rôles**, organisez un atelier collaboratif où l'équipe co-construit les définitions de poste. Définissez ensemble les responsabilités, les objectifs et les indicateurs de performance. Cela favorise l'appropriation et la clarté des missions.",
          "Concernant les **Routines**, établissez des rituels d'équipe réguliers : réunions hebdomadaires, points de synchronisation, célébrations des succès. La régularité crée un cadre sécurisant et renforce la cohésion.",
          "Pour les **Règles**, impliquez l'équipe dans l'élaboration de la charte de fonctionnement. Définissez ensemble les valeurs, les comportements attendus et les processus de décision. L'adhésion est plus forte quand chacun participe.",
          "Le **Respect** se cultive par l'écoute active, la reconnaissance des différences et la valorisation des contributions de chacun. Instaurez des moments d'échange et de feedback constructif.",
          "La **Reconnaissance** passe par la célébration des réussites, individuelles et collectives. Mettez en place un système de feedback positif régulier et valorisez les efforts autant que les résultats."
        ],
        en: [
          "For **Roles**, organize a collaborative workshop where the team co-builds job definitions. Define responsibilities, objectives and performance indicators together. This promotes ownership and clarity of missions.",
          "Regarding **Routines**, establish regular team rituals: weekly meetings, synchronization points, success celebrations. Regularity creates a secure framework and strengthens cohesion.",
          "For **Rules**, involve the team in developing the operating charter. Define values, expected behaviors and decision-making processes together. Adherence is stronger when everyone participates.",
          "**Respect** is cultivated through active listening, recognition of differences and valuing everyone's contributions. Establish moments for exchange and constructive feedback.",
          "**Recognition** involves celebrating successes, both individual and collective. Implement a regular positive feedback system and value efforts as much as results."
        ]
      };

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[language][Math.floor(Math.random() * responses[language].length)],
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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
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
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'fr' ? 'Basé sur le modèle 5R®' : 'Based on the 5R® model'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{t.online}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 custom-scrollbar">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <UserCheck className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-sm'
                    }`}>
                      <div 
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                        }}
                      />
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
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-white" />
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
        </div>

        {/* Quick Questions */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t.quickQuestions}</h3>
          <div className="flex flex-wrap gap-2">
            {t.quickButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(button.text)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-full transition-colors duration-200 hover:scale-105"
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder={t.placeholder}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                rows={1}
              />
              <button
                onClick={toggleSpeaking}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                  isSpeaking 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-500'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-full transition-all duration-200 ${
                isRecording
                  ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-500'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {isRecording && (
            <div className="mt-3 flex items-center justify-center space-x-2 text-red-600">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{t.recording}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}