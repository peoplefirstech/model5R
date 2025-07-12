import React from 'react';
import { Heart, Shield, Cookie, FileText, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  language: 'fr' | 'en';
}

export default function Footer({ language }: FooterProps) {
  const content = {
    fr: {
      tagline: "Transformons ensemble votre potentiel en performance",
      description: "People First Technologies révolutionne le coaching avec l'intelligence artificielle pour créer des expériences d'apprentissage personnalisées et impactantes.",
      contact: "Contact",
      email: "contact@peoplefirst.tech",
      phone: "+33 1 23 45 67 89",
      address: "123 Avenue de l'Innovation, 75001 Paris, France",
      followUs: "Suivez-nous",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      cookies: "Politique des cookies",
      rights: "Tous droits réservés",
      madeWith: "Fait avec",
      by: "par People First Technologies"
    },
    en: {
      tagline: "Transform your potential into performance together",
      description: "People First Technologies revolutionizes coaching with artificial intelligence to create personalized and impactful learning experiences.",
      contact: "Contact",
      email: "contact@peoplefirst.tech",
      phone: "+33 1 23 45 67 89",
      address: "123 Innovation Avenue, 75001 Paris, France",
      followUs: "Follow us",
      legal: "Legal notices",
      privacy: "Privacy policy",
      cookies: "Cookie policy",
      rights: "All rights reserved",
      madeWith: "Made with",
      by: "by People First Technologies"
    }
  };

  const t = content[language];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    People First Technologies
                  </h3>
                  <p className="text-purple-300 text-sm font-medium">Coach Virtuel IA</p>
                </div>
              </div>
              
              <p className="text-xl font-semibold text-purple-200 leading-relaxed">
                {t.tagline}
              </p>
              
              <p className="text-gray-300 leading-relaxed max-w-md">
                {t.description}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="group p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Twitter className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <Facebook className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Mail className="w-5 h-5 mr-2 text-purple-400" />
                {t.contact}
              </h4>
              
              <div className="space-y-4">
                <a href={`mailto:${t.email}`} className="group flex items-center text-gray-300 hover:text-purple-300 transition-colors">
                  <Mail className="w-4 h-4 mr-3 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{t.email}</span>
                </a>
                
                <a href={`tel:${t.phone}`} className="group flex items-center text-gray-300 hover:text-purple-300 transition-colors">
                  <Phone className="w-4 h-4 mr-3 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{t.phone}</span>
                </a>
                
                <div className="flex items-start text-gray-300">
                  <MapPin className="w-4 h-4 mr-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{t.address}</span>
                </div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">{t.followUs}</h4>
              
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  {language === 'fr' 
                    ? "Restez informé de nos dernières innovations en IA et coaching."
                    : "Stay informed about our latest AI and coaching innovations."
                  }
                </p>
                
                <div className="flex">
                  <input
                    type="email"
                    placeholder={language === 'fr' ? "Votre email" : "Your email"}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legal Links & Copyright */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center space-x-1 sm:space-x-6 text-sm">
                <a href="#legal" className="group flex items-center text-gray-300 hover:text-purple-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5">
                  <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {t.legal}
                </a>
                
                <span className="text-gray-600 hidden sm:inline">•</span>
                
                <a href="#privacy" className="group flex items-center text-gray-300 hover:text-purple-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5">
                  <Shield className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {t.privacy}
                </a>
                
                <span className="text-gray-600 hidden sm:inline">•</span>
                
                <a href="#cookies" className="group flex items-center text-gray-300 hover:text-purple-300 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5">
                  <Cookie className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {t.cookies}
                </a>
              </div>
              
              {/* Copyright */}
              <div className="flex items-center text-gray-400 text-sm">
                <span>© 2024 People First Technologies. {t.rights}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  {t.madeWith}
                  <Heart className="w-4 h-4 mx-1 text-red-400 animate-pulse" />
                  {t.by}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
      </div>
    </footer>
  );
}