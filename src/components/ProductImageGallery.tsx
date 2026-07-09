import { useState } from "react";
import { resolveMediaUrl } from "../lib/mediaUrl";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const gallery = images.length > 0 ? images : [""];
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(activeIndex, gallery.length - 1);
  const activeImage = gallery[safeIndex];

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="absolute -inset-4 bg-primary-fixed/20 rounded-full blur-3xl group-hover:bg-primary-fixed/30 transition-all duration-700" />
        <div className="relative rounded-2xl overflow-hidden aspect-square border-2 border-primary/20 shadow-2xl bg-surface">
          {activeImage ? (
            <img
              src={resolveMediaUrl(activeImage)}
              alt={`${productName} — image ${safeIndex + 1}`}
              className="w-full h-full object-contain bg-white p-4 transform transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-sm">
              No image
            </div>
          )}
        </div>
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {gallery.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`aspect-square rounded-xl overflow-hidden border-2 bg-white transition-all ${
                safeIndex === idx
                  ? "border-primary shadow-md ring-2 ring-primary/20"
                  : "border-outline-variant/30 hover:border-primary/50"
              }`}
            >
              <img
                src={resolveMediaUrl(src)}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
