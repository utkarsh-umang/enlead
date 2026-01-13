import { motion, AnimatePresence } from 'motion/react';
import { Bell, BellOff } from 'lucide-react';

interface NotificationsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsOverlay({ isOpen, onClose }: NotificationsOverlayProps) {
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
            className="fixed top-20 right-4 sm:right-8 z-50 w-80 backdrop-blur-xl bg-[#0A1628]/95 border border-[#00D9FF]/30 rounded-xl shadow-2xl shadow-[#00D9FF]/20 overflow-hidden"
          >
            <div className="p-4 border-b border-[#00D9FF]/20">
              <div className="flex items-center gap-3 text-white">
                <Bell className="size-5 text-[#00D9FF]" />
                <span className="text-lg">Notifications</span>
              </div>
            </div>

            <div className="p-8 flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{ opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BellOff className="size-12 text-white/30 mb-3" />
              </motion.div>
              <p className="text-white/60">No new notifications</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
