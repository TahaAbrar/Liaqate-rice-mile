import React, { useEffect, useRef, useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { formatDescriptionForDisplay, looksLikeHtml, plainTextToHtml } from "../../lib/richText";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (html: string) => void;
  editorKey?: string;
  minHeight?: string;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  label,
  value,
  onChange,
  editorKey = "default",
  minHeight = "280px",
  placeholder = "Write product description…",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false, underline: false });

  const syncEditorContent = (content: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    const html = content.trim()
      ? looksLikeHtml(content)
        ? content
        : plainTextToHtml(content)
      : "";
    if (editor.innerHTML !== html) {
      editor.innerHTML = html;
    }
  };

  useEffect(() => {
    syncEditorContent(value);
  }, [editorKey]);

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  };

  const applyFormat = (command: "bold" | "italic" | "underline") => {
    editorRef.current?.focus();
    document.execCommand(command, false);
    onChange(editorRef.current?.innerHTML || "");
    updateActiveFormats();
  };

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || "");
    updateActiveFormats();
  };

  const toolbarBtn =
    "p-2 rounded-md border border-outline-variant/40 hover:bg-white hover:border-primary/40 transition-colors disabled:opacity-40";

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-bold text-on-surface-variant uppercase">{label}</label>
      )}

      <div className="rounded-lg border border-outline-variant/40 bg-white overflow-hidden">
        <div className="flex items-center gap-1 px-2 py-2 border-b border-outline-variant/30 bg-slate-50">
          <button
            type="button"
            title="Bold"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("bold")}
            className={`${toolbarBtn} ${activeFormats.bold ? "bg-primary/10 border-primary text-primary" : "text-slate-600"}`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Italic"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("italic")}
            className={`${toolbarBtn} ${activeFormats.italic ? "bg-primary/10 border-primary text-primary" : "text-slate-600"}`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Underline"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("underline")}
            className={`${toolbarBtn} ${activeFormats.underline ? "bg-primary/10 border-primary text-primary" : "text-slate-600"}`}
          >
            <Underline className="w-4 h-4" />
          </button>
          <span className="ml-2 text-[10px] text-slate-400 font-sans">
            Select text, then use Bold / Italic / Underline
          </span>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          onBlur={() => onChange(editorRef.current?.innerHTML || "")}
          data-placeholder={placeholder}
          className="rich-text-editor px-4 py-3 text-xs font-sans text-primary leading-relaxed outline-none overflow-y-auto focus:bg-white"
          style={{ minHeight }}
        />
      </div>
    </div>
  );
}

/** Read-only formatted description for public pages */
export function RichTextContent({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  const content = formatDescriptionForDisplay(html);
  if (!content) return null;

  return (
    <div
      className={`rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
