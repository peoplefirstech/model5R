// Haptic Feedback Simulation for Web
export class HapticFeedback {
  private static isSupported = 'vibrate' in navigator;

  static light() {
    if (this.isSupported) {
      navigator.vibrate(10);
    }
  }

  static medium() {
    if (this.isSupported) {
      navigator.vibrate(20);
    }
  }

  static heavy() {
    if (this.isSupported) {
      navigator.vibrate([30, 10, 30]);
    }
  }

  static success() {
    if (this.isSupported) {
      navigator.vibrate([10, 50, 10]);
    }
  }

  static error() {
    if (this.isSupported) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  }

  static selection() {
    if (this.isSupported) {
      navigator.vibrate(5);
    }
  }
}

// Hook pour utiliser le haptic feedback
import { useCallback } from 'react';

export const useHapticFeedback = () => {
  const triggerLight = useCallback(() => HapticFeedback.light(), []);
  const triggerMedium = useCallback(() => HapticFeedback.medium(), []);
  const triggerHeavy = useCallback(() => HapticFeedback.heavy(), []);
  const triggerSuccess = useCallback(() => HapticFeedback.success(), []);
  const triggerError = useCallback(() => HapticFeedback.error(), []);
  const triggerSelection = useCallback(() => HapticFeedback.selection(), []);

  return {
    triggerLight,
    triggerMedium,
    triggerHeavy,
    triggerSuccess,
    triggerError,
    triggerSelection
  };
};