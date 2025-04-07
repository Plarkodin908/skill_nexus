
const Stats = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/30 space-y-2">
            <p className="text-4xl font-bold text-gray-300">95%</p>
            <p className="text-white/80">Placement Rate</p>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/30 space-y-2">
            <p className="text-4xl font-bold text-gray-300">48hrs</p>
            <p className="text-white/80">Average Response Time</p>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/30 space-y-2">
            <p className="text-4xl font-bold text-gray-300">10k+</p>
            <p className="text-white/80">Companies Trust Us</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
