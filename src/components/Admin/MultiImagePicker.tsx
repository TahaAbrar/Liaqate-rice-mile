import React, { useRef, useState } from "react";
import { Image as ImageIcon, Plus, X } from "lucide-react";
import { uploadImage } from "../../api";
import { resolveMediaUrl } from "../../lib/mediaUrl";

interface MultiImagePickerProps {
  label?: string;
  images: string[];
  onChange: (images: string[]) => void;
  className?: string;
}

export default function MultiImagePicker({
  label = "Gallery Images",
  images,
  onChange,
  className = "",
}: MultiImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;

    const files = Array.from(fileList);
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Please choose valid image files only.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Each image must be under 5 MB.");
        return;
      }
    }

    setUploading(true);
    setError("");
    const uploaded: string[] = [];

    try {
      for (const file of files) {
        const url = await uploadImage(file);
        uploaded.push(url);
      }
      onChange([...images, ...uploaded]);
    } catch (err) {
      setError("Upload failed — is the backend running?");
      console.error("Gallery upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="text-[10px] font-bold text-on-surface-variant uppercase flex items-center gap-1.5">
          <ImageIcon className="w-3 h-3 text-slate-400" />
          {label}
        </label>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative aspect-square rounded-lg border border-outline-variant/40 bg-slate-100 overflow-hidden group"
            >
              <img src={resolveMediaUrl(url)} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
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
            <Plus className="w-4 h-4" />
          )}
          Add Gallery Images
        </button>
        <p className="text-[10px] text-slate-400 font-sans">
          Detail page par sab images dikhengi. Product card par sirf main image show hogi.
        </p>
        {error && <p className="text-[10px] text-red-500 font-sans">{error}</p>}
      </div>
    </div>
  );
}
