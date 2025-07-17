import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LegalPages from './components/LegalPages';
import ChatInterface from './components/ChatInterface';
import AuthPage from './components/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  // Centralized language state management
  const [language, setLanguage] = useState<'fr' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage as 'fr' | 'en') || 'fr';
    }
    return 'fr';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage language={language} setLanguage={setLanguage} />} />
        <Route path="/auth" element={<AuthPage language={language} />} />
        <Route path="/auth" element={<AuthPage language={language} />} />
        <Route path="/mentions-legales" element={<LegalPages page="legal" language={language} onBack={() => window.history.back()} />} />
        <Route path="/politique-confidentialite" element={<LegalPages page="privacy" language={language} onBack={() => window.history.back()} />} />
        <Route path="/politique-cookies" element={<LegalPages page="cookies" language={language} onBack={() => window.history.back()} />} />
        <Route path="/chat" element={
          <ProtectedRoute language={language}>
            <ChatInterface language={language} />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;