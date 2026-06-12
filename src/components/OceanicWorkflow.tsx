import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Database, Radar, Send } from 'lucide-react';
import rawCsvImage from 'figma:asset/b8602e1e9cd34687770065f08c6227605b88d4aa.png';

const features = [
  {
    id: 1,
    icon: Database,
    headline: 'The Abyssal Vault',
    body: 'Stop drowning in scattered CSVs. Upload raw lists into a centralized, secure intelligence core. Sort, filter, and segment millions of leads with zero latency.',
    visual: 'vault',
  },
  {
    id: 2,
    icon: Radar,
    headline: 'Sonar Persona Mapping',
    body: 'Go deeper than just emails. Our AI scans the depths of the web to build comprehensive personas, tech stacks, recent news, and hiring trends, giving you the full picture.',
    visual: 'sonar',
  },
  {
    id: 3,
    icon: Send,
    headline: 'AI-Pilot Outreach',
    body: 'Launch campaigns that navigate themselves. Select an intent, and our Agent drafts thousands of unique, hyper-personalized emails that land in the primary inbox.',
    visual: 'outreach',
  },
];

function VaultVisual() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* RAW.csv Image */}
      <motion.img
        src={rawCsvImage}
        alt="RAW.csv files"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute left-0 w-[280px] h-auto"
        style={{ zIndex: 10 }}
      />

      {/* Interactive Arrow */}
      <svg
        className="absolute left-1/2 -translate-x-1/2 hidden sm:block"
        width="160"
        height="80"
        viewBox="0 0 160 80"
      >
        <defs>
          <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#0099CC" />
          </linearGradient>
        </defs>
        
        {/* Arrow Body */}
        <motion.line
          x1="20"
          y1="40"
          x2="120"
          y2="40"
          stroke="url(#arrow-gradient)"
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        
        {/* Arrow Head */}
        <motion.path
          d="M 120 40 L 105 30 M 120 40 L 105 50"
          stroke="url(#arrow-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        
        {/* Flowing Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx="20"
            cy="40"
            r="3"
            fill="#00D9FF"
            initial={{ cx: 20, opacity: 0 }}
            animate={{
              cx: [20, 120],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.6 + i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Holographic Grid */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute right-0 sm:right-[60px] bg-gradient-to-br from-[#0A1628] to-[#0F1E33] border-2 border-[#00D9FF]/50 rounded-xl p-6 shadow-2xl shadow-[#00D9FF]/40"
      >
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="flex gap-3 items-center"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00D9FF] to-[#0099CC]" />
              <div className="flex-1 h-2 bg-[#00D9FF]/30 rounded" />
            </motion.div>
          ))}
        </div>
        <div className="absolute -top-2 -right-2 text-xs bg-[#00D9FF] px-2 py-1 rounded text-[#0A1628]">
          CLEAN
        </div>
      </motion.div>
    </div>
  );
}

function SonarVisual() {
  const [scanning, setScanning] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative w-full h-[400px] flex items-center justify-center">
      {/* User Avatar Base */}
      <div className="relative">
        {/* Sonar Sweep Rings - Behind Avatar */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              isInView
                ? {
                    scale: [0.8, 2.5],
                    opacity: [0.6, 0],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: 'easeOut',
            }}
            className="absolute w-32 h-32 rounded-full border-2 border-[#00D9FF] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
          />
        ))}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-4xl relative z-10"
        >
          👤
        </motion.div>

        {/* Sonar Scan Line */}
        <motion.div
          initial={{ top: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  top: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.5,
          }}
          onAnimationStart={() => setScanning(true)}
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent shadow-lg shadow-[#00D9FF]/80 z-20"
          style={{ filter: 'blur(2px)' }}
        />

        {/* Revealed Data Points */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={scanning ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute -top-12 -right-20 bg-[#0A1628] border border-[#00D9FF]/50 rounded-lg px-3 py-2 text-xs text-[#00D9FF] whitespace-nowrap shadow-xl"
        >
          <div>Job Title: CEO</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={scanning ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="absolute top-1/2 -right-28 bg-[#0A1628] border border-[#00D9FF]/50 rounded-lg px-3 py-2 text-xs text-[#00D9FF] whitespace-nowrap shadow-xl"
        >
          <div>Location: SF, CA</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={scanning ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="absolute -bottom-12 -right-24 bg-[#0A1628] border border-[#00D9FF]/50 rounded-lg px-3 py-2 text-xs text-[#00D9FF] whitespace-nowrap shadow-xl"
        >
          <div>Last Tweet: 2h ago</div>
        </motion.div>

        {/* Sonar Rings - Removed to fix glitching */}
      </div>
    </div>
  );
}

function OutreachVisual() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Lead Profile */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute left-0 bg-gradient-to-br from-[#0A1628] to-[#0F1E33] border-2 border-[#00D9FF]/50 rounded-xl p-4 shadow-xl z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0099CC]" />
          <div>
            <div className="text-white text-sm">John Doe</div>
            <div className="text-[#00D9FF] text-xs">CEO @ TechCorp</div>
          </div>
        </div>
      </motion.div>

      {/* Animated Arrow */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:block"
        width="200"
        height="80"
        viewBox="0 0 200 80"
      >
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00D9FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0099CC" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Wave Path */}
        <path
          d="M 20 40 Q 40 25, 60 40 T 100 40 T 140 40 L 160 40"
          stroke="#00D9FF"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        
        {/* Animated Wave Tail */}
        <path
          d="M 20 40 Q 40 25, 60 40 T 100 40 T 140 40 L 160 40"
          stroke="url(#arrowGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="60 140"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="200"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Arrow Head */}
        <path
          d="M 160 40 L 145 32 M 160 40 L 145 48"
          stroke="#00D9FF"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Sent Envelope */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute right-0 sm:right-16 bg-gradient-to-br from-[#00D9FF] to-[#0099CC] rounded-xl p-6 shadow-2xl shadow-[#00D9FF]/50 z-10"
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z" />
        </svg>
        <div className="absolute -bottom-2 -right-2 text-xs bg-white text-[#0A1628] px-2 py-1 rounded">
          SENT
        </div>
      </motion.div>
    </div>
  );
}

export function OceanicWorkflow() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-0 overflow-hidden min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0F1E33] to-[#0A1628]" />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10 w-full px-4 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="relative w-full">
            {/* Animated Blue Background - Full Width - Hidden on mobile */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                scaleX: { duration: 0.6, delay: 0.1 },
                background: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              }}
              whileHover={{ 
                boxShadow: '0 0 60px rgba(0, 217, 255, 0.8)',
                scale: 1.02,
              }}
              className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] left-0 right-0 cursor-pointer"
              style={{ 
                originX: 0,
                marginLeft: 'calc(-50vw + 50%)',
                marginRight: 'calc(-50vw + 50%)',
              }}
              animate={{
                background: [
                  'linear-gradient(90deg, #00D9FF 0%, #00B8D4 50%, #0099CC 100%)',
                  'linear-gradient(90deg, #0099CC 0%, #00D9FF 50%, #00B8D4 100%)',
                  'linear-gradient(90deg, #00B8D4 0%, #0099CC 50%, #00D9FF 100%)',
                  'linear-gradient(90deg, #00D9FF 0%, #00B8D4 50%, #0099CC 100%)',
                ],
              }}
            >
              {/* Multiple Shimmer Layers */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#80E9FF]/40 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#40D9FF]/30 to-transparent"
                animate={{ x: ['200%', '-200%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Pulsing Glow */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    'inset 0 0 20px rgba(0, 217, 255, 0.3)',
                    'inset 0 0 40px rgba(0, 217, 255, 0.6)',
                    'inset 0 0 20px rgba(0, 217, 255, 0.3)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
            
            {/* Text with Animated Colors */}
            <h3 className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl px-12 sm:px-16 md:px-24 py-4 sm:py-5 md:py-6 overflow-hidden">
              <motion.span
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  textShadow: '0 0 20px rgba(0, 217, 255, 0.8)',
                }}
                transition={{
                  scale: { duration: 0.2 },
                  textShadow: { duration: 0.2 },
                  backgroundImage: { duration: 3, repeat: Infinity, ease: 'linear' },
                  backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' }
                }}
                animate={{
                  backgroundImage: [
                    'linear-gradient(90deg, #80E9FF 0%, #00D9FF 25%, #00B8D4 50%, #0099CC 75%, #80E9FF 100%)',
                    'linear-gradient(90deg, #0099CC 0%, #80E9FF 25%, #00D9FF 50%, #00B8D4 75%, #0099CC 100%)',
                    'linear-gradient(90deg, #00B8D4 0%, #0099CC 25%, #80E9FF 50%, #00D9FF 75%, #00B8D4 100%)',
                    'linear-gradient(90deg, #00D9FF 0%, #00B8D4 25%, #0099CC 50%, #80E9FF 75%, #00D9FF 100%)',
                    'linear-gradient(90deg, #80E9FF 0%, #00D9FF 25%, #00B8D4 50%, #0099CC 75%, #80E9FF 100%)',
                  ],
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  backgroundSize: '200% 100%',
                  cursor: 'pointer',
                }}
              >
                Three powerful engines working in harmony to transform raw data into revenue-generating leads
              </motion.span>
            </h3>
          </div>
        </motion.div>

        {/* Zig-Zag Features */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={feature.id}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-16`}
              >
                {/* Text Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex-1"
                >
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-[#00D9FF] to-[#0099CC] rounded-xl">
                      <Icon className="size-6 sm:size-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6 text-white">{feature.headline}</h3>
                  <p className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed">{feature.body}</p>
                </motion.div>

                {/* Visual Side */}
                <div className="flex-1 w-full">
                  {feature.visual === 'vault' && <VaultVisual />}
                  {feature.visual === 'sonar' && <SonarVisual />}
                  {feature.visual === 'outreach' && <OutreachVisual />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}