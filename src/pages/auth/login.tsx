import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, GraduationCap, ShieldCheck, UserCheck, Info } from 'lucide-react';
import { CyberBackground } from '../../components/auth/CyberBackground';
import { ProjectDisclaimerModal } from '../../components/common/ProjectDisclaimerModal';
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
  initialRole?: 'student' | 'adviser' | 'facilitator';
  onLoginSuccess?: (role: 'student' | 'adviser' | 'facilitator') => void;
  onNavigateToSignup?: () => void;
}

export function Login({ initialRole = 'student', onLoginSuccess, onNavigateToSignup }: LoginProps = {}) {
  const [role, setRole] = useState<'student' | 'adviser' | 'facilitator'>(initialRole);
  const [email, setEmail] = useState('student@wmsu.edu.ph');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Background Slideshow timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleRoleSelect = (newRole: 'student' | 'adviser' | 'facilitator') => {
    setRole(newRole);
    if (newRole === 'adviser') {
      setEmail('adviser@wmsu.edu.ph');
    } else if (newRole === 'facilitator') {
      setEmail('facilitator@wmsu.edu.ph');
    } else {
      setEmail('student@wmsu.edu.ph');
    }
    setPassword('••••••••••••');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const roleName = role === 'adviser' ? 'Class Adviser' : role === 'facilitator' ? 'Event Facilitator' : 'Student';
      setStatusMessage({
        type: 'success',
        text: `Logged in successfully as ${roleName}!`,
      });

      if (onLoginSuccess) {
        setTimeout(() => onLoginSuccess(role), 400);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 min-h-[100dvh] w-screen overflow-hidden flex items-center justify-center p-3 sm:p-6 font-sans select-none">
      
      {/* 1. FULL SCREEN BACKGROUND SLIDESHOW */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {backgroundSlides.map((slideImg, index) => (
          <img
            key={index}
            src={slideImg}
            alt="Palaro Campus Background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out scale-105 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* TRANSLUCENT GREEN OVERLAY */}
        <div className="absolute inset-0 bg-[#274627]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1b341b]/85 via-[#355935]/70 to-[#5d8c55]/60" />
        <div className="absolute inset-0 bg-black/20" />

        {/* PURE GRID LAYOUT OVERLAY */}
        <CyberBackground />
      </div>

      {/* 4. LOGIN CARD - PALARO 2026 EDITION */}
      <div className="relative z-20 w-full max-w-[390px] sm:max-w-[420px] max-h-[calc(100dvh-1.5rem)] overflow-y-auto overflow-x-hidden rounded-3xl bg-white/95 backdrop-blur-md border border-white/50 p-5 sm:p-7 shadow-2xl shadow-black/40 card-scrollbar">
        
        {/* Camera Viewfinder Layer */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-0">
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#5d8c55]/15 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#355935]/10 rounded-full blur-2xl" />
          <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-[#5d8c55]/45 rounded-tl-sm" />
          <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-[#5d8c55]/45 rounded-tr-sm" />
          <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-[#5d8c55]/45 rounded-bl-sm" />
          <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-[#5d8c55]/45 rounded-br-sm" />
        </div>

        {/* Header with Palaro Badge & Logo */}
        <div className="relative z-10 text-center mb-3 sm:mb-4">
          <div className="inline-block mb-1.5 select-none">
            <img
              src={ccsLogo}
              alt="College of Computing Studies Seal"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto drop-shadow-sm"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-display text-[#1f381f] tracking-tight leading-none mb-0.5">
            NodeShots
          </h1>
          <p className="text-[11px] font-bold text-[#355935]">
            "Got proof? Send NodeShots."
          </p>
          <p className="text-[10px] text-stone-500 font-mono mt-0.5">
            WMSU College of Computing Studies Palaro Attendance
          </p>
        </div>

        {/* ROLE SELECTION TOGGLE (Student vs Adviser vs Facilitator) */}
        <div className="relative z-10 mb-4">
          <p className="text-[10px] font-mono uppercase text-stone-500 font-semibold mb-1 text-center">
            Select User Role to Log In
          </p>
          <div className="bg-[#edf5ec] border border-[#c5d8c3] rounded-2xl p-1 grid grid-cols-3 gap-1 shadow-inner">
            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className={`py-2 px-1 rounded-xl font-mono text-[10px] font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 ${
                role === 'student'
                  ? 'bg-[#1f381f] text-white shadow-md'
                  : 'text-stone-600 hover:text-[#1f381f]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">STUDENT</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('adviser')}
              className={`py-2 px-1 rounded-xl font-mono text-[10px] font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 ${
                role === 'adviser'
                  ? 'bg-[#355935] text-white shadow-md'
                  : 'text-stone-600 hover:text-[#1f381f]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">ADVISER</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('facilitator')}
              className={`py-2 px-1 rounded-xl font-mono text-[10px] font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 ${
                role === 'facilitator'
                  ? 'bg-[#1b4332] text-white shadow-md'
                  : 'text-stone-600 hover:text-[#1f381f]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">FACILITATOR</span>
            </button>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-3.5 p-3 rounded-xl flex items-center gap-2.5 text-xs animate-fadeIn ${
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
            <span className="font-semibold text-xs">{statusMessage.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email / ID */}
          <div>
            <label className="block text-xs font-semibold text-[#254225] mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#5d8c55]" />
                <span>
                  {role === 'adviser'
                    ? 'Faculty / Adviser Email'
                    : role === 'facilitator'
                    ? 'Facilitator Email'
                    : 'Student ID or Email'}
                </span>
              </span>
              <span className="text-[9.5px] font-mono text-[#5d8c55] font-normal uppercase">
                {role === 'adviser'
                  ? 'Adviser Portal'
                  : role === 'facilitator'
                  ? 'Facilitator Desk'
                  : 'BSCS 4-B'}
              </span>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                role === 'adviser'
                  ? 'adviser@wmsu.edu.ph'
                  : role === 'facilitator'
                  ? 'facilitator@wmsu.edu.ph'
                  : 'student@wmsu.edu.ph'
              }
              className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3.5 py-2.5 rounded-xl text-sm placeholder:text-stone-400 font-mono shadow-sm"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1 text-xs">
              <label className="font-semibold text-[#254225] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#5d8c55]" />
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Please contact the CCS Palaro Committee or IT admin to reset your credentials.')}
                className="text-[#417439] hover:text-[#254225] transition-colors text-[11px] font-semibold py-0.5 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3.5 py-2.5 pr-11 rounded-xl text-sm placeholder:text-stone-400 font-mono shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#355935] p-2 transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center text-xs text-[#355235] pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none py-0.5">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-[#355935] focus:ring-[#5d8c55]"
              />
              <span className="text-xs font-medium">Remember device</span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-1 py-3 sm:py-2.5 px-4 bg-[#355935] hover:bg-[#2b492b] active:bg-[#213921] text-white font-semibold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md shadow-[#355935]/25 transition-all duration-150 transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>
                  Logging in as {role === 'adviser' ? 'Adviser' : role === 'facilitator' ? 'Facilitator' : 'Student'}...
                </span>
              </div>
            ) : (
              <>
                <span>
                  Login as {role === 'adviser' ? 'Class Adviser' : role === 'facilitator' ? 'Event Facilitator' : 'Student'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Link to Sign Up */}
          <div className="text-center pt-1 text-xs text-[#355235]">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={onNavigateToSignup}
              className="text-[#355935] font-bold hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {/* Project Info & Disclaimer Button */}
          <div className="pt-2 text-center border-t border-stone-200/60 mt-3">
            <button
              type="button"
              onClick={() => setShowDisclaimer(true)}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#355935] hover:text-[#1f381f] transition-colors py-1 px-2.5 rounded-lg hover:bg-[#edf5ec] cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Project Concept & Disclaimer</span>
            </button>
          </div>
        </form>
      </div>

      {/* Project Disclaimer & Features Modal */}
      <ProjectDisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  );
}

export default Login;
