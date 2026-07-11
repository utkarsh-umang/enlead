import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ApiError } from '@/client';
import { useUploadBatch } from '@/hooks/api/useUploadBatch';
import { useLeadStats } from '@/hooks/api/useLeadStats';

const AUTO = '__auto__';
const NEW = '__new__';

interface ImportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportLeadsModal({ isOpen, onClose }: ImportLeadsModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourceChoice, setSourceChoice] = useState(AUTO);
  const [newSource, setNewSource] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadBatch();
  const { data: stats } = useLeadStats();

  // Reset all local state whenever the modal closes, so the next open
  // starts clean instead of showing the previous run's result.
  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setSourceChoice(AUTO);
      setNewSource('');
      upload.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith('.csv')) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const resolvedSource =
    sourceChoice === AUTO ? undefined : sourceChoice === NEW ? newSource.trim() : sourceChoice;
  // "New source…" chosen but the name still empty → not ready to import.
  const sourceIncomplete = sourceChoice === NEW && !newSource.trim();

  const handleImport = () => {
    if (selectedFile && !sourceIncomplete) {
      upload.mutate({ file: selectedFile, source: resolvedSource });
    }
  };

  const errorMessage =
    upload.error instanceof ApiError
      ? (upload.error.body?.detail as string) ?? upload.error.message
      : upload.error instanceof Error
        ? upload.error.message
        : null;

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-lg backdrop-blur-xl bg-[#0A1628]/95 border border-[#00D9FF]/30 rounded-2xl shadow-2xl shadow-[#00D9FF]/20 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-[#00D9FF]/20 flex items-center justify-between">
                <h2 className="text-xl text-white">
                  {upload.isSuccess ? 'Import Complete' : 'Import New Lead List'}
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

              {/* Content */}
              <div className="p-6 space-y-6">
                {upload.isSuccess ? (
                  /* Result summary — real counts from the batch that was just processed */
                  <div className="flex flex-col items-center gap-4 py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="p-4 bg-green-500/20 rounded-full"
                    >
                      <CheckCircle2 className="size-8 text-green-400" />
                    </motion.div>
                    <div className="w-full grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-lg">
                        <p className="text-2xl text-white">{upload.data.row_count_new_leads}</p>
                        <p className="text-xs text-white/60 uppercase tracking-wider">New leads</p>
                      </div>
                      <div className="p-3 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-lg">
                        <p className="text-2xl text-white">{upload.data.row_count_merged}</p>
                        <p className="text-xs text-white/60 uppercase tracking-wider">Merged (dedup)</p>
                      </div>
                      <div className="p-3 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-lg">
                        <p className="text-2xl text-white">{upload.data.row_count_quarantined}</p>
                        <p className="text-xs text-white/60 uppercase tracking-wider">Quarantined</p>
                      </div>
                      <div className="p-3 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-lg">
                        <p className="text-2xl text-white">{upload.data.row_count_raw}</p>
                        <p className="text-xs text-white/60 uppercase tracking-wider">Total rows</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/60">
                      Source: <span className="text-[#00D9FF]">{upload.data.source}</span>
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Drag & Drop Zone */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
                        isDragging
                          ? 'border-[#00D9FF] bg-[#00D9FF]/10 shadow-lg shadow-[#00D9FF]/30'
                          : 'border-[#00D9FF]/30 hover:border-[#00D9FF]/50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelect}
                        className="hidden"
                      />

                      <div className="flex flex-col items-center gap-4">
                        {selectedFile ? (
                          <>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="p-4 bg-[#00D9FF]/20 rounded-full"
                            >
                              <FileText className="size-8 text-[#00D9FF]" />
                            </motion.div>
                            <div className="text-center">
                              <p className="text-white">{selectedFile.name}</p>
                              <p className="text-sm text-white/60">
                                {(selectedFile.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                            {!upload.isPending && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedFile(null)}
                                className="text-sm text-[#00D9FF] hover:underline"
                              >
                                Remove file
                              </motion.button>
                            )}
                          </>
                        ) : (
                          <>
                            <motion.div
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="p-4 bg-[#00D9FF]/10 rounded-full"
                            >
                              <Upload className="size-8 text-[#00D9FF]" />
                            </motion.div>
                            <div className="text-center">
                              <p className="text-white mb-2">Drag & Drop your CSV file here</p>
                              <p className="text-sm text-white/60 mb-4">or</p>
                              <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => fileInputRef.current?.click()}
                                className="px-6 py-2 bg-[#00D9FF]/20 border border-[#00D9FF] text-[#00D9FF] rounded-lg hover:bg-[#00D9FF]/30 transition-colors"
                              >
                                Select File
                              </motion.button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Source label: the column shape decides HOW to parse;
                        this decides WHAT LIST it is. Two lists exported from
                        the same tool share a shape — an explicit source keeps
                        them distinguishable. */}
                    <div>
                      <label className="block text-xs text-white/60 uppercase tracking-wider mb-2">
                        Source
                      </label>
                      <select
                        value={sourceChoice}
                        onChange={(e) => setSourceChoice(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#0A1628]/60 border border-[#00D9FF]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                      >
                        <option value={AUTO}>Auto-detect from file shape</option>
                        {stats?.by_source.map((s) => (
                          <option key={s.source} value={s.source}>
                            {s.source}
                          </option>
                        ))}
                        <option value={NEW}>New source…</option>
                      </select>
                      {sourceChoice === NEW && (
                        <input
                          type="text"
                          value={newSource}
                          onChange={(e) => setNewSource(e.target.value)}
                          placeholder="e.g. consulti-realestate-usa"
                          autoFocus
                          className="mt-2 w-full px-3 py-2.5 bg-[#0A1628]/60 border border-[#00D9FF]/30 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00D9FF]"
                        />
                      )}
                    </div>

                    <p className="text-xs text-white/50">
                      Auto-detect labels the batch from the CSV's column shape (e.g. youtube-tool /
                      youtube-consulti). Pick or create a source when this file is a different list
                      that happens to share a shape. Unrecognized shapes aren't auto-mapped yet;
                      you'll get an error naming what's missing.
                    </p>

                    {errorMessage && (
                      <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/40 rounded-lg">
                        <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-300">{errorMessage}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#00D9FF]/20 flex items-center justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02, borderColor: 'rgba(0, 217, 255, 0.6)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-2 border border-[#00D9FF]/30 text-white rounded-lg hover:bg-[#00D9FF]/10 transition-colors"
                >
                  {upload.isSuccess ? 'Close' : 'Cancel'}
                </motion.button>
                {!upload.isSuccess && (
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedFile || upload.isPending || sourceIncomplete}
                    onClick={handleImport}
                    className="relative px-6 py-2 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-[#0A1628] rounded-lg shadow-lg shadow-[#00D9FF]/40 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!upload.isPending && (
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
                    )}
                    <span className="relative">{upload.isPending ? 'Importing…' : 'Import Leads'}</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
