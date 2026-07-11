import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert } from 'lucide-react';
import { useBatchDetail } from '@/hooks/api/useBatchDetail';

interface BatchDetailModalProps {
  batchId: string | null;
  onClose: () => void;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-3 bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-lg">
      <div className="text-xs text-white/50 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-white text-sm">{value}</div>
    </div>
  );
}

export function BatchDetailModal({ batchId, onClose }: BatchDetailModalProps) {
  const { data: batch, isLoading } = useBatchDetail(batchId);

  return (
    <AnimatePresence>
      {batchId && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto backdrop-blur-xl bg-[#0A1628]/95 border border-[#00D9FF]/30 rounded-2xl shadow-2xl shadow-[#00D9FF]/20">
              <div className="sticky top-0 backdrop-blur-xl bg-[#0A1628]/95 p-6 border-b border-[#00D9FF]/20 flex items-center justify-between">
                <h2 className="text-xl text-white break-all">{batch?.filename ?? 'Batch detail'}</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors text-white/60 hover:text-white shrink-0"
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              <div className="p-6 space-y-6">
                {isLoading && <div className="text-white/60 text-sm">Loading…</div>}

                {batch && (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Stat label="Uploaded" value={new Date(batch.created_at).toLocaleString()} />
                      <Stat label="Status" value={batch.status} />
                      <Stat label="Raw rows" value={batch.row_count_raw} />
                      <Stat label="Valid" value={batch.row_count_valid} />
                      <Stat label="New leads" value={batch.row_count_new_leads} />
                      <Stat label="Merged (dedup)" value={batch.row_count_merged} />
                      <Stat label="With email" value={batch.row_count_with_email} />
                      <Stat label="Quarantined" value={batch.row_count_quarantined} />
                    </div>

                    <div>
                      <h3 className="text-sm text-[#00D9FF] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <ShieldAlert className="size-4" />
                        Quarantined rows ({batch.quarantined_rows.length})
                      </h3>
                      {batch.quarantined_rows.length === 0 ? (
                        <p className="text-sm text-white/50">
                          Nothing was quarantined in this upload — every row mapped cleanly.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {batch.quarantined_rows.map((row) => (
                            <div
                              key={row.row_index}
                              className="p-4 bg-red-500/5 border border-red-500/30 rounded-lg"
                            >
                              <div className="flex items-baseline justify-between gap-3 mb-2">
                                <span className="text-sm text-red-300">
                                  Row {row.row_index + 1} — {row.quarantine_reason ?? 'unknown reason'}
                                </span>
                              </div>
                              <pre className="text-xs text-white/60 whitespace-pre-wrap break-all bg-[#0A1628]/60 p-3 rounded overflow-x-auto">
                                {JSON.stringify(row.raw_data, null, 2)}
                              </pre>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
