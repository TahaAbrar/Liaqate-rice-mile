import { useState } from "react";
import { Lock, User, Eye, EyeOff, ShieldCheck, Wheat, ArrowLeft } from "lucide-react";
import { adminLogin } from "../../api";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await adminLogin(username.trim(), password);
      onLoginSuccess();
    } catch {
      setError("Invalid username or password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-surface-dim/30">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3RBSaP3301DMFAZyZfcDqMxWIdTKbuXmPfhlCWSm-DYUccfiEEao0jfDfMIxrGBXJRUrdqJyef4VFw0AoEMTNHLCGGGYMd6OlLx6mA6upJjft8D0qMonvfTWNwoOaH4U8gWlfb7L-WLU7EPUdoUaCCtOBPfcDW-z-oZ_p_CeyAXsQ3K1V-59XtMLAuBfiWBZVw5rz1-JKvyUmA01-Sc8ZYDGirstGy9SWdmT4xoK9nwjI9TYp4a9y00vT0ibYkIf4xhmAkekrgMY')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white border border-outline-variant/30 rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        <div className="bg-primary px-8 py-8 text-center text-white">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <Wheat className="w-8 h-8 text-secondary-fixed" />
            <span className="font-serif-title text-2xl font-semibold tracking-wide">
              Liaqat Rice Mills
            </span>
          </div>
          <p className="font-sans text-xs text-primary-fixed-dim uppercase tracking-[0.2em]">
            Content Management System
          </p>
        </div>

        <div className="p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif-title text-2xl text-primary font-medium">Admin Sign In</h2>
            <p className="font-sans text-sm text-on-surface-variant">
              Enter your credentials to access the control deck.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-on-surface-variant/60">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg pl-10 pr-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-on-surface-variant/60">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg pl-10 pr-11 py-3 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-on-surface-variant/60 hover:text-primary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-container disabled:opacity-60 text-white py-3.5 rounded-full font-bold font-sans text-xs uppercase tracking-widest transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary text-xs font-sans transition-colors mt-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
