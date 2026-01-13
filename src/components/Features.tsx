import { motion, useInView } from 'motion/react';
import { Lock, Radio, Send, CheckCircle } from 'lucide-react';
import { useRef, useState } from 'react';

const features = [
  {
    icon: Lock,
    title: 'Secure Lead Vault',
    description: 'Centralize and manage prospects in a secure, intelligent abyssal database.',
    color: 'from-[#00D9FF] to-[#00B8D4]',
    visual: 'vault',
  },
  {
    icon: Radio,
    title: 'Deep Enrichment',
    description: 'Our AI scans the depths of the web to reveal the human behind the lead.',
    color: 'from-[#00B8D4] to-[#0099CC]',
    visual: 'sonar',
  },
  {
    icon: Send,
    title: 'Autonomous Currents',
    description: 'Deploy personalized, AI-authored emails that convert at scale.',
    color: 'from-[#0099CC] to-[#00D9FF]',
    visual: 'outreach',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [sonarPing, setSonarPing] = useState(0);

  const Icon = feature.icon;

  // Sonar ping animation
  if (feature.visual === 'sonar' && isHovered && sonarPing < 3) {
    setTimeout(() => setSonarPing(prev => prev + 1), 800);
  } else if (feature.visual === 'sonar' && !isHovered) {
    setTimeout(() => setSonarPing(0), 300);
  }

  // Enrichment progress animation
  if (feature.visual === 'sonar' && isHovered && progress < 100) {
    setTimeout(() => setProgress(prev => Math.min(prev + 2, 100)), 40);
  } else if (feature.visual === 'sonar' && !isHovered) {
    setTimeout(() => setProgress(0), 300);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (feature.visual === 'vault') setVaultOpen(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (feature.visual === 'vault') setVaultOpen(false);
      }}
      className="group relative backdrop-blur-xl bg-[#0A1628]/60 border-2 border-[#00D9FF]/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-[#00D9FF]/40 transition-all duration-500 overflow-hidden"
    >
      {/* Cyan Border Glow on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 rounded-3xl`}
      />
      
      {/* Refractive Light Effect */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isHovered ? { opacity: 0.3, x: 100 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D9FF]/30 to-transparent skew-x-12 rounded-3xl"
      />

      {/* Icon Container */}
      <motion.div
        animate={{ 
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className={`relative inline-flex p-3 rounded-2xl mb-3 shadow-lg shadow-[#00D9FF]/40 transition-colors duration-500 ${
          isHovered ? 'bg-black' : `bg-gradient-to-br ${feature.color}`
        }`}
      >
        <Icon className="size-7 text-white" />
      </motion.div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-white text-2xl mb-2">{feature.title}</h3>
        <p className="text-white/70 mb-5 leading-relaxed">{feature.description}</p>

        {/* Visual Micro-interactions */}
        <div className="min-h-[90px]">
          {feature.visual === 'vault' && (
            <div className="relative">
              {/* Blue Metal Chest */}
              <motion.div
                animate={{ rotateX: vaultOpen ? -15 : 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-full h-32 bg-gradient-to-br from-[#00D9FF] to-[#0099CC] rounded-2xl relative overflow-hidden shadow-2xl"
                style={{
                  boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.3), inset 0 -2px 10px rgba(0,0,0,0.2), 0 10px 30px rgba(0,217,255,0.4)',
                }}
              >
                <div className="absolute inset-x-0 top-0 h-2 bg-[#0099CC] rounded-t-2xl" />
                <div className="absolute inset-x-0 bottom-0 h-2 bg-[#0099CC] rounded-b-2xl" />
                
                {/* Lock Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Lock className={`size-8 transition-colors ${vaultOpen ? 'text-white' : 'text-[#0099CC]'}`} />
                </div>

                {/* Cyan Light Particles */}
                {vaultOpen && [...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#00D9FF] rounded-full shadow-lg shadow-[#00D9FF]/80"
                    initial={{ x: '50%', y: '50%', opacity: 0 }}
                    animate={{
                      x: `${50 + Math.random() * 100 - 50}%`,
                      y: `${-50 + Math.random() * 50}%`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.05,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {feature.visual === 'sonar' && (
            <div className="space-y-4">
              {/* Sonar Display */}
              <div className="relative w-full h-32 bg-[#0A1628] rounded-2xl border border-[#00D9FF]/30 overflow-hidden">
                {/* Sonar Grid */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <defs>
                    <pattern id="sonar-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00D9FF" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#sonar-grid)" />
                </svg>

                {/* Center Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#00D9FF] rounded-full shadow-lg shadow-[#00D9FF]/80" />

                {/* Sonar Ping Ripples */}
                {isHovered && [...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ping-${sonarPing}-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#00D9FF] rounded-full"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{
                      width: 200,
                      height: 200,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      ease: 'easeOut',
                    }}
                  />
                ))}

                {/* Detected Data Points */}
                {progress > 30 && [...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#00D9FF] rounded-full shadow-lg shadow-[#00D9FF]/80"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${30 + Math.random() * 40}%`,
                    }}
                  />
                ))}
              </div>

              {/* Liquid Cyan Progress Bar */}
              <div className="relative w-full h-6 bg-[#0A1628]/50 rounded-full overflow-hidden border border-[#00D9FF]/20">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] rounded-full"
                  style={{
                    boxShadow: 'inset 0 1px 5px rgba(255,255,255,0.5), 0 2px 10px rgba(0,217,255,0.4)',
                  }}
                >
                  {/* Liquid Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </div>
              
              <p className="text-sm text-[#00D9FF]">{progress}% Enriched</p>
            </div>
          )}

          {feature.visual === 'outreach' && (
            <div className="space-y-4">
              {/* Data Stream Icon */}
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={isHovered ? {
                    rotate: [0, 15, -15, 0],
                  } : {}}
                  transition={{
                    duration: 0.5,
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 1,
                  }}
                >
                  <Send className="size-7 text-[#00D9FF]" />
                </motion.div>
                <p className="text-sm text-white/60">Composing message...</p>
                
                {/* Cyan Data Particles */}
                {isHovered && [...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#00D9FF] rounded-full shadow-lg shadow-[#00D9FF]/80"
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{
                      x: Math.random() * 60 - 30,
                      y: Math.random() * -40,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              {/* Message Preview */}
              <div className="p-4 bg-[#0A1628]/80 rounded-xl border border-[#00D9FF]/30 backdrop-blur-sm">
                <motion.p
                  className="text-sm text-white/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Hi Utkarsh, I noticed your recent work on{' '}
                  <span className="text-[#00D9FF]">AI automation...</span>
                </motion.p>
              </div>

              {/* Sent Notification */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isHovered ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 p-3 bg-[#0F1E33] rounded-lg border border-[#00D9FF]/30"
              >
                <CheckCircle className="size-5 text-[#00D9FF]" />
                <span className="text-sm text-white">Campaign sent successfully</span>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="features" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-white text-4xl lg:text-5xl mb-6">
            The{' '}
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] bg-clip-text text-transparent">
              Oceanic Workflow
            </span>
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}