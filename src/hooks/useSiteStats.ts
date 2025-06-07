
import { useState, useEffect } from 'react';
import { getSiteStats, SiteStats } from '@/services/statsService';

export const useSiteStats = () => {
  const [stats, setStats] = useState<SiteStats>({
    totalCourses: 0,
    totalUsers: 0,
    totalInstructors: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = () => {
      try {
        const currentStats = getSiteStats();
        setStats(currentStats);
      } catch (error) {
        console.error('Error loading site stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
    
    // Update stats every 5 minutes to show growth
    const interval = setInterval(loadStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { stats, isLoading };
};
