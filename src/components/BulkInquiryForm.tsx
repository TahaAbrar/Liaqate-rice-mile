import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { submitInquiry } from "../api";
import type { InquiryPayload, InquirySource } from "../types/inquiry";

const CMS_SYNC_CHANNEL = "liaqat-cms-sync";

function broadcastInquiryUpdate() {
  try {
    new BroadcastChannel(CMS_SYNC_CHANNEL).postMessage({ type: "inquiry" });
  } catch {
    // ignore
  }
}

type FormVariant = "modal" | "inline" | "card";

interface BulkInquiryFormProps {
  source: InquirySource;
  defaultGrade?: string;
  productSlug?: string;
  variant?: FormVariant;
  submitLabel?: string;
  onSuccess?: () => void;
}

const inputModal =
  "w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2 px-3 text-sm transition-colors rounded-sm";
const inputInline =
  "w-full border-0 border-b border-outline-variant bg-transparent py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm";
const inputCard =
  "w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2.5 px-3 text-sm transition-colors rounded-sm";

export default function BulkInquiryForm({
  source,
  defaultGrade = "",
  productSlug = "",
  variant = "inline",
  submitLabel = "Request Bulk Quotation",
  onSuccess,
}: BulkInquiryFormProps) {
  const { products, refreshInquiries } = useAdminData();
  const [formData, setFormData] = useState({
    contactName: "",
    companyName: "",
    email: "",
    country: "",
    riceGrade: defaultGrade || products[0]?.name || "",
    quantity: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const inputClass = variant === "modal" ? inputModal : variant === "card" ? inputCard : inputInline;
  const labelClass = "text-xs font-bold text-on-surface-variant uppercase tracking-wider block";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload: InquiryPayload = {
        source,
        contactName: formData.contactName.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        country: formData.country.trim(),
        riceGrade: formData.riceGrade,
        quantity: formData.quantity.trim(),
        message: formData.message.trim(),
        productSlug: productSlug || undefined,
      };
      await submitInquiry(payload);
      await refreshInquiries();
      broadcastInquiryUpdate();
      setSubmitted(true);
      setFormData({
        contactName: "",
        companyName: "",
        email: "",
        country: "",
        riceGrade: defaultGrade || products[0]?.name || "",
        quantity: "",
        message: "",
      });
      onSuccess?.();
      if (variant !== "card") {
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch {
      setError("Failed to send inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && variant === "card") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-fadeIn">
        <CheckCircle2 className="w-16 h-16 text-secondary animate-bounce" />
        <h4 className="font-serif-title text-2xl font-bold text-primary">Proposal Requested</h4>
        <p className="text-on-surface-variant font-sans text-sm max-w-sm">
          Thank you! We&apos;ve received your inquiry. A custom wholesale proposal will be routed to our trade desk.
        </p>
      </div>
    );
  }

  return (
    <>
      {submitted && variant === "modal" && (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-scaleIn">
          <CheckCircle2 className="w-16 h-16 text-secondary" />
          <h4 className="font-serif-title text-2xl font-semibold text-primary">Inquiry Submitted Successfully</h4>
          <p className="text-on-surface-variant max-w-md text-sm">
            Thank you! Your custom quotation request has been sent to our global export desk.
          </p>
        </div>
      )}

      {!(submitted && variant === "modal") && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Contact Name *</label>
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="e.g. John Doe"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Company Name *</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Global Foods Ltd"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Corporate Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. purchasing@company.com"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Destination Country *</label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g. Saudi Arabia"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelClass}>Rice Grade Select *</label>
              <select
                required
                value={formData.riceGrade}
                onChange={(e) => setFormData({ ...formData, riceGrade: e.target.value })}
                className={inputClass}
              >
                {products.length === 0 ? (
                  <option value="">No products available</option>
                ) : (
                  products.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Estimated Quantity (Tons) *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g. 250"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>Message &amp; Port of Discharge *</label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Packaging requirements, destination port, shipping schedule..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={submitting || products.length === 0}
            className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 text-xs"
          >
            {submitting ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {submitLabel}
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {submitted && variant === "inline" && (
        <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center text-center p-8 animate-fadeIn z-10">
          <CheckCircle2 className="w-16 h-16 text-secondary animate-bounce" />
          <h4 className="font-serif-title text-2xl font-bold text-primary mt-4">Inquiry Received</h4>
          <p className="text-on-surface-variant font-sans text-sm max-w-sm mt-2">
            Thank you! Our export sales desk will send a customized trade quotation shortly.
          </p>
        </div>
      )}
    </>
  );
}
