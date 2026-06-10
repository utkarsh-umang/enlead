import { motion, AnimatePresence } from 'motion/react';
import { Bell, Plus, Database, Menu, Home } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Auth } from './Auth';
import { AnimatedCounter } from './AnimatedCounter';
import { MiniGraph } from './MiniGraph';
import { ProfileOverlay } from './ProfileOverlay';
import { NotificationsOverlay } from './NotificationsOverlay';
import { ImportLeadsModal } from './ImportLeadsModal';
import { useSidebar } from '../context/SidebarContext';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from 'figma:asset/3a29a51f6305397b330790f22be462da5a70d304.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Enhanced Circular Progress Component with Manage Credits Button
function CircularProgress({ percentage }: { percentage: number }) {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (displayPercentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPercentage(percentage);
    }, 400);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div
      className="relative w-32 h-32 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="rgba(0, 217, 255, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 2, ease: 'easeOut', delay: 0.4 }}
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D9FF" />
                  <stop offset="50%" stopColor="#00B8D4" />
                  <stop offset="100%" stopColor="#0099CC" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.span
                className="text-3xl text-[#00D9FF] bioluminescent-text"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {displayPercentage}%
              </motion.span>
            </motion.div>
            {/* Rotating glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 217, 255, 0.2) 0%, transparent 70%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        ) : (
          <motion.button
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-full shadow-lg shadow-[#00D9FF]/40 overflow-hidden group"
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
            <span className="relative text-sm text-center">Manage Credits</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DashboardPage() {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Sample data for graphs
  const leadsGraphData = [8200, 8900, 9800, 10500, 11200, 11800, 12450];
  const scrapedGraphData = [3100, 3400, 3900, 4100, 4500, 4850, 5100]; // More natural curve
  const emailsGraphData = [800, 950, 1100, 1200, 1350, 1450, 1500];

  const campaigns = [
    {
      id: 1,
      name: 'SaaS Founders Q4',
      source: 'Apollo',
      date: '15/11/24',
      leads: '4,200',
      status: 'scraping',
      progress: 45,
    },
    {
      id: 2,
      name: 'Local Agencies',
      source: 'LinkedIn',
      date: '10/11/24',
      leads: '3,800',
      status: 'generating',
      progress: 68,
    },
    {
      id: 3,
      name: 'E-commerce Leads Nov',
      source: 'CSV Upload',
      date: '05/11/24',
      leads: '2,100',
      status: 'completed',
      progress: 100,
    },
  ];

  return (
    <div className="flex h-screen bg-[#0A1628] noise-texture">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} onAuthClick={() => setIsAuthOpen(true)} />
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', damping: 25 }}
          className="lg:hidden fixed inset-y-0 left-0 z-50"
        >
          <Sidebar
            isCollapsed={false}
            onToggleCollapse={() => setIsMobileMenuOpen(false)}
            isMobileMenu={true}
            onAuthClick={() => { setIsMobileMenuOpen(false); setIsAuthOpen(true); }}
            onNotificationClick={() => {
              setIsMobileMenuOpen(false);
              setIsNotificationsOpen(true);
            }}
          />
        </motion.div>
      )}

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-[#0A1628]/60 border-b border-[#00D9FF]/20 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
            >
              <Menu className="size-5 text-[#00D9FF]" />
            </motion.button>
            <h1 className="text-xl sm:text-2xl text-white">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Home Button - Hidden on mobile */}
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="hidden lg:flex p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
            >
              <Home className="size-4 sm:size-5 text-[#00D9FF]" />
            </motion.button>

            {/* Notifications Button - Hidden on mobile */}
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="hidden lg:flex p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
            >
              <Bell className="size-4 sm:size-5 text-[#00D9FF]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsImportModalOpen(true)}
              className="relative flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-lg shadow-lg shadow-[#00D9FF]/40 overflow-hidden group text-sm sm:text-base"
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
              <Plus className="size-4 sm:size-5 relative" />
              <span className="relative hidden sm:inline">New List Import</span>
              <span className="relative sm:hidden">New List</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Total Leads */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(0, 217, 255, 0.3)',
                borderColor: 'rgba(0, 217, 255, 0.6)',
              }}
              className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-[#00D9FF]/10"
            >
              <div className="mb-2">
                <div className="text-xs sm:text-sm text-white/60 mb-1">Total Leads Uploaded</div>
                <div className="text-2xl sm:text-3xl text-[#00D9FF] bioluminescent-text">
                  <AnimatedCounter value={12450} delay={0.2} />
                </div>
              </div>
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 text-xs sm:text-sm text-green-400 mb-2"
              >
                <span>+12% this week</span>
              </motion.div>
              <MiniGraph data={leadsGraphData} color="#00D9FF" delay={0.3} label="Leads" />
            </motion.div>

            {/* Leads Scraped */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(0, 217, 255, 0.3)',
                borderColor: 'rgba(0, 217, 255, 0.6)',
              }}
              className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-[#00D9FF]/10"
            >
              <div className="mb-2">
                <div className="text-xs sm:text-sm text-white/60 mb-1">Leads Scraped</div>
                <div className="text-2xl sm:text-3xl text-[#00D9FF] bioluminescent-text">
                  <AnimatedCounter value={5100} delay={0.3} />
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/60 mb-2">This month</div>
              <MiniGraph data={scrapedGraphData} color="#00B8D4" delay={0.4} label="Scraped" naturalCurve={true} />
            </motion.div>

            {/* Emails Generated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(0, 217, 255, 0.3)',
                borderColor: 'rgba(0, 217, 255, 0.6)',
              }}
              className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-[#00D9FF]/10"
            >
              <div className="mb-2">
                <div className="text-xs sm:text-sm text-white/60 mb-1">Emails Generated</div>
                <div className="text-2xl sm:text-3xl text-[#00D9FF] bioluminescent-text">
                  <AnimatedCounter value={1500} delay={0.4} />
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/60 mb-2">Last 30 days</div>
              <MiniGraph data={emailsGraphData} color="#0099CC" delay={0.5} label="Emails" />
            </motion.div>

            {/* Credits Remaining */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(0, 217, 255, 0.3)',
                borderColor: 'rgba(0, 217, 255, 0.6)',
              }}
              className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-[#00D9FF]/10 flex flex-col items-center justify-center"
            >
              <div className="text-xs sm:text-sm text-white/60 mb-1 text-center">
                Credits Remaining
              </div>
              <div className="text-sm text-[#00D9FF] mb-3">
                7500 / 10000
              </div>
              <CircularProgress percentage={75} />
            </motion.div>
          </div>

          {/* Campaigns Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl shadow-lg shadow-[#00D9FF]/10 overflow-hidden"
          >
            <div className="p-4 sm:p-6 border-b border-[#00D9FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-lg sm:text-xl text-white">My Campaigns</h2>
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-3 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/40 rounded-full text-sm text-[#00D9FF]"
                >
                  3 active
                </motion.span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/summary')}
                className="px-4 py-2 bg-[#00D9FF]/10 border border-[#00D9FF] text-[#00D9FF] rounded-lg hover:bg-[#00D9FF]/20 transition-colors text-sm"
              >
                View Summary
              </motion.button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#00D9FF]/20">
                    <th className="text-left p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Campaign Name
                    </th>
                    <th className="text-left p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Source
                    </th>
                    <th className="text-left p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Imported
                    </th>
                    <th className="text-left p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Leads
                    </th>
                    <th className="text-left p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Status
                    </th>
                    <th className="text-center p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign, index) => (
                    <motion.tr
                      key={campaign.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.05)' }}
                      className="border-b border-[#00D9FF]/10 transition-colors"
                    >
                      <td className="p-3 sm:p-4 text-white text-sm sm:text-base">{campaign.name}</td>
                      <td className="p-3 sm:p-4">
                        <motion.div 
                          className="flex items-center gap-2 text-white/70 text-sm sm:text-base group cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          {campaign.source === 'LinkedIn' ? (
                            <div className="flex items-center justify-center size-5 sm:size-6 rounded bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF] text-xs">
                              in
                            </div>
                          ) : campaign.source === 'Apollo' ? (
                            <div className="flex items-center justify-center size-5 sm:size-6 rounded bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF] font-semibold text-xs">
                              A
                            </div>
                          ) : (
                            <Database className="size-3 sm:size-4 text-[#00D9FF]" />
                          )}
                          <span className="relative">
                            {campaign.source}
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#00D9FF] origin-left"
                              initial={{ scaleX: 0 }}
                              whileHover={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                        </motion.div>
                      </td>
                      <td className="p-3 sm:p-4 text-white/60 text-sm">{campaign.date}</td>
                      <td className="p-3 sm:p-4 text-white/70 text-sm">{campaign.leads}</td>
                      <td className="p-3 sm:p-4">
                        {campaign.status === 'scraping' && (
                          <div className="space-y-2">
                            <motion.div
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-xs sm:text-sm text-[#FF8C42] flex items-center gap-2"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="w-3 h-3 border-2 border-[#FF8C42] border-t-transparent rounded-full"
                              />
                              Scraping...
                            </motion.div>
                            <div className="w-full bg-[#FF8C42]/10 rounded-full h-2 border border-[#FF8C42]/20">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${campaign.progress}%` }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="bg-gradient-to-r from-[#FF8C42] to-[#FFA726] h-2 rounded-full shadow-[0_0_10px_rgba(255,140,66,0.6)]"
                              />
                            </div>
                          </div>
                        )}
                        {campaign.status === 'generating' && (
                          <div className="space-y-2">
                            <motion.div
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-xs sm:text-sm text-[#4FC3F7] flex items-center gap-2"
                            >
                              <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-2 h-2 bg-[#4FC3F7] rounded-full shadow-[0_0_8px_rgba(79,195,247,0.8)]"
                              />
                              Generating...
                            </motion.div>
                            <div className="w-full bg-[#4FC3F7]/10 rounded-full h-2 border border-[#4FC3F7]/20">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${campaign.progress}%` }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] h-2 rounded-full shadow-[0_0_10px_rgba(79,195,247,0.6)]"
                              />
                            </div>
                          </div>
                        )}
                        {campaign.status === 'completed' && (
                          <span className="inline-flex px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-500/20 text-green-400 border border-green-500/40">
                            Completed
                          </span>
                        )}
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 25px rgba(0, 217, 255, 0.7)',
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/campaign/${campaign.id}`)}
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-[#00D9FF]/10 border border-[#00D9FF] text-[#00D9FF] rounded-lg hover:bg-[#00D9FF]/20 transition-colors text-xs sm:text-sm"
                        >
                          View
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#00D9FF]/10">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-white mb-1">{campaign.name}</div>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        {campaign.source === 'LinkedIn' ? (
                          <div className="flex items-center justify-center size-5 rounded bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF] text-xs">
                            in
                          </div>
                        ) : campaign.source === 'Apollo' ? (
                          <div className="flex items-center justify-center size-5 rounded bg-[#00D9FF]/20 border border-[#00D9FF]/40 text-[#00D9FF] font-semibold text-xs">
                            A
                          </div>
                        ) : (
                          <Database className="size-3 text-[#00D9FF]" />
                        )}
                        <span>{campaign.source}</span>
                        <span>•</span>
                        <span>{campaign.date}</span>
                      </div>
                    </div>
                    <div className="text-sm text-white/60">{campaign.leads}</div>
                  </div>

                  {campaign.status === 'scraping' && (
                    <div className="space-y-2 mb-3">
                      <motion.div
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs text-[#FF8C42] flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-3 h-3 border-2 border-[#FF8C42] border-t-transparent rounded-full"
                        />
                        Scraping...
                      </motion.div>
                      <div className="w-full bg-[#FF8C42]/10 rounded-full h-2 border border-[#FF8C42]/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${campaign.progress}%` }}
                          transition={{ duration: 1, delay: 0.8 }}
                          className="bg-gradient-to-r from-[#FF8C42] to-[#FFA726] h-2 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                  {campaign.status === 'generating' && (
                    <div className="space-y-2 mb-3">
                      <motion.div
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs text-[#4FC3F7] flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 bg-[#4FC3F7] rounded-full shadow-[0_0_8px_rgba(79,195,247,0.8)]"
                        />
                        Generating...
                      </motion.div>
                      <div className="w-full bg-[#4FC3F7]/10 rounded-full h-2 border border-[#4FC3F7]/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${campaign.progress}%` }}
                          transition={{ duration: 1, delay: 0.8 }}
                          className="bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] h-2 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                  {campaign.status === 'completed' && (
                    <div className="mb-3">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/40">
                        Completed
                      </span>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/campaign/${campaign.id}`)}
                    className="w-full px-4 py-2 bg-[#00D9FF]/10 border border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm"
                  >
                    View
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Overlays */}
      <ProfileOverlay
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        anchorRef={profileRef}
      />
      <NotificationsOverlay
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <ImportLeadsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Bioluminescent Text Effect */}
      <style>{`
        .bioluminescent-text {
          text-shadow: 0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(0, 217, 255, 0.3);
        }
      `}</style>
    </div>
  );
}