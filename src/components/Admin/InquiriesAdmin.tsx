import { useState } from "react";
import { Mail, Trash2, MapPin, Package, MessageSquare } from "lucide-react";
import { useAdminData } from "../../context/AdminDataContext";
import { INQUIRY_SOURCE_LABELS } from "../../types/inquiry";
import ConfirmModal from "./ConfirmModal";

export default function InquiriesAdmin() {
  const { inquiries, deleteInquiry, refreshInquiries } = useAdminData();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleteId === null) return;
    setDeleting(true);
    try {
      await deleteInquiry(deleteId);
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("en-PK", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-title text-lg text-primary font-semibold">Inquiry Messages</h3>
          <p className="text-xs text-on-surface-variant mt-1">
            All bulk quotation requests from the nav modal, export page, and product detail forms.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refreshInquiries()}
          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
        >
          Refresh
        </button>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-16 text-on-surface-variant">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm font-medium">No inquiries yet</p>
          <p className="text-xs mt-1 opacity-70">Submissions will appear here when visitors fill out any contact form.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="border border-outline-variant/30 rounded-xl p-5 bg-slate-50/50 hover:border-primary/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                    {INQUIRY_SOURCE_LABELS[inq.source]}
                  </span>
                  <h4 className="font-serif-title text-lg text-primary font-semibold">{inq.contactName}</h4>
                  <p className="text-xs text-on-surface-variant">{inq.companyName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 font-sans">{formatDate(inq.createdAt)}</span>
                  <button
                    type="button"
                    onClick={() => setDeleteId(inq.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Mail className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                  <a href={`mailto:${inq.email}`} className="hover:text-primary transition-colors truncate">
                    {inq.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                  {inq.country}
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Package className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                  {inq.riceGrade} — {inq.quantity} MT
                </div>
              </div>

              {inq.productSlug && (
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider">
                  Product: {inq.productSlug}
                </p>
              )}

              <div className="mt-3 pt-3 border-t border-outline-variant/20">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Message</p>
                <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">{inq.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={deleteId !== null}
        title="Delete Inquiry"
        message="Are you sure you want to delete this inquiry? This cannot be undone."
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
