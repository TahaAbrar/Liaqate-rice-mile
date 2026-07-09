import { Wheat, Mail, Phone, MapPin } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { ROUTES, useRouter } from "../lib/router";
import { mailtoHref, telHref, whatsappHref } from "../lib/contactLinks";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Footer() {
  const { navigate } = useRouter();
  const { footerContent } = useAdminData();

  const iconClass =
    "w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300";

  return (
    <footer className="bg-surface-container-highest w-full pt-16 pb-8 border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate(ROUTES.home)}
          >
            <Wheat className="text-primary w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-serif-title text-lg sm:text-xl font-bold text-primary tracking-wide">
              Liaqat Rice Mills
            </span>
          </div>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            {footerContent.description}
          </p>
          <div className="flex gap-4">
            {footerContent.email && (
              <a
                href={mailtoHref(footerContent.email)}
                className={iconClass}
                aria-label="Email us"
                title={footerContent.email}
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {footerContent.phone && (
              <a
                href={telHref(footerContent.phone)}
                className={iconClass}
                aria-label="Call us"
                title={footerContent.phone}
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
            {footerContent.whatsapp && (
              <a
                href={whatsappHref(footerContent.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className={iconClass}
                aria-label="WhatsApp us"
                title={footerContent.whatsapp}
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
            Contact Info
          </h4>
          <ul className="space-y-3 font-sans text-sm text-on-surface-variant">
            {footerContent.email && (
              <li>
                <span className="block text-[10px] font-bold uppercase text-primary/70 mb-0.5">Email</span>
                <a href={mailtoHref(footerContent.email)} className="hover:text-primary transition-colors">
                  {footerContent.email}
                </a>
              </li>
            )}
            {footerContent.phone && (
              <li>
                <span className="block text-[10px] font-bold uppercase text-primary/70 mb-0.5">Phone</span>
                <a href={telHref(footerContent.phone)} className="hover:text-primary transition-colors">
                  {footerContent.phone}
                </a>
              </li>
            )}
            {footerContent.whatsapp && (
              <li>
                <span className="block text-[10px] font-bold uppercase text-primary/70 mb-0.5">WhatsApp</span>
                <a
                  href={whatsappHref(footerContent.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {footerContent.whatsapp}
                </a>
              </li>
            )}
            {footerContent.address && (
              <li>
                <span className="block text-[10px] font-bold uppercase text-primary/70 mb-0.5">Address</span>
                <span className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                  {footerContent.address}
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
            Quick Links
          </h4>
          <ul className="space-y-3 font-sans text-sm text-on-surface-variant">
            <li>
              <button onClick={() => navigate(ROUTES.home)} className="hover:text-primary transition-colors text-left">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.about)} className="hover:text-primary transition-colors text-left">
                About
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.products)} className="hover:text-primary transition-colors text-left">
                Product
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.brands)} className="hover:text-primary transition-colors text-left">
                Brands
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.recipes)} className="hover:text-primary transition-colors text-left">
                Recipes
              </button>
            </li>
            <li>
              <button onClick={() => navigate(ROUTES.export)} className="hover:text-primary transition-colors text-left">
                Export
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
            Certifications
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {footerContent.certifications.map((cert) => (
              <div
                key={cert}
                className="bg-white/80 h-11 flex items-center justify-center rounded border border-outline-variant/10 shadow-sm px-2"
              >
                <span className="text-[11px] font-sans font-bold text-on-surface-variant opacity-80 text-center">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-sm text-on-surface-variant opacity-80">
          {footerContent.copyright}
        </p>
        <div className="flex flex-wrap gap-8 font-sans text-sm text-on-surface-variant opacity-85">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Export
          </a>
        </div>
      </div>
    </footer>
  );
}
