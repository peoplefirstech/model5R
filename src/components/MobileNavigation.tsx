import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageCircle, 
  User, 
  Settings, 
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  Phone,
  Mail
} from 'lucide-react';

interface MobileNavigationProps {
  language: 'fr' | 'en';
  isDark: boolean;
  onLanguageChange: () => void;
  onThemeChange: () => void;
}

export default function MobileNavigation({ 
  language, 
  isDark, 
  onLanguageChange, 
  onThemeChange 
}: MobileNavigationProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const content = {
    fr: {
      home: "Accueil",
      chat: "Chat",
      contact: "Contact",
      settings: "Paramètres",
      language: "Langue",
      theme: "Thème",
      phone: "Téléphone",
      email: "Email"
    },
    en: {
      home: "Home",
      chat: "Chat", 
      contact: "Contact",
      settings: "Settings",
      language: "Language",
      theme: "Theme",
      phone: "Phone",
      email: "Email"
    }
  };

  const t = content[language];

  const navItems = [
    { path: '/', icon: Home, label: t.home },
    { path: '/chat', icon: MessageCircle, label: t.chat },
    { path: '#contact', icon: Mail, label: t.contact },
    { path: '#', icon: Settings, label: t.settings, action: () => setIsDrawerOpen(true) }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/chat') return location.pathname === '/chat';
    return false;
  };

  return (
    <>
      {/* Bottom Tab Bar - iOS/Android Style */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/80 dark:border-gray-700/80 shadow-2xl">
        {/* Safe area padding for iPhone */}
        <div className="pb-safe">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);
              
              if (item.action) {
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="flex flex-col items-center justify-center p-2 min-w-[60px] transition-all duration-200 active:scale-95"
                  >
                    <div className={`p-2 rounded-xl transition-all duration-200 ${
                      active 
                        ? 'bg-purple-100 dark:bg-purple-900/50' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}>
                      <IconComponent className={`w-5 h-5 transition-colors duration-200 ${
                        active 
                          ? 'text-purple-600 dark:text-purple-400' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <span className={`text-xs font-medium mt-1 transition-colors duration-200 ${
                      active 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              }

              if (item.path.startsWith('#')) {
                return (
                  <a
                    key={index}
                    href={item.path}
                    className="flex flex-col items-center justify-center p-2 min-w-[60px] transition-all duration-200 active:scale-95"
                  >
                    <div className={`p-2 rounded-xl transition-all duration-200 ${
                      active 
                        ? 'bg-purple-100 dark:bg-purple-900/50' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}>
                      <IconComponent className={`w-5 h-5 transition-colors duration-200 ${
                        active 
                          ? 'text-purple-600 dark:text-purple-400' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <span className={`text-xs font-medium mt-1 transition-colors duration-200 ${
                      active 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {item.label}
                    </span>
                  </a>
                );
              }

              return (
                <Link
                  key={index}
                  to={item.path}
                  className="flex flex-col items-center justify-center p-2 min-w-[60px] transition-all duration-200 active:scale-95"
                >
                  <div className={`p-2 rounded-xl transition-all duration-200 ${
                    active 
                      ? 'bg-purple-100 dark:bg-purple-900/50' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>
                    <IconComponent className={`w-5 h-5 transition-colors duration-200 ${
                      active 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <span className={`text-xs font-medium mt-1 transition-colors duration-200 ${
                    active 
                      ? 'text-purple-600 dark:text-purple-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Settings Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="pb-safe">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.settings}</h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Settings Options */}
              <div className="px-6 py-4 space-y-4">
                {/* Language Toggle */}
                <button
                  onClick={() => {
                    onLanguageChange();
                    setIsDrawerOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-98"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">{t.language}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{language.toUpperCase()}</p>
                    </div>
                  </div>
                </button>
                
                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    onThemeChange();
                    setIsDrawerOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-98"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                      {isDark ? (
                        <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      ) : (
                        <Sun className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">{t.theme}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isDark ? (language === 'fr' ? 'Sombre' : 'Dark') : (language === 'fr' ? 'Clair' : 'Light')}
                      </p>
                    </div>
                  </div>
                </button>
                
                {/* Contact Options */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href="tel:+33632000684"
                    className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-98 mb-3"
                  >
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">{t.phone}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">+33 632 00 06 84</p>
                    </div>
                  </a>
                  
                  <a
                    href="mailto:info@peoplefirst-technologies.com"
                    className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-98"
                  >
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">Email</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">info@peoplefirst-technologies.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}