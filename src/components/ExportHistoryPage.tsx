import { motion } from 'motion/react';
import { Menu, Send, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useSidebar } from '../context/SidebarContext';
import { useExportHistory, useExportLeads } from '../hooks/api/useExportHistory';

function ExportLeadsList({ exportId }: { exportId: string }) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useExportLeads(exportId, page);

  if (isLoading) return <div className="text-sm text-white/50 px-6 pb-4">Loading leads…</div>;
  if (!data) return null;

  const totalPages = Math.max(1, Math.ceil(data.total / data.page_size));

  return (
    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
      <div className="border border-[#00D9FF]/15 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#00D9FF]/15 bg-[#0A1628]/60">
              <th className="text-left p-3 text-xs uppercase tracking-wider text-white/50">Name</th>
              <th className="text-left p-3 text-xs uppercase tracking-wider text-white/50">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((lead) => (
              <tr key={lead.lead_id} className="border-b border-[#00D9FF]/10 last:border-0">
                <td className="p-3 text-white/90 text-sm">{lead.display_name ?? '—'}</td>
                <td className="p-3 text-white/60 text-sm break-all">{lead.email ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 mt-3 text-sm text-white/60">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-1.5 border border-[#00D9FF]/30 rounded hover:bg-[#00D9FF]/10 disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          {page} / {totalPages}
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-1.5 border border-[#00D9FF]/30 rounded hover:bg-[#00D9FF]/10 disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function ExportHistoryPage() {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: exports, isLoading, isError } = useExportHistory();

  return (
    <div className="flex h-screen bg-[#0A1628] noise-texture">
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="lg:hidden fixed inset-y-0 left-0 z-50"
        >
          <Sidebar isCollapsed={false} onToggleCollapse={() => setIsMobileMenuOpen(false)} isMobileMenu />
        </motion.div>
      )}

      <div className="flex-1 overflow-auto">
        <div className="backdrop-blur-xl bg-[#0A1628]/60 border-b border-[#00D9FF]/20 px-4 sm:px-8 py-4 sm:py-6 flex items-center gap-4 sticky top-0 z-30">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
          >
            <Menu className="size-5 text-[#00D9FF]" />
          </motion.button>
          <h1 className="text-xl sm:text-2xl text-white">Export History</h1>
        </div>

        <div className="p-4 sm:p-8">
          <p className="text-sm text-white/50 mb-6 max-w-2xl">
            Every export event — the system of record for which leads were set up in Instantly and
            for which month. Click an export to see exactly which leads went out in it.
          </p>

          {isLoading && <div className="text-center text-white/60 text-sm py-8">Loading…</div>}
          {isError && (
            <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-lg text-red-300 text-sm">
              Couldn't load export history — is the backend reachable?
            </div>
          )}

          <div className="space-y-4">
            {exports?.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl shadow-lg shadow-[#00D9FF]/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  className="w-full p-4 sm:p-6 flex items-center gap-4 text-left hover:bg-[#00D9FF]/5 transition-colors"
                >
                  {expandedId === exp.id ? (
                    <ChevronDown className="size-4 text-[#00D9FF] shrink-0" />
                  ) : (
                    <ChevronRight className="size-4 text-white/40 shrink-0" />
                  )}
                  <Send className="size-5 text-[#00D9FF] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white">
                      {new Date(exp.scheduled_month).toLocaleDateString(undefined, {
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      <span className="text-white/40 text-sm">· {exp.destination}</span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">
                      exported {new Date(exp.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-[#00D9FF] text-sm sm:text-base shrink-0">
                    {exp.lead_count.toLocaleString()} leads
                  </div>
                </button>

                {expandedId === exp.id && <ExportLeadsList exportId={exp.id} />}
              </motion.div>
            ))}
          </div>

          {exports && exports.length === 0 && (
            <div className="text-center text-white/60 text-sm py-8">
              No exports yet — select leads on My Leads and use Export to Instantly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
