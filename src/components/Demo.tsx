import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export function Demo() {
  return (
    <section id="demo" className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 overflow-hidden -mt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0F1E33] to-black">
        {/* Underwater God Rays */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ray-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <motion.polygon
              key={i}
              points={`${50 + i * 15},0 ${45 + i * 15},100 ${55 + i * 15},100`}
              fill="url(#ray-gradient)"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative max-w-6xl mx-auto z-10 my-[53px]">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] bg-clip-text text-transparent px-4">
            Take the Helm
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Experience the power of the Abyssal Engine firsthand.
          </p>
        </motion.div>

        {/* Laptop Mock-up - Reduced by 30% */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 0.63, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8 sm:mb-10 hidden md:block"
        >
          {/* Laptop Bezel */}
          <div className="relative mx-auto max-w-5xl">
            {/* Screen Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#00D9FF]/30 to-[#0099CC]/30 rounded-3xl blur-3xl opacity-60" />

            {/* Laptop Frame */}
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl mx-[0px] my-[-56px]">
              {/* Screen */}
              <div className="relative bg-[#0A1628] rounded-lg overflow-hidden aspect-video border-4 border-gray-900">
                {/* Dashboard Content */}
                <div className="absolute inset-0 p-8 px-[44px] py-[64px]">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0099CC]" />
                      <div className="text-[#00D9FF] text-lg">enLead Dashboard</div>
                    </div>
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded bg-white/5 border border-[#00D9FF]/20"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {['Total Leads', 'Enriched', 'Sent'].map((label, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                        className="backdrop-blur-xl bg-white/5 border border-[#00D9FF]/20 rounded-xl p-4"
                      >
                        <div className="text-white/50 text-xs mb-2">{label}</div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                          className="text-[#00D9FF] text-2xl"
                        >
                          {i === 0 ? '12,453' : i === 1 ? '8,921' : '4,532'}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="backdrop-blur-xl bg-white/5 border border-[#00D9FF]/20 rounded-xl p-6 h-48 relative overflow-hidden">
                    <div className="text-white/50 text-sm mb-4">Lead Activity</div>
                    {/* Simplified Chart */}
                    <svg className="w-full h-full" viewBox="0 0 400 100">
                      <motion.polyline
                        points="0,80 50,60 100,70 150,40 200,50 250,30 300,45 350,25 400,35"
                        fill="none"
                        stroke="url(#chart-gradient)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                      <defs>
                        <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00D9FF" />
                          <stop offset="100%" stopColor="#0099CC" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Glowing Dots */}
                    {[25, 45, 65, 85].map((x, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                                                transition={{
                          opacity: { duration: 0.5, delay: 1.5 + i * 0.1 },
                          scale: { duration: 0.5, delay: 1.5 + i * 0.1 },
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }
                        }}
                        className="absolute w-2 h-2 bg-[#00D9FF] rounded-full shadow-lg shadow-[#00D9FF]"
                        style={{
                          left: `${x}%`,
                          top: `${30 + Math.random() * 40}%`,
                        }}
                        animate={{
                          boxShadow: [
                            '0 0 10px rgba(0, 217, 255, 0.5)',
                            '0 0 20px rgba(0, 217, 255, 1)',
                            '0 0 10px rgba(0, 217, 255, 0.5)',
                          ],
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Animated Cursor (Simulated) */}
                <motion.div
                  initial={{ x: 100, y: 100, opacity: 0 }}
                  animate={{
                    x: [100, 300, 300, 150],
                    y: [100, 120, 180, 160],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-6 h-6 pointer-events-none z-50"
                >
                  <svg viewBox="0 0 24 24" fill="white">
                    <path d="M3 3l7.07 16.97l2.51-7.39l7.39-2.51L3 3z" />
                  </svg>
                </motion.div>
              </div>

              {/* Laptop Bottom */}
              <div className="h-2 bg-gradient-to-b from-gray-900 to-gray-950 rounded-b-xl" />
            </div>

            {/* Laptop Base */}
            <div className="relative h-3 bg-gradient-to-b from-gray-900 to-gray-950 rounded-b-3xl mx-auto w-[90%] shadow-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}