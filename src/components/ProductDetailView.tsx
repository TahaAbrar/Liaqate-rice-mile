import React, { useState, useEffect } from "react";
import { PRODUCTS, Product } from "../data";
import { Send, CheckCircle2, Ruler, Calendar, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { fetchProductBySlug } from "../api";
import { ROUTES, useParams, useRouter } from "../lib/router";

export default function ProductDetailView() {
  const { slug } = useParams("/products/:slug");
  const { navigate } = useRouter();
  const { products } = useAdminData();
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    country: "",
    quantity: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      const fallback =
        products.find((p) => p.id === slug) ||
        PRODUCTS.find((p) => p.id === slug) ||
        products[0] ||
        PRODUCTS[0];

      if (!slug) {
        setProduct(fallback);
        return;
      }

      try {
        const data = await fetchProductBySlug(slug);
        setProduct({ ...data, id: String(data.id || data.slug) } as Product);
      } catch {
        setProduct(fallback);
      }
    };

    loadProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ companyName: "", country: "", quantity: "" });
    }, 4000);
  };

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-on-surface-variant">
        Loading product...
      </div>
    );
  }

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full">
      {/* Section 1: Product Hero */}
      <section className="relative overflow-hidden pt-12 pb-24 bg-white">
        <div className="absolute inset-0 grain-texture -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Main Hero Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary-fixed/20 rounded-full blur-3xl group-hover:bg-primary-fixed/30 transition-all duration-700"></div>
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-outline-variant/20 shadow-2xl bg-surface">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Core Specs */}
          <div className="space-y-8">
            <div>
              <span className="inline-block bg-primary-fixed text-on-primary-fixed-variant px-4 py-1.5 rounded-sm font-sans text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
                Premium Export Grade
              </span>
              <h1 className="font-serif-title text-4xl sm:text-6xl text-primary leading-tight mt-4 font-medium">
                {product.name}
              </h1>
              <p className="font-serif-title text-2xl text-secondary italic mt-2 font-medium">
                {product.subtitle}
              </p>
            </div>

            {/* Speclist box */}
            <div className="flex gap-12 border-y border-outline-variant/20 py-8">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <p className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">Aged</p>
                </div>
                <p className="font-serif-title text-3xl text-primary font-bold mt-1">{product.age}</p>
              </div>
              <div className="text-center sm:text-left border-l border-outline-variant/20 pl-12">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <Ruler className="w-4 h-4 text-secondary" />
                  <p className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">Avg. Length</p>
                </div>
                <p className="font-serif-title text-3xl text-primary font-bold mt-1">{product.length}</p>
              </div>
            </div>

            <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-lg">
              {product.fullDescription}
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById("quote-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary hover:bg-primary-container text-white px-10 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-md"
              >
                Inquire for Bulk Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sensory Heritage & Purity */}
      <section className="bg-surface-container-low py-24 border-y border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">
                Sensory Heritage &amp; Purity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 border border-outline-variant/10 rounded-2xl shadow-sm space-y-4">
                  <span className="inline-flex p-3 bg-secondary/10 rounded-xl text-secondary">
                    <Ruler className="w-6 h-6" />
                  </span>
                  <h3 className="font-serif-title text-2xl text-primary font-semibold">Exquisite Aroma</h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    The natural, slow-aging process of 1-2 years locks in and enhances the distinctive nutty basmati fragrance. Every single grain releases a subtle, sweet floral perfume upon boiling or steaming.
                  </p>
                </div>

                <div className="bg-white p-8 border border-outline-variant/10 rounded-2xl shadow-sm space-y-4">
                  <span className="inline-flex p-3 bg-secondary/10 rounded-xl text-secondary">
                    <ShieldCheck className="w-6 h-6" />
                  </span>
                  <h3 className="font-serif-title text-2xl text-primary font-semibold">Silk Polished</h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    Processed inside our state-of-the-art computer-controlled mill, every grain undergoes rigorous multi-pass polishing to ensure a completely dust-free, bright pearly finish.
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Promise column card */}
            <div className="bg-primary-container p-10 rounded-2xl text-white relative overflow-hidden flex flex-col justify-center shadow-lg">
              <div className="absolute top-4 right-4 opacity-[0.05]">
                <ShieldCheck className="w-40 h-40 text-white" />
              </div>
              <h4 className="font-serif-title text-2xl text-secondary-fixed font-bold mb-6">Quality Promise</h4>
              <ul className="space-y-4 font-sans text-base">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary-fixed w-5 h-5 flex-shrink-0" />
                  100% Pure Origin Guarantee
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary-fixed w-5 h-5 flex-shrink-0" />
                  Zero Admixture Verification
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary-fixed w-5 h-5 flex-shrink-0" />
                  Non-GMO Certified Crop
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary-fixed w-5 h-5 flex-shrink-0" />
                  Export Grade A+ Visual Quality
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Technical Specifications Table */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">Technical Specifications</h2>
            <p className="font-sans text-base text-on-surface-variant">B2B Standard Export Profile &amp; Quality Metrics</p>
          </div>

          <div className="overflow-x-auto border border-outline-variant/30 rounded-2xl shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high border-b border-outline-variant/30">
                  <th className="p-6 font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Parameter</th>
                  <th className="p-6 font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Standard Requirement</th>
                  <th className="p-6 font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Testing Method</th>
                </tr>
              </thead>
              <tbody className="font-sans text-sm text-on-surface">
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                  <td className="p-6 font-semibold text-primary">Moisture Content</td>
                  <td className="p-6 font-semibold text-secondary">{product.moisture}</td>
                  <td className="p-6 text-on-surface-variant">{product.testingMethodMoisture}</td>
                </tr>
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                  <td className="p-6 font-semibold text-primary">Broken Grains</td>
                  <td className="p-6 font-semibold text-secondary">{product.broken}</td>
                  <td className="p-6 text-on-surface-variant">{product.testingMethodBroken}</td>
                </tr>
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                  <td className="p-6 font-semibold text-primary">Admixture Limit</td>
                  <td className="p-6 font-semibold text-secondary">{product.admixture}</td>
                  <td className="p-6 text-on-surface-variant">{product.testingMethodAdmixture}</td>
                </tr>
                <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                  <td className="p-6 font-semibold text-primary">Grain Purity</td>
                  <td className="p-6 font-semibold text-secondary">{product.purity}</td>
                  <td className="p-6 text-on-surface-variant">{product.testingMethodPurity}</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-6 font-semibold text-primary">Polishing &amp; Milling</td>
                  <td className="p-6 font-semibold text-secondary">{product.polishing}</td>
                  <td className="p-6 text-on-surface-variant">{product.testingMethodPolishing}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Packaging & Inquiry Form */}
      <section id="quote-section" className="bg-surface-container-highest py-24 border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Packaging options */}
            <div className="space-y-8">
              <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium leading-tight">
                Export Packaging Solutions
              </h2>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                We provide highly customizable packaging styles tailored for long marine transits, guaranteeing moisture block, tear resistance, and beautiful private label branding.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { size: "5 kg", desc: "BOPP / Jute Retail Bag" },
                  { size: "10 kg", desc: "Luxury Custom Burlap" },
                  { size: "20 kg", desc: "Woven PP Bulk Bag" },
                  { size: "50 kg", desc: "Industrial Bulk Transport" }
                ].map((pack) => (
                  <div key={pack.size} className="bg-white p-6 rounded-xl text-center border border-outline-variant/20 hover:border-secondary transition-colors cursor-default shadow-sm space-y-1">
                    <p className="font-serif-title text-2xl text-primary font-bold">{pack.size}</p>
                    <p className="font-sans text-xs text-on-surface-variant font-medium">{pack.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick quote Form card */}
            <div className="bg-white p-10 sm:p-12 rounded-2xl shadow-xl border border-outline-variant/30 relative">
              <div className="text-center mb-8 space-y-2">
                <span className="inline-flex p-3 bg-secondary/10 rounded-full text-secondary">
                  <Mail className="w-6 h-6" />
                </span>
                <h3 className="font-serif-title text-2xl text-primary font-bold">Bulk Quotation Request</h3>
                <p className="font-sans text-xs text-on-surface-variant">Receive a custom export proposal within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Company Name</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Global Traders"
                      className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2.5 px-3 text-sm transition-colors rounded-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Destination Country</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Saudi Arabia"
                      className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2.5 px-3 text-sm transition-colors rounded-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Estimated Quantity (Tons)</label>
                  <input
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 150"
                    className="w-full bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary py-2.5 px-3 text-sm transition-colors rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-full font-bold font-sans text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Request Bulk Quotation
                </button>
              </form>

              {/* Submitted screen */}
              {submitted && (
                <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center text-center p-8 animate-fadeIn">
                  <CheckCircle2 className="w-16 h-16 text-secondary animate-bounce" />
                  <h4 className="font-serif-title text-2xl font-bold text-primary mt-4">Proposal Requested</h4>
                  <p className="text-on-surface-variant font-sans text-sm max-w-sm mt-2">
                    Thank you! We've received your inquiry for <span className="font-semibold text-primary">{product.name}</span>. A custom wholesale proposal has been routed to our trade desk.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Related Products ("Explore More Varieties") */}
      <section className="py-24 bg-white border-t border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">Explore More Varieties</h2>
              <div className="h-1 w-20 bg-secondary mt-4 rounded-full"></div>
            </div>
            <button
              onClick={() => navigate(ROUTES.products)}
              className="text-primary hover:text-secondary font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 group transition-colors"
            >
              View Full Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-white border border-outline-variant/20 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Content */}
                <div className="p-8 space-y-4">
                  <h3 className="font-serif-title text-2xl text-primary font-semibold">{p.name}</h3>
                  <p className="font-sans text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                  <button
                    onClick={() => navigate(ROUTES.productDetail(p.id))}
                    className="inline-block border border-secondary text-secondary hover:bg-secondary hover:text-white px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
