import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Filter, ChevronLeft, ChevronRight, Download, Menu, X, Mail, Building2, User, Home, Database } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { ImportLeadsModal } from './ImportLeadsModal';
import { ExportLeadsModal } from './ExportLeadsModal';
import { LeadDetailModal } from './LeadDetailModal';
import { useSidebar } from '../context/SidebarContext';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from 'figma:asset/3a29a51f6305397b330790f22be462da5a70d304.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLeads } from '../hooks/api/useLeads';
import { useLeadStats } from '../hooks/api/useLeadStats';
import type { ExportSelection, LeadOut } from '@/client';

const PAGE_SIZE = 25;

// Everything master_leads actually stores, for the "All Columns" view —
// most of this doesn't fit in the compact table, but it's real data that
// shouldn't be invisible just because there's no room for it by default.
interface LeadColumn {
  label: string;
  render: (lead: LeadOut) => string;
}

const FULL_COLUMNS: LeadColumn[] = [
  { label: 'Channel Name', render: (l) => l.youtube_channel_name ?? '—' },
  { label: 'Handle', render: (l) => l.youtube_handle ?? '—' },
  { label: 'Channel ID', render: (l) => l.youtube_channel_id ?? '—' },
  { label: 'Country', render: (l) => l.country ?? '—' },
  { label: 'Niche', render: (l) => l.niche ?? '—' },
  { label: 'Category', render: (l) => l.category ?? '—' },
  { label: 'Email', render: (l) => l.email ?? '—' },
  { label: 'Email Source', render: (l) => l.email_source ?? '—' },
  {
    label: 'Email Confidence',
    render: (l) => (l.email_confidence !== null ? `${Math.round(l.email_confidence * 100)}%` : '—'),
  },
  { label: 'Website', render: (l) => l.website ?? '—' },
  { label: 'YouTube', render: (l) => l.social_youtube ?? '—' },
  { label: 'Twitter', render: (l) => l.social_twitter ?? '—' },
  { label: 'Instagram', render: (l) => l.social_instagram ?? '—' },
  { label: 'TikTok', render: (l) => l.social_tiktok ?? '—' },
  { label: 'Facebook', render: (l) => l.social_facebook ?? '—' },
  { label: 'LinkedIn', render: (l) => l.social_linkedin ?? '—' },
  { label: 'Subscribers', render: (l) => l.youtube_subscriber_count?.toLocaleString() ?? '—' },
  { label: 'Videos', render: (l) => l.youtube_video_count?.toLocaleString() ?? '—' },
  { label: 'Uploads (30d)', render: (l) => l.youtube_uploads_last_30d?.toString() ?? '—' },
  { label: 'Avg Views', render: (l) => l.youtube_avg_views?.toLocaleString() ?? '—' },
  { label: 'Last Upload', render: (l) => l.youtube_last_upload_date ?? '—' },
  { label: 'Sources', render: (l) => l.sources.join(', ') || '—' },
  {
    label: 'Last Contacted',
    render: (l) =>
      l.last_contacted
        ? new Date(l.last_contacted).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
        : '—',
  },
  { label: 'Added', render: (l) => new Date(l.created_at).toLocaleDateString() },
];

export function MyLeadsPage() {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sourceFilter, setSourceFilter] = useState('');
  const [hasEmailFilter, setHasEmailFilter] = useState<'' | 'true' | 'false'>('');
  const [detailLead, setDetailLead] = useState<LeadOut | null>(null);
  const [viewMode, setViewMode] = useState<'compact' | 'full'>('compact');
  const profileRef = useRef<HTMLButtonElement>(null);

  // Debounce search so we're not hitting the API on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: statsData } = useLeadStats();
  const { data, isLoading, isError } = useLeads(page, PAGE_SIZE, debouncedSearch, {
    source: sourceFilter || undefined,
    hasEmail: hasEmailFilter === '' ? undefined : hasEmailFilter === 'true',
  });
  const leads = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const activeFilterCount = (sourceFilter ? 1 : 0) + (hasEmailFilter ? 1 : 0);
  const navigate = useNavigate();

  // "Select all matching filter" spans every page, not just what's loaded —
  // we don't hold thousands of IDs in memory for it, just this flag. The
  // explicit selectedLeads array is only meaningful when this is false.
  const [selectAllMatching, setSelectAllMatching] = useState(false);
  const allOnPageSelected = leads.length > 0 && leads.every((l) => selectedLeads.includes(l.id));
  const selectedCount = selectAllMatching ? total : selectedLeads.length;

  // A stale selection from a different filter view would be confusing —
  // clear it whenever the filter criteria changes. Page navigation within
  // the same filter is fine to keep (selectAllMatching already covers that;
  // an explicit selection persisting across pages is normal behavior).
  useEffect(() => {
    setSelectedLeads([]);
    setSelectAllMatching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, sourceFilter, hasEmailFilter]);

  const toggleLead = (id: string) => {
    if (selectAllMatching) {
      // Dropping out of "all matching" mode — seed with this page's IDs
      // minus the one just unchecked, since we never held the full
      // filtered set of IDs in memory to begin with.
      setSelectAllMatching(false);
      setSelectedLeads(leads.map((l) => l.id).filter((leadId) => leadId !== id));
      return;
    }
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
    );
  };

  const toggleAllOnPage = () => {
    if (selectAllMatching) {
      setSelectAllMatching(false);
      setSelectedLeads([]);
      return;
    }
    if (allOnPageSelected) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map((lead) => lead.id));
    }
  };

  const clearSelection = () => {
    setSelectedLeads([]);
    setSelectAllMatching(false);
  };

  // What the export API receives: either the explicit ids, or (in
  // select-all-matching mode) the same filter params the table is showing —
  // so "export what I selected" is exactly "export what I see."
  const exportSelection: ExportSelection = selectAllMatching
    ? {
        search: debouncedSearch || null,
        source: sourceFilter || null,
        has_email: hasEmailFilter === '' ? null : hasEmailFilter === 'true',
      }
    : { lead_ids: selectedLeads };

  // Only two states we actually have a real signal for today: an email was
  // found on ingestion, or it wasn't. Enrichment (email finder) isn't wired
  // up yet — once it is, "not found" vs "not yet attempted" can split out.
  const getStatusColor = (hasEmail: boolean) => {
    return hasEmail
      ? {
          bg: 'bg-green-500/20',
          text: 'text-green-400',
          border: 'border-green-500/40',
          glow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]',
        }
      : {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/40',
          glow: 'shadow-[0_0_15px_rgba(107,114,128,0.3)]',
        };
  };

  const getStatusLabel = (hasEmail: boolean) => (hasEmail ? 'Email Found' : 'No Email Yet');

  return (
    <div className="flex h-screen bg-[#0A1628] noise-texture">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50"
            >
              <Sidebar isCollapsed={false} onToggleCollapse={() => setIsMobileMenuOpen(false)} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
          </>
        )}
      </AnimatePresence>

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
            <h1 className="text-xl sm:text-2xl text-white">My Leads</h1>
            {selectedCount > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/40 rounded-full text-sm text-[#00D9FF] flex items-center gap-2"
              >
                {selectedCount.toLocaleString()} selected
                <button onClick={clearSelection} className="text-[#00D9FF]/60 hover:text-[#00D9FF]">
                  <X className="size-3" />
                </button>
              </motion.span>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Home Button */}
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
            >
              <Home className="size-4 sm:size-5 text-[#00D9FF]" />
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

        <div className="p-4 sm:p-8">
          {/* Toolbar */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-[#00D9FF]/60 group-hover:text-[#00D9FF] transition-colors" />
              <motion.input
                whileFocus={{
                  borderColor: 'rgba(0, 217, 255, 0.6)',
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                }}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, company, email..."
                className="w-full pl-10 pr-4 py-3 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg focus:outline-none text-white placeholder-white/40 transition-all"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  <X className="size-4" />
                </motion.button>
              )}
            </div>
            <div className="relative">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(0, 217, 255, 0.6)',
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFilterOpen((v) => !v)}
                className="relative z-50 flex items-center justify-center gap-2 px-4 py-3 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg hover:bg-[#00D9FF]/10 transition-colors text-white"
              >
                <Filter className="size-5 text-[#00D9FF]" />
                <span className="hidden sm:inline">Filter by Status/Source</span>
                <span className="sm:hidden">Filter</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-[#00D9FF] text-[#0A1628] rounded-full text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {isFilterOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-72 backdrop-blur-xl bg-[#0A1628]/95 border border-[#00D9FF]/30 rounded-lg shadow-xl shadow-[#00D9FF]/20 p-4 z-50 space-y-4"
                    >
                      <div>
                        <label className="block text-xs text-white/60 uppercase tracking-wider mb-2">Source</label>
                        <select
                          value={sourceFilter}
                          onChange={(e) => {
                            setSourceFilter(e.target.value);
                            setPage(1);
                          }}
                          className="w-full px-3 py-2 bg-[#0A1628]/60 border border-[#00D9FF]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                        >
                          <option value="">All sources</option>
                          {statsData?.by_source.map((s) => (
                            <option key={s.source} value={s.source}>
                              {s.source} ({s.lead_count.toLocaleString()})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-white/60 uppercase tracking-wider mb-2">Status</label>
                        <select
                          value={hasEmailFilter}
                          onChange={(e) => {
                            setHasEmailFilter(e.target.value as '' | 'true' | 'false');
                            setPage(1);
                          }}
                          className="w-full px-3 py-2 bg-[#0A1628]/60 border border-[#00D9FF]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                        >
                          <option value="">All statuses</option>
                          <option value="true">Email Found</option>
                          <option value="false">No Email Yet</option>
                        </select>
                      </div>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={() => {
                            setSourceFilter('');
                            setHasEmailFilter('');
                            setPage(1);
                          }}
                          className="text-xs text-[#00D9FF] hover:underline"
                        >
                          Clear filters
                        </button>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:flex items-center border border-[#00D9FF]/30 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-3 text-sm transition-colors ${
                  viewMode === 'compact' ? 'bg-[#00D9FF]/20 text-[#00D9FF]' : 'text-white/60 hover:text-white'
                }`}
              >
                Compact
              </button>
              <button
                onClick={() => setViewMode('full')}
                className={`px-3 py-3 text-sm transition-colors border-l border-[#00D9FF]/30 ${
                  viewMode === 'full' ? 'bg-[#00D9FF]/20 text-[#00D9FF]' : 'text-white/60 hover:text-white'
                }`}
              >
                All Columns
              </button>
            </div>
          </div>

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl shadow-lg shadow-[#00D9FF]/10 overflow-hidden"
          >
            {/* "Select all matching filter" banner — only makes sense once
                the whole page is selected AND there's more beyond this page. */}
            <AnimatePresence>
              {allOnPageSelected && !selectAllMatching && total > leads.length && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 sm:px-6 py-3 bg-[#00D9FF]/10 border-b border-[#00D9FF]/20 text-sm text-white/80 flex items-center justify-center gap-2"
                >
                  <span>
                    All {leads.length} leads on this page are selected.
                  </span>
                  <button
                    onClick={() => setSelectAllMatching(true)}
                    className="text-[#00D9FF] hover:underline font-medium"
                  >
                    Select all {total.toLocaleString()} leads matching this filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Table View — compact */}
            {viewMode === 'compact' && (
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#00D9FF]/20">
                    <th className="p-4 text-left">
                      <motion.input
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="checkbox"
                        checked={selectAllMatching || allOnPageSelected}
                        onChange={toggleAllOnPage}
                        className="w-4 h-4 accent-[#00D9FF] cursor-pointer rounded border-[#00D9FF]/40"
                      />
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Channel Name
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Country
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Email Address
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Source
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Status
                    </th>
                    <th className="text-center p-4 text-xs uppercase tracking-wider text-white/60">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => {
                    const statusStyle = getStatusColor(!!lead.email);
                    const isHovered = hoveredRow === lead.id;

                    return (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onHoverStart={() => setHoveredRow(lead.id)}
                        onHoverEnd={() => setHoveredRow(null)}
                        className="border-b border-[#00D9FF]/10 transition-all"
                        style={{
                          backgroundColor: isHovered ? 'rgba(0, 217, 255, 0.05)' : 'transparent',
                        }}
                      >
                        <td className="p-4">
                          <motion.input
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="checkbox"
                            checked={selectAllMatching || selectedLeads.includes(lead.id)}
                            onChange={() => toggleLead(lead.id)}
                            className="w-4 h-4 accent-[#00D9FF] cursor-pointer rounded border-[#00D9FF]/40"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {isCollapsed && <User className="size-4 text-[#00D9FF]" />}
                            <span className="text-white">{lead.youtube_channel_name || '—'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {isCollapsed && <Building2 className="size-4 text-[#00D9FF]/60" />}
                            <span className="text-white/70">{lead.country || '—'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {isCollapsed && <Mail className="size-4 text-[#00D9FF]/60" />}
                            <span className="text-white/60">{lead.email || '—'}</span>
                          </div>
                        </td>
                        <td className="p-4 text-white/60">{lead.sources.join(', ') || '—'}</td>
                        <td className="p-4">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`inline-flex px-3 py-1 rounded-full text-sm ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} ${isHovered ? statusStyle.glow : ''} transition-all`}
                          >
                            {getStatusLabel(!!lead.email)}
                          </motion.span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <motion.button
                              whileHover={{
                                scale: 1.08,
                                boxShadow: '0 0 25px rgba(0, 217, 255, 0.8)',
                              }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setDetailLead(lead)}
                              className="px-4 py-2 bg-gradient-to-r from-[#00D9FF]/20 to-[#00B8D4]/20 border border-[#00D9FF]/60 text-[#00D9FF] rounded-lg hover:from-[#00D9FF]/30 hover:to-[#00B8D4]/30 transition-all text-sm shadow-lg shadow-[#00D9FF]/20"
                            >
                              View Data
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            )}

            {/* Desktop Table View — all columns. Mobile keeps the compact
                card view regardless of mode — a 20+ column table doesn't
                work on a phone. */}
            {viewMode === 'full' && (
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#00D9FF]/20">
                      <th className="p-4 text-left sticky left-0 bg-[#0A1628] z-10">
                        <motion.input
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="checkbox"
                          checked={selectAllMatching || allOnPageSelected}
                          onChange={toggleAllOnPage}
                          className="w-4 h-4 accent-[#00D9FF] cursor-pointer rounded border-[#00D9FF]/40"
                        />
                      </th>
                      {FULL_COLUMNS.map((col) => (
                        <th
                          key={col.label}
                          className="text-left p-4 text-xs uppercase tracking-wider text-white/60 whitespace-nowrap"
                        >
                          {col.label}
                        </th>
                      ))}
                      <th className="text-center p-4 text-xs uppercase tracking-wider text-white/60 whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-[#00D9FF]/10 hover:bg-[#00D9FF]/5 transition-colors">
                        <td className="p-4 sticky left-0 bg-[#0A1628]">
                          <motion.input
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="checkbox"
                            checked={selectAllMatching || selectedLeads.includes(lead.id)}
                            onChange={() => toggleLead(lead.id)}
                            className="w-4 h-4 accent-[#00D9FF] cursor-pointer rounded border-[#00D9FF]/40"
                          />
                        </td>
                        {FULL_COLUMNS.map((col) => (
                          <td key={col.label} className="p-4 text-white/70 text-sm whitespace-nowrap max-w-xs truncate">
                            {col.render(lead)}
                          </td>
                        ))}
                        <td className="p-4 text-center">
                          <motion.button
                            whileHover={{ scale: 1.08, boxShadow: '0 0 25px rgba(0, 217, 255, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDetailLead(lead)}
                            className="px-4 py-2 bg-gradient-to-r from-[#00D9FF]/20 to-[#00B8D4]/20 border border-[#00D9FF]/60 text-[#00D9FF] rounded-lg hover:from-[#00D9FF]/30 hover:to-[#00B8D4]/30 transition-all text-sm shadow-lg shadow-[#00D9FF]/20 whitespace-nowrap"
                          >
                            View Data
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-[#00D9FF]/10">
              {leads.map((lead, index) => {
                const statusStyle = getStatusColor(!!lead.email);

                return (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-[#00D9FF]/5 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <motion.input
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="checkbox"
                        checked={selectAllMatching || selectedLeads.includes(lead.id)}
                        onChange={() => toggleLead(lead.id)}
                        className="w-4 h-4 mt-1 accent-[#00D9FF] cursor-pointer rounded border-[#00D9FF]/40"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="size-4 text-[#00D9FF]" />
                          <span className="text-white">{lead.youtube_channel_name || '—'}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1 text-sm">
                          <Building2 className="size-3 text-[#00D9FF]/60" />
                          <span className="text-white/70">{lead.country || '—'}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <Mail className="size-3 text-[#00D9FF]/60" />
                          <span className="text-white/60 truncate">{lead.email || '—'}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`inline-flex px-2 py-1 rounded-full text-xs ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}
                          >
                            {getStatusLabel(!!lead.email)}
                          </motion.span>
                          <span className="text-xs text-white/40">{lead.sources.join(', ') || '—'}</span>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setDetailLead(lead)}
                            className="flex-1 px-3 py-2 bg-[#00D9FF]/10 border border-[#00D9FF] text-[#00D9FF] rounded-lg text-xs"
                          >
                            View Data
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#00D9FF]/20 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-xl bg-[#0A1628]/20">
              <div className="text-sm text-white/60">
                {total === 0
                  ? 'No leads yet'
                  : `Showing ${(page - 1) * PAGE_SIZE + 1}-${Math.min(page * PAGE_SIZE, total)} of ${total}`}
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Enabled once something is selected — exports the selection
                    to an Instantly-shaped CSV and records the contact month. */}
                <motion.button
                  whileHover={
                    selectedCount > 0
                      ? { scale: 1.02, borderColor: 'rgba(0, 217, 255, 0.6)' }
                      : undefined
                  }
                  whileTap={selectedCount > 0 ? { scale: 0.98 } : undefined}
                  disabled={selectedCount === 0}
                  onClick={() => setIsExportModalOpen(true)}
                  title={selectedCount === 0 ? 'Select leads to export' : undefined}
                  className="flex items-center gap-2 px-4 py-2 border border-[#00D9FF]/30 rounded-lg hover:bg-[#00D9FF]/10 transition-colors text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Download className="size-4" />
                  <span>Export to Instantly</span>
                </motion.button>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      borderColor: 'rgba(0, 217, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.9 }}
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="p-2 border border-[#00D9FF]/30 rounded-lg hover:bg-[#00D9FF]/10 transition-colors text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="size-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="px-4 py-2 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-lg shadow-lg shadow-[#00D9FF]/40"
                  >
                    {page} / {totalPages}
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      borderColor: 'rgba(0, 217, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.9 }}
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="p-2 border border-[#00D9FF]/30 rounded-lg hover:bg-[#00D9FF]/10 transition-colors text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="size-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="p-8 text-center text-white/60 text-sm">Loading leads…</div>
            )}
            {isError && (
              <div className="p-8 text-center text-red-400 text-sm">
                Couldn't reach the backend — is it running?
              </div>
            )}
            {!isLoading && !isError && leads.length === 0 && (
              <div className="p-8 text-center text-white/60 text-sm">
                No leads yet — import a CSV to get started.
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Overlays */}
      <ImportLeadsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
      <ExportLeadsModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selection={exportSelection}
      />
      <LeadDetailModal lead={detailLead} onClose={() => setDetailLead(null)} />
    </div>
  );
}