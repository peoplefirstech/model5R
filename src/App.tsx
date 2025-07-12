import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown, Star, Users, Target, TrendingUp, CheckCircle, ArrowRight, Mail, Phone, MapPin, User, Building, MessageSquare, Clock, Zap, Shield, Award } from 'lucide-react';
import Footer from './components/Footer';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        isBot: false,
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Merci pour votre message. Notre équipe d'experts va analyser votre demande et vous proposer une solution personnalisée.",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const PresentationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                People First Technologies
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {language === 'fr' ? 'Accueil' : 'Home'}
              </button>
              <button onClick={() => setCurrentPage('presentation')} className="text-blue-600 font-medium">
                {language === 'fr' ? 'Présentation' : 'Presentation'}
              </button>
              <button onClick={() => setCurrentPage('chat')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {language === 'fr' ? 'Chat IA' : 'AI Chat'}
              </button>
              <button onClick={() => setCurrentPage('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <button
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 group border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50"
              >
                <Mail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                Demander un expert
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              {language === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <button onClick={() => { setCurrentPage('presentation'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-blue-600 bg-blue-50 rounded-lg">
              {language === 'fr' ? 'Présentation' : 'Presentation'}
            </button>
            <button onClick={() => { setCurrentPage('chat'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              {language === 'fr' ? 'Chat IA' : 'AI Chat'}
            </button>
            <button onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Contact
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Solutions IA Innovantes' : 'Innovative AI Solutions'}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {language === 'fr' ? (
              <>
                L'IA au service de
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  votre entreprise
                </span>
              </>
            ) : (
              <>
                AI at the service of
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  your business
                </span>
              </>
            )}
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {language === 'fr' 
              ? 'Transformez votre organisation avec nos solutions d\'intelligence artificielle sur mesure. Automatisation, analyse prédictive et optimisation des processus.'
              : 'Transform your organization with our custom artificial intelligence solutions. Automation, predictive analysis and process optimization.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {language === 'fr' ? 'Commencer maintenant' : 'Get Started Now'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button 
              onClick={() => setCurrentPage('chat')}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {language === 'fr' ? 'Essayer le Chat IA' : 'Try AI Chat'}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? 'Nos Solutions' : 'Our Solutions'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'fr' 
                ? 'Des technologies de pointe pour révolutionner votre façon de travailler'
                : 'Cutting-edge technologies to revolutionize the way you work'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Automatisation Intelligente' : 'Smart Automation'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'fr' 
                  ? 'Automatisez vos processus métier avec des algorithmes d\'IA avancés pour gagner en efficacité et réduire les erreurs.'
                  : 'Automate your business processes with advanced AI algorithms to gain efficiency and reduce errors.'
                }
              </p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Analyse Prédictive' : 'Predictive Analytics'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'fr' 
                  ? 'Anticipez les tendances et prenez des décisions éclairées grâce à nos modèles prédictifs sophistiqués.'
                  : 'Anticipate trends and make informed decisions with our sophisticated predictive models.'
                }
              </p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Optimisation Continue' : 'Continuous Optimization'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'fr' 
                  ? 'Optimisez en permanence vos opérations avec des systèmes d\'apprentissage adaptatifs.'
                  : 'Continuously optimize your operations with adaptive learning systems.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">
                {language === 'fr' ? 'Projets Réalisés' : 'Projects Completed'}
              </div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">
                {language === 'fr' ? 'Satisfaction Client' : 'Client Satisfaction'}
              </div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">
                {language === 'fr' ? 'Experts IA' : 'AI Experts'}
              </div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">
                {language === 'fr' ? 'Support Technique' : 'Technical Support'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {language === 'fr' ? 'Prêt à transformer votre entreprise ?' : 'Ready to transform your business?'}
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            {language === 'fr' 
              ? 'Contactez nos experts pour une consultation gratuite et découvrez comment l\'IA peut révolutionner votre activité.'
              : 'Contact our experts for a free consultation and discover how AI can revolutionize your business.'
            }
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5 mr-2" />
            {language === 'fr' ? 'Demander une consultation' : 'Request a consultation'}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );

  const ChatPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                People First Technologies
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {language === 'fr' ? 'Accueil' : 'Home'}
              </button>
              <button onClick={() => setCurrentPage('presentation')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {language === 'fr' ? 'Présentation' : 'Presentation'}
              </button>
              <button onClick={() => setCurrentPage('chat')} className="text-blue-600 font-medium">
                {language === 'fr' ? 'Chat IA' : 'AI Chat'}
              </button>
              <button onClick={() => setCurrentPage('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <button
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 group border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50"
              >
                <Mail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                Demander un expert
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">
              {language === 'fr' ? 'Assistant IA People First' : 'People First AI Assistant'}
            </h1>
            <p className="text-blue-100">
              {language === 'fr' 
                ? 'Posez vos questions sur nos solutions IA'
                : 'Ask questions about our AI solutions'
              }
            </p>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={language === 'fr' ? 'Tapez votre message...' : 'Type your message...'}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                {language === 'fr' ? 'Envoyer' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                People First Technologies
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {language === 'fr' ? 'Accueil' : 'Home'}
              </button>
              <button onClick={() => setCurrentPage('presentation')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {language === 'fr' ? 'Présentation' : 'Presentation'}
              </button>
              <button onClick={() => setCurrentPage('chat')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {language === 'fr' ? 'Chat IA' : 'AI Chat'}
              </button>
              <button onClick={() => setCurrentPage('contact')} className="text-blue-600 font-medium">
                Contact
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <button
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 group border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50"
              >
                <Mail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                Demander un expert
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Contactez nos experts' : 'Contact our experts'}
          </h1>
          <p className="text-xl text-gray-600">
            {language === 'fr' 
              ? 'Prêt à transformer votre entreprise avec l\'IA ? Parlons-en !'
              : 'Ready to transform your business with AI? Let\'s talk!'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'fr' ? 'Demande de consultation' : 'Consultation Request'}
            </h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Prénom' : 'First Name'}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'fr' ? 'Votre prénom' : 'Your first name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Nom' : 'Last Name'}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'fr' ? 'Votre nom' : 'Your last name'}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Email professionnel' : 'Professional Email'}
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'fr' ? 'votre.email@entreprise.com' : 'your.email@company.com'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Entreprise' : 'Company'}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'fr' ? 'Nom de votre entreprise' : 'Your company name'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Téléphone' : 'Phone'}
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'fr' ? '+33 1 23 45 67 89' : '+1 (555) 123-4567'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Décrivez votre projet' : 'Describe your project'}
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={language === 'fr' 
                    ? 'Parlez-nous de vos besoins en IA, vos objectifs et vos défis actuels...'
                    : 'Tell us about your AI needs, objectives and current challenges...'
                  }
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                {language === 'fr' ? 'Envoyer ma demande' : 'Send my request'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">
                {language === 'fr' ? 'Informations de contact' : 'Contact Information'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-200" />
                  <span>contact@peoplefirst-tech.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-200" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-200" />
                  <span>
                    {language === 'fr' 
                      ? '123 Avenue des Champs-Élysées, 75008 Paris'
                      : '123 Champs-Élysées Avenue, 75008 Paris'
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-200" />
                  <span>
                    {language === 'fr' 
                      ? 'Lun-Ven: 9h-18h'
                      : 'Mon-Fri: 9am-6pm'
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Pourquoi nous choisir ?' : 'Why choose us?'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    {language === 'fr' 
                      ? 'Expertise reconnue en IA et machine learning'
                      : 'Recognized expertise in AI and machine learning'
                    }
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    {language === 'fr' 
                      ? 'Solutions sur mesure adaptées à vos besoins'
                      : 'Custom solutions adapted to your needs'
                    }
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    {language === 'fr' 
                      ? 'Support technique 24/7'
                      : '24/7 technical support'
                    }
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    {language === 'fr' 
                      ? 'ROI mesurable et garantie de résultats'
                      : 'Measurable ROI and guaranteed results'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                People First Technologies
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => setCurrentPage('home')} className="text-blue-600 font-medium">
                {language === 'fr' ? 'Accueil' : 'Home'}
              </button>
              <button onClick={() => setCurrentPage('presentation')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {language === 'fr' ? 'Présentation' : 'Presentation'}
              </button>
              <button onClick={() => setCurrentPage('chat')} className="text-gray-700 hover:text-blue-600 transition-colors">
                {language === 'fr' ? 'Chat IA' : 'AI Chat'}
              </button>
              <button onClick={() => setCurrentPage('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <button
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 group border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50"
              >
                <Mail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                Demander un expert
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-blue-600 bg-blue-50 rounded-lg">
              {language === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <button onClick={() => { setCurrentPage('presentation'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              {language === 'fr' ? 'Présentation' : 'Presentation'}
            </button>
            <button onClick={() => { setCurrentPage('chat'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              {language === 'fr' ? 'Chat IA' : 'AI Chat'}
            </button>
            <button onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              Contact
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Solutions IA Innovantes' : 'Innovative AI Solutions'}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {language === 'fr' ? (
              <>
                Révolutionnez votre
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  entreprise avec l'IA
                </span>
              </>
            ) : (
              <>
                Revolutionize your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  business with AI
                </span>
              </>
            )}
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {language === 'fr' 
              ? 'Transformez votre organisation avec nos solutions d\'intelligence artificielle sur mesure. Automatisation, analyse prédictive et optimisation des processus.'
              : 'Transform your organization with our custom artificial intelligence solutions. Automation, predictive analysis and process optimization.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {language === 'fr' ? 'Commencer maintenant' : 'Get Started Now'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button 
              onClick={() => setCurrentPage('presentation')}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <Users className="w-5 h-5 mr-2" />
              {language === 'fr' ? 'En savoir plus' : 'Learn More'}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? 'Pourquoi choisir People First ?' : 'Why choose People First?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'fr' 
                ? 'Nous mettons l\'humain au centre de la technologie pour créer des solutions IA qui transforment vraiment votre business'
                : 'We put humans at the center of technology to create AI solutions that truly transform your business'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Approche Humaine' : 'Human Approach'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'fr' 
                  ? 'Nous concevons des solutions IA qui augmentent les capacités humaines plutôt que de les remplacer.'
                  : 'We design AI solutions that augment human capabilities rather than replace them.'
                }
              </p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Sécurité Garantie' : 'Guaranteed Security'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'fr' 
                  ? 'Vos données sont protégées par les plus hauts standards de sécurité et de confidentialité.'
                  : 'Your data is protected by the highest security and confidentiality standards.'
                }
              </p>
            </div>
            
            <div className="group p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Excellence Reconnue' : 'Recognized Excellence'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'fr' 
                  ? 'Notre expertise est reconnue par les leaders de l\'industrie et nos clients nous font confiance.'
                  : 'Our expertise is recognized by industry leaders and our clients trust us.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {language === 'fr' ? 'Prêt à commencer votre transformation ?' : 'Ready to start your transformation?'}
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            {language === 'fr' 
              ? 'Rejoignez les centaines d\'entreprises qui ont déjà transformé leur activité avec nos solutions IA.'
              : 'Join the hundreds of companies that have already transformed their business with our AI solutions.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5 mr-2" />
              {language === 'fr' ? 'Demander un expert' : 'Request an expert'}
            </button>
            
            <button 
              onClick={() => setCurrentPage('chat')}
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {language === 'fr' ? 'Essayer le Chat IA' : 'Try AI Chat'}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );

  return currentPage === 'presentation' ? <PresentationPage /> : currentPage === 'chat' ? <ChatPage /> : currentPage === 'contact' ? <ContactPage /> : <HomePage />;
}

export default App;