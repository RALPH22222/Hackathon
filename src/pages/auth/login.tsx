import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CyberBackground } from '../../components/auth/CyberBackground';
import ccsLogo from '../../assets/CCS.png';

// Campus & Department Slideshow Images
import img1 from '../../assets/567980503_1296620839145720_6285529420524500912_n.png';
import img2 from '../../assets/568680614_1299221382218999_2627522291761815343_n.png';
import img3 from '../../assets/569129390_1299214032219734_7626190114260015381_n.png';
import img4 from '../../assets/569270178_1299215178886286_2296681164532258347_n.png';
import img5 from '../../assets/569371806_1299221158885688_3389601969675179337_n.png';
import img6 from '../../assets/570183959_1299214072219730_8484950406059815015_n.png';
import img7 from '../../assets/570192208_1299215512219586_5884095804666635848_n.png';
import img8 from '../../assets/570590907_1299216668886137_4995968703077383714_n.png';
import img9 from '../../assets/571188908_1299214158886388_232373941161725289_n.png';
import img10 from '../../assets/571398943_1299215352219602_3843302549433566862_n.png';

const backgroundSlides = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

interface LoginProps {
  onLoginSuccess?: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background Slideshow timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!email.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your email or student ID.' });
      return;
    }

    if (!password) {
      setStatusMessage({ type: 'error', text: 'Please enter your password.' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: 'success',
        text: 'Attendance recorded successfully.',
      });

      if (onLoginSuccess) {
        setTimeout(onLoginSuccess, 600);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden flex items-center justify-center p-4 sm:p-6 font-sans select-none">

      {/* 1. FULL SCREEN BACKGROUND SLIDESHOW (Behind everything) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {backgroundSlides.map((slideImg, index) => (
          <img
            key={index}
            src={slideImg}
            alt="Campus Background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out scale-105 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* 2. TRANSLUCENT GREEN OVERLAY */}
        <div className="absolute inset-0 bg-[#274627]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1b341b]/85 via-[#355935]/70 to-[#5d8c55]/60" />
        <div className="absolute inset-0 bg-black/20" />

        {/* 3. PURE GRID LAYOUT OVERLAY */}
        <CyberBackground />
      </div>

      {/* 4. LOGIN CARD */}
      <div className="relative z-20 w-full max-w-[390px] max-h-[calc(100dvh-2rem)] overflow-y-auto overflow-x-hidden rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 p-6 sm:p-8 shadow-2xl shadow-black/40">

        {/* Header with Logo */}
        <div className="text-center mb-6">
          <div className="inline-block mb-3 select-none">
            <img
              src={ccsLogo}
              alt="College of Computing Studies Seal"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain mx-auto drop-shadow-sm"
            />
          </div>

          <h1 className="text-lg sm:text-xl font-bold font-display text-[#1f381f] tracking-tight">
            College of Computing Studies
          </h1>
          <p className="text-xs text-[#3d6e35] font-semibold mt-0.5">
            Offline First Attendance Portal
          </p>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-4 p-3 rounded-xl flex items-center gap-2.5 text-xs animate-fadeIn ${
              statusMessage.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-[#edf5ec] border border-[#5d8c55]/40 text-[#254625]'
            }`}
          >
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#5d8c55] shrink-0" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Student ID */}
          <div>
            <label className="block text-xs font-semibold text-[#254225] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#5d8c55]" />
              <span>Email or Student ID</span>
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@wmsu.edu.ph"
              className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3.5 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-stone-400 font-mono shadow-sm"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <label className="font-semibold text-[#254225] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#5d8c55]" />
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Please contact the CCS IT coordinator to reset your attendance credentials.')}
                className="text-[#417439] hover:text-[#254225] transition-colors text-[11px] font-semibold cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3.5 py-2.5 pr-10 rounded-xl text-xs sm:text-sm placeholder:text-stone-400 font-mono shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#355935] p-1 transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs text-[#355235] pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-[#355935] focus:ring-[#5d8c55]"
              />
              <span className="text-xs font-medium">Remember this device</span>
            </label>

            {/* Slide Indicator dots */}
            <div className="flex items-center gap-1">
              {backgroundSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentSlide(dotIdx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                    dotIdx === currentSlide ? 'bg-[#355935] w-3' : 'bg-[#355935]/25 hover:bg-[#355935]/50'
                  }`}
                  title={`Photo ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Solid Green Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 px-4 bg-[#355935] hover:bg-[#2b492b] active:bg-[#213921] text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md shadow-[#355935]/20 transition-all duration-200 transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing In...</span>
              </div>
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
