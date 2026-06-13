import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Eye, EyeOff, FileText, CheckCircle, Upload, TrendingUp, Users, Target, BarChart3, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/80f1fbd8b5de75c83a12cb2ec032855928774201.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Auth({ isOpen, onClose }: AuthProps) {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [conversionStep, setConversionStep] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 30, y: 30 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [leadsCount, setLeadsCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Reset animation states
      setUploadProgress(0);
      setConversionStep(0);
      setCurrentSlide(0);
      setLeadsCount(0);
    }
  }, [isOpen]);

  // Upload progress animation
  useEffect(() => {
    if (isOpen && currentSlide === 0 && uploadProgress < 100) {
      const timer = setTimeout(() => setUploadProgress(prev => Math.min(prev + 2, 100)), 50);
      return () => clearTimeout(timer);
    } else if (uploadProgress === 100 && conversionStep < 4) {
      const timer = setTimeout(() => setConversionStep(prev => prev + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, uploadProgress, conversionStep, currentSlide]);

  // Mouse cursor animation - only show when upload is not complete
  useEffect(() => {
    if (!isOpen || uploadProgress >= 100 || currentSlide !== 0) return;
    
    const cursorPath = [
      { x: 30, y: 30 },
      { x: 50, y: 40 },
      { x: 70, y: 30 },
      { x: 50, y: 60 },
      { x: 30, y: 50 },
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % cursorPath.length;
      setCursorPosition(cursorPath[index]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isOpen, uploadProgress, currentSlide]);

  // Carousel auto-rotation
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
      // Reset animations when switching slides
      if (currentSlide === 0) {
        setUploadProgress(0);
        setConversionStep(0);
      } else if (currentSlide === 1) {
        setLeadsCount(0);
      }
    }, 8000); // Switch every 8 seconds
    
    return () => clearInterval(interval);
  }, [isOpen, currentSlide]);

  // Leads counter animation for second slide
  useEffect(() => {
    if (isOpen && currentSlide === 1 && leadsCount < 1247) {
      const timer = setTimeout(() => setLeadsCount(prev => Math.min(prev + 23, 1247)), 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentSlide, leadsCount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (isLogin) {
      const err = login(email, password);
      if (err) { setError(err); return; }
    } else {
      if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
      const err = signup(name, email, password);
      if (err) { setError(err); return; }
    }
    onClose();
    navigate('/dashboard');
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - 30% opacity black - hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100] hidden lg:block"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] lg:flex lg:items-center lg:justify-center lg:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full lg:w-[70%] lg:max-w-7xl lg:h-[95vh] bg-white lg:rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* White Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:shadow-xl"
              >
                <X className="size-5 text-gray-700" />
              </motion.button>

              <div className="grid lg:grid-cols-2 h-full">
                {/* Left Column - Auth Form */}
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto h-full">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl mb-6 text-gray-900">
                      {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
                        >
                          {error}
                        </motion.div>
                      )}

                      {/* Full Name (Sign Up only) */}
                      {!isLogin && (
                        <div>
                          <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                            Full name
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                              id="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Jane Smith"
                              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00D9FF] focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                              required={!isLogin}
                            />
                          </div>
                        </div>
                      )}

                      {/* Email Input */}
                      <div>
                        <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                          Email address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00D9FF] focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                            required
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div>
                        <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                          <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00D9FF] focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password (Sign Up only) */}
                      {!isLogin && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-700">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                              id="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#00D9FF] focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                              required={!isLogin}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Remember Me & Forgot Password */}
                      {isLogin && (
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="w-4 h-4 rounded border-gray-300 text-[#00D9FF] focus:ring-[#00D9FF] cursor-pointer"
                            />
                            <span className="text-sm text-gray-700">Remember me</span>
                          </label>
                          <button
                            type="button"
                            className="text-sm text-[#00D9FF] hover:text-[#00B8D4] transition-colors"
                          >
                            Forgot password?
                          </button>
                        </div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-xl shadow-lg shadow-[#00D9FF]/30 transition-shadow hover:shadow-xl hover:shadow-[#00D9FF]/40 relative overflow-hidden group"
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
                        <span className="relative">
                          {isLogin ? 'Sign In' : 'Sign Up'}
                        </span>
                      </motion.button>

                      {/* Divider */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>

                      {/* Google Login */}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-gray-700"
                      >
                        <svg className="size-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Sign Up with Google
                      </motion.button>

                      {/* Toggle Login/Signup */}
                      <p className="text-center text-sm text-gray-600">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                          type="button"
                          onClick={handleModeSwitch}
                          className="text-[#00D9FF] hover:text-[#00B8D4] transition-colors"
                        >
                          {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                      </p>
                    </form>
                  </motion.div>
                </div>

                {/* Right Column - Carousel */}
                <div className="relative bg-gradient-to-br from-[#0A1628] via-[#0F1E33] to-[#0A1628] p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center overflow-hidden hidden lg:flex">
                  {/* Noise Texture */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                      mixBlendMode: 'overlay',
                    }}
                  />

                  {/* Glowing Orb Background */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#00D9FF]/30 to-[#0099CC]/20 rounded-full blur-[100px]"
                  />

                  {/* Carousel Container */}
                  <div className="relative w-full max-w-md overflow-hidden">
                    <AnimatePresence mode="wait">
                      {currentSlide === 0 ? (
                        // Slide 1: File Upload & Conversion
                        <motion.div
                          key="slide1"
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative bg-[#0F1E33] rounded-2xl border-2 border-[#00D9FF]/30 p-6 shadow-2xl shadow-[#00D9FF]/20"
                          >
                            {/* Dashboard Header */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                              </div>
                              <div className="text-xs text-[#00D9FF]">Upload & Process</div>
                            </div>

                            {/* File Upload Section */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                              className="bg-[#0A1628] rounded-xl p-4 mb-4 border border-[#00D9FF]/20"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#0099CC] flex items-center justify-center">
                                  <Upload className="size-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm text-white">raw_leads.csv</div>
                                  <div className="text-xs text-white/60">2.4 MB</div>
                                </div>
                              </div>
                              
                              {/* Upload Progress Bar */}
                              <div className="relative w-full h-2 bg-[#0F1E33] rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${uploadProgress}%` }}
                                  transition={{ duration: 0.1 }}
                                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00D9FF] to-[#0099CC] rounded-full"
                                />
                              </div>
                              <div className="text-xs text-[#00D9FF] mt-2">{uploadProgress}% Uploaded</div>
                            </motion.div>

                            {/* Conversion Steps */}
                            <div className="space-y-3">
                              {[
                                { label: 'Processing raw data', icon: FileText },
                                { label: 'Enriching profiles', icon: Target },
                                { label: 'Validating emails', icon: CheckCircle },
                                { label: 'Ready to export', icon: CheckCircle },
                              ].map((step, i) => {
                                const Icon = step.icon;
                                const isActive = i <= conversionStep;
                                const isComplete = i < conversionStep;
                                
                                return (
                                  <motion.div
                                    key={step.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + i * 0.2 }}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                                      isActive 
                                        ? 'border-[#00D9FF]/50 bg-[#00D9FF]/10' 
                                        : 'border-[#00D9FF]/10 bg-transparent'
                                    }`}
                                  >
                                    <motion.div
                                      animate={isActive ? {
                                        scale: [1, 1.2, 1],
                                      } : {}}
                                      transition={{ duration: 1, repeat: isComplete ? 0 : Infinity }}
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                        isComplete 
                                          ? 'bg-gradient-to-br from-[#00D9FF] to-[#0099CC]' 
                                          : isActive
                                          ? 'bg-[#00D9FF]/30'
                                          : 'bg-[#0F1E33]'
                                      }`}
                                    >
                                      <Icon className={`size-4 ${isActive ? 'text-white' : 'text-white/40'}`} />
                                    </motion.div>
                                    <div className="flex-1">
                                      <div className={`text-sm ${isActive ? 'text-white' : 'text-white/40'}`}>
                                        {step.label}
                                      </div>
                                    </div>
                                    {isComplete && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-[#00D9FF]"
                                      >
                                        <CheckCircle className="size-4" />
                                      </motion.div>
                                    )}
                                  </motion.div>
                                );
                              })}
                            </div>

                            {/* Animated Cursor - only show when upload < 100% */}
                            {uploadProgress < 100 && (
                              <motion.div
                                animate={{
                                  left: `${cursorPosition.x}%`,
                                  top: `${cursorPosition.y}%`,
                                }}
                                transition={{ duration: 2, ease: 'easeInOut' }}
                                className="absolute pointer-events-none"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="white"
                                  className="drop-shadow-lg"
                                >
                                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                                </svg>
                                {/* Click ripple effect */}
                                <motion.div
                                  animate={{
                                    scale: [0, 2],
                                    opacity: [0.8, 0],
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                  }}
                                  className="absolute top-0 left-0 w-4 h-4 rounded-full border-2 border-[#00D9FF]"
                                />
                              </motion.div>
                            )}
                          </motion.div>
                        </motion.div>
                      ) : currentSlide === 1 ? (
                        // Slide 2: Analytics Dashboard
                        <motion.div
                          key="slide2"
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative bg-[#0F1E33] rounded-2xl border-2 border-[#00D9FF]/30 p-6 shadow-2xl shadow-[#00D9FF]/20"
                          >
                            {/* Dashboard Header */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                              </div>
                              <div className="text-xs text-[#00D9FF]">Analytics</div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              {[
                                { label: 'Total Leads', value: leadsCount, icon: Users, color: 'from-[#00D9FF] to-[#0099CC]' },
                                { label: 'Conversion', value: '34%', icon: TrendingUp, color: 'from-[#00D9FF] to-[#0099CC]' },
                                { label: 'Enriched', value: '98%', icon: Target, color: 'from-[#00D9FF] to-[#0099CC]' },
                                { label: 'Revenue', value: '$42K', icon: BarChart3, color: 'from-[#00D9FF] to-[#0099CC]' },
                              ].map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                  <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="bg-[#0A1628] rounded-xl p-3 border border-[#00D9FF]/20"
                                  >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                                      <Icon className="size-4 text-white" />
                                    </div>
                                    <div className="text-xl text-white mb-1">
                                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                                    </div>
                                    <div className="text-xs text-white/60">{stat.label}</div>
                                  </motion.div>
                                );
                              })}
                            </div>

                            {/* Chart Visualization */}
                            <div className="bg-[#0A1628] rounded-xl p-4 border border-[#00D9FF]/20">
                              <div className="text-sm text-white mb-4">Lead Quality Score</div>
                              <div className="flex items-end justify-between gap-2 h-20">
                                {[45, 30, 55, 38, 62, 48, 58].map((height, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                                    className="flex-1 bg-gradient-to-t from-[#00D9FF] to-[#0099CC] rounded-t-lg relative group"
                                  >
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 1.3 + i * 0.1 }}
                                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      {height}%
                                    </motion.div>
                                  </motion.div>
                                ))}
                              </div>
                              <div className="flex justify-between mt-3">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                  <div key={day} className="text-xs text-white/60">{day}</div>
                                ))}
                              </div>
                            </div>

                            {/* Live Activity Indicator */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.5 }}
                              className="mt-4 flex items-center gap-2 text-xs text-white/60"
                            >
                              <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 rounded-full bg-[#00D9FF]"
                              />
                              Live updates enabled
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      ) : (
                        // Slide 3: Text Content
                        <motion.div
                          key="slide3"
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5 }}
                          className="flex items-center justify-center min-h-[400px]"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="relative z-10 text-center px-8"
                          >
                            <h3 className="text-3xl sm:text-4xl text-white mb-6">
                              Transform Data Into
                              <span className="block bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] bg-clip-text text-transparent mt-2">
                                Revenue
                              </span>
                            </h3>
                            <p className="text-white/70 text-base sm:text-lg max-w-lg mx-auto mb-12">
                              Join dozens of businesses using AI-powered intelligence to discover high-value leads and automate personalized outreach.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-12">
                              {[
                                { label: 'Leads', value: '50K+' },
                                { label: 'Accuracy', value: '98%' },
                                { label: 'Users', value: '7K+' },
                              ].map((stat, i) => (
                                <motion.div
                                  key={stat.label}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.6 + i * 0.15 }}
                                  className="text-center"
                                >
                                  <div className="text-3xl sm:text-4xl text-[#00D9FF] mb-2">{stat.value}</div>
                                  <div className="text-sm text-white/60">{stat.label}</div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}