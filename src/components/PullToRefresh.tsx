import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  language: 'fr' | 'en';
}

export default function PullToRefresh({ onRefresh, children, language }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const content = {
    fr: {
      pullToRefresh: "Tirez pour actualiser",
      releaseToRefresh: "Relâchez pour actualiser",
      refreshing: "Actualisation..."
    },
    en: {
      pullToRefresh: "Pull to refresh",
      releaseToRefresh: "Release to refresh", 
      refreshing: "Refreshing..."
    }
  };

  const t = content[language];

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (window.scrollY > 0 || isRefreshing) return;

    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, (currentY.current - startY.current) * 0.5);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(distance);
      setCanRefresh(distance > 80);
    }
  };

  const handleTouchEnd = async () => {
    if (canRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
        setCanRefresh(false);
      }
    } else {
      setPullDistance(0);
      setCanRefresh(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [canRefresh, isRefreshing]);

  const getRefreshText = () => {
    if (isRefreshing) return t.refreshing;
    if (canRefresh) return t.releaseToRefresh;
    return t.pullToRefresh;
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Pull to Refresh Indicator */}
      <div 
        className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent transition-all duration-200 ease-out z-10"
        style={{ 
          height: Math.min(pullDistance, 120),
          transform: `translateY(${Math.min(pullDistance - 120, 0)}px)`,
          opacity: pullDistance > 20 ? 1 : 0
        }}
      >
        <div className="flex flex-col items-center space-y-2 py-4">
          <div className={`transition-transform duration-200 ${
            isRefreshing ? 'animate-spin' : canRefresh ? 'rotate-180' : 'rotate-0'
          }`}>
            <RefreshCw className={`w-6 h-6 transition-colors duration-200 ${
              canRefresh ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'
            }`} />
          </div>
          <span className={`text-sm font-medium transition-colors duration-200 ${
            canRefresh ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {getRefreshText()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div 
        className="transition-transform duration-200 ease-out"
        style={{ 
          transform: `translateY(${Math.min(pullDistance * 0.3, 40)}px)` 
        }}
      >
        {children}
      </div>
    </div>
  );
}