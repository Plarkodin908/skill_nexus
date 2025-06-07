
import React, { Suspense, lazy } from 'react';
import { usePerformance } from '@/hooks/usePerformance';
import { cn } from '@/lib/utils';

interface OptimizedWrapperProps {
  children: React.ReactNode;
  className?: string;
  enableAnimations?: boolean;
  fallback?: React.ReactNode;
}

const OptimizedWrapper: React.FC<OptimizedWrapperProps> = ({
  children,
  className,
  enableAnimations = true,
  fallback = <div className="loading-skeleton h-20 w-full" />
}) => {
  const { reduceAnimations, connectionSpeed } = usePerformance();

  const shouldAnimate = enableAnimations && !reduceAnimations && connectionSpeed !== 'slow';

  return (
    <div
      className={cn(
        'transition-all duration-300',
        shouldAnimate && 'fade-in-up',
        connectionSpeed === 'slow' && 'reduce-motion',
        className
      )}
    >
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
};

export default OptimizedWrapper;
