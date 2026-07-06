import { X } from "lucide-react";
import BulkInquiryForm from "./BulkInquiryForm";

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuotationModal({ isOpen, onClose }: QuotationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden transform scale-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
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

        <div className="p-8">
          <BulkInquiryForm
            source="nav_modal"
            variant="modal"
            onSuccess={() => setTimeout(onClose, 3000)}
          />
        </div>
      </div>
    </div>
  );
}
