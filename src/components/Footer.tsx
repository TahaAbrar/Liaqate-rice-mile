import { Wheat, Globe, Mail, Phone } from "lucide-react";
import { ROUTES, useRouter } from "../lib/router";

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-surface-container-highest w-full pt-16 pb-8 border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate(ROUTES.home)}
          >
            <Wheat className="text-primary w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-serif-title text-xl font-bold text-primary uppercase tracking-widest">
              ELITE GRAIN
            </span>
          </div>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Global purveyors of the finest Himalayan Basmati rice. Liaqat Rice Mill: Excellence in every grain since 1978. Excellence from field to fork.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300">
              <Globe className="w-4 h-4" />
            </a>
            <a href="mailto:exports@elitegrain.com" className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300">
              <Mail className="w-4 h-4" />
            </a>
            <a href="tel:+92551234567" className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
            Our Portfolio
          </h4>
          <ul className="space-y-3 font-sans text-sm text-on-surface-variant">
            <li>
              <button onClick={() => navigate(ROUTES.products)} className="hover:text-primary transition-colors text-left">
                Super Basmati
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.products)} className="hover:text-primary transition-colors text-left">
                1121 Kainat / Sella
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.products)} className="hover:text-primary transition-colors text-left">
                PK-386 Long Grain
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.products)} className="hover:text-primary transition-colors text-left">
                IRRI-6 / IRRI-9
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
            Quick Links
          </h4>
          <ul className="space-y-3 font-sans text-sm text-on-surface-variant">
            <li>
              <button onClick={() => navigate(ROUTES.about)} className="hover:text-primary transition-colors text-left">
                Quality Assurance
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.export)} className="hover:text-primary transition-colors text-left">
                Global Logistics
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.about)} className="hover:text-primary transition-colors text-left">
                Sustainability
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.export)} className="hover:text-primary transition-colors text-left">
                Request a Quote
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
            Certifications
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/80 h-11 flex items-center justify-center rounded border border-outline-variant/10 shadow-sm">
              <span className="text-[11px] font-sans font-bold text-on-surface-variant opacity-80">ISO 22000</span>
            </div>
            <div className="bg-white/80 h-11 flex items-center justify-center rounded border border-outline-variant/10 shadow-sm">
              <span className="text-[11px] font-sans font-bold text-on-surface-variant opacity-80">HACCP</span>
            </div>
            <div className="bg-white/80 h-11 flex items-center justify-center rounded border border-outline-variant/10 shadow-sm">
              <span className="text-[11px] font-sans font-bold text-on-surface-variant opacity-80">GMP</span>
            </div>
            <div className="bg-white/80 h-11 flex items-center justify-center rounded border border-outline-variant/10 shadow-sm">
              <span className="text-[11px] font-sans font-bold text-on-surface-variant opacity-80">FDA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-sm text-on-surface-variant opacity-80">
          © 2026 Elite Grain International. All Rights Reserved. Est. 1978.
        </p>
        <div className="flex flex-wrap gap-8 font-sans text-sm text-on-surface-variant opacity-85">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Export</a>
          <button
            onClick={() => navigate(ROUTES.adminLogin)}
            className="text-amber-600 hover:text-amber-500 hover:underline font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            🔐 Control Deck
          </button>
        </div>
      </div>
    </footer>
  );
}
