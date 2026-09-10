import React, { useState, useEffect } from 'react';
import { useAppInstall } from '../../hooks/useAppInstall';
import { Download, X, Share, PlusSquare, Smartphone, CheckCircle2 } from 'lucide-react';

export const InstallAppBanner: React.FC = () => {
  const { canInstall, isInstalled, isIOS, promptInstall } = useAppInstall();
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);
  const [installedToast, setInstalledToast] = useState<boolean>(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('ccs_app_install_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  if (isInstalled || isDismissed || !canInstall) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('ccs_app_install_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (isIOS) {
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
      {/* Floating Bottom App Installation Bar */}
      <aside aria-label="Install App Notice" className="fixed bottom-20 md:bottom-6 left-4 right-4 max-w-md mx-auto z-40 bg-[#1f381f] text-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#3d6e35] flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#3d6e35] flex items-center justify-center shrink-0 text-emerald-300 shadow-inner">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold tracking-tight text-emerald-100 flex items-center gap-1.5 truncate">
              Install CS Portal App
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-medium">
                Offline Ready
              </span>
            </h4>
            <p className="text-[11px] text-emerald-200/80 leading-tight truncate">
              Add to Home Screen for fast, offline access.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-[#1f381f] text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss App Installation Prompt"
            className="p-1.5 text-emerald-300/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* iOS Installation Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-4 text-stone-800 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#355935]" />
                <h3 className="font-bold text-base text-[#1f381f]">Add App to Home Screen</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              To install this application on your iPhone or iPad for offline access:
            </p>

            <ol className="space-y-2.5 text-xs text-stone-700">
              <li className="flex items-start gap-2.5 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#355935] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  1
                </span>
                <span>
                  Tap the <strong className="inline-flex items-center gap-1 text-[#1f381f]"><Share className="w-3.5 h-3.5 inline text-blue-600" /> Share button</strong> at the bottom of Safari.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#355935] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  2
                </span>
                <span>
                  Scroll down and select <strong className="inline-flex items-center gap-1 text-[#1f381f]"><PlusSquare className="w-3.5 h-3.5 inline text-stone-800" /> Add to Home Screen</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#355935] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  3
                </span>
                <span>
                  Tap <strong>Add</strong> in the top right corner to complete app setup.
                </span>
              </li>
            </ol>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2 bg-[#1f381f] text-white rounded-xl font-semibold text-xs hover:bg-[#355935] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Success Notification Toast */}
      {installedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 text-emerald-100 px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 border border-emerald-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>App successfully installed! You can now access it offline anytime.</span>
        </div>
      )}
    </>
  );
};
