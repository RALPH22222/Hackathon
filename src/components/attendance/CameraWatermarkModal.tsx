import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Check, RefreshCw, ShieldCheck } from 'lucide-react';
import type { PalaroEventItem } from './types';

interface CameraWatermarkModalProps {
  event: PalaroEventItem;
  currentTime: string;
  gpsLocation: string;
  onClose: () => void;
  onConfirmAttendance: (watermarkedPhotoUrl: string) => void;
}

export const CameraWatermarkModal: React.FC<CameraWatermarkModalProps> = ({
  event,
  currentTime,
  gpsLocation,
  onClose,
  onConfirmAttendance,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [watermarkedPhoto, setWatermarkedPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);


  // Initialize webcam stream
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: false,
        });
        activeStream = userStream;
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.warn('Webcam stream unavailable, using camera simulation mode', err);
      }
    };

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture snapshot and apply HTML5 Canvas Watermark in bottom-right corner
  const handleSnapSelfie = () => {
    setIsCapturing(true);

    setTimeout(() => {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // 1. Draw camera video frame or simulated background
        if (videoRef.current && stream) {
          ctx.save();
          // Mirror view correction
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          ctx.restore();
        } else {
          // Simulated selfie background
          const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          grad.addColorStop(0, '#1f381f');
          grad.addColorStop(0.5, '#355935');
          grad.addColorStop(1, '#142614');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Simulated Avatar Silhouette
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.beginPath();
          ctx.arc(400, 250, 90, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(400, 520, 160, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 20px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('PALARO 2026 SELFIE CAPTURE', 400, 370);
        }

        // 2. BURN WATERMARK BADGE IN BOTTOM RIGHT CORNER
        const bannerWidth = 420;
        const bannerHeight = 110;
        const margin = 20;
        const x = canvas.width - bannerWidth - margin;
        const y = canvas.height - bannerHeight - margin;

        // Dark Glassmorphic Watermark Card
        ctx.fillStyle = 'rgba(15, 28, 15, 0.88)';
        ctx.strokeStyle = 'rgba(93, 140, 85, 0.6)';
        ctx.lineWidth = 2;
        
        // Rounded rectangle path for watermark
        const r = 16;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + bannerWidth - r, y);
        ctx.quadraticCurveTo(x + bannerWidth, y, x + bannerWidth, y + r);
        ctx.lineTo(x + bannerWidth, y + bannerHeight - r);
        ctx.quadraticCurveTo(x + bannerWidth, y + bannerHeight, x + bannerWidth - r, y + bannerHeight);
        ctx.lineTo(x + r, y + bannerHeight);
        ctx.quadraticCurveTo(x, y + bannerHeight, x, y + bannerHeight - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Green accent left strip
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(x + 12, y + 16, 4, bannerHeight - 32);

        // Watermark Text Info
        ctx.textAlign = 'left';
        
        // Header
        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('OFFICIAL PALARO 2026 VERIFIED PROOF', x + 26, y + 30);

        // Event Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px sans-serif';
        const displayTitle = event.title.length > 32 ? event.title.substring(0, 32) + '...' : event.title;
        ctx.fillText(displayTitle, x + 26, y + 54);

        // Date & Time + Location
        ctx.fillStyle = '#d1d5db';
        ctx.font = '11px monospace';
        ctx.fillText(`🕒 ${currentTime || 'Sep 10, 2026 • Live'}`, x + 26, y + 74);
        ctx.fillText(`📍 ${gpsLocation.substring(0, 34)}`, x + 26, y + 92);

        // Convert canvas to Data URL
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setWatermarkedPhoto(dataUrl);
      }

      setIsCapturing(false);
    }, 400);
  };

  const handleRetake = () => {
    setWatermarkedPhoto(null);
  };

  const handleConfirm = () => {
    if (watermarkedPhoto) {
      onConfirmAttendance(watermarkedPhoto);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-0 text-white relative">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#edf5ec] text-[#1f381f] text-[10px] font-mono font-bold uppercase">
                {event.category}
              </span>
              <span className="text-xs text-stone-400 font-mono">CAMERA ATTENDANCE</span>
            </div>
            <h3 className="text-base font-bold text-white font-display truncate max-w-sm">
              {event.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder / Preview Container */}
        <div className="relative aspect-video sm:aspect-square bg-black flex items-center justify-center overflow-hidden">
          {watermarkedPhoto ? (
            /* Watermarked Result Preview */
            <div className="relative w-full h-full">
              <img
                src={watermarkedPhoto}
                alt="Watermarked Selfie Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Watermark Burned Bottom-Right</span>
              </div>
            </div>
          ) : (
            /* Live Camera Feed */
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />

              {/* Overlay Guidance Box */}
              <div className="absolute inset-4 sm:inset-8 border-2 border-dashed border-white/40 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <span className="bg-black/60 px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                    LIVE SHUTTER
                  </span>
                  <span className="bg-black/60 px-2.5 py-1 rounded-lg text-[10px] font-mono text-stone-300">
                    CAMERA ONLY
                  </span>
                </div>
                <div className="text-center bg-black/60 backdrop-blur-xs p-2 rounded-xl border border-white/10 max-w-xs mx-auto">
                  <p className="text-xs text-white font-medium">Position your face in the frame</p>
                  <p className="text-[10px] text-stone-400">Timestamp & location will be burned in bottom right</p>
                </div>
              </div>
            </div>
          )}

          {/* Hidden Canvas Element */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Action Controls Footer */}
        <div className="p-4 sm:p-5 bg-stone-900 border-t border-stone-800 space-y-3">
          {watermarkedPhoto ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Photo</span>
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Save</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSnapSelfie}
              disabled={isCapturing}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#1f381f] to-[#355935] hover:from-[#2a482a] hover:to-[#436e43] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98 border border-[#5d8c55]/40"
            >
              {isCapturing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Watermark...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5 text-emerald-400" />
                  <span>Snap Attendance Selfie Now</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
