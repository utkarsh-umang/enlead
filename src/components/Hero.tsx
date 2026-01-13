import { motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  onSignUpClick: () => void;
}

export function Hero({ onSignUpClick }: HeroProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gradientX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const gradientY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 overflow-hidden">
      {/* Volumetric Cool Blue Light */}
      <motion.div
        style={{
          x: gradientX,
          y: gradientY,
        }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-1/3 left-1/3 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-[#00D9FF]/50 via-[#00B8D4]/30 to-transparent rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-gradient-to-br from-[#0099CC]/40 to-transparent rounded-full blur-[60px] sm:blur-[100px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">
        {/* Left: Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight">
              Enrich Leads.{' '}
              <span className="block text-[#00B8D4]">
                Automate Outreach.
              </span>{' '}
              <span className="bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] bg-clip-text text-transparent">
                Uncover Deep Value.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/70 text-lg mb-10 max-w-xl leading-relaxed"
          >
            Transform cold contacts into high-value opportunities with our AI-powered intelligence engine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onSignUpClick}
              className="relative px-10 py-5 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-full shadow-lg shadow-[#00D9FF]/40 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="relative flex items-center gap-3 text-lg">
                Start Your Deep Dive
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right: 3D Data Transmutation Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Background Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-br from-[#00D9FF] to-[#0099CC] rounded-full blur-[80px]"
            />

            {/* Central Sphere Container */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {/* Dark Data Particles (Before) */}
              <motion.div
                animate={isAnimating ? {
                  scale: 0.8,
                  opacity: 0.3,
                } : {}}
                transition={{ duration: 2, delay: 1 }}
                className="absolute inset-0"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`dark-${i}`}
                    className="absolute w-3 h-3 bg-gradient-to-br from-[#1A2332] to-[#0A1628] rounded-full border border-[#00D9FF]/20"
                    style={{
                      left: `${50 + 30 * Math.cos((i * 2 * Math.PI) / 20)}%`,
                      top: `${50 + 30 * Math.sin((i * 2 * Math.PI) / 20)}%`,
                    }}
                    animate={{
                      rotate: [0, 360],
                      x: [0, Math.random() * 10 - 5],
                      y: [0, Math.random() * 10 - 5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>

              {/* Cyan Light Beam */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={isAnimating ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-full origin-top"
              >
                <div className="w-full h-full bg-gradient-to-b from-[#00D9FF] via-[#00B8D4]/60 to-transparent blur-xl" />
                
                {/* Light Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`light-${i}`}
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#00D9FF] rounded-full shadow-lg shadow-[#00D9FF]/80"
                    animate={{
                      y: ['0%', '100%'],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: 'linear',
                    }}
                  />
                ))}
              </motion.div>

              {/* Sapphire Crystal User Profile (After) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isAnimating ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Sapphire Crystal Icon */}
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="relative w-48 h-48 rounded-full bg-gradient-to-br from-[#00D9FF] via-[#00B8D4] to-[#0099CC] shadow-2xl shadow-[#00D9FF]/60 flex items-center justify-center"
                  style={{
                    boxShadow: 'inset 0 2px 20px rgba(255,255,255,0.3), inset 0 -2px 20px rgba(0,0,0,0.2), 0 20px 60px rgba(0,217,255,0.6)',
                  }}
                >
                  {/* Profile Silhouette */}
                  <svg className="w-24 h-24 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  
                  {/* Sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      className="absolute"
                      style={{
                        left: `${50 + 60 * Math.cos((i * 2 * Math.PI) / 6)}%`,
                        top: `${50 + 60 * Math.sin((i * 2 * Math.PI) / 6)}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeInOut',
                      }}
                    >
                      <Sparkles className="size-4 text-[#00D9FF]" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}