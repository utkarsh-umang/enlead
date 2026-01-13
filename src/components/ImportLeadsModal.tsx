import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText } from 'lucide-react';
import { useState, useRef } from 'react';

interface ImportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportLeadsModal({ isOpen, onClose }: ImportLeadsModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [source, setSource] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImport = () => {
    // Handle import logic here
    console.log({ selectedFile, source, campaignName });
    onClose();
  };

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
                <h2 className="text-xl text-white">Import New Lead List</h2>
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
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedFile(null)}
                          className="text-sm text-[#00D9FF] hover:underline"
                        >
                          Remove file
                        </motion.button>
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

                {/* Source Input */}
                <div className="space-y-2">
                  <label className="block text-sm text-white">Source</label>
                  <motion.input
                    whileFocus={{
                      borderColor: 'rgba(0, 217, 255, 0.6)',
                      boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                    }}
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Enter source"
                    className="w-full px-4 py-3 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg focus:outline-none text-white placeholder-white/40 transition-all"
                  />
                  <p className="text-xs text-white/50">
                    Add a short description about the Source of these leads, this will be the identifier
                  </p>
                </div>

                {/* Campaign Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm text-white">Campaign Name</label>
                  <motion.input
                    whileFocus={{
                      borderColor: 'rgba(0, 217, 255, 0.6)',
                      boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                    }}
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Give Campaign Name"
                    className="w-full px-4 py-3 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg focus:outline-none text-white placeholder-white/40 transition-all"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#00D9FF]/20 flex items-center justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02, borderColor: 'rgba(0, 217, 255, 0.6)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-2 border border-[#00D9FF]/30 text-white rounded-lg hover:bg-[#00D9FF]/10 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!selectedFile || !source || !campaignName}
                  onClick={handleImport}
                  className="relative px-6 py-2 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-lg shadow-lg shadow-[#00D9FF]/40 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <span className="relative">Import Leads</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
