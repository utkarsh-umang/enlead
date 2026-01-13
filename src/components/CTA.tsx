import { motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface CTAProps {
  onSignUpClick: () => void;
}

export function CTA({ onSignUpClick }: CTAProps) {
  return (
    <section id="cta" className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] to-black" />

      {/* Glowing Orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-to-br from-[#00D9FF]/30 to-[#0099CC]/20 rounded-full blur-[100px] sm:blur-[150px]"
      />

      {/* Animated Background Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00D9FF] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 sm:mb-16 leading-tight px-4">
            <span className="block bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] bg-clip-text text-transparent">
              Ready to Surface
            </span>
            <span className="block bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] bg-clip-text text-transparent">
              High-Value Leads?
            </span>
          </h2>
        </motion.div>

        {/* Button matching Sign Up style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onSignUpClick}
            className="relative px-20 py-7 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white text-xl rounded-full shadow-lg shadow-[#00D9FF]/40 overflow-hidden group"
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
            <span className="relative">JOIN THE WAVE</span>
          </motion.button>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/70 text-lg"
        >
          Start for free. No credit card required. 14-day free trial.
        </motion.p>
      </div>
    </section>
  );
}