import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, FileText, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { ROUTES, useRouter } from "../lib/router";

interface ExportViewProps {
  onRequestQuote: () => void;
}

export default function ExportView({ onRequestQuote }: ExportViewProps) {
  const { navigate } = useRouter();
  const { banners, exportPageContent } = useAdminData();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    grade: "Extra Long Grain Basmati",
    volume: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        company: "",
        email: "",
        grade: "Extra Long Grain Basmati",
        volume: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[640px] flex items-center overflow-hidden bg-primary/25">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center brightness-[0.7]"
            style={{
              backgroundImage: `url('${banners.export.image}')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/75 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-4 py-1.5 bg-secondary-container/20 border border-secondary/30 text-secondary-fixed rounded-full font-sans text-xs font-bold uppercase tracking-widest">
              {banners.export.subtitle}
            </span>
            <h1 className="font-serif-title text-4xl sm:text-6xl text-white font-medium leading-none tracking-tight">
              {banners.export.title}
            </h1>
            <p className="font-sans text-base sm:text-lg text-surface-variant/90 max-w-xl leading-relaxed">
              {banners.export.desc}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate(ROUTES.products)}
                className="bg-white text-primary hover:bg-secondary hover:text-white px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-md"
              >
                Explore Portfolio
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("certifications-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Our Certifications
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Bento Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-secondary font-sans text-xs font-bold uppercase tracking-[0.25em] block">
            {exportPageContent.sub}
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">
            {exportPageContent.title}
          </h2>
          <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto">
            {exportPageContent.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Worldwide Shipping */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-white p-8 hover:border-primary/40 transition-all duration-500 min-h-[280px] flex flex-col justify-between">
            <div className="absolute top-4 right-4 w-40 h-40 opacity-[0.05] group-hover:opacity-10 transition-opacity pointer-events-none">
              <Globe className="w-full h-full text-primary" />
            </div>
            <div className="space-y-4">
              <span className="font-serif-title text-secondary text-2xl font-bold">
                {exportPageContent.cardMaritimeTitle}
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl text-primary font-semibold">
                {exportPageContent.cardMaritimeHeading}
              </h3>
              <p className="text-on-surface-variant font-sans text-sm max-w-md leading-relaxed">
                {exportPageContent.cardMaritimeDesc}
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              {exportPageContent.incoterms.map((incoterm) => (
                <span key={incoterm} className="px-3.5 py-1 bg-surface-container-low text-primary font-sans text-[11px] font-bold rounded-md">
                  {incoterm}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Documentation */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-primary text-white p-8 hover:scale-[1.01] transition-all duration-500 flex flex-col justify-between min-h-[280px]">
            <div className="space-y-4">
              <FileText className="w-8 h-8 text-primary-fixed-dim" />
              <h3 className="font-serif-title text-2xl text-white font-medium">
                {exportPageContent.cardDocHeading}
              </h3>
              <p className="text-white/80 font-sans text-xs leading-relaxed">
                {exportPageContent.cardDocDesc}
              </p>
            </div>
            <div className="space-y-2 pt-4">
              {exportPageContent.docs.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] font-sans font-bold text-primary-fixed-dim">
                  <CheckCircle2 className="w-4 h-4" /> {doc}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Quality Control */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-white p-8 hover:shadow-xl transition-all duration-500 flex flex-col justify-between min-h-[280px]">
            <div className="space-y-4">
              <ShieldCheck className="w-8 h-8 text-secondary" />
              <h3 className="font-serif-title text-2xl text-primary font-semibold">
                {exportPageContent.cardQcHeading}
              </h3>
              <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                {exportPageContent.cardQcDesc}
              </p>
            </div>
            <span className="font-sans text-[10px] font-bold text-secondary bg-secondary-container/20 px-3 py-1 rounded-md self-start uppercase tracking-wider mt-4">
              {exportPageContent.cardQcBadge}
            </span>
          </div>

          {/* Card 4: Logistics Technology */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low p-8 flex flex-col sm:flex-row items-center gap-8 min-h-[280px]">
            <div className="flex-1 space-y-4">
              <h3 className="font-serif-title text-2xl sm:text-3xl text-primary font-semibold">
                {exportPageContent.cardLogisticsHeading}
              </h3>
              <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                {exportPageContent.cardLogisticsDesc}
              </p>
              <button 
                onClick={onRequestQuote}
                className="flex items-center gap-2 text-primary hover:text-secondary font-sans font-bold uppercase tracking-wider text-xs transition-colors"
              >
                View Logistics Stack 
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-full sm:w-1/3 h-40 rounded-xl overflow-hidden shadow-md">
              <img 
                src={exportPageContent.cardLogisticsImage}
                alt="High-tech grain storage"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Truly Global Supply Chain */}
      <section className="bg-surface-dim/35 py-24 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium leading-tight">
                {exportPageContent.chainTitle}
              </h2>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                {exportPageContent.chainDesc}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-serif-title text-secondary font-bold">
                    {exportPageContent.chainCountriesCount}
                  </div>
                  <div className="text-xs font-sans font-bold uppercase tracking-wider text-outline">
                    {exportPageContent.chainCountriesLabel}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-serif-title text-secondary font-bold">
                    {exportPageContent.chainTonsCount}
                  </div>
                  <div className="text-xs font-sans font-bold uppercase tracking-wider text-outline">
                    {exportPageContent.chainTonsLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Map and vessel details overlay */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl border border-white p-4">
                <div className="w-full h-full bg-surface-container-low rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 opacity-40">
                    <img 
                      src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" 
                      alt="Stylized world map routes illustration" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Map ping marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                      <div className="w-4 h-4 bg-primary rounded-full border-2 border-white relative z-10"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat card overlay */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl rounded-xl hidden sm:flex items-center gap-4 border-l-4 border-secondary border border-outline-variant/20 animate-fadeIn">
                <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center rounded-full text-secondary">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-outline">Live Maritime Shipment</div>
                  <div className="text-sm font-sans font-bold text-primary mt-0.5">
                    {exportPageContent.chainLiveVessel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Process Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-secondary font-sans font-bold text-xs uppercase tracking-[0.25em] block">
              {exportPageContent.lifecycleSub}
            </span>
            <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">
              {exportPageContent.lifecycleTitle}
            </h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-md mx-auto">
              {exportPageContent.lifecycleDesc}
            </p>
          </div>

          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-secondary to-transparent hidden sm:block" />

            <div className="space-y-16">
              {exportPageContent.lifecycleSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={step.num} className={`relative flex flex-col sm:flex-row items-center gap-8 ${isEven ? "" : "sm:flex-row-reverse"}`}>
                    <div className={`flex-1 ${isEven ? "sm:text-right" : "sm:text-left"}`}>
                      <h4 className="font-serif-title text-2xl text-primary font-semibold mb-2">{step.title}</h4>
                      <p className="text-on-surface-variant font-sans text-sm leading-relaxed">{step.desc}</p>
                    </div>
                    
                    <div className="w-10 h-10 bg-white border-2 border-secondary rounded-full flex items-center justify-center font-sans font-bold text-sm text-secondary shadow-md relative z-10">
                      {step.num}
                    </div>

                    <div className="flex-1 hidden sm:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications-section" className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] grain-texture"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-md space-y-3">
              <h2 className="font-serif-title text-2xl sm:text-3xl text-white font-medium leading-snug">
                {exportPageContent.certificationsSectionTitle || "Certified Quality for Global Markets"}
              </h2>
              <p className="text-primary-fixed-dim font-sans text-sm">
                {exportPageContent.certificationsSectionDesc ||
                  "We strictly maintain the highest international standards for food safety, operational management, and plant inspection."}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
              {(exportPageContent.certificationBadges || [
                { name: "ISO 9001:2015", subtitle: "Quality Systems" },
                { name: "HACCP Certified", subtitle: "Food Safety" },
                { name: "FDA Registered", subtitle: "US Compliance" },
                { name: "HALAL Certified", subtitle: "Islamic Audit" },
              ]).map((cert) => (
                <div key={cert.name} className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shadow-sm text-secondary-fixed">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <span className="text-white font-sans text-xs font-bold block">{cert.name}</span>
                    <span className="text-white/60 font-sans text-[10px] uppercase tracking-wider block mt-0.5">{cert.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Export Inquiry Form */}
      <section className="py-24 px-6" id="inquiry-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contacts info */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">
                Initiate Your Export Partnership
              </h2>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                Connect with our trade export desk for volume pricing inquiries, grade specifications, private label branding, and logistics planning. Our global sales team responds within 12 business hours.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans font-bold text-base text-primary">Email Global Sales</h5>
                  <p className="text-on-surface-variant font-sans text-sm mt-0.5">exports@elitegrain.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans font-bold text-base text-primary">Direct Hotline</h5>
                  <p className="text-on-surface-variant font-sans text-sm mt-0.5">+92 (0) 55 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans font-bold text-base text-primary">Strategic HQ</h5>
                  <p className="text-on-surface-variant font-sans text-sm mt-0.5">G.T Road, Gujranwala, Punjab, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-outline-variant/30 shadow-sm relative">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full border-0 border-b border-outline-variant bg-transparent py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Global Trade Ltd"
                    className="w-full border-0 border-b border-outline-variant bg-transparent py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full border-0 border-b border-outline-variant bg-transparent py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Rice Grade</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full border-0 border-b border-outline-variant bg-transparent py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm"
                  >
                    <option>Extra Long Grain Basmati</option>
                    <option>Super Kernel Basmati</option>
                    <option>IRRI-6 Long Grain</option>
                    <option>1121 Sella Rice</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Monthly Volume (Tons)</label>
                  <input
                    type="number"
                    required
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="e.g. 500"
                    className="w-full border-0 border-b border-outline-variant bg-transparent py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Message &amp; Port of Discharge</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Briefly describe your packaging requirements and destination port..."
                  className="w-full border-0 border-b border-outline-variant bg-transparent py-3 focus:ring-0 focus:border-primary transition-colors font-sans text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Export Inquiry
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Success message popup */}
            {submitted && (
              <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center text-center p-8 animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-secondary animate-bounce" />
                <h4 className="font-serif-title text-2xl font-bold text-primary mt-4">Inquiry Received</h4>
                <p className="text-on-surface-variant font-sans text-sm max-w-sm mt-2">
                  Thank you! Our global export sales desk will analyze your request and send a customized trade quotation shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
