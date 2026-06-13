import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/80f1fbd8b5de75c83a12cb2ec032855928774201.png';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onSignUpClick: () => void;
}

export function Navbar({ onSignUpClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4"
    >
      <div className="max-w-7xl mx-auto backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/30 rounded-2xl px-4 sm:px-8 py-3 sm:py-4 shadow-xl shadow-[#00D9FF]/20">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <div className="relative">
              <ImageWithFallback
                src={logoImage}
                alt="enLead Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
              />
            </div>
            <span className="text-lg sm:text-xl text-[#00D9FF]">
              enLead
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            <motion.button
              onClick={() => scrollToSection('#features')}
              whileHover={{ scale: 1.05, color: '#00D9FF' }}
              whileTap={{ scale: 0.95 }}
              className="text-white transition-colors relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00D9FF] to-[#00B8D4] group-hover:w-full transition-all duration-300" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('#pricing')}
              whileHover={{ scale: 1.05, color: '#00D9FF' }}
              whileTap={{ scale: 0.95 }}
              className="text-white transition-colors relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00D9FF] to-[#00B8D4] group-hover:w-full transition-all duration-300" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('#cta')}
              whileHover={{ scale: 1.05, color: '#00D9FF' }}
              whileTap={{ scale: 0.95 }}
              className="text-white transition-colors relative group"
            >
              Demo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00D9FF] to-[#00B8D4] group-hover:w-full transition-all duration-300" />
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/80">Hi, <span className="text-[#00D9FF]">{user.name}</span></span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-1.5 px-4 py-2 border border-[#00D9FF]/40 text-[#00D9FF] rounded-full text-sm hover:bg-[#00D9FF]/10 transition-colors"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onSignUpClick}
                className="relative px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-full shadow-lg shadow-[#00D9FF]/40 overflow-hidden group text-sm sm:text-base"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative">Sign Up</span>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#00D9FF]"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 -z-10"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-3 backdrop-blur-xl bg-[#0A1628]/90 border border-[#00D9FF]/30 rounded-2xl overflow-hidden mx-3 sm:mx-6"
          >
            <div className="flex flex-col p-4 space-y-4">
              <motion.button
                onClick={() => scrollToSection('#features')}
                whileTap={{ scale: 0.95 }}
                className="text-white text-left py-3 px-4 rounded-xl hover:bg-[#00D9FF]/10 transition-colors"
              >
                Features
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('#pricing')}
                whileTap={{ scale: 0.95 }}
                className="text-white text-left py-3 px-4 rounded-xl hover:bg-[#00D9FF]/10 transition-colors"
              >
                Pricing
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('#cta')}
                whileTap={{ scale: 0.95 }}
                className="text-white text-left py-3 px-4 rounded-xl hover:bg-[#00D9FF]/10 transition-colors"
              >
                Demo
              </motion.button>
              {user ? (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-white/80 text-sm">Hi, <span className="text-[#00D9FF]">{user.name}</span></span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-1.5 text-[#00D9FF] text-sm"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-xl shadow-lg shadow-[#00D9FF]/40"
                  onClick={() => { onSignUpClick(); setMobileMenuOpen(false); }}
                >
                  Sign Up
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}