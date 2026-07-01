import { Sprout, Filter, Layers, Globe, Mail, Send, Linkedin } from "lucide-react";
import { TEAM_MEMBERS } from "../data";
import { useAdminData } from "../context/AdminDataContext";

interface AboutViewProps {
  onNavigate: (screen: "home" | "about" | "products" | "export") => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const { banners, corePhilosophy, millProcess, ceoSection } = useAdminData();

  // Dynamic icons map for process step icons
  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Sprout className="w-4 h-4" />;
      case 1: return <Filter className="w-4 h-4" />;
      case 2: return <Layers className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[550px] flex items-center overflow-hidden bg-primary/30">
        <div className="absolute inset-0 z-0">
          <img 
            src={banners.about.image}
            alt="Emerald green rice field during sunset"
            className="w-full h-full object-cover brightness-[0.7] transform transition-transform duration-[10000ms] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/75 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full text-white">
          <div className="max-w-2xl space-y-4">
            <span className="text-primary-fixed-dim font-sans font-bold text-xs uppercase tracking-[0.3em] block">
              {banners.about.subtitle}
            </span>
            <h1 className="font-serif-title text-4xl sm:text-6xl text-white font-medium leading-none tracking-tight">
              {banners.about.title}
            </h1>
            <p className="font-sans text-base sm:text-lg text-white/90 max-w-xl leading-relaxed">
              {banners.about.desc}
            </p>
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => {
                  const el = document.getElementById("journey-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-secondary text-on-secondary hover:bg-secondary/90 px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-md"
              >
                Discover our Legacy
              </button>
              <button 
                onClick={() => onNavigate("export")}
                className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest backdrop-blur-sm transition-all"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Innovation */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="grain-texture absolute inset-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest block">
                {corePhilosophy.sub}
              </span>
              <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">
                {corePhilosophy.title}
              </h2>
            </div>
            <div className="space-y-6">
              <h3 className="font-serif-title text-2xl text-secondary italic">
                {corePhilosophy.missionTitle}
              </h3>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                {corePhilosophy.missionDesc}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-xl">
                <span className="font-serif-title text-4xl sm:text-5xl text-primary block font-semibold mb-2">
                  {corePhilosophy.annualTonnage}
                </span>
                <span className="font-sans text-xs text-secondary font-bold uppercase tracking-wider">Annual Tonnage</span>
              </div>
              <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-xl">
                <span className="font-serif-title text-4xl sm:text-5xl text-primary block font-semibold mb-2">
                  {corePhilosophy.globalMarkets}
                </span>
                <span className="font-sans text-xs text-secondary font-bold uppercase tracking-wider">Global Markets</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="h-[280px] bg-cover bg-center rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 shadow-md" 
                style={{
                  backgroundImage: `url('${corePhilosophy.leftImage}')`
                }}
                title="Buhler sorting laser"
              />
              <div className="p-6 bg-primary-container text-on-primary-container rounded-2xl shadow-sm">
                <h4 className="font-serif-title text-xl mb-2 text-white">
                  {corePhilosophy.visionTitle}
                </h4>
                <p className="font-sans text-sm text-on-primary-container/90 leading-relaxed">
                  {corePhilosophy.visionDesc}
                </p>
              </div>
            </div>
            <div className="h-[480px] bg-cover bg-center rounded-2xl shadow-lg" 
              style={{
                backgroundImage: `url('${corePhilosophy.rightImage}')`
              }}
              title="Liaqat Rice Mill heritage founders"
            />
          </div>
        </div>
      </section>

      {/* The Journey of a Grain (Timeline Section) */}
      <section id="journey-section" className="py-24 bg-surface-container-low relative">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20 space-y-3">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block">
            {millProcess.sub}
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">
            {millProcess.title}
          </h2>
          <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto">
            {millProcess.desc}
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative">
          {/* Vertical Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-secondary to-transparent hidden lg:block" />

          {/* Timeline steps */}
          <div className="space-y-20 relative">
            {millProcess.steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={step.step}
                  className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0 relative z-10"
                >
                  {/* Left block */}
                  <div className={`w-full lg:w-1/2 ${isEven ? "lg:pr-16 lg:text-right order-2 lg:order-1" : "order-3"}`}>
                    {isEven ? (
                      <div className="space-y-3">
                        <h3 className="font-serif-title text-2xl text-primary font-semibold">{step.title}</h3>
                        <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
                      </div>
                    ) : (
                      <div className="w-full h-52 overflow-hidden rounded-xl border border-outline-variant/20 shadow-md">
                        <img src={step.image} alt={step.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                  </div>

                  {/* Circle number */}
                  <div className="relative z-10 flex items-center justify-center order-1 lg:order-2">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold font-sans shadow-md border-4 border-white">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  {/* Right block */}
                  <div className={`w-full lg:w-1/2 ${isEven ? "order-3 lg:pl-16" : "lg:pl-16 order-2"}`}>
                    {isEven ? (
                      <div className="w-full h-52 overflow-hidden rounded-xl border border-outline-variant/20 shadow-md">
                        <img src={step.image} alt={step.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h3 className="font-serif-title text-2xl text-primary font-semibold">{step.title}</h3>
                        <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership section (Founder) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative max-w-md mx-auto lg:mx-0">
            <div className="absolute -top-10 -left-10 w-32 h-32 border-t-2 border-l-2 border-secondary/30 pointer-events-none" />
            <div className="h-[520px] w-full rounded-xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src={ceoSection.image}
                alt="Chaudhry Liaqat Ali portrait"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

          <div className="space-y-8">
            <span className="text-secondary text-5xl font-serif-title select-none opacity-40 block">“</span>
            <h2 className="font-serif-title text-3xl sm:text-4xl text-primary font-medium leading-snug italic">
              "{ceoSection.quote}"
            </h2>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              At Liaqat Rice Mill, we believe that agriculture is the most noble of human pursuits. Since our founding, we have operated on a simple principle: Purity without compromise. As we look to the next century, we are integrating smart milling technology and advanced optical sorting into our heritage practices to ensure sustainability for generations to come.
            </p>
            <div>
              <p className="font-serif-title text-2xl text-primary font-semibold">{ceoSection.name}</p>
              <p className="font-sans text-xs text-secondary font-bold uppercase tracking-widest mt-1">{ceoSection.rank}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 space-y-3">
          <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">The Architects of Quality</h2>
          <p className="font-sans text-base text-on-surface-variant">A global team of agronomists, logistics managers, and master millers.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="group flex flex-col h-full bg-white rounded-xl p-5 border border-outline-variant/25 hover:shadow-lg transition-all duration-300">
              <div className="h-72 w-full overflow-hidden rounded-lg mb-6 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a href="#" className="bg-white text-primary p-2.5 rounded-full hover:scale-110 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <h3 className="font-serif-title text-xl font-bold text-primary">{member.name}</h3>
              <p className="font-sans text-xs text-secondary font-bold uppercase tracking-widest mt-1">{member.role}</p>
              {member.bio && (
                <p className="font-sans text-xs text-on-surface-variant/80 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white border-t border-outline-variant/10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif-title text-3xl sm:text-4xl text-primary font-medium">Stay Informed</h2>
          <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto">
            Subscribe to our global newsletter for seasonal harvest reports, market price updates, and trade insights.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to our harvest insights!");
            }} 
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4"
          >
            <input 
              type="email" 
              required
              placeholder="Enter your corporate email address" 
              className="bg-surface-container-low border-0 border-b border-outline focus:ring-0 focus:border-primary px-4 py-3 text-sm rounded-lg flex-grow"
            />
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              Subscribe
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
