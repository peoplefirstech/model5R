import React from 'react';
import { Shield, FileText, Cookie } from 'lucide-react';

interface FooterProps {
  language: 'fr' | 'en';
}

export default function Footer({ language }: FooterProps) {
  const content = {
    fr: {
      company: "People First Technologies",
      tagline: "Coach Virtuel IA",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité", 
      cookies: "Politique des cookies",
      rights: "© 2024 People First Technologies. Tous droits réservés."
    },
    en: {
      company: "People First Technologies",
      tagline: "Virtual AI Coach",
      legal: "Legal notices",
      privacy: "Privacy policy",
      cookies: "Cookie policy", 
      rights: "© 2024 People First Technologies. All rights reserved."
    }
  };

  const t = content[language];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t.company}</h3>
                <p className="text-purple-300 text-sm">{t.tagline}</p>
              </div>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="md:text-right">
            <h4 className="text-lg font-semibold mb-4">Informations légales</h4>
            <div className="space-y-2">
              <a 
                href="#legal" 
                className="flex items-center md:justify-end text-gray-300 hover:text-white transition-colors duration-200"
              >
                <FileText className="w-4 h-4 mr-2 md:order-2 md:ml-2 md:mr-0" />
                <span>{t.legal}</span>
              </a>
              
              <a 
                href="#privacy" 
                className="flex items-center md:justify-end text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Shield className="w-4 h-4 mr-2 md:order-2 md:ml-2 md:mr-0" />
                <span>{t.privacy}</span>
              </a>
              
              <a 
                href="#cookies" 
                className="flex items-center md:justify-end text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Cookie className="w-4 h-4 mr-2 md:order-2 md:ml-2 md:mr-0" />
                <span>{t.cookies}</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-400 text-sm">
            {t.rights}
          </p>
        </div>
        
      </div>
    </footer>
  );
}