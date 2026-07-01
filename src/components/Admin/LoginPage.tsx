import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export default function LoginPage({ onLoginSuccess, onBack }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate validation
    setTimeout(() => {
      if (username.trim() === "admin" && password === "admin123") {
        onLoginSuccess();
      } else {
        setError("Invalid credentials. Use username 'admin' and password 'admin123'.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-12 px-6">
      {/* Immersive background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.2]"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTcLSJvcOPicuJV9RZfsD_KL_HD5JAiQA0cetoTvCCmezMcITf0KINquIs0yog_lz3N_3eleFAj0DCzxJ5vw5BUPhL9zJDsWYspLfkiIW8cdNxAm_VTutBSosZhZBpnyQHgvmZiZls5HJCK8MVzmptNo13Gz-5pNSe_nc2ADNygAndkqY9GYZEdyziA1NzJscJmxU2EY_2VWrEMNsUYthRPbqh-YkWWHBgayxgCEGXohXWQ4uRzrnxjHMPII8sagVlrtdUNIDFalk')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-slate-950/90" />
      </div>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8 sm:p-10 space-y-8 animate-fadeIn">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/15 border border-secondary/30 text-secondary mb-4">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-serif-title text-3xl text-white font-medium">
            Admin Workspace
          </h2>
          <p className="font-sans text-xs text-slate-400 uppercase tracking-widest">
            Elite Grain Management System
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-200 rounded-lg text-xs font-medium leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Username ID
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin ID"
                className="w-full bg-slate-950/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Secret Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-950/50 border border-white/10 rounded-lg pl-10 pr-11 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Demo Assist Tag */}
          <div className="p-3 bg-amber-400/5 rounded-lg border border-amber-400/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <div className="text-[11px] text-amber-300 font-sans">
                Demo Auth: <span className="font-bold underline">admin</span> / <span className="font-bold underline">admin123</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setUsername("admin");
                setPassword("admin123");
              }}
              className="text-[10px] uppercase font-bold text-amber-400 hover:underline"
            >
              Autofill
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-amber-600/50 disabled:to-amber-600/50 text-slate-950 py-3.5 rounded-lg font-bold font-sans text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Secure Login
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white text-xs font-sans transition-colors"
          >
            ← Return to public website
          </button>
        </div>
      </div>
    </div>
  );
}
