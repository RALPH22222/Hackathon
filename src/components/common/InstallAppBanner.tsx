import React, { useState, useEffect } from 'react';
import { useAppInstall } from '../../hooks/useAppInstall';
import { Download, X, Share, PlusSquare, Smartphone, CheckCircle2} from 'lucide-react';

const RE_SHOW_INTERVAL_MS = 120000; // 2 minute re-display interval if not installed

export const InstallAppBanner: React.FC = () => {
  const { canInstall, isInstalled, isIOS, promptInstall } = useAppInstall();
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);
  const [installedToast, setInstalledToast] = useState<boolean>(false);

  // Effect to check dismissal timestamp and re-show every 1 minute
  useEffect(() => {
    if (isInstalled) return;

    const checkDismissal = () => {
      const dismissedTimeStr = localStorage.getItem('ccs_app_install_dismissed_time');
      if (dismissedTimeStr) {
        const dismissedTime = parseInt(dismissedTimeStr, 10);
        const elapsed = Date.now() - dismissedTime;
        if (elapsed < RE_SHOW_INTERVAL_MS) {
          setIsDismissed(true);
        } else {
          setIsDismissed(false);
          localStorage.removeItem('ccs_app_install_dismissed_time');
        }
      } else {
        setIsDismissed(false);
      }
    };

    checkDismissal();
    const intervalId = setInterval(checkDismissal, 5000);

    return () => clearInterval(intervalId);
  }, [isInstalled]);

  if (isInstalled || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('ccs_app_install_dismissed_time', Date.now().toString());
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
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#254625] flex items-center justify-center shrink-0 text-emerald-300 border border-emerald-500/30 shadow-inner mt-0.5 sm:mt-0">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
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
              title="Dismiss for 1 minute"
              className="p-1.5 text-emerald-200/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Installation Instructions Modal (iOS & Fallback) */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 max-w-sm w-full space-y-4 text-stone-800 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#254625]" />
                <h3 className="font-bold text-sm sm:text-base text-[#122412]">Add App to Home Screen</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              To install <strong>CS Portal App</strong> on your device for offline access:
            </p>

            <ol className="space-y-2.5 text-xs text-stone-700">
              <li className="flex items-start gap-2.5 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#254625] text-white flex items-center justify-center font-bold text-[10.5px] shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Tap browser menu or <strong className="inline-flex items-center gap-1 text-[#122412]"><Share className="w-3.5 h-3.5 inline text-blue-600" /> Share button</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#254625] text-white flex items-center justify-center font-bold text-[10.5px] shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Select <strong className="inline-flex items-center gap-1 text-[#122412]"><PlusSquare className="w-3.5 h-3.5 inline text-stone-800" /> Add to Home Screen</strong> or <strong>Install App</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#254625] text-white flex items-center justify-center font-bold text-[10.5px] shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Confirm to add the app icon to your Home Screen.
                </span>
              </li>
            </ol>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 bg-[#122412] text-white rounded-xl font-semibold text-xs hover:bg-[#254625] transition-colors cursor-pointer"
            >
              Got it
            </button>
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

