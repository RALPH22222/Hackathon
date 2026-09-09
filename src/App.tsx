import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, UserCheck } from 'lucide-react';
import { CcsLogo } from './components/CcsLogo';
import { CyberBackground } from './components/CyberBackground';

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!email.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your student ID or institutional email.' });
      return;
    }

    if (!password) {
      setStatusMessage({ type: 'error', text: 'Please enter your password.' });
      return;
    }

    setIsLoading(true);

    // Simulate attendance recording & verification
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: 'success',
        text: 'Attendance recorded successfully! Authenticating session token...',
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden flex items-center justify-center p-3 sm:p-6 text-slate-100 selection:bg-emerald-500 selection:text-black font-sans">
      {/* Computer Science Circuit & Matrix Canvas Background */}
      <CyberBackground />

      {/* Login Card with internal scrolling if screen height is constrained */}
      <div className="relative z-10 w-full max-w-[440px] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] overflow-y-auto overflow-x-hidden rounded-2xl sm:rounded-3xl glass-panel border border-emerald-500/30 p-5 sm:p-7 shadow-[0_0_40px_rgba(16,185,129,0.14)]">
        
        {/* Emblem & Department Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-block relative mb-2.5 group">
            <CcsLogo size={106} glow={true} animated={true} />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 shadow-lg pointer-events-none">
              01100011 01100011 01110011 = &quot;ccs&quot;
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono mb-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CCS Attendance Portal</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide">
              College of Computing Studies
            </h1>
            <p className="text-[11px] sm:text-xs text-emerald-400 font-mono tracking-wider uppercase font-semibold">
              ACT • IT • CS Attendance
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">
              Western Mindanao State University
            </p>
          </div>
        </div>

        {/* Status Message Alert */}
        {statusMessage && (
          <div
            className={`mb-4 p-3 rounded-xl flex items-center gap-2.5 text-xs animate-fadeIn ${
              statusMessage.type === 'error'
                ? 'bg-rose-950/60 border border-rose-500/50 text-rose-200'
                : 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-200'
            }`}
          >
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Attendance Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          {/* Email / Student ID Field */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Institutional Email / Student ID</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@wmsu.edu.ph"
                className="w-full glass-input px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 font-mono"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Please contact the CCS IT Department to reset your attendance portal password.')}
                className="text-emerald-400 hover:text-emerald-300 transition-colors hover:underline text-[11px]"
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
                className="w-full glass-input px-3.5 py-2 sm:py-2.5 pr-10 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs text-slate-300 pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-black/60 border-emerald-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 focus:ring-1"
              />
              <span className="text-[11px] sm:text-xs">Remember this device</span>
            </label>
          </div>

          {/* Solid Theme Button (No Gradient) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 sm:py-3 px-5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 border border-emerald-400/30 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/70 hover:shadow-emerald-900/40 transition-all duration-200 transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="font-mono text-xs sm:text-sm">Recording Attendance...</span>
              </div>
            ) : (
              <>
                <span className="text-xs sm:text-sm tracking-wide font-medium">
                  Record Attendance & Sign In
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Security Badge */}
        <div className="mt-5 pt-3.5 border-t border-emerald-900/30 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure Attendance Gateway</span>
          </div>
          <span>WMSU • 2016</span>
        </div>

        {/* Bottom Copyright */}
        <p className="text-center text-[10px] text-slate-500 font-mono mt-3">
          © {new Date().getFullYear()} WMSU College of Computing Studies.
        </p>
      </div>
    </div>
  );
}

export default App;
