import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Cookie, FileText, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, UserCheck } from 'lucide-react';

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
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  People First Technologies
                </h3>
                <p className="text-purple-300 text-sm">Coach Virtuel IA</p>
              </div>
            </div>
            
            <p className="text-lg font-medium text-purple-200">
              {t.tagline}
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              {t.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5 text-purple-300" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5 text-purple-300" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5 text-purple-300" />
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">{t.contact}</h4>
            
            <div className="space-y-3">
              <a href={`mailto:${t.email}`} className="flex items-center text-gray-300 hover:text-purple-300 transition-colors">
                <Mail className="w-4 h-4 mr-3 text-purple-400" />
                <span className="text-sm">{t.email}</span>
              </a>
              
              <a href={`tel:${t.phone}`} className="flex items-center text-gray-300 hover:text-purple-300 transition-colors">
                <Phone className="w-4 h-4 mr-3 text-purple-400" />
                <span className="text-sm">{t.phone}</span>
              </a>
              
              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{t.address}</span>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">{t.followUs}</h4>
            
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                {language === 'fr' 
                  ? "Restez informé de nos dernières innovations."
                  : "Stay informed about our latest innovations."
                }
              </p>
              
              <div className="flex">
                <input
                  type="email"
                  placeholder={language === 'fr' ? "Votre email" : "Your email"}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-r-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legal Links & Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start items-center space-x-6 text-sm">
              <Link 
                to="/mentions-legales"
                className="flex items-center text-gray-300 hover:text-purple-300 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                {t.legal}
              </Link>
              
              <Link 
                to="/politique-confidentialite"
                className="flex items-center text-gray-300 hover:text-purple-300 transition-colors"
              >
                <Shield className="w-4 h-4 mr-2" />
                {t.privacy}
              </Link>
              
              <Link 
                to="/politique-cookies"
                className="flex items-center text-gray-300 hover:text-purple-300 transition-colors"
              >
                <Cookie className="w-4 h-4 mr-2" />
                {t.cookies}
              </Link>
            </div>
            
            {/* Copyright */}
            <div className="flex items-center text-gray-400 text-sm">
              <span>© 2024 People First Technologies. {t.rights}</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                {t.madeWith}
                <Heart className="w-4 h-4 mx-1 text-red-400" />
                {t.by}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}