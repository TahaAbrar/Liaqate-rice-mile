export type InquirySource = "nav_modal" | "export_page" | "product_detail";

export interface Inquiry {
  id: number;
  source: InquirySource;
  contactName: string;
  companyName: string;
  email: string;
  country: string;
  riceGrade: string;
  quantity: string;
  message: string;
  productSlug: string;
  createdAt: string;
}

export interface InquiryPayload {
  source: InquirySource;
  contactName: string;
  companyName: string;
  email: string;
  country: string;
  riceGrade: string;
  quantity: string;
  message: string;
  productSlug?: string;
}

export const INQUIRY_SOURCE_LABELS: Record<InquirySource, string> = {
  nav_modal: "Nav — Request Quotation",
  export_page: "Export Page Form",
  product_detail: "Product Detail Form",
};
