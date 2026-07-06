import { X, Send, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { useAdminData } from "../context/AdminDataContext";

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuotationModal({ isOpen, onClose }: QuotationModalProps) {
  const { products } = useAdminData();
  const [formData, setFormData] = useState({
    contactName: "",
    companyName: "",
    email: "",
    country: "",
    quantity: "",
    grade: "Super Basmati",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          contactName: "",
          companyName: "",
          email: "",
          country: "",
          quantity: "",
          grade: "Super Basmati",
          message: "",
        });
        onClose();
      }, 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden transform scale-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-primary px-8 py-5 text-white">
          <div>
            <h3 className="font-serif-title text-xl font-medium">Bulk Quotation Request</h3>
            <p className="text-xs text-on-primary-container mt-1">Receive a custom export proposal within 24 hours.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-scaleIn">
              <CheckCircle className="w-16 h-16 text-secondary" />
              <h4 className="font-serif-title text-2xl font-semibold text-primary">Inquiry Submitted Successfully</h4>
              <p className="text-on-surface-variant max-w-md text-sm">
                Thank you! Your custom quotation request has been sent to our global export desk. One of our trade managers will contact you within 12 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2 px-3 text-sm transition-colors rounded-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Global Foods Ltd"
                    className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2 px-3 text-sm transition-colors rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. purchasing@globalfoods.com"
                    className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2 px-3 text-sm transition-colors rounded-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Destination Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Saudi Arabia"
                    className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2 px-3 text-sm transition-colors rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Rice Grade Select *
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2.5 px-3 text-sm transition-colors rounded-sm"
                  >
                    {products.map((prod) => (
                      <option key={prod.id} value={prod.name}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Estimated Quantity (Tons) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 250"
                    className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2 px-3 text-sm transition-colors rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Message & Port of Discharge *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your packaging, branding, and target shipping schedule specifications..."
                  className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2 px-3 text-sm transition-colors rounded-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-primary text-white py-3.5 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-[1.01] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    Request Bulk Quotation
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
