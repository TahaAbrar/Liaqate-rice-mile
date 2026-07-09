import { Sparkles } from "lucide-react";
import { resolveMediaUrl } from "../lib/mediaUrl";

interface PageBannerProps {
  image: string;
  badge?: string;
  title: string;
  subtitle?: string;
  heightClass?: string;
}

export default function PageBanner({
  image,
  badge,
  title,
  subtitle,
  heightClass = "h-[480px] sm:h-[520px]",
}: PageBannerProps) {
  return (
    <section className={`relative ${heightClass} flex items-center overflow-hidden bg-primary/30`}>
      <div className="absolute inset-0 z-0">
        {image ? (
          <img
            src={resolveMediaUrl(image)}
            alt={title}
            className="w-full h-full object-cover brightness-[0.65]"
          />
        ) : (
          <div className="w-full h-full bg-primary/40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-primary/20 z-10" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full text-white">
        <div className="max-w-2xl space-y-4">
          {badge && (
            <span className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-[0.25em] bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-secondary-fixed" />
              {badge}
            </span>
          )}
          <h1 className="font-serif-title text-4xl sm:text-6xl text-white font-medium leading-none tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="font-sans text-base sm:text-lg text-white/90 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
