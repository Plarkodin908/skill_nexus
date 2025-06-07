
import { useEffect, useState } from 'react';

interface PerformanceSettings {
  reduceAnimations: boolean;
  enableLazyLoading: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

export const usePerformance = (): PerformanceSettings => {
  const [settings, setSettings] = useState<PerformanceSettings>({
    reduceAnimations: false,
    enableLazyLoading: true,
    connectionSpeed: 'unknown'
  });

  useEffect(() => {
    // Check user preferences for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Estimate connection speed
    const connection = (navigator as any).connection;
    let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
    
    if (connection) {
      const effectiveType = connection.effectiveType;
      connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
    }

    setSettings({
      reduceAnimations: prefersReducedMotion || connectionSpeed === 'slow',
      enableLazyLoading: true,
      connectionSpeed
    });

    // Add performance monitoring
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        console.log('Performance settings applied:', {
          reduceAnimations: prefersReducedMotion,
          connectionSpeed
        });
      });
    }
  }, []);

  return settings;
};
