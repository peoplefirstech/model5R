import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import PresentationPage from './PresentationPage';
import ChatPage from './ChatPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'presentation' | 'chat'>('presentation');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <header>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
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

      {/* Affichage de la page en fonction du state */}
      {currentPage === 'presentation' ? <PresentationPage /> : <ChatPage />}
    </div>
  );
}

export default App;