
export interface SiteStats {
  totalCourses: number;
  totalUsers: number;
  totalInstructors: number;
}

// Mock data that simulates real tracking - in a real app this would come from your database
const INITIAL_STATS: SiteStats = {
  totalCourses: 12,
  totalUsers: 247,
  totalInstructors: 18
};

// Simulate realistic growth over time
const getRealisticStats = (): SiteStats => {
  const now = new Date();
  const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
  
  // Add gradual growth based on days
  const coursesGrowth = Math.floor(daysSinceEpoch * 0.1);
  const usersGrowth = Math.floor(daysSinceEpoch * 0.8);
  const instructorsGrowth = Math.floor(daysSinceEpoch * 0.05);
  
  return {
    totalCourses: INITIAL_STATS.totalCourses + coursesGrowth,
    totalUsers: INITIAL_STATS.totalUsers + usersGrowth,
    totalInstructors: INITIAL_STATS.totalInstructors + instructorsGrowth
  };
};

export const getSiteStats = (): SiteStats => {
  return getRealisticStats();
};

// Function to increment stats when new users/courses are added
export const incrementStat = (statType: keyof SiteStats) => {
  // In a real app, this would update your database
  console.log(`Incrementing ${statType}`);
};
