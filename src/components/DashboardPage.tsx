import { motion } from 'motion/react';
import { Plus, Database, Menu, Home, Mail, Users, Layers, Send } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { AnimatedCounter } from './AnimatedCounter';
import { ProfileOverlay } from './ProfileOverlay';
import { ImportLeadsModal } from './ImportLeadsModal';
import { EnrichmentStatusPanel } from './EnrichmentStatusPanel';
import { useSidebar } from '../context/SidebarContext';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeadStats } from '../hooks/api/useLeadStats';

export function DashboardPage() {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const { data: stats, isLoading, isError } = useLeadStats();

  return (
    <div className="flex h-screen bg-[#0A1628] noise-texture">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
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
          <Sidebar isCollapsed={false} onToggleCollapse={() => setIsMobileMenuOpen(false)} isMobileMenu={true} />
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
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="hidden lg:flex p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
            >
              <Home className="size-4 sm:size-5 text-[#00D9FF]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsImportModalOpen(true)}
              className="relative flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-[#0A1628] rounded-lg shadow-lg shadow-[#00D9FF]/40 overflow-hidden group text-sm sm:text-base"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <Plus className="size-4 sm:size-5 relative" />
              <span className="relative hidden sm:inline">New List Import</span>
              <span className="relative sm:hidden">New List</span>
            </motion.button>
          </div>
        </div>

        <div className="p-4 sm:p-8">
          {isError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/40 rounded-lg text-red-300 text-sm">
              Couldn't reach the backend — is it running?
            </div>
          )}

          {/* Stats Row — real counts from master_leads, nothing fabricated */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
              <div className="flex items-center gap-2 mb-2">
                <Users className="size-4 text-[#00D9FF]/60" />
                <div className="text-xs sm:text-sm text-white/60">Total Leads</div>
              </div>
              <div className="text-2xl sm:text-3xl text-[#00D9FF] bioluminescent-text">
                {isLoading ? '—' : <AnimatedCounter value={stats?.total ?? 0} delay={0.2} />}
              </div>
            </motion.div>

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
              <div className="flex items-center gap-2 mb-2">
                <Mail className="size-4 text-[#00D9FF]/60" />
                <div className="text-xs sm:text-sm text-white/60">Leads With Email</div>
              </div>
              <div className="text-2xl sm:text-3xl text-[#00D9FF] bioluminescent-text">
                {isLoading ? '—' : <AnimatedCounter value={stats?.with_email ?? 0} delay={0.3} />}
              </div>
              <div className="text-xs sm:text-sm text-white/40 mt-1">
                {isLoading || !stats
                  ? ''
                  : `${Math.round((stats.with_email / Math.max(stats.total, 1)) * 100)}% of total`}
              </div>
            </motion.div>

            {/* The working pipeline: reachable and not yet emailed. Amber,
                not cyan — this is the number that means "there is work to
                do", and it should read differently from the inventory
                counts either side of it. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(245, 158, 11, 0.25)',
                borderColor: 'rgba(245, 158, 11, 0.6)',
              }}
              className="backdrop-blur-xl bg-[#0A1628]/40 border border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-lg shadow-amber-500/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <Send className="size-4 text-amber-400/60" />
                <div className="text-xs sm:text-sm text-white/60">Not Yet Contacted</div>
              </div>
              <div className="text-2xl sm:text-3xl text-amber-400">
                {isLoading ? (
                  '—'
                ) : (
                  <AnimatedCounter value={stats?.contactable_never_contacted ?? 0} delay={0.4} />
                )}
              </div>
              <div className="text-xs sm:text-sm text-white/40 mt-1">
                {isLoading || !stats
                  ? ''
                  : `of ${stats.with_email.toLocaleString()} with an email`}
              </div>
            </motion.div>

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
              <div className="flex items-center gap-2 mb-2">
                <Layers className="size-4 text-[#00D9FF]/60" />
                <div className="text-xs sm:text-sm text-white/60">Sources</div>
              </div>
              <div className="text-2xl sm:text-3xl text-[#00D9FF] bioluminescent-text">
                {isLoading ? '—' : <AnimatedCounter value={stats?.by_source.length ?? 0} delay={0.4} />}
              </div>
            </motion.div>
          </div>

          {/* Email finder live status — worker state, queue, blocked banner */}
          <EnrichmentStatusPanel />

          {/* Leads by Source — real batch data, not a fabricated campaign/scraping concept */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl shadow-lg shadow-[#00D9FF]/10 overflow-hidden"
          >
            <div className="p-4 sm:p-6 border-b border-[#00D9FF]/20">
              <h2 className="text-lg sm:text-xl text-white">Leads by Source</h2>
            </div>

            {isLoading && <div className="p-8 text-center text-white/60 text-sm">Loading…</div>}

            {!isLoading && (!stats || stats.by_source.length === 0) && (
              <div className="p-8 text-center text-white/60 text-sm">
                No leads yet — import a CSV to get started.
              </div>
            )}

            {!isLoading && stats && stats.by_source.length > 0 && (
              <div className="divide-y divide-[#00D9FF]/10">
                {stats.by_source.map((row, index) => (
                  <motion.button
                    key={row.source}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.05)' }}
                    onClick={() => navigate(`/source/${encodeURIComponent(row.source)}`)}
                    className="w-full flex items-center justify-between p-4 sm:p-6 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Database className="size-4 sm:size-5 text-[#00D9FF]" />
                      <div>
                        <span className="text-white text-sm sm:text-base">{row.source}</span>
                        <div className="text-xs text-white/40 mt-0.5">
                          {row.total_rows_uploaded.toLocaleString()} rows uploaded across{' '}
                          {row.upload_count} {row.upload_count === 1 ? 'file' : 'files'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[#00D9FF] text-sm sm:text-base">
                      {row.lead_count.toLocaleString()} leads
                    </span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Overlays */}
      <ProfileOverlay isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} anchorRef={profileRef} />
      <ImportLeadsModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />

      {/* Bioluminescent Text Effect */}
      <style>{`
        .bioluminescent-text {
          text-shadow: 0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(0, 217, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
