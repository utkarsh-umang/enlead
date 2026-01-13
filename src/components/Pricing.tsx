import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const tiers = [
  {
    id: 1,
    name: 'Scout',
    price: '$0',
    period: '/mo',
    headline: 'Surface Level',
    features: [
      '500 Lead Credits',
      'Basic Storage (1 List)',
      'Manual CSV Export',
    ],
    cta: 'Start Exploring',
    highlight: false,
    ctaStyle: 'ghost',
  },
  {
    id: 2,
    name: 'Captain',
    price: '$99',
    period: '/mo',
    headline: 'Deep Dive',
    features: [
      '5,000 Lead Credits',
      'Deep Enrichment (Sonar)',
      'AI Email Writer (Standard)',
      'Unlimited Storage',
    ],
    cta: 'Become a Captain',
    highlight: true,
    ctaStyle: 'solid',
    badge: 'Most Popular',
  },
  {
    id: 3,
    name: 'Admiral',
    price: '$299',
    period: '/mo',
    headline: 'Command the Ocean',
    features: [
      '25,000+ Lead Credits',
      'Priority Scraping Speed',
      'Advanced Personalization Models',
      'API Access',
    ],
    cta: 'Contact Sales',
    highlight: false,
    ctaStyle: 'metallic',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1E33] via-black to-[#0A1628]">
        {/* Sea Floor Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent" />
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-[#00D9FF]/20 to-transparent rounded-full blur-[100px] sm:blur-[150px]"
      />

      <div className="relative max-w-7xl mx-auto z-10 w-full my-[25px]">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] bg-clip-text text-transparent">
            Refined Tiers
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto px-4">
            Choose the depth that matches your ambition
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={
                tier.highlight
                  ? {
                      scale: 1.05,
                      boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                    }
                  : { scale: 1.02 }
              }
              className={`relative backdrop-blur-xl rounded-3xl overflow-hidden ${
                tier.highlight
                  ? 'bg-[#0A1628]/80 border-2 border-[#00D9FF] py-8 pt-12'
                  : 'bg-[#0A1628]/60 border border-[#00D9FF]/30 py-6'
              }`}
            >
              {/* Badge for Highlight */}
              {tier.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-1 bg-gradient-to-r from-[#00D9FF] to-[#0099CC] px-6 py-1.5 text-xs sm:text-sm text-white shadow-xl shadow-[#00D9FF]/50" style={{ borderRadius: '0 0 9999px 9999px' }}>
                  {tier.badge}
                </div>
              )}

              {/* Inner Glow */}
              {tier.highlight && (
                <motion.div
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-gradient-to-b from-[#00D9FF]/20 via-transparent to-transparent pointer-events-none"
                />
              )}

              <div className="relative px-6">
                {/* Tier Name */}
                <h3
                  className={`text-xl mb-1 ${
                    tier.highlight
                      ? 'bg-gradient-to-r from-[#00D9FF] to-[#0099CC] bg-clip-text text-transparent'
                      : 'text-white/90'
                  }`}
                >
                  {tier.name}
                </h3>

                {/* Headline */}
                <p className="text-xs text-white/50 mb-4">{tier.headline}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl text-white">{tier.price}</span>
                  <span className="text-lg text-white/60">{tier.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div
                        className={`mt-0.5 p-0.5 rounded-full ${
                          tier.highlight
                            ? 'bg-gradient-to-br from-[#00D9FF] to-[#0099CC]'
                            : 'bg-white/20'
                        }`}
                      >
                        <Check className="size-3 text-white" />
                      </div>
                      <span className="text-sm text-white/80 flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 text-sm rounded-xl transition-all ${
                    tier.ctaStyle === 'solid'
                      ? 'bg-gradient-to-r from-[#00D9FF] to-[#0099CC] text-white shadow-lg shadow-[#00D9FF]/50'
                      : tier.ctaStyle === 'metallic'
                      ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-white border border-gray-600'
                      : 'border-2 border-[#00D9FF]/30 text-[#00D9FF] hover:bg-[#00D9FF]/10'
                  }`}
                >
                  {tier.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-8 text-sm text-white/50"
        >
          All plans include 24/7 support and 99.9% uptime SLA
        </motion.p>
      </div>
    </section>
  );
}