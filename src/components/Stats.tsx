
import { useSiteStats } from "@/hooks/useSiteStats";

const Stats = () => {
  const { stats, isLoading } = useSiteStats();

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/30 space-y-2">
                <div className="animate-pulse bg-gray-700 h-12 w-24 mx-auto rounded"></div>
                <div className="animate-pulse bg-gray-700 h-4 w-32 mx-auto rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k+`;
    }
    return `${num}+`;
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/30 space-y-2">
            <p className="text-4xl font-bold text-gray-300">{formatNumber(stats.totalCourses)}</p>
            <p className="text-white/80">Courses Available</p>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/30 space-y-2">
            <p className="text-4xl font-bold text-gray-300">{formatNumber(stats.totalUsers)}</p>
            <p className="text-white/80">Active Members</p>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/30 space-y-2">
            <p className="text-4xl font-bold text-gray-300">{formatNumber(stats.totalInstructors)}</p>
            <p className="text-white/80">Expert Instructors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
