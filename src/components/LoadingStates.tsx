import React from 'react';
import { MessageCircle, Sparkles, Zap } from 'lucide-react';

interface LoadingStatesProps {
  type: 'typing' | 'thinking' | 'processing' | 'sending';
  language: 'fr' | 'en';
}

export default function LoadingStates({ type, language }: LoadingStatesProps) {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-4 max-w-3xl">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-500/25">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl px-6 py-4 shadow-lg">
          <div className="flex items-center justify-center">
            {/* Premium Typing Animation */}
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
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