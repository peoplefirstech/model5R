import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Cookie, FileText, Mail, Phone, MapPin, Linkedin, UserCheck } from 'lucide-react';

interface FooterProps {
  language: 'fr' | 'en';
}

export default function Footer({ language }: FooterProps) {
  const [isDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const content = {
    fr: {
      tagline: "L'excellence en coaching IA",
      description: "People First Technologies révolutionne le coaching avec l'intelligence artificielle pour créer des expériences d'apprentissage personnalisées et impactantes.",
      contact: "Contact",
      email: "info@peoplefirst-technologies.com", 
      phone: "+33 632 00 06 84",
      address: "34 rue Maisons Neuves, 13890 Mouriès, France",
      followUs: "Suivez-nous",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      cookies: "Politique des cookies",
      rights: "Tous droits réservés",
    },
    en: {
      tagline: "Excellence in AI coaching",
      description: "People First Technologies revolutionizes coaching with artificial intelligence to create personalized and impactful learning experiences.",
      contact: "Contact",
      email: "lshivaswamy@peoplefirst-technologies.com",
      phone: "+1-860-217-0198",
      address: "550 Reserve Street, Suite 390, Southlake, Texas 76092, USA",
      followUs: "Follow us",
      legal: "Legal notices",
      privacy: "Privacy policy",
      cookies: "Cookie policy",
      rights: "All rights reserved",
    }
  };

  const t = content[language];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25 ring-2 ring-white/10">
                  <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  People First Technologies
                </h3>
                <p className="text-purple-300 text-xs sm:text-sm font-medium">Coach Virtuel IA • Modèle 5R®</p>
              </div>
            </div>
            
            <p className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              {t.tagline}
            </p>
            
            <p className="text-gray-300 dark:text-gray-400 leading-relaxed text-base sm:text-lg">
              {t.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-2 sm:space-x-3">
              <a href="#" className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
              </a>
              <a href={`mailto:${t.email}`} className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
              </a>
              <a href={`tel:${t.phone}`} className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <span>{t.contact}</span>
            </h4>
            
            <div className="space-y-3 sm:space-y-4">
              <a href={`mailto:${t.email}`} className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-xl hover:bg-white/5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-purple-500/30 transition-colors duration-300 flex-shrink-0">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium break-all">{t.email}</span>
              </a>
              
              <a href={`tel:${t.phone}`} className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-xl hover:bg-white/5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-purple-500/30 transition-colors duration-300 flex-shrink-0">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium">{t.phone}</span>
              </a>
              
              <div className="group flex items-start text-gray-300 p-3 rounded-xl">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">{t.address}</span>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <span>{t.followUs}</span>
            </h4>
            
            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray-300 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                {language === 'fr' 
                  ? "Restez informé de nos dernières innovations."
                  : "Stay informed about our latest innovations."
                }
              </p>
              
              <div className="relative">
                <input
                  type="email"
                  placeholder={language === 'fr' ? "Votre email" : "Your email"}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm sm:text-base"
                />
                <button className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{language === 'fr' ? 'Pas de spam, promis' : 'No spam, promised'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legal Links & Copyright */}
      <div className="relative border-t border-white/10 dark:border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Legal Links */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-8 text-xs sm:text-sm">
              <Link 
                to="/mentions-legales"
                className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 whitespace-nowrap px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/5"
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                {t.legal}
              </Link>
              
              <Link 
                to="/politique-confidentialite"
                className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 whitespace-nowrap px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/5"
              >
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                {t.privacy}
              </Link>
              
              <Link 
                to="/politique-cookies"
                className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 whitespace-nowrap px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/5"
              >
                <Cookie className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                {t.cookies}
              </Link>
            </div>
            
            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm font-medium">
                © 2025 People First Technologies. {t.rights}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}