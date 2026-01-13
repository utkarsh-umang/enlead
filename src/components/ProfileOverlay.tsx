import { motion, AnimatePresence } from 'motion/react';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
}

export function ProfileOverlay({ isOpen, onClose, anchorRef }: ProfileOverlayProps) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-20 right-4 sm:right-8 z-50 w-64 backdrop-blur-xl bg-[#0A1628]/95 border border-[#00D9FF]/30 rounded-xl shadow-2xl shadow-[#00D9FF]/20 overflow-hidden"
          >
            <div className="p-4 border-b border-[#00D9FF]/20">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <User className="size-4 text-[#00D9FF]" />
                <span>Signed in as <span className="text-white">Utkarsh</span></span>
              </div>
            </div>

            <motion.button
              whileHover={{
                backgroundColor: 'rgba(0, 217, 255, 0.1)',
                boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignOut}
              className="w-full p-4 flex items-center gap-3 text-white hover:text-[#00D9FF] transition-colors"
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
