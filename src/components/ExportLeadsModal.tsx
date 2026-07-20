import { motion, AnimatePresence } from 'motion/react';
import { X, Send, AlertTriangle, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ExportSelection } from '@/client';
import { useCreateExport, useExportPreview } from '@/hooks/api/useExport';

interface ExportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selection: ExportSelection;
}

import { MONTHS } from '@/lib/months';

export function ExportLeadsModal({ isOpen, onClose, selection }: ExportLeadsModalProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [includeAlreadyExported, setIncludeAlreadyExported] = useState(false);

  const { data: preview, isLoading: previewLoading } = useExportPreview(selection, isOpen);
  const createExport = useCreateExport();

  useEffect(() => {
    if (isOpen) {
      setIncludeAlreadyExported(false);
      createExport.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const willExport = preview
    ? includeAlreadyExported
      ? preview.exportable
      : preview.exportable - preview.already_exported
    : 0;

  const handleExport = () => {
    createExport.mutate(
      { ...selection, year, month, include_already_exported: includeAlreadyExported },
      { onSuccess: onClose }
    );
  };

  const years = [now.getFullYear(), now.getFullYear() + 1];

  return (
    <AnimatePresence>
      {isOpen && (
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
            <div className="w-full max-w-md backdrop-blur-xl bg-[#0A1628]/95 border border-[#00D9FF]/30 rounded-2xl shadow-2xl shadow-[#00D9FF]/20">
              <div className="p-6 border-b border-[#00D9FF]/20 flex items-center justify-between">
                <h2 className="text-xl text-white flex items-center gap-2">
                  <Send className="size-5 text-[#00D9FF]" />
                  Export to Instantly
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors text-white/60 hover:text-white"
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs text-white/60 uppercase tracking-wider mb-2">
                    Setting up on Instantly for
                  </label>
                  <div className="flex gap-3">
                    <select
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="flex-1 px-3 py-2.5 bg-[#0A1628]/60 border border-[#00D9FF]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                    >
                      {MONTHS.map((name, i) => (
                        <option key={name} value={i + 1}>{name}</option>
                      ))}
                    </select>
                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-28 px-3 py-2.5 bg-[#0A1628]/60 border border-[#00D9FF]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-white/40 mt-2">
                    Recorded as the contact month for every exported lead — this is the system of
                    record for who was contacted when.
                  </p>
                </div>

                {previewLoading || !preview ? (
                  <div className="text-sm text-white/60">Checking selection…</div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-sm text-white/80">
                      {preview.total_selected.toLocaleString()} leads selected
                    </div>

                    {preview.excluded_no_email > 0 && (
                      <div className="flex items-start gap-2 text-sm text-white/60">
                        <Mail className="size-4 shrink-0 mt-0.5 text-white/40" />
                        <span>
                          {preview.excluded_no_email.toLocaleString()} without an email will be
                          skipped — Instantly can't use them.
                        </span>
                      </div>
                    )}

                    {preview.already_exported > 0 && (
                      <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-lg space-y-2">
                        <div className="flex items-start gap-2 text-sm text-amber-300">
                          <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                          <span>
                            {preview.already_exported.toLocaleString()} of these were already
                            exported before
                            {preview.already_exported_last_month && (
                              <>
                                {' '}(most recent:{' '}
                                {MONTHS[new Date(preview.already_exported_last_month).getMonth()]}{' '}
                                {new Date(preview.already_exported_last_month).getFullYear()})
                              </>
                            )}
                            .
                          </span>
                        </div>
                        <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeAlreadyExported}
                            onChange={(e) => setIncludeAlreadyExported(e.target.checked)}
                            className="w-4 h-4 accent-amber-400"
                          />
                          Include them anyway
                        </label>
                      </div>
                    )}

                    <div className="text-sm text-[#00D9FF]">
                      {willExport.toLocaleString()} leads will be exported.
                    </div>
                  </div>
                )}

                {createExport.isError && (
                  <p className="text-sm text-red-400">Export failed — is the backend reachable?</p>
                )}

                <div className="flex gap-3 pt-1">
                  <motion.button
                    whileHover={willExport > 0 ? { scale: 1.02 } : undefined}
                    whileTap={willExport > 0 ? { scale: 0.98 } : undefined}
                    onClick={handleExport}
                    disabled={willExport <= 0 || createExport.isPending}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-[#0A1628] rounded-lg shadow-lg shadow-[#00D9FF]/40 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    {createExport.isPending ? 'Exporting…' : 'Export CSV & record'}
                  </motion.button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 border border-white/20 text-white/70 rounded-lg text-sm hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
