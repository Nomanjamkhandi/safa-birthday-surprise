import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, Sparkles, QrCode } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate QR Code URL via high-reliability SVG or Google Chart / quickchart SVG
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&color=BE185D&bgcolor=FFF5F7&data=${encodeURIComponent(
    shareUrl || 'https://ais-pre-73mwp5j3gb724umkjepnkm-902361679119.asia-southeast1.run.app'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-2xl text-center animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-inner">
          <QrCode className="w-7 h-7" />
        </div>

        <h3 className="font-display text-xl font-bold text-slate-800 mb-1">
          Share Safa's Birthday Site
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Scan this QR Code with any phone camera to open the surprise!
        </p>

        {/* QR Code Container */}
        <div className="p-4 rounded-2xl bg-[#FFF5F7] border-2 border-pink-200/80 inline-block mb-5 shadow-inner">
          <img
            src={qrImageSrc}
            alt="Birthday Site QR Code"
            className="w-48 h-48 rounded-xl object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Share Link Box */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-pink-50 border border-pink-200 mb-4 text-left">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="text-xs text-slate-600 bg-transparent flex-1 truncate px-2 font-mono outline-none"
          />
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <p className="text-[11px] text-pink-500/90 font-medium">
          Send this QR or link to Pariii so she can open it on her phone 💖
        </p>
      </div>
    </div>
  );
};
