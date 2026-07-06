import React, { useState } from "react";
import { useAdminData } from "../../context/AdminDataContext";
import type { SectionKey } from "../../api";
import ImagePicker from "./ImagePicker";
import LocationMapPicker from "./LocationMapPicker";
import { 
  Layout, 
  FileText, 
  Globe, 
  Sliders, 
  Layers, 
  User, 
  HelpCircle, 
  Save, 
  RotateCcw, 
  Sparkles, 
  CheckCircle, 
  LogOut, 
  Image as ImageIcon, 
  Compass, 
  Plus, 
  Minus, 
  Check, 
  MapPin, 
  TrendingUp, 
  ShoppingBag, 
  Anchor 
} from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
}

type ActiveTab = 
  | "banners" 
  | "heritage" 
  | "standards" 
  | "footprint" 
  | "philosophy" 
  | "process" 
  | "ceo" 
  | "products" 
  | "export_all";

export default function Dashboard({ onLogout }: DashboardProps) {
  const {
    banners,
    legacySection,
    globalStandards,
    globalFootprint,
    corePhilosophy,
    millProcess,
    ceoSection,
    productPageContent,
    exportPageContent,
    updateData,
    saveSection,
    resetToDefault,
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<ActiveTab>("banners");
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const TAB_SECTION_MAP: Record<ActiveTab, SectionKey> = {
    banners: "banners",
    heritage: "legacySection",
    standards: "globalStandards",
    footprint: "globalFootprint",
    philosophy: "corePhilosophy",
    process: "millProcess",
    ceo: "ceoSection",
    products: "productPageContent",
    export_all: "exportPageContent",
  };

  const TAB_LABELS: Record<ActiveTab, string> = {
    banners: "Banner Heroes",
    heritage: "Heritage of Purity",
    standards: "Global Standards",
    footprint: "Global Footprint",
    philosophy: "Philosophy & Mission",
    process: "The Mill Process",
    ceo: "CEO Profile",
    products: "Products Page",
    export_all: "Export Capabilities",
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleSaveCurrentSection = async () => {
    const key = TAB_SECTION_MAP[activeTab];
    setSaving(true);
    try {
      await saveSection(key);
      triggerSuccess(`${TAB_LABELS[activeTab]} saved to backend successfully!`);
    } catch {
      triggerSuccess(`Failed to save ${TAB_LABELS[activeTab]}. Is the backend running?`);
    } finally {
      setSaving(false);
    }
  };

  // Safe handlers for nested edits
  const handleBannerChange = (page: "home" | "about" | "export", field: string, val: string) => {
    const updated = { ...banners };
    updated[page] = { ...updated[page], [field]: val };
    updateData("banners", updated);
  };

  const handleLegacyChange = (field: string, val: any) => {
    const updated = { ...legacySection, [field]: val };
    updateData("legacySection", updated);
  };

  const handleLegacyBulletChange = (idx: number, val: string) => {
    const updatedBullets = [...legacySection.bullets];
    updatedBullets[idx] = val;
    handleLegacyChange("bullets", updatedBullets);
  };

  const handleStandardsChange = (field: string, val: any) => {
    const updated = { ...globalStandards, [field]: val };
    updateData("globalStandards", updated);
  };

  const handleStandardsBoxChange = (idx: number, field: "title" | "desc", val: string) => {
    const updatedBoxes = [...globalStandards.boxes];
    updatedBoxes[idx] = { ...updatedBoxes[idx], [field]: val };
    handleStandardsChange("boxes", updatedBoxes);
  };

  const handleFootprintChange = (field: string, val: any) => {
    const updated = { ...globalFootprint, [field]: val };
    updateData("globalFootprint", updated);
  };

  const handlePhilosophyChange = (field: string, val: any) => {
    const updated = { ...corePhilosophy, [field]: val };
    updateData("corePhilosophy", updated);
  };

  const handleMillProcessChange = (field: string, val: any) => {
    const updated = { ...millProcess, [field]: val };
    updateData("millProcess", updated);
  };

  const handleMillProcessStepChange = (idx: number, field: "title" | "description" | "image", val: string) => {
    const updatedSteps = [...millProcess.steps];
    updatedSteps[idx] = { ...updatedSteps[idx], [field]: val };
    handleMillProcessChange("steps", updatedSteps);
  };

  const handleCeoChange = (field: string, val: string) => {
    const updated = { ...ceoSection, [field]: val };
    updateData("ceoSection", updated);
  };

  const handleProductsPageChange = (field: string, val: string | string[]) => {
    const updated = { ...productPageContent, [field]: val };
    updateData("productPageContent", updated);
  };

  const handleExportPageChange = (field: string, val: any) => {
    const updated = { ...exportPageContent, [field]: val };
    updateData("exportPageContent", updated);
  };

  const handleExportIncotermChange = (idx: number, val: string) => {
    const updated = [...exportPageContent.incoterms];
    updated[idx] = val;
    handleExportPageChange("incoterms", updated);
  };

  const handleExportDocChange = (idx: number, val: string) => {
    const updated = [...exportPageContent.docs];
    updated[idx] = val;
    handleExportPageChange("docs", updated);
  };

  const handleLegacyImageChange = (idx: number, val: string) => {
    const updatedImages = [...legacySection.images];
    updatedImages[idx] = val;
    handleLegacyChange("images", updatedImages);
  };

  const handleProductCertChange = (idx: number, val: string) => {
    const updated = [...(productPageContent.certifications || [])];
    updated[idx] = val;
    handleProductsPageChange("certifications", updated);
  };

  const handleExportLifecycleStepChange = (idx: number, field: "title" | "desc", val: string) => {
    const updatedSteps = [...exportPageContent.lifecycleSteps];
    updatedSteps[idx] = { ...updatedSteps[idx], [field]: val };
    handleExportPageChange("lifecycleSteps", updatedSteps);
  };

  const defaultCertBadges = [
    { name: "ISO 9001:2015", subtitle: "Quality Systems" },
    { name: "HACCP Certified", subtitle: "Food Safety" },
    { name: "FDA Registered", subtitle: "US Compliance" },
    { name: "HALAL Certified", subtitle: "Islamic Audit" },
  ];

  const handleExportCertBadgeChange = (idx: number, field: "name" | "subtitle", val: string) => {
    const badges = [...(exportPageContent.certificationBadges || defaultCertBadges)];
    badges[idx] = { ...badges[idx], [field]: val };
    handleExportPageChange("certificationBadges", badges);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      {/* Toast Notification */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-emerald-400 text-emerald-300 px-6 py-4 rounded-xl shadow-xl shadow-emerald-950/20 animate-slideIn">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-bounce" />
          <div className="text-xs font-sans font-medium">
            {successMsg}
          </div>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 shadow-lg">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-wider rounded-md">
              ADMINISTRATOR
            </span>
            <span className="text-slate-400 font-sans text-xs">
              System Live & Online
            </span>
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl text-white font-medium leading-none">
            Interactive Control Deck
          </h1>
          <p className="font-sans text-xs text-slate-400 max-w-xl">
            Live preview editing suite. Change any element below and it will render instantly across the client-facing pages of your Elite Grain web application.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset all content changes to system defaults?")) {
                resetToDefault();
                triggerSuccess("System database reset to initial values!");
              }
            }}
            className="px-4 py-2.5 border border-slate-800 hover:border-red-400 hover:text-red-400 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg text-xs font-sans font-bold text-slate-200 uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400" />
            Exit Deck
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2 bg-slate-50 border border-outline-variant/30 rounded-2xl p-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block mb-2">
            Section Managers
          </span>

          {[
            { id: "banners", label: "Banner Heros", icon: Sliders },
            { id: "heritage", label: "Heritage of Purity", icon: FileText },
            { id: "standards", label: "Global Standards", icon: Layers },
            { id: "footprint", label: "Global Footprint", icon: Globe },
            { id: "philosophy", label: "Philosophy & Mission", icon: Compass },
            { id: "process", label: "The Mill Process", icon: Sliders },
            { id: "ceo", label: "CEO Profile Desk", icon: User },
            { id: "products", label: "Products Page Intro", icon: ShoppingBag },
            { id: "export_all", label: "Export Capabilities", icon: Anchor },
          ].map((item) => {
            const IconComp = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`w-full text-left px-4 py-3 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                  isSelected 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-on-surface-variant hover:bg-slate-100 hover:text-primary"
                }`}
              >
                <IconComp className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-secondary-fixed" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Editor Panel */}
        <div className="lg:col-span-9 bg-white border border-outline-variant/30 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <h2 className="font-serif-title text-xl text-primary font-medium capitalize">
                {activeTab.replace("_", " ")} Settings
              </h2>
            </div>
            <span className="text-[10px] font-sans text-slate-400">
              Edit below, then click Save to persist to backend
            </span>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8 flex-grow">
            {/* 1. BANNERS EDITOR */}
            {activeTab === "banners" && (
              <div className="space-y-10">
                {/* Home Banner */}
                <div className="space-y-4 border-b border-outline-variant/20 pb-8">
                  <h3 className="font-serif-title text-lg text-secondary font-semibold">1. Home Page Banner</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Subtitle Tag</label>
                      <input
                        type="text"
                        value={banners.home.subtitle}
                        onChange={(e) => handleBannerChange("home", "subtitle", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Hero Title</label>
                      <input
                        type="text"
                        value={banners.home.title}
                        onChange={(e) => handleBannerChange("home", "title", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Hero Description</label>
                    <textarea
                      value={banners.home.desc}
                      rows={3}
                      onChange={(e) => handleBannerChange("home", "desc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <ImagePicker
                    label="Home Banner Image"
                    value={banners.home.image}
                    onChange={(url) => handleBannerChange("home", "image", url)}
                  />
                </div>

                {/* About Banner */}
                <div className="space-y-4 border-b border-outline-variant/20 pb-8">
                  <h3 className="font-serif-title text-lg text-secondary font-semibold">2. About Us Banner</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Subtitle Tag</label>
                      <input
                        type="text"
                        value={banners.about.subtitle}
                        onChange={(e) => handleBannerChange("about", "subtitle", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Hero Title</label>
                      <input
                        type="text"
                        value={banners.about.title}
                        onChange={(e) => handleBannerChange("about", "title", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Hero Description</label>
                    <textarea
                      value={banners.about.desc}
                      rows={3}
                      onChange={(e) => handleBannerChange("about", "desc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <ImagePicker
                    label="About Banner Image"
                    value={banners.about.image}
                    onChange={(url) => handleBannerChange("about", "image", url)}
                  />
                </div>

                {/* Export Banner */}
                <div className="space-y-4">
                  <h3 className="font-serif-title text-lg text-secondary font-semibold">3. Export Page Banner</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Subtitle Tag</label>
                      <input
                        type="text"
                        value={banners.export.subtitle}
                        onChange={(e) => handleBannerChange("export", "subtitle", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Hero Title</label>
                      <input
                        type="text"
                        value={banners.export.title}
                        onChange={(e) => handleBannerChange("export", "title", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Hero Description</label>
                    <textarea
                      value={banners.export.desc}
                      rows={3}
                      onChange={(e) => handleBannerChange("export", "desc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <ImagePicker
                    label="Export Banner Image"
                    value={banners.export.image}
                    onChange={(url) => handleBannerChange("export", "image", url)}
                  />
                </div>
              </div>
            )}

            {/* 2. HERITAGE OF PURITY */}
            {activeTab === "heritage" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Subheading Label</label>
                    <input
                      type="text"
                      value={legacySection.sub}
                      onChange={(e) => handleLegacyChange("sub", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Main Heading</label>
                    <input
                      type="text"
                      value={legacySection.title}
                      onChange={(e) => handleLegacyChange("title", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase">Heritage Description Paragraph 1</label>
                  <textarea
                    value={legacySection.desc1}
                    rows={3}
                    onChange={(e) => handleLegacyChange("desc1", e.target.value)}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase">Heritage Description Paragraph 2</label>
                  <textarea
                    value={legacySection.desc2}
                    rows={3}
                    onChange={(e) => handleLegacyChange("desc2", e.target.value)}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Bullets */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase block">Highlight Points</span>
                  {legacySection.bullets.map((bullet, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <span className="text-xs font-sans font-bold text-slate-400">Point {index+1}:</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => handleLegacyBulletChange(index, e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>

                {/* Stat block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-outline-variant/25">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Experience Metric (e.g. 45+)</label>
                    <input
                      type="text"
                      value={legacySection.yearsCount}
                      onChange={(e) => handleLegacyChange("yearsCount", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Metric Sub-text</label>
                    <input
                      type="text"
                      value={legacySection.yearsLabel}
                      onChange={(e) => handleLegacyChange("yearsLabel", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Heritage collage images */}
                <div className="space-y-4 pt-4 border-t border-outline-variant/20">
                  <h3 className="font-serif-title text-base text-secondary font-semibold">Heritage Collage Images (4 photos)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {legacySection.images.map((img, idx) => (
                      <ImagePicker
                        key={idx}
                        label={`Collage Image ${idx + 1}`}
                        value={img}
                        onChange={(url) => handleLegacyImageChange(idx, url)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. GLOBAL STANDARDS */}
            {activeTab === "standards" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Section Main Title</label>
                    <input
                      type="text"
                      value={globalStandards.title}
                      onChange={(e) => handleStandardsChange("title", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Section Description Text</label>
                    <textarea
                      value={globalStandards.desc}
                      rows={3}
                      onChange={(e) => handleStandardsChange("desc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>

                {/* Boxes settings */}
                <div className="space-y-6">
                  <h3 className="font-serif-title text-base text-secondary font-semibold border-b pb-2">Standards Highlights (4 Cards)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {globalStandards.boxes.map((box, index) => (
                      <div key={index} className="p-4 bg-slate-50 border border-outline-variant/30 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-sans font-bold uppercase text-slate-400">Card {index+1} Settings</span>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-on-surface-variant uppercase">Card Title</label>
                          <input
                            type="text"
                            value={box.title}
                            onChange={(e) => handleStandardsBoxChange(index, "title", e.target.value)}
                            className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-on-surface-variant uppercase">Card Description</label>
                          <textarea
                            value={box.desc}
                            rows={3}
                            onChange={(e) => handleStandardsBoxChange(index, "desc", e.target.value)}
                            className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. GLOBAL FOOTPRINT */}
            {activeTab === "footprint" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Small Sub-heading</label>
                    <input
                      type="text"
                      value={globalFootprint.sub}
                      onChange={(e) => handleFootprintChange("sub", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Main Title</label>
                    <input
                      type="text"
                      value={globalFootprint.title}
                      onChange={(e) => handleFootprintChange("title", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase">Footprint Description</label>
                  <textarea
                    value={globalFootprint.desc}
                    rows={3}
                    onChange={(e) => handleFootprintChange("desc", e.target.value)}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-outline-variant/30">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Exported Target Countries (e.g. 30+)</label>
                    <input
                      type="text"
                      value={globalFootprint.countriesCount}
                      onChange={(e) => handleFootprintChange("countriesCount", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Tons Exported Annually (e.g. 150k)</label>
                    <input
                      type="text"
                      value={globalFootprint.tonsCount}
                      onChange={(e) => handleFootprintChange("tonsCount", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <LocationMapPicker
                  locationName={globalFootprint.locationName || ""}
                  latitude={globalFootprint.latitude || "28.4202"}
                  longitude={globalFootprint.longitude || "70.2989"}
                  onLocationNameChange={(val) => handleFootprintChange("locationName", val)}
                  onLatitudeChange={(val) => handleFootprintChange("latitude", val)}
                  onLongitudeChange={(val) => handleFootprintChange("longitude", val)}
                />
              </div>
            )}

            {/* 5. CORE PHILOSOPHY & OUR MISSION */}
            {activeTab === "philosophy" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-outline-variant/20 pb-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Core Philosophy Subtitle</label>
                    <input
                      type="text"
                      value={corePhilosophy.sub}
                      onChange={(e) => handlePhilosophyChange("sub", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Section Main Heading</label>
                    <input
                      type="text"
                      value={corePhilosophy.title}
                      onChange={(e) => handlePhilosophyChange("title", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="font-serif-title text-sm text-secondary font-bold">1. Mission Settings</h4>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Mission Heading Title</label>
                      <input
                        type="text"
                        value={corePhilosophy.missionTitle}
                        onChange={(e) => handlePhilosophyChange("missionTitle", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Mission Description Text</label>
                      <textarea
                        value={corePhilosophy.missionDesc}
                        rows={5}
                        onChange={(e) => handlePhilosophyChange("missionDesc", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-serif-title text-sm text-secondary font-bold">2. Vision Settings</h4>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Vision Heading Title</label>
                      <input
                        type="text"
                        value={corePhilosophy.visionTitle}
                        onChange={(e) => handlePhilosophyChange("visionTitle", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Vision Description Text</label>
                      <textarea
                        value={corePhilosophy.visionDesc}
                        rows={5}
                        onChange={(e) => handlePhilosophyChange("visionDesc", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-outline-variant/30">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Annual Tonnage Cap (e.g. 500k)</label>
                    <input
                      type="text"
                      value={corePhilosophy.annualTonnage}
                      onChange={(e) => handlePhilosophyChange("annualTonnage", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Global Markets Active (e.g. 42+)</label>
                    <input
                      type="text"
                      value={corePhilosophy.globalMarkets}
                      onChange={(e) => handlePhilosophyChange("globalMarkets", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImagePicker
                    label="Philosophy Left Image"
                    value={corePhilosophy.leftImage}
                    onChange={(url) => handlePhilosophyChange("leftImage", url)}
                  />
                  <ImagePicker
                    label="Philosophy Right Image"
                    value={corePhilosophy.rightImage}
                    onChange={(url) => handlePhilosophyChange("rightImage", url)}
                  />
                </div>
              </div>
            )}

            {/* 6. THE MILL PROCESS / JOURNEY OF A grain */}
            {activeTab === "process" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Subheading Label</label>
                      <input
                        type="text"
                        value={millProcess.sub}
                        onChange={(e) => handleMillProcessChange("sub", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Main Heading Title</label>
                      <input
                        type="text"
                        value={millProcess.title}
                        onChange={(e) => handleMillProcessChange("title", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Process Overview Description</label>
                    <textarea
                      value={millProcess.desc}
                      rows={2}
                      onChange={(e) => handleMillProcessChange("desc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>

                {/* Steps update */}
                <div className="space-y-6">
                  <h3 className="font-serif-title text-base text-secondary font-semibold border-b pb-2">The 4 Journey Steps</h3>
                  <div className="space-y-6">
                    {millProcess.steps.map((step, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-outline-variant/30 rounded-xl space-y-4">
                        <div className="flex justify-between items-center bg-slate-200/50 p-2 rounded-lg">
                          <span className="text-xs font-sans font-bold text-primary">Step {step.step} configuration</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-on-surface-variant uppercase">Step Title</label>
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => handleMillProcessStepChange(idx, "title", e.target.value)}
                              className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                            />
                          </div>
                          <ImagePicker
                            label={`Step ${step.step} Image`}
                            value={step.image}
                            onChange={(url) => handleMillProcessStepChange(idx, "image", url)}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-on-surface-variant uppercase">Step Description Text</label>
                          <textarea
                            value={step.description}
                            rows={3}
                            onChange={(e) => handleMillProcessStepChange(idx, "description", e.target.value)}
                            className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. CEO SECTION */}
            {activeTab === "ceo" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase">CEO Dynamic Quote</label>
                  <textarea
                    value={ceoSection.quote}
                    rows={3}
                    onChange={(e) => handleCeoChange("quote", e.target.value)}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">CEO Name</label>
                    <input
                      type="text"
                      value={ceoSection.name}
                      onChange={(e) => handleCeoChange("name", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">CEO Designation / Rank</label>
                    <input
                      type="text"
                      value={ceoSection.rank}
                      onChange={(e) => handleCeoChange("rank", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase">CEO Description / Bio</label>
                  <textarea
                    value={ceoSection.description || ""}
                    rows={5}
                    onChange={(e) => handleCeoChange("description", e.target.value)}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <ImagePicker
                  label="CEO Portrait Image"
                  value={ceoSection.image}
                  onChange={(url) => handleCeoChange("image", url)}
                />
              </div>
            )}

            {/* 8. PRODUCTS PAGE */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Product page Portfolio Badge</label>
                    <input
                      type="text"
                      value={productPageContent.badge}
                      onChange={(e) => handleProductsPageChange("badge", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Main Hero Heading</label>
                    <input
                      type="text"
                      value={productPageContent.title}
                      onChange={(e) => handleProductsPageChange("title", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase">Hero Description text</label>
                  <textarea
                    value={productPageContent.desc}
                    rows={3}
                    onChange={(e) => handleProductsPageChange("desc", e.target.value)}
                    className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Bespoke solutions block */}
                <div className="p-4 bg-slate-50 rounded-xl border border-outline-variant/30 space-y-4">
                  <h4 className="font-serif-title text-sm text-secondary font-bold">Bespoke Solutions Bottom Banner</h4>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Bespoke Headline</label>
                    <input
                      type="text"
                      value={productPageContent.bespokeTitle}
                      onChange={(e) => handleProductsPageChange("bespokeTitle", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Bespoke Paragraph Text</label>
                    <textarea
                      value={productPageContent.bespokeDesc}
                      rows={3}
                      onChange={(e) => handleProductsPageChange("bespokeDesc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Download Brochure Button</label>
                      <input
                        type="text"
                        value={productPageContent.downloadBrochureLabel || "Download Brochure"}
                        onChange={(e) => handleProductsPageChange("downloadBrochureLabel", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Talk to Expert Button</label>
                      <input
                        type="text"
                        value={productPageContent.talkToExpertLabel || "Talk to an Expert"}
                        onChange={(e) => handleProductsPageChange("talkToExpertLabel", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Inquiry Dashboard */}
                <div className="p-4 bg-slate-50 rounded-xl border border-outline-variant/30 space-y-4">
                  <h4 className="font-serif-title text-sm text-secondary font-bold">Inquiry Dashboard Panel</h4>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Dashboard Title</label>
                    <input
                      type="text"
                      value={productPageContent.inquiryDashboardTitle || "Inquiry Dashboard"}
                      onChange={(e) => handleProductsPageChange("inquiryDashboardTitle", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Monthly Capacity Label</label>
                      <input
                        type="text"
                        value={productPageContent.monthlyCapacityLabel || "Monthly Capacity"}
                        onChange={(e) => handleProductsPageChange("monthlyCapacityLabel", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Monthly Capacity Value</label>
                      <input
                        type="text"
                        value={productPageContent.monthlyCapacityValue || "15,000 MT"}
                        onChange={(e) => handleProductsPageChange("monthlyCapacityValue", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Export Markets Label</label>
                      <input
                        type="text"
                        value={productPageContent.exportMarketsLabel || "Export Markets"}
                        onChange={(e) => handleProductsPageChange("exportMarketsLabel", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Export Markets Value</label>
                      <input
                        type="text"
                        value={productPageContent.exportMarketsValue || "45+ Countries"}
                        onChange={(e) => handleProductsPageChange("exportMarketsValue", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Certifications Section Label</label>
                    <input
                      type="text"
                      value={productPageContent.certificationsLabel || "Quality Certifications"}
                      onChange={(e) => handleProductsPageChange("certificationsLabel", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase block">Certification Badges</label>
                    {(productPageContent.certifications || ["ISO 9001", "HACCP", "FDA APPROVED", "HALAL"]).map((cert, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={cert}
                        onChange={(e) => handleProductCertChange(idx, e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 9. EXPORT PAGE ALL SECTIONS */}
            {activeTab === "export_all" && (
              <div className="space-y-8">
                {/* Header info */}
                <div className="space-y-4">
                  <h3 className="font-serif-title text-base text-secondary font-semibold border-b pb-2">1. Header Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Badge Tag</label>
                      <input
                        type="text"
                        value={exportPageContent.sub}
                        onChange={(e) => handleExportPageChange("sub", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Capabilities Main Heading</label>
                      <input
                        type="text"
                        value={exportPageContent.title}
                        onChange={(e) => handleExportPageChange("title", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Capabilities Section Desc</label>
                    <textarea
                      value={exportPageContent.desc}
                      rows={2}
                      onChange={(e) => handleExportPageChange("desc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>

                {/* Shipping & logistics bento config */}
                <div className="space-y-4">
                  <h3 className="font-serif-title text-base text-secondary font-semibold border-b pb-2">2. Maritime Transport Card</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Card Small Title</label>
                      <input
                        type="text"
                        value={exportPageContent.cardMaritimeTitle}
                        onChange={(e) => handleExportPageChange("cardMaritimeTitle", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Card Big Heading</label>
                      <input
                        type="text"
                        value={exportPageContent.cardMaritimeHeading}
                        onChange={(e) => handleExportPageChange("cardMaritimeHeading", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Card Description Text</label>
                    <textarea
                      value={exportPageContent.cardMaritimeDesc}
                      rows={2}
                      onChange={(e) => handleExportPageChange("cardMaritimeDesc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-slate-50 focus:bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  {/* Incoterms chips */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block">Incoterm Tags (4 badges)</span>
                    <div className="grid grid-cols-4 gap-2">
                      {exportPageContent.incoterms.map((incoterm, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={incoterm}
                          onChange={(e) => handleExportIncotermChange(idx, e.target.value)}
                          className="w-full border border-outline-variant rounded-lg p-2 text-center text-xs font-sans font-bold bg-slate-50 focus:bg-white focus:outline-none focus:border-primary"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Documentation and QC card config */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-outline-variant/30 rounded-xl space-y-3">
                    <span className="text-[11px] font-serif-title font-semibold text-primary block">3. Clear Documentation Card</span>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase">Card Heading</label>
                      <input
                        type="text"
                        value={exportPageContent.cardDocHeading}
                        onChange={(e) => handleExportPageChange("cardDocHeading", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase">Card Desc</label>
                      <textarea
                        value={exportPageContent.cardDocDesc}
                        rows={2}
                        onChange={(e) => handleExportPageChange("cardDocDesc", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase block">Document bullet highlights</label>
                      {exportPageContent.docs.map((doc, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={doc}
                          onChange={(e) => handleExportDocChange(idx, e.target.value)}
                          className="w-full border border-outline-variant rounded-lg p-1.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-outline-variant/30 rounded-xl space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-serif-title font-semibold text-primary block">4. Strict Quality Control Card</span>
                      <div className="space-y-1 mt-2">
                        <label className="text-[9px] font-bold text-on-surface-variant uppercase">Card Heading</label>
                        <input
                          type="text"
                          value={exportPageContent.cardQcHeading}
                          onChange={(e) => handleExportPageChange("cardQcHeading", e.target.value)}
                          className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1 mt-1">
                        <label className="text-[9px] font-bold text-on-surface-variant uppercase">Card Description</label>
                        <textarea
                          value={exportPageContent.cardQcDesc}
                          rows={3}
                          onChange={(e) => handleExportPageChange("cardQcDesc", e.target.value)}
                          className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary resize-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1 pt-2">
                      <label className="text-[9px] font-bold text-on-surface-variant uppercase">Highlight Badge text</label>
                      <input
                        type="text"
                        value={exportPageContent.cardQcBadge}
                        onChange={(e) => handleExportPageChange("cardQcBadge", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Logistics Technology Card */}
                <div className="p-4 bg-slate-50 border border-outline-variant/30 rounded-xl space-y-4">
                  <h3 className="font-serif-title text-base text-secondary font-semibold border-b pb-2">5. Logistics Technology Card</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Card Heading</label>
                    <input
                      type="text"
                      value={exportPageContent.cardLogisticsHeading}
                      onChange={(e) => handleExportPageChange("cardLogisticsHeading", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Card Description</label>
                    <textarea
                      value={exportPageContent.cardLogisticsDesc}
                      rows={3}
                      onChange={(e) => handleExportPageChange("cardLogisticsDesc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <ImagePicker
                    label="Logistics Card Image"
                    value={exportPageContent.cardLogisticsImage}
                    onChange={(url) => handleExportPageChange("cardLogisticsImage", url)}
                  />
                </div>

                {/* Supply chain section */}
                <div className="p-4 bg-slate-50 border border-outline-variant/30 rounded-xl space-y-4">
                  <h4 className="font-serif-title text-sm text-secondary font-bold">6. Global Supply Chain Section</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Section title</label>
                      <input
                        type="text"
                        value={exportPageContent.chainTitle}
                        onChange={(e) => handleExportPageChange("chainTitle", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Live vessel name</label>
                      <input
                        type="text"
                        value={exportPageContent.chainLiveVessel}
                        onChange={(e) => handleExportPageChange("chainLiveVessel", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-mono bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Section Body description</label>
                    <textarea
                      value={exportPageContent.chainDesc}
                      rows={3}
                      onChange={(e) => handleExportPageChange("chainDesc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Countries Served Count (e.g. 50+)</label>
                      <input
                        type="text"
                        value={exportPageContent.chainCountriesCount}
                        onChange={(e) => handleExportPageChange("chainCountriesCount", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase">Tons exported annually (e.g. 200k)</label>
                      <input
                        type="text"
                        value={exportPageContent.chainTonsCount}
                        onChange={(e) => handleExportPageChange("chainTonsCount", e.target.value)}
                        className="w-full border border-outline-variant rounded-lg p-2.5 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Certified Quality Section */}
                <div className="p-4 bg-slate-50 border border-outline-variant/30 rounded-xl space-y-4">
                  <h3 className="font-serif-title text-base text-secondary font-semibold border-b pb-2">
                    7. Certified Quality for Global Markets
                  </h3>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Section Heading</label>
                    <input
                      type="text"
                      value={exportPageContent.certificationsSectionTitle || "Certified Quality for Global Markets"}
                      onChange={(e) => handleExportPageChange("certificationsSectionTitle", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase">Section Description</label>
                    <textarea
                      value={exportPageContent.certificationsSectionDesc || ""}
                      rows={3}
                      onChange={(e) => handleExportPageChange("certificationsSectionDesc", e.target.value)}
                      className="w-full border border-outline-variant rounded-lg p-3 text-xs font-sans bg-white focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase block">Certification Badges (4 items)</span>
                    {(exportPageContent.certificationBadges || defaultCertBadges).map((badge, idx) => (
                      <div key={idx} className="p-4 bg-white border border-outline-variant/30 rounded-xl space-y-3">
                        <span className="text-xs font-bold font-sans text-primary">Badge {idx + 1}</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-on-surface-variant uppercase">Certification Title</label>
                            <input
                              type="text"
                              value={badge.name}
                              onChange={(e) => handleExportCertBadgeChange(idx, "name", e.target.value)}
                              className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-slate-50 focus:outline-none focus:border-primary"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-on-surface-variant uppercase">Subtitle / Category</label>
                            <input
                              type="text"
                              value={badge.subtitle}
                              onChange={(e) => handleExportCertBadgeChange(idx, "subtitle", e.target.value)}
                              className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-slate-50 focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Lifecycle workflow */}
                <div className="space-y-4">
                  <h3 className="font-serif-title text-base text-secondary font-semibold border-b pb-2">8. Export Lifecycle (4 Workflow Steps)</h3>
                  <div className="space-y-4">
                    {exportPageContent.lifecycleSteps.map((step, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-outline-variant/30 rounded-xl space-y-3">
                        <span className="text-xs font-bold font-sans text-primary">Workflow Milestone {step.num}</span>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-on-surface-variant uppercase">Milestone Title</label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => handleExportLifecycleStepChange(idx, "title", e.target.value)}
                            className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-on-surface-variant uppercase">Milestone Summary</label>
                          <textarea
                            value={step.desc}
                            rows={2}
                            onChange={(e) => handleExportLifecycleStepChange(idx, "desc", e.target.value)}
                            className="w-full border border-outline-variant rounded-lg p-2 text-xs font-sans bg-white focus:outline-none focus:border-primary resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Per-section Save button */}
          <div className="bg-slate-50 px-6 py-4 border-t border-outline-variant/30 flex justify-between items-center">
            <p className="text-[10px] font-sans text-slate-500">
              Changes preview live. Click Save to store <strong>{TAB_LABELS[activeTab]}</strong> in the database.
            </p>
            <button
              type="button"
              onClick={handleSaveCurrentSection}
              disabled={saving}
              className="px-6 py-2.5 bg-primary hover:bg-primary-container disabled:opacity-60 text-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save {TAB_LABELS[activeTab]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
