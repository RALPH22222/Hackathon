import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, Trophy, User, GraduationCap, Calendar, Users, ShieldCheck } from 'lucide-react';
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

interface SignUpProps {
  onNavigateToLogin?: () => void;
}

export function SignUp({ onNavigateToLogin }: SignUpProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    suffix: '',
    sex: '',
    wmsuEmail: '',
    course: 'BSCS',
    yearLevel: '1st Year',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'course') {
      const isAct = value.startsWith('ACT');
      setFormData((prev) => ({
        ...prev,
        course: value,
        yearLevel: isAct && (prev.yearLevel === '3rd Year' || prev.yearLevel === '4th Year') ? '1st Year' : prev.yearLevel,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setStatusMessage(null);
  };

  const handleNextStep = () => {
    setStatusMessage(null);
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setStatusMessage(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (step < 3) {
      handleNextStep();
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: 'success',
        text: 'Account registered successfully! Redirecting to login...',
      });
      setTimeout(() => {
        if (onNavigateToLogin) {
          onNavigateToLogin();
        }
      }, 1500);
    }, 1000);
  };

  const stepsInfo = [
    { num: 1, title: 'Personal' },
    { num: 2, title: 'Academic' },
    { num: 3, title: 'Security' },
  ];

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

        {/* 2. TRANSLUCENT GREEN OVERLAY */}
        <div className="absolute inset-0 bg-[#274627]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1b341b]/85 via-[#355935]/70 to-[#5d8c55]/60" />
        <div className="absolute inset-0 bg-black/20" />

        {/* 3. PURE GRID LAYOUT OVERLAY */}
        <CyberBackground />
      </div>

      {/* 4. SIGN UP STEPPER CARD - MOBILE OPTIMIZED */}
      <div className="relative z-20 w-full max-w-[390px] sm:max-w-[420px] max-h-[calc(100dvh-1.5rem)] overflow-y-auto overflow-x-hidden rounded-3xl bg-white/95 backdrop-blur-md border border-white/50 p-5 sm:p-7 shadow-2xl shadow-black/40 card-scrollbar">
        
        {/* Camera Viewfinder / Scanner Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-0">
          {/* Ambient luminous glow pools */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#5d8c55]/15 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#355935]/10 rounded-full blur-2xl" />

          {/* Camera Viewfinder Focus Corners */}
          <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-[#5d8c55]/45 rounded-tl-sm" />
          <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-[#5d8c55]/45 rounded-tr-sm" />
          <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-[#5d8c55]/45 rounded-bl-sm" />
          <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-[#5d8c55]/45 rounded-br-sm" />

          {/* Camera Viewfinder Edge Center Ticks */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#5d8c55]/30 rounded-full" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#5d8c55]/30 rounded-full" />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-0.5 bg-[#5d8c55]/30 rounded-full" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-0.5 bg-[#5d8c55]/30 rounded-full" />

          {/* Subtle Clean Tech Grid Texture */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] text-[#274627]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="clean-card-pattern-signup" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <path d="M 0 24 L 24 0 M 0 0 L 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#clean-card-pattern-signup)" />
          </svg>
        </div>

        {/* Header with Palaro Badge & Logo */}
        <div className="relative z-10 text-center mb-3">
          <div className="inline-block mb-1.5 select-none">
            <img
              src={ccsLogo}
              alt="College of Computing Studies Seal"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto drop-shadow-sm"
            />
          </div>

          {/* Palaro Badge */}
          <div className="flex justify-center mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#355935]/10 text-[#254625] text-[10.5px] font-mono font-bold tracking-wider border border-[#5d8c55]/30">
              <Trophy className="w-3 h-3 text-[#5d8c55]" />
              <span>PALARO ATTENDANCE REGISTRATION</span>
            </span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold font-display text-[#1f381f] tracking-tight leading-tight">
            College of Computing Studies
          </h1>
        </div>

        {/* Stepper Progress Bar */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center justify-between relative px-2 mb-1.5">
            {/* Background line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 z-0" />
            <div
              className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#355935] transition-all duration-300 z-0"
              style={{ width: `${((step - 1) / 2) * 85}%` }}
            />

            {stepsInfo.map((s) => (
              <div
                key={s.num}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                    step >= s.num
                      ? 'bg-[#355935] text-white shadow-sm'
                      : 'bg-white border-2 border-stone-300 text-stone-400'
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`text-[10px] font-semibold mt-1 transition-colors ${
                    step >= s.num ? 'text-[#254625]' : 'text-stone-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-3 p-2.5 rounded-xl flex items-center gap-2 text-xs animate-fadeIn ${
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
        <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-3">
          
          {/* STEP 1: PERSONAL INFORMATION */}
          {step === 1 && (
            <div className="space-y-2.5 animate-fadeIn">
              {/* First Name & Middle Initial */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[#254225] mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#5d8c55]" />
                    <span>First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Juan"
                    className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3 py-2 rounded-xl text-xs placeholder:text-stone-400 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#254225] mb-1">
                    <span>M.I. <span className="text-[10px] font-normal text-stone-400">(optional)</span></span>
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    name="middleInitial"
                    value={formData.middleInitial}
                    onChange={handleChange}
                    placeholder="A."
                    className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-2.5 py-2 rounded-xl text-xs text-center uppercase placeholder:text-stone-400 shadow-sm"
                  />
                </div>
              </div>

              {/* Last Name & Suffix */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[#254225] mb-1">
                    <span>Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Dela Cruz"
                    className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3 py-2 rounded-xl text-xs placeholder:text-stone-400 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#254225] mb-1">
                    <span>Suffix <span className="text-[10px] font-normal text-stone-400">(optional)</span></span>
                  </label>
                  <input
                    type="text"
                    name="suffix"
                    value={formData.suffix}
                    onChange={handleChange}
                    placeholder="Jr., III"
                    className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-2.5 py-2 rounded-xl text-xs placeholder:text-stone-400 shadow-sm"
                  />
                </div>
              </div>

              {/* Sex (Male / Female) */}
              <div>
                <label className="block text-xs font-semibold text-[#254225] mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#5d8c55]" />
                  <span>Sex</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, sex: 'Male' }))}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      formData.sex === 'Male'
                        ? 'bg-[#1e613b] text-white border-[#1e613b] shadow-sm shadow-[#1e613b]/25'
                        : 'bg-white text-stone-600 border-[#c5d8c3] hover:border-[#1e613b]/50 hover:text-[#1e613b] hover:bg-[#1e613b]/5'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, sex: 'Female' }))}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      formData.sex === 'Female'
                        ? 'bg-[#1e613b] text-white border-[#1e613b] shadow-sm shadow-[#1e613b]/25'
                        : 'bg-white text-stone-600 border-[#c5d8c3] hover:border-[#1e613b]/50 hover:text-[#1e613b] hover:bg-[#1e613b]/5'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ACADEMIC INFORMATION */}
          {step === 2 && (
            <div className="space-y-2.5 animate-fadeIn">
              {/* WMSU Email */}
              <div>
                <label className="block text-xs font-semibold text-[#254225] mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#5d8c55]" />
                  <span>WMSU Institutional Email</span>
                </label>
                <input
                  type="email"
                  name="wmsuEmail"
                  value={formData.wmsuEmail}
                  onChange={handleChange}
                  placeholder="name@wmsu.edu.ph"
                  className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3 py-2 rounded-xl text-xs placeholder:text-stone-400 font-mono shadow-sm"
                />
              </div>

              {/* Course in CCS */}
              <div>
                <label className="block text-xs font-semibold text-[#254225] mb-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#5d8c55]" />
                  <span>Course in CCS</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3 py-2 rounded-xl text-xs shadow-sm cursor-pointer"
                >
                  <option value="BSCS">BS Computer Science (BSCS)</option>
                  <option value="BSIT">BS Information Technology (BSIT)</option>
                  <option value="ACT - Networking">ACT - Networking</option>
                  <option value="ACT - Application Development">ACT - Application Development</option>
                </select>
              </div>

              {/* Year Level */}
              <div>
                <label className="block text-xs font-semibold text-[#254225] mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#5d8c55]" />
                  <span>Year Level</span>
                </label>
                <select
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3 py-2 rounded-xl text-xs shadow-sm cursor-pointer"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  {!formData.course.startsWith('ACT') && (
                    <>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: SECURITY / PASSWORD */}
          {step === 3 && (
            <div className="space-y-2.5 animate-fadeIn">
              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-[#254225] mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#5d8c55]" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3 py-2 pr-10 rounded-xl text-xs placeholder:text-stone-400 font-mono shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#355935] p-1.5 transition-colors cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-[#254225] mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5d8c55]" />
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className="w-full bg-white border border-[#c5d8c3] focus:border-[#355935] text-[#1a2f1a] focus:ring-2 focus:ring-[#5d8c55]/20 outline-none transition-all px-3 py-2 pr-10 rounded-xl text-xs placeholder:text-stone-400 font-mono shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#355935] p-1.5 transition-colors cursor-pointer"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Review summary preview */}
              <div className="p-2.5 rounded-xl bg-[#355935]/5 border border-[#355935]/15 text-[11px] text-[#254625] space-y-1">
                <div className="font-semibold flex items-center justify-between">
                  <span>{formData.firstName} {formData.middleInitial ? `${formData.middleInitial}. ` : ''}{formData.lastName} {formData.suffix}</span>
                  <span className="font-mono text-[#5d8c55] font-bold">{formData.course}</span>
                </div>
                <div className="text-stone-500 font-mono text-[10px] truncate">
                  {formData.wmsuEmail || 'No email entered'} • {formData.yearLevel}{formData.sex ? ` • ${formData.sex}` : ''}
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center gap-2 pt-1.5">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-2.5 px-3 rounded-2xl border border-[#355935]/30 text-[#355935] font-semibold text-xs flex items-center justify-center gap-1 hover:bg-[#355935]/5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 py-2.5 px-4 bg-[#355935] hover:bg-[#2b492b] active:bg-[#213921] text-white font-semibold rounded-2xl flex items-center justify-center gap-2 text-xs shadow-md shadow-[#355935]/25 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2.5 px-4 bg-[#355935] hover:bg-[#2b492b] active:bg-[#213921] text-white font-semibold rounded-2xl flex items-center justify-center gap-2 text-xs shadow-md shadow-[#355935]/25 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing Up...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Link to Login */}
          <div className="text-center pt-1 text-xs text-[#355235]">
            <span>Already registered? </span>
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-[#355935] font-bold hover:underline cursor-pointer"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
