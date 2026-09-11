import { X, Smartphone, Info, Users, Camera, Radio, MapPin, ShieldCheck, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProjectDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDisclaimerModal({ isOpen, onClose }: ProjectDisclaimerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 font-sans overflow-y-auto bg-stone-900/75 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-stone-200 p-4 sm:p-6 card-scrollbar text-stone-800 my-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer z-10"
          title="Close Disclaimer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Disclaimer Alert Banner */}
        <div className="mb-3.5 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-2.5 shadow-2xs">
          <div className="p-1.5 bg-amber-500/15 rounded-lg shrink-0 text-amber-700 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <span className="font-bold text-amber-950 block">Frontend Prototype Disclaimer</span>
            <p className="text-amber-800 text-[11px] leading-snug mt-0.5">
              This app is a static frontend UI prototype built for demonstration with simulated offline data storage.
            </p>
          </div>
        </div>

        {/* Mobile Phone Tip Banner - ONLY SHOWN ON MEDIUM & LARGER SCREENS, HIDDEN ON SMALLER/MOBILE SCREENS */}
        <div className="hidden md:flex mb-3.5 p-2.5 rounded-xl bg-[#edf5ec] border border-[#5d8c55]/30 text-[#1f381f] items-center gap-2.5">
          <div className="p-1.5 bg-[#355935]/15 rounded-lg shrink-0 text-[#254625]">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="text-[11px]">
            <span className="font-bold text-[#1f381f]">Mobile View Recommended: </span>
            <span className="text-[#355935]">For the best PWA experience, consider testing in Mobile Screen View.</span>
          </div>
        </div>

        {/* Header Branding */}
        <div className="text-center pb-3 mb-3 border-b border-stone-100">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1f381f] text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Palaro PWA Concept</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display text-[#1f381f] tracking-tight">
            NODE SHOTS
          </h2>
          <p className="text-xs font-bold text-[#355935]">
            "Got proof? Send NodeShots."
          </p>

          {/* Team Credits */}
          <div className="mt-2.5 p-2 rounded-xl bg-stone-50 border border-stone-200/80 inline-block w-full">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-stone-700">
              <Users className="w-3 h-3 text-[#355935]" />
              <span>Team: <span className="text-[#1f381f]">Send Nodes</span></span>
            </div>
            <p className="text-[10.5px] text-stone-600 font-medium mt-0.5">
              Ralph Chester M. Candido • Hudhaifah A. Labang • Zain A. Turabin
            </p>
          </div>
        </div>

        {/* Compact Concept Description */}
        <div className="mb-3.5 text-xs text-stone-700 bg-stone-50/80 p-3 rounded-xl border border-stone-200/60 leading-relaxed">
          <strong>Node Shots</strong> is an offline-first PWA designed for WMSU CCS Palaro to automate attendance, mobilize match crowds, and manage event schedules across <strong>Students</strong>, <strong>Facilitators</strong>, and <strong>Advisers</strong>.
        </div>

        {/* Key Features List */}
        <div className="mb-4">
          <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider font-mono mb-2">
            Key Features
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-2">
              <Camera className="w-3.5 h-3.5 text-[#355935] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1f381f] block text-[11px]">Smart Attendance</span>
                <span className="text-[10.5px] text-stone-600">Photo mode & QR codes with GPS timestamps.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-2">
              <Radio className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1f381f] block text-[11px]">Request Backup</span>
                <span className="text-[10.5px] text-stone-600">Mobilize supporters for matches in need.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1f381f] block text-[11px]">Interactive Venues</span>
                <span className="text-[10.5px] text-stone-600">Visual map & real-time schedule updates.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1f381f] block text-[11px]">Role Workflows</span>
                <span className="text-[10.5px] text-stone-600">Portals for Student, Facilitator & Adviser.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 sm:col-span-2 flex items-start gap-2">
              <Trophy className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-950 block text-[11px]">Live Medal Tally</span>
                <span className="text-[10.5px] text-amber-900">Real-time standings for the entire CCS community.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer & Action Button */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-100">
          <div className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#355935]" />
            <span>Prototype ready</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#355935] hover:bg-[#2b492b] active:bg-[#213921] text-white font-bold text-xs rounded-xl shadow-md shadow-[#355935]/20 transition-all cursor-pointer flex items-center justify-center"
          >
            <span>Got it! Explore Prototype</span>
          </button>
        </div>

      </div>
    </div>
  );
}
