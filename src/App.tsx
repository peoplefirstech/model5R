import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LegalPages from './components/LegalPages';
import ChatInterface from './components/ChatInterface';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mentions-legales" element={<LegalPages page="legal" language="fr" onBack={() => window.history.back()} />} />
          <Route path="/politique-confidentialite" element={<LegalPages page="privacy" language="fr" onBack={() => window.history.back()} />} />
          <Route path="/politique-cookies" element={<LegalPages page="cookies" language="fr" onBack={() => window.history.back()} />} />
          <Route path="/chat" element={<ChatInterface language="fr" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;