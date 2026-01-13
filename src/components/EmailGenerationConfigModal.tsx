import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, AlertCircle, Target, Heart, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface EmailGenerationConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  onEmailGenerationComplete?: () => void;
}

type CoreAngle = 'pain' | 'objective' | 'desire' | null;
type ToneOfVoice =
  | 'Professional & Direct'
  | 'Friendly & Conversational'
  | 'Casual & Approachable'
  | 'Formal & Corporate'
  | 'Enthusiastic & Energetic'
  | 'Empathetic & Understanding';

const toneOptions: ToneOfVoice[] = [
  'Professional & Direct',
  'Friendly & Conversational',
  'Casual & Approachable',
  'Formal & Corporate',
  'Enthusiastic & Energetic',
  'Empathetic & Understanding',
];

const emailDrafts = [
  {
    id: 1,
    name: 'Pain-Point Focus',
    subject: 'Pain-Point Focus',
    preview: 'Hey {First Name}, {Personalisation}. I imagine getting that depth of content to your audience requires a significant investment of your time and energy. What if you could amplify the reach of that great work, ensuring it gets featured in major publications without the constant content grind? We specialize in doing exactly that, and to show you how, I\'d like to create a Viral Style Video for you, at no charge. Open to a quick chat next week to explore the possibility?',
  },
  {
    id: 2,
    name: 'Solution-Oriented',
    subject: 'Solution-Oriented | Data-Driven Approach',
    preview: 'Hey {First Name}, {Personalisation}. You\'re stuck in the content treadmill, recording and editing constantly just to stay in place, aren\'t you? We fix this grind by turning your existing work into guaranteed features in major publications. To show you the quality of content we create, I can make you a Viral Style Video at No Charge as a first step. Would it make sense to talk quickly?',
  },
  {
    id: 3,
    name: 'Direct Outreach',
    subject: 'Direct Outreach - Lets Eliminate the Content Grind',
    preview: 'Hey {First Name}, {Personalisation}. Stop spending endless hours creating content that barely gets noticed. Instead, let us transform your best work into viral features that land in top publications—effortlessly. As proof, I\'ll create a Viral Style Video for you completely free. Interested in seeing how this works?',
  },
  {
    id: 4,
    name: 'Benefit-Driven',
    subject: 'Benefit-Driven - More Reach, Less Work',
    preview: 'Hey {First Name}, {Personalisation}. Imagine your best content getting featured in major publications without you having to grind day after day. That\'s exactly what we do—we take your existing work and turn it into guaranteed features. I\'d love to show you by creating a free Viral Style Video for your content. Worth a quick conversation?',
  },
  {
    id: 5,
    name: 'Question-Based',
    subject: 'Question-Based? What if Content Could Work for You?',
    preview: 'Hey {First Name}, {Personalisation}. What if you could get your content featured in major publications without the constant recording, editing, and posting cycle? We help creators break free from the content treadmill by turning their best work into viral publications. To demonstrate, I\'ll create a Viral Style Video for you at no cost. Open to exploring this?',
  },
];

export function EmailGenerationConfigModal({ isOpen, onClose, onComplete, onEmailGenerationComplete }: EmailGenerationConfigModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  
  // Step 1 states
  const [offerText, setOfferText] = useState('');
  const [selectedAngle, setSelectedAngle] = useState<CoreAngle>('pain');
  const [selectedTone, setSelectedTone] = useState<ToneOfVoice>('Professional & Direct');
  const [isToneDropdownOpen, setIsToneDropdownOpen] = useState(false);

  // Step 2 states
  const [selectedDraft, setSelectedDraft] = useState(1);

  // Step 3 states
  const [templateName, setTemplateName] = useState('Solution-Oriented - Final');
  const [emailSubject, setEmailSubject] = useState('Solution-Oriented | Data-Driven Approach');
  const [emailContent, setEmailContent] = useState(`Hey {First Name},

{Personalisation}. 

You're stuck in the content treadmill, recording and editing constantly just to stay in place, aren't you? 

We fix this grind by turning your existing work into guaranteed features in major publications. 

To show you the quality of content we create, I can make you a Viral Style Video at No Charge as a first step. 

Would it make sense to talk quickly?`);

  const isStep1Valid = offerText.trim().length > 0 && selectedAngle && selectedTone;

  const handleClose = () => {
    setShowCloseConfirm(true);
  };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    onClose();
  };

  const cancelClose = () => {
    setShowCloseConfirm(false);
  };

  const handleGenerateDrafts = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentStep(2);
  };

  const handleContinueToFinalize = () => {
    const draft = emailDrafts.find(d => d.id === selectedDraft);
    if (draft) {
      setEmailSubject(draft.subject);
      setEmailContent(draft.preview);
    }
    setCurrentStep(3);
  };

  const handleStartEmailGeneration = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowSuccess(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowSuccess(false);
    onClose();
    if (onComplete) onComplete();
    if (onEmailGenerationComplete) onEmailGenerationComplete();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Loading Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-md"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 className="size-16 text-[#00D9FF]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-md"
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="backdrop-blur-xl bg-[#0A1628]/95 border-2 border-[#00D9FF]/40 rounded-2xl p-8 shadow-2xl shadow-[#00D9FF]/20"
                >
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <CheckCircle className="size-16 text-green-400" />
                    </motion.div>
                    <div className="text-xl text-white text-center">Email Generation Started!</div>
                    <div className="text-sm text-white/60 text-center">Your campaign is being updated...</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Close Confirmation */}
          <AnimatePresence>
            {showCloseConfirm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-md"
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="backdrop-blur-xl bg-[#0A1628]/95 border-2 border-[#00D9FF]/40 rounded-2xl p-8 shadow-2xl shadow-[#00D9FF]/20"
                >
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <AlertTriangle className="size-16 text-red-400" />
                    </motion.div>
                    <div className="text-xl text-white text-center">Are you sure?</div>
                    <div className="text-sm text-white/60 text-center">You will lose all unsaved changes.</div>
                    <div className="flex gap-3 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={confirmClose}
                        className="px-4 sm:px-6 py-2 sm:py-3 border border-[#00D9FF]/30 text-white rounded-lg hover:bg-[#00D9FF]/10 transition-colors"
                      >
                        Yes, Close
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={cancelClose}
                        className="px-4 sm:px-6 py-2 sm:py-3 border border-[#00D9FF]/30 text-white rounded-lg hover:bg-[#00D9FF]/10 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 sm:inset-10 lg:inset-16 z-[60] overflow-hidden"
          >
            <div className="h-full backdrop-blur-2xl bg-[#0A1628]/95 border-2 border-[#00D9FF]/40 rounded-2xl shadow-2xl shadow-[#00D9FF]/20 flex flex-col">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-[#00D9FF]/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl text-white">
                    Email Generation Configuration
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
                  >
                    <X className="size-5 sm:size-6 text-[#00D9FF]" />
                  </motion.button>
                </div>

                {/* 3-Step Timeline */}
                <div className="flex items-center justify-between relative">
                  {/* Progress Line */}
                  <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#00D9FF]/20" />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-[#00D9FF] to-[#00B8D4]"
                  />

                  {/* Step 1 */}
                  <div className="flex flex-col items-center z-10 flex-1">
                    <motion.div
                      animate={{ 
                        scale: currentStep >= 1 ? 1 : 0.8,
                        backgroundColor: currentStep >= 1 ? ['#00D9FF', '#00B8D4'] : '#0A1628'
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg mb-2 ${
                        currentStep >= 1 ? 'border-0' : 'border-2 border-[#00D9FF]/40'
                      }`}
                      style={{
                        background: currentStep >= 1 
                          ? 'linear-gradient(135deg, #00D9FF 0%, #00B8D4 100%)' 
                          : '#0A1628'
                      }}
                    >
                      1
                    </motion.div>
                    <div className={`text-xs sm:text-sm text-center ${currentStep >= 1 ? 'text-white' : 'text-white/60'}`}>
                      Define Strategy
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center z-10 flex-1">
                    <motion.div
                      animate={{ 
                        scale: currentStep >= 2 ? 1 : 0.8,
                        backgroundColor: currentStep >= 2 ? ['#00D9FF', '#00B8D4'] : '#0A1628'
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        currentStep >= 2 ? 'border-0 text-white' : 'border-2 border-[#00D9FF]/40 text-white/60'
                      }`}
                      style={{
                        background: currentStep >= 2 
                          ? 'linear-gradient(135deg, #00D9FF 0%, #00B8D4 100%)' 
                          : '#0A1628'
                      }}
                    >
                      2
                    </motion.div>
                    <div className={`text-xs sm:text-sm text-center ${currentStep >= 2 ? 'text-white' : 'text-white/60'}`}>
                      Generate Drafts
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center z-10 flex-1">
                    <motion.div
                      animate={{ 
                        scale: currentStep >= 3 ? 1 : 0.8,
                        backgroundColor: currentStep >= 3 ? ['#00D9FF', '#00B8D4'] : '#0A1628'
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        currentStep >= 3 ? 'border-0 text-white' : 'border-2 border-[#00D9FF]/40 text-white/60'
                      }`}
                      style={{
                        background: currentStep >= 3 
                          ? 'linear-gradient(135deg, #00D9FF 0%, #00B8D4 100%)' 
                          : '#0A1628'
                      }}
                    >
                      3
                    </motion.div>
                    <div className={`text-xs sm:text-sm text-center ${currentStep >= 3 ? 'text-white' : 'text-white/60'}`}>
                      Review & Finalize
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Define Strategy */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                      {/* Left Column - What is your Offer */}
                      <div className="space-y-4">
                        <h3 className="text-lg text-white">What is your Offer?</h3>
                        <motion.textarea
                          whileFocus={{
                            borderColor: 'rgba(0, 217, 255, 0.6)',
                            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                          }}
                          value={offerText}
                          onChange={(e) => setOfferText(e.target.value)}
                          placeholder="Describe your product, service, or offer. Be specific about the value proposition to maximize your promotion, communication, and usage and management..."
                          className="w-full h-44 sm:h-56 p-4 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg focus:outline-none text-white placeholder-white/40 transition-all resize-none"
                        />
                      </div>

                      {/* Right Column - Select Core Angle */}
                      <div className="space-y-4">
                        <h3 className="text-lg text-white mb-4">Select Core Angle</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {/* Pain Card */}
                          <motion.div
                            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 0.6)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedAngle('pain')}
                            className={`p-4 rounded-xl cursor-pointer transition-all border-2 flex flex-col items-center text-center ${
                              selectedAngle === 'pain'
                                ? 'bg-[#00D9FF]/10 border-[#00D9FF]'
                                : 'bg-[#0A1628]/40 border-[#00D9FF]/30'
                            }`}
                          >
                            <AlertCircle className="size-8 sm:size-10 text-[#00D9FF] mb-2" />
                            <div className="text-white text-sm sm:text-base mb-1">Pain</div>
                            <div className="text-xs text-white/60">
                              Focus on problems they face.
                            </div>
                          </motion.div>

                          {/* Objective Card */}
                          <motion.div
                            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 0.6)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedAngle('objective')}
                            className={`p-4 rounded-xl cursor-pointer transition-all border-2 flex flex-col items-center text-center ${
                              selectedAngle === 'objective'
                                ? 'bg-[#00D9FF]/10 border-[#00D9FF]'
                                : 'bg-[#0A1628]/40 border-[#00D9FF]/30'
                            }`}
                          >
                            <Target className="size-8 sm:size-10 text-[#00D9FF] mb-2" />
                            <div className="text-white text-sm sm:text-base mb-1">Objective</div>
                            <div className="text-xs text-white/60">
                              Focus on goals they want to hit.
                            </div>
                          </motion.div>

                          {/* Desire Card */}
                          <motion.div
                            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 0.6)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedAngle('desire')}
                            className={`p-4 rounded-xl cursor-pointer transition-all border-2 flex flex-col items-center text-center ${
                              selectedAngle === 'desire'
                                ? 'bg-[#00D9FF]/10 border-[#00D9FF]'
                                : 'bg-[#0A1628]/40 border-[#00D9FF]/30'
                            }`}
                          >
                            <Heart className="size-8 sm:size-10 text-[#00D9FF] mb-2" />
                            <div className="text-white text-sm sm:text-base mb-1">Desire</div>
                            <div className="text-xs text-white/60">
                              Focus on the dream outcome.
                            </div>
                          </motion.div>
                        </div>

                        {/* Tone of Voice Dropdown */}
                        <div className="mt-6">
                          <h4 className="text-white mb-3">Tone of Voice</h4>
                          <div className="relative">
                            <motion.button
                              whileHover={{ borderColor: 'rgba(0, 217, 255, 0.6)' }}
                              onClick={() => setIsToneDropdownOpen(!isToneDropdownOpen)}
                              className="w-full flex items-center justify-between p-4 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg text-white hover:bg-[#00D9FF]/5 transition-all"
                            >
                              <span>{selectedTone}</span>
                              <motion.div
                                animate={{ rotate: isToneDropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="size-5 text-[#00D9FF]" />
                              </motion.div>
                            </motion.button>

                            <AnimatePresence>
                              {isToneDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute z-10 w-full mt-2 backdrop-blur-xl bg-[#0A1628]/95 border border-[#00D9FF]/30 rounded-lg overflow-hidden shadow-xl shadow-[#00D9FF]/10"
                                >
                                  {toneOptions.map((tone) => (
                                    <motion.button
                                      key={tone}
                                      whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
                                      onClick={() => {
                                        setSelectedTone(tone);
                                        setIsToneDropdownOpen(false);
                                      }}
                                      className={`w-full text-left p-3 transition-colors ${
                                        selectedTone === tone
                                          ? 'bg-[#00D9FF]/10 text-[#00D9FF]'
                                          : 'text-white'
                                      }`}
                                    >
                                      {tone}
                                    </motion.button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Generate Drafts */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {emailDrafts.map((draft, index) => (
                          <motion.div
                            key={draft.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, borderColor: 'rgba(0, 217, 255, 0.6)' }}
                            onClick={() => setSelectedDraft(draft.id)}
                            className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                              selectedDraft === draft.id
                                ? 'bg-[#00D9FF]/10 border-[#00D9FF]'
                                : 'bg-[#0A1628]/40 border-[#00D9FF]/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-white">{draft.name}</div>
                              {selectedDraft === draft.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="px-2 py-1 bg-[#00D9FF] text-white text-xs rounded"
                                >
                                  Selected
                                </motion.div>
                              )}
                            </div>
                            <div className="mb-2">
                              <div className="text-xs text-white/60 mb-1">Subject</div>
                              <div className="text-sm text-white/80">{draft.subject}</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/60 mb-1">Preview Text</div>
                              <div className="text-xs text-white/70 line-clamp-6">{draft.preview}</div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDraft(draft.id);
                              }}
                              className={`mt-3 w-full px-3 py-2 rounded-lg text-xs transition-all ${
                                selectedDraft === draft.id
                                  ? 'bg-[#00D9FF] text-white'
                                  : 'bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/40'
                              }`}
                            >
                              {selectedDraft === draft.id ? 'Selected Draft' : 'Select Draft'}
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Review & Finalize */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6 max-w-4xl mx-auto"
                    >
                      {/* Template Name */}
                      <div>
                        <label className="text-white mb-2 block">Template Name*</label>
                        <motion.input
                          whileFocus={{
                            borderColor: 'rgba(0, 217, 255, 0.6)',
                            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                          }}
                          type="text"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          className="w-full p-4 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg focus:outline-none text-white transition-all"
                        />
                      </div>

                      {/* Email Subject */}
                      <div>
                        <label className="text-white mb-2 block">Email Subject*</label>
                        <motion.input
                          whileFocus={{
                            borderColor: 'rgba(0, 217, 255, 0.6)',
                            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                          }}
                          type="text"
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          className="w-full p-4 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg focus:outline-none text-white transition-all"
                        />
                      </div>

                      {/* Email Content */}
                      <div>
                        <label className="text-white mb-2 block">Email Content*</label>
                        <motion.textarea
                          whileFocus={{
                            borderColor: 'rgba(0, 217, 255, 0.6)',
                            boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                          }}
                          value={emailContent}
                          onChange={(e) => setEmailContent(e.target.value)}
                          rows={12}
                          className="w-full p-4 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg focus:outline-none text-white transition-all resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 border-t border-[#00D9FF]/20">
                <div className="flex justify-between gap-3">
                  {/* Back Button */}
                  {currentStep > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-4 sm:px-6 py-2 sm:py-3 border border-[#00D9FF]/30 text-white rounded-lg hover:bg-[#00D9FF]/10 transition-colors"
                    >
                      {currentStep === 2 ? 'Back to Strategy' : 'Back to Drafts'}
                    </motion.button>
                  )}

                  <div className="flex-1" />

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {currentStep < 3 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="px-4 sm:px-6 py-2 sm:py-3 border border-[#00D9FF]/30 text-white rounded-lg hover:bg-[#00D9FF]/10 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileHover={
                        (currentStep === 1 && isStep1Valid) || currentStep > 1
                          ? { scale: 1.02, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }
                          : {}
                      }
                      whileTap={(currentStep === 1 && isStep1Valid) || currentStep > 1 ? { scale: 0.98 } : {}}
                      onClick={() => {
                        if (currentStep === 1) handleGenerateDrafts();
                        else if (currentStep === 2) handleContinueToFinalize();
                        else if (currentStep === 3) handleStartEmailGeneration();
                      }}
                      disabled={currentStep === 1 && !isStep1Valid}
                      className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg overflow-hidden ${
                        (currentStep === 1 && isStep1Valid) || currentStep > 1
                          ? 'bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white shadow-[#00D9FF]/40'
                          : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {((currentStep === 1 && isStep1Valid) || currentStep > 1) && (
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
                      <span className="relative">
                        {currentStep === 1 ? 'Generate 5 Drafts' : currentStep === 2 ? 'Continue to Finalize' : 'Start Email Generation'}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}