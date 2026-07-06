import React, { useRef, useState } from "react";
import { Image as ImageIcon, Upload } from "lucide-react";
import { uploadImage } from "../../api";

interface ImagePickerProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export default function ImagePicker({ label = "Image", value, onChange, className = "" }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") onChange(reader.result);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-bold text-on-surface-variant uppercase flex items-center gap-1.5">
          <ImageIcon className="w-3 h-3 text-slate-400" />
          {label}
        </label>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-full sm:w-40 h-32 rounded-lg border border-outline-variant/40 bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-3 text-slate-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
              <span className="text-[10px] font-sans">No image</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider hover:bg-primary-container transition-all disabled:opacity-60 w-fit"
          >
            {uploading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Choose Image
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[10px] font-sans text-red-500 hover:underline w-fit"
            >
              Remove image
            </button>
          )}
          {error && <p className="text-[10px] text-red-500 font-sans">{error}</p>}
        </div>
      </div>
    </div>
  );
}
