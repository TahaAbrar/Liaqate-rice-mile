import React, { useEffect, useState } from "react";
import { CheckCircle, ShieldCheck, Sparkles } from "lucide-react";

interface ToasterProps {
  message: string;
  subMessage?: string;
  duration?: number;
  onClose: () => void;
}

export default function Toaster({ message, subMessage, duration = 5000, onClose }: ToasterProps) {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 16);

    const dismissTimeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 400); // Wait for fade-out animation to complete
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(dismissTimeout);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex flex-col max-w-sm w-full bg-slate-950 text-white rounded-xl shadow-2xl border-2 border-amber-400 overflow-hidden shadow-amber-400/25 transition-all duration-300 ${
        isExiting ? "translate-x-12 opacity-0 scale-95" : "translate-x-0 opacity-100 scale-100 animate-slideIn"
      }`}
      style={{
        boxShadow: "0 0 25px rgba(251, 191, 36, 0.3)",
      }}
    >
      {/* Golden Pulse Glow Header (Focus gain color) */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 h-1.5 animate-pulse w-full"></div>
      
      <div className="p-5 flex items-start gap-4">
        {/* Animated Icon */}
        <div className="bg-amber-400/10 p-3 rounded-xl border border-amber-400/30 text-amber-400 flex-shrink-0 animate-bounce">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div className="flex-grow space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-sans font-bold text-sm tracking-wide uppercase text-amber-400">
              System Authorization Granted
            </h4>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          </div>
          <p className="font-serif-title text-lg text-white font-medium">
            {message}
          </p>
          {subMessage && (
            <p className="font-sans text-xs text-slate-400">
              {subMessage}
            </p>
          )}
        </div>
      </div>

      {/* Progress countdown indicator */}
      <div className="h-1 bg-slate-800 w-full">
        <div
          className="h-full bg-amber-400 transition-all ease-linear duration-16"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
