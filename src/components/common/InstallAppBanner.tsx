import React, { useState } from 'react';
import nodeshotsLogo from '../../assets/nodeshots.png';
import { useAppInstall } from '../../hooks/useAppInstall';
import { Download, X, Share, PlusSquare, Smartphone, CheckCircle2} from 'lucide-react';

export const InstallAppBanner: React.FC = () => {
  const { canInstall, isInstalled, isIOS, promptInstall } = useAppInstall();
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);
  const [installedToast, setInstalledToast] = useState<boolean>(false);

  if (isInstalled || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!canInstall) {
      // Fallback instructions if native prompt is pending
      setShowIOSModal(true);
      return;
    }

    const installed = await promptInstall();
    if (installed) {
      setInstalledToast(true);
      setTimeout(() => setInstalledToast(false), 4000);
    }
  };

  return (
    <>
      {/* Floating Bottom App Installation Bar - Highly readable on small & large screens */}
      <aside
        aria-label="Install App Notice"
        className="fixed bottom-[4.5rem] md:bottom-6 left-2 right-2 sm:left-4 sm:right-4 max-w-lg mx-auto z-40 bg-[#162d16] text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl border border-emerald-600/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <div className="flex items-center justify-between gap-2.5 sm:gap-4">
          {/* Left Icon & Text Details */}
          <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#254625] flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-inner mt-0.5 sm:mt-0 overflow-hidden">
              <img
                src={nodeshotsLogo}
                alt="NodeShots App Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center flex-wrap gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                  Install NodeShots App
                </h4>
                <span className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[9.5px] sm:text-[10px] px-1.5 py-0.2 rounded font-mono font-medium whitespace-nowrap">
                  Offline Ready
                </span>
              </div>
              <p className="text-[10.5px] sm:text-xs text-emerald-100/90 leading-snug line-clamp-2 sm:line-clamp-1">
                Got proof? Add NodeShots to Home Screen.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-[#122412] text-xs font-bold rounded-lg transition-all shadow-md cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-[#122412]" />
              <span className="whitespace-nowrap">Install</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss App Installation Prompt"
              className="p-1.5 text-emerald-200/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Installation Instructions Modal (iOS & Fallback) */}
      {showIOSModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/75"
          role="presentation"
          onClick={() => setShowIOSModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-app-title"
            className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden font-sans max-h-[88vh] flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#142614] text-white p-3.5 sm:p-4 border-b border-[#355935] flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#22c55e]">
                  <Smartphone className="w-3 h-3 shrink-0" />
                  <span>SYS.INSTALL // HOME SCREEN</span>
                </div>
                <h3 id="install-app-title" className="text-sm sm:text-base font-bold font-display uppercase tracking-wide mt-0.5 text-white">
                  Add App to Home Screen
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                aria-label="Close installation instructions"
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 flex-1 overflow-y-auto font-mono">
              <p className="text-xs text-stone-600 leading-relaxed">
                To install <strong className="text-[#142614]">NodeShots Palaro Portal</strong> on your device for offline access:
              </p>

              <ol className="space-y-2.5 text-xs text-stone-700">
                <li className="flex items-start gap-2.5 bg-[#f8faf8] p-2.5 rounded-xl border border-[#e5efe4]">
                  <span className="w-5 h-5 rounded-full bg-[#142614] text-[#22c55e] flex items-center justify-center font-bold text-[10.5px] shrink-0 mt-0.5 border border-[#355935]">
                    1
                  </span>
                  <span>
                    Tap browser menu or <strong className="inline-flex items-center gap-1 text-[#142614]"><Share className="w-3.5 h-3.5 inline text-emerald-700" /> Share button</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 bg-[#f8faf8] p-2.5 rounded-xl border border-[#e5efe4]">
                  <span className="w-5 h-5 rounded-full bg-[#142614] text-[#22c55e] flex items-center justify-center font-bold text-[10.5px] shrink-0 mt-0.5 border border-[#355935]">
                    2
                  </span>
                  <span>
                    Select <strong className="inline-flex items-center gap-1 text-[#142614]"><PlusSquare className="w-3.5 h-3.5 inline text-emerald-700" /> Add to Home Screen</strong> or <strong>Install App</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 bg-[#f8faf8] p-2.5 rounded-xl border border-[#e5efe4]">
                  <span className="w-5 h-5 rounded-full bg-[#142614] text-[#22c55e] flex items-center justify-center font-bold text-[10.5px] shrink-0 mt-0.5 border border-[#355935]">
                    3
                  </span>
                  <span>
                    Confirm and launch directly from your Home Screen anytime.
                  </span>
                </li>
              </ol>
            </div>

            {/* Action Buttons Footer */}
            <div className="flex items-center justify-end gap-2 p-3 sm:px-5 sm:py-3.5 border-t border-stone-200 bg-stone-50/50 shrink-0">
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-[#142614] text-[#22c55e] hover:bg-[#1f381f] border border-[#355935] flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer active:scale-98"
              >
                <span>GOT IT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Toast */}
      {installedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 text-emerald-100 px-4 py-2.5 rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 border border-emerald-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>App successfully installed! Access offline anytime from your Home Screen.</span>
        </div>
      )}
    </>
  );
};
