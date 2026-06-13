import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, LogOut, Home, Bell, LogIn, UserPlus, LayoutDashboard, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import profileImage from 'figma:asset/3a29a51f6305397b330790f22be462da5a70d304.png';
import logoImage from 'figma:asset/80f1fbd8b5de75c83a12cb2ec032855928774201.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNotificationClick?: () => void;
  onAuthClick?: () => void;
  isMobileMenu?: boolean;
}

export function Sidebar({ isCollapsed, onToggleCollapse, onNotificationClick, onAuthClick, isMobileMenu }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-gradient-to-b from-[#0A1628] to-[#0F1E33] h-screen flex flex-col border-r border-[#00D9FF]/20 relative"
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-[#00D9FF]/20">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <ImageWithFallback
                  src={logoImage}
                  alt="enLead Logo"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <span className="text-lg text-[#00D9FF]">enLead</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center w-full cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.1 }}
            >
              <ImageWithFallback
                src={logoImage}
                alt="enLead Logo"
                className="h-8 w-8 rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!isCollapsed && (
          <motion.button
            whileHover={{ scale: 1.1, color: '#00D9FF' }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleCollapse}
            className="text-white/60 hover:text-[#00D9FF] transition-colors"
          >
            <ChevronLeft className="size-5" />
          </motion.button>
        )}
      </div>

      {/* Expand Button (when collapsed) */}
      {isCollapsed && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1, color: '#00D9FF' }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleCollapse}
          className="absolute top-6 -right-3 bg-[#0A1628] border border-[#00D9FF]/40 rounded-full p-1 text-white/60 hover:text-[#00D9FF] transition-colors z-10"
        >
          <ChevronRight className="size-4" />
        </motion.button>
      )}

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-2">

        {/* Mobile-only: Home and Notifications */}
        {isMobileMenu && !isCollapsed && (
          <>
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02, x: 4, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-white/70 hover:text-white hover:bg-[#00D9FF]/10"
            >
              <Home className="size-5" />
              <span>Home</span>
            </motion.button>

            <motion.button
              onClick={() => onNotificationClick?.()}
              whileHover={{ scale: 1.02, x: 4, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-white/70 hover:text-white hover:bg-[#00D9FF]/10"
            >
              <Bell className="size-5" />
              <span>Notifications</span>
            </motion.button>
          </>
        )}

        {/* Dashboard */}
        {(() => {
          const isActive = location.pathname === '/dashboard';
          return (
            <motion.button
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.02, x: isCollapsed ? 0 : 4, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isCollapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/30'
                  : 'text-white/70 hover:text-white hover:bg-[#00D9FF]/10'
              }`}
            >
              <LayoutDashboard className="size-5 flex-shrink-0" />
              {!isCollapsed && <span>Dashboard</span>}
            </motion.button>
          );
        })()}

        {/* My Leads */}
        {(() => {
          const isActive = location.pathname === '/my-leads';
          return (
            <motion.button
              onClick={() => navigate('/my-leads')}
              whileHover={{ scale: 1.02, x: isCollapsed ? 0 : 4, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isCollapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/30'
                  : 'text-white/70 hover:text-white hover:bg-[#00D9FF]/10'
              }`}
            >
              <Users className="size-5 flex-shrink-0" />
              {!isCollapsed && <span>My Leads</span>}
            </motion.button>
          );
        })()}
      </nav>

      {/* Bottom Section */}
      <div
        className="p-4 border-t border-[#00D9FF]/20"
        onMouseLeave={() => setIsProfileExpanded(false)}
      >
        {user ? (
          <AnimatePresence mode="wait">
            {!isProfileExpanded ? (
              <motion.button
                key="default"
                onClick={() => {
                  if (isCollapsed) onToggleCollapse();
                  setIsProfileExpanded(true);
                }}
                whileHover={{ scale: 1.02 }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#00D9FF]/10 transition-colors ${
                  isCollapsed ? 'justify-center' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00D9FF]/40 flex-shrink-0">
                  <ImageWithFallback
                    src={profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-left flex-1"
                  >
                    <div className="text-xs text-white/60">Signed in as</div>
                    <div className="text-sm text-white">{user.name}</div>
                  </motion.div>
                )}
              </motion.button>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <motion.button
                  onClick={handleSignOut}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.2)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-red-500 hover:text-red-400"
                >
                  <LogOut className="size-5" />
                  <span className="text-sm">Sign Out</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className={`space-y-2 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
            <motion.button
              onClick={onAuthClick}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-white/70 hover:text-white border border-[#00D9FF]/20 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <LogIn className="size-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">Log In</span>}
            </motion.button>
            <motion.button
              onClick={onAuthClick}
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors bg-gradient-to-r from-[#00D9FF]/20 to-[#0099CC]/20 text-[#00D9FF] border border-[#00D9FF]/40 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <UserPlus className="size-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">Sign Up</span>}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}