import { motion } from 'motion/react';
import { Menu, Braces, ChevronDown, ChevronRight, Fingerprint } from 'lucide-react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useSidebar } from '../context/SidebarContext';
import { useMappingFunctions } from '../hooks/api/useMappingFunctions';

export function MappingRegistryPage() {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: mappings, isLoading, isError } = useMappingFunctions();

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
          <h1 className="text-xl sm:text-2xl text-white">Mapping Registry</h1>
        </div>

        <div className="p-4 sm:p-8">
          <p className="text-sm text-white/50 mb-6 max-w-2xl">
            Every CSV shape the system recognizes. A file whose columns hash to one of these
            fingerprints ingests fully automatically using the registered spec below — anything
            else is rejected until a mapping is authored for it.
          </p>

          {isLoading && <div className="text-center text-white/60 text-sm py-8">Loading…</div>}
          {isError && (
            <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-lg text-red-300 text-sm">
              Couldn't load the registry — is the backend reachable?
            </div>
          )}

          <div className="space-y-4">
            {mappings?.map((mapping, index) => (
              <motion.div
                key={mapping.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl shadow-lg shadow-[#00D9FF]/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === mapping.id ? null : mapping.id)}
                  className="w-full p-4 sm:p-6 flex items-center gap-4 text-left hover:bg-[#00D9FF]/5 transition-colors"
                >
                  {expandedId === mapping.id ? (
                    <ChevronDown className="size-4 text-[#00D9FF] shrink-0" />
                  ) : (
                    <ChevronRight className="size-4 text-white/40 shrink-0" />
                  )}
                  <Braces className="size-5 text-[#00D9FF] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white">{mapping.source_label}</div>
                    <div className="text-xs text-white/40 flex items-center gap-1.5 mt-1">
                      <Fingerprint className="size-3" />
                      <span className="font-mono break-all">{mapping.fingerprint}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm text-[#00D9FF]">v{mapping.version}</div>
                    <div className="text-xs text-white/40 mt-1">
                      registered {new Date(mapping.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </button>

                {expandedId === mapping.id && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
                      Mapping spec
                    </div>
                    <pre className="text-xs text-white/70 bg-[#0A1628]/60 border border-[#00D9FF]/15 rounded-lg p-4 overflow-x-auto">
                      {JSON.stringify(mapping.mapping_spec, null, 2)}
                    </pre>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {mappings && mappings.length === 0 && (
            <div className="text-center text-white/60 text-sm py-8">
              No mapping functions registered yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
