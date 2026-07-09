import React, { useRef, useState } from "react";
import { Film, Upload } from "lucide-react";
import { uploadVideo } from "../../api";
import { resolveMediaUrl } from "../../lib/mediaUrl";

interface VideoPickerProps {
  label?: string;
  value: string;
  poster?: string;
  onChange: (url: string) => void;
  className?: string;
}

const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];

export default function VideoPicker({
  label = "Video",
  value,
  poster,
  onChange,
  className = "",
}: VideoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please choose MP4, WebM, or OGG video.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("Video must be under 50 MB.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const url = await uploadVideo(file);
      onChange(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message === "Upload failed" ? "Upload failed — is the backend running?" : message);
      console.error("Video upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-bold text-on-surface-variant uppercase flex items-center gap-1.5">
          <Film className="w-3 h-3 text-slate-400" />
          {label}
        </label>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-full sm:w-56 h-32 rounded-lg border border-outline-variant/40 bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
          {value ? (
            <video
              src={resolveMediaUrl(value)}
              poster={poster ? resolveMediaUrl(poster) : undefined}
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
              autoPlay
            />
          ) : (
            <div className="text-center p-3 text-slate-400">
              <Film className="w-8 h-8 mx-auto mb-1 opacity-50" />
              <span className="text-[10px] font-sans">No video</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime,.mp4,.webm,.ogg,.mov"
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
            Choose Video
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[10px] font-sans text-red-500 hover:underline w-fit"
            >
              Remove video
            </button>
          )}
          <p className="text-[10px] text-on-surface-variant font-sans">
            MP4 recommended. Max 50 MB. Plays muted &amp; auto on home page.
          </p>
          {error && <p className="text-[10px] text-red-500 font-sans">{error}</p>}
        </div>
      </div>
    </div>
  );
}
