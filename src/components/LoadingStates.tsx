import React from 'react';
import { MessageCircle, Sparkles, Zap } from 'lucide-react';

interface LoadingStatesProps {
  type: 'typing' | 'thinking' | 'processing' | 'sending';
  language: 'fr' | 'en';
}

export default function LoadingStates({ type, language }: LoadingStatesProps) {
  const content = {
    fr: {
      typing: "Coach IA écrit...",
      thinking: "Coach IA réfléchit...",
      processing: "Traitement en cours...",
      sending: "Envoi du message..."
    },
    en: {
      typing: "AI Coach is typing...",
      thinking: "AI Coach is thinking...",
      processing: "Processing...",
      sending: "Sending message..."
    }
  };

  const t = content[language];

  const getLoadingContent = () => {
    switch (type) {
      case 'typing':
        return {
          icon: MessageCircle,
          text: t.typing,
          animation: 'bounce',
          color: 'purple'
        };
      case 'thinking':
        return {
          icon: Sparkles,
          text: t.thinking,
          animation: 'pulse',
          color: 'blue'
        };
      case 'processing':
        return {
          icon: Zap,
          text: t.processing,
          animation: 'spin',
          color: 'green'
        };
      case 'sending':
        return {
          icon: MessageCircle,
          text: t.sending,
          animation: 'ping',
          color: 'orange'
        };
      default:
        return {
          icon: MessageCircle,
          text: t.typing,
          animation: 'bounce',
          color: 'purple'
        };
    }
  };

  const { icon: IconComponent, text, animation, color } = getLoadingContent();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      case 'blue':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'green':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'orange':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
      default:
        return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
    }
  };

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'bounce':
        return 'animate-bounce';
      case 'pulse':
        return 'animate-pulse';
      case 'spin':
        return 'animate-spin';
      case 'ping':
        return 'animate-ping';
      default:
        return 'animate-bounce';
    }
  };

  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-4 max-w-3xl">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl px-6 py-4 shadow-lg">
          <div className="flex items-center space-x-3">
            {/* Animated Dots */}
            <div className="flex space-x-1">
              <div className={`w-2 h-2 bg-${color}-500 rounded-full animate-bounce`}></div>
              <div className={`w-2 h-2 bg-${color}-500 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
              <div className={`w-2 h-2 bg-${color}-500 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
            </div>
            
            {/* Icon */}
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
              <IconComponent className={`w-4 h-4 ${getAnimationClass(animation)}`} />
            </div>
            
            {/* Text */}
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton Loading Component
export const SkeletonLoader = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="flex space-x-4">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-2xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-lg w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-lg w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Button Loading State
export const ButtonLoading = ({ children, isLoading, ...props }: any) => {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};