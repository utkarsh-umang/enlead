import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, ChevronLeft, ChevronRight, LogOut, UserPlus, User as UserIcon, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import profileImage from 'figma:asset/3a29a51f6305397b330790f22be462da5a70d304.png';
import logoImage from 'figma:asset/80f1fbd8b5de75c83a12cb2ec032855928774201.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileMenu?: boolean;
}

export function Sidebar({ isCollapsed, onToggleCollapse, isMobileMenu }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Leads', icon: Users, path: '/my-leads' },
  ];

  const handleSignOut = () => {
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
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={item.name}
              onClick={() => navigate(item.path)}
              whileHover={{
                scale: 1.02,
                x: isCollapsed ? 0 : 4,
                boxShadow: isActive ? 'none' : '0 0 20px rgba(0, 217, 255, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-[#00D9FF]/20 text-[#00D9FF] shadow-lg shadow-[#00D9FF]/20 border border-[#00D9FF]/40'
                  : 'text-white/70 hover:text-white hover:bg-[#00D9FF]/10'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className="size-5" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1 h-6 bg-[#00D9FF] rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Mobile Menu Item - Home */}
        {isMobileMenu && !isCollapsed && (
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{
              scale: 1.02,
              x: 4,
              boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-white/70 hover:text-white hover:bg-[#00D9FF]/10"
          >
            <Home className="size-5" />
            <span>Home</span>
          </motion.button>
        )}
      </nav>

      {/* Profile Section */}
      <div 
        className="p-6 border-t border-[#00D9FF]/20"
        onMouseLeave={() => setIsProfileExpanded(false)}
      >
        <AnimatePresence mode="wait">
          {!isProfileExpanded ? (
            // Default State
            <motion.button
              key="default"
              onClick={() => setIsProfileExpanded(true)}
              whileHover={{ scale: 1.02 }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#00D9FF]/10 transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00D9FF]/40 flex-shrink-0">
                <ImageWithFallback
                  src={profileImage}
                  alt="Utkarsh"
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
                  <div className="text-sm text-white">Utkarsh</div>
                </motion.div>
              )}
            </motion.button>
          ) : (
            // Expanded State
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-2"
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

              <motion.button
                onClick={() => {
                  console.log('Switch accounts');
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(0, 217, 255, 0.1)',
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)',
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-white hover:text-[#00D9FF]"
              >
                <UserPlus className="size-5" />
                <span className="text-sm">Switch Accounts</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}