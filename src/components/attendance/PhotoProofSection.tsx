import React, { useState } from 'react';
import { Clock, MapPin, Upload, RefreshCw, Check } from 'lucide-react';

interface PhotoProofSectionProps {
  currentTime: string;
  gpsLocation: string;
  onSubmitPhoto: (event: string, venue: string, imageUrl: string) => void;
}

export const PhotoProofSection: React.FC<PhotoProofSectionProps> = ({
  currentTime,
  gpsLocation,
  onSubmitPhoto,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<string>('Palaro 2026 Opening & Athletics');
  const [selectedVenue, setSelectedVenue] = useState<string>('CCS Main Oval - Track & Field');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImage) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitPhoto(selectedEvent, selectedVenue, uploadedImage);
      setIsSubmitting(false);
      setUploadedImage(null);
    }, 1000);
  };

  return (
    <div className="minimal-card rounded-3xl p-6 sm:p-8 bg-white border border-[#c5d8c3]/60 space-y-6">
      <div className="space-y-1">
        <h3 className="font-bold text-[#1f381f] text-lg">Upload Event Attendance Photo Proof</h3>
        <p className="text-xs text-stone-500">
          Take or select a clear photo of yourself at the Palaro venue with the event backdrop or marshals visible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Auto Metadata Preview Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#edf5ec]/60 border border-[#c5d8c3]/60 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#355935] shrink-0" />
            <div>
              <span className="text-stone-500 block text-[10px]">Captured Timestamp</span>
              <span className="font-mono font-bold text-[#1f381f]">{currentTime || 'Loading...'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#355935] shrink-0" />
            <div>
              <span className="text-stone-500 block text-[10px]">Detected Geolocation</span>
              <span className="font-semibold text-[#1f381f] truncate block">{gpsLocation}</span>
            </div>
          </div>
        </div>

        {/* Event & Venue Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Select Palaro Event
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full minimal-input px-3.5 py-2.5 rounded-xl text-xs font-semibold"
            >
              <option value="Palaro 2026 Opening & Athletics">Palaro 2026 Opening & Athletics</option>
              <option value="Venom Men's Basketball vs Titans">Venom Men's Basketball vs Titans</option>
              <option value="Women's Volleyball Semi-Finals">Women's Volleyball Semi-Finals</option>
              <option value="CCS Esports Tournament - Valorant">CCS Esports Tournament - Valorant</option>
              <option value="Swimming & Aquatics Championship">Swimming & Aquatics Championship</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Venue / Location Tag
            </label>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full minimal-input px-3.5 py-2.5 rounded-xl text-xs font-semibold"
            >
              <option value="CCS Main Oval - Track & Field">CCS Main Oval - Track & Field</option>
              <option value="University Gymnasium">University Gymnasium</option>
              <option value="CCS Computer Laboratory 3">CCS Computer Laboratory 3</option>
              <option value="Aquatics Center Pool">Aquatics Center Pool</option>
              <option value="Student Activity Pavilion">Student Activity Pavilion</option>
            </select>
          </div>
        </div>

        {/* Drag & Drop Photo Area */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5">
            Event Selfie / Venue Photo
          </label>

          {uploadedImage ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#355935] aspect-video max-w-md mx-auto group">
              <img
                src={uploadedImage}
                alt="Attendance Proof Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setUploadedImage(null)}
                  className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer hover:bg-rose-700"
                >
                  Remove & Retake
                </button>
              </div>
            </div>
          ) : (
            <label className="border-2 border-dashed border-[#c5d8c3] hover:border-[#355935] bg-[#edf5ec]/20 hover:bg-[#edf5ec]/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all">
              <div className="p-3 bg-[#edf5ec] text-[#355935] rounded-full">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-[#1f381f]">
                  Click to upload or drag photo here
                </p>
                <p className="text-[11px] text-stone-500">
                  Supports JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!uploadedImage || isSubmitting}
          className={`w-full py-3 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            uploadedImage && !isSubmitting
              ? 'minimal-btn shadow-md'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Verifying Timestamp & Submitting...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Submit Photo Attendance Proof</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
