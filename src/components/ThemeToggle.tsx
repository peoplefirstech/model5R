import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        relative p-3 rounded-xl transition-all duration-300 
        ${isDark 
          ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200'
        }
        backdrop-blur-sm group
      `}
      aria-label={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`
            absolute inset-0 w-6 h-6 transition-all duration-300 transform
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `}
        />
        <Moon 
          className={`
            absolute inset-0 w-6 h-6 transition-all duration-300 transform
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `}
        />
      </div>
    </button>
  );
};