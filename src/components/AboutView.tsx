import { Sprout, Filter, Layers, Globe } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { ROUTES, useRouter } from "../lib/router";

export default function AboutView() {
  const { navigate } = useRouter();
  const { banners, corePhilosophy, millProcess, ceoSection, teamSection } = useAdminData();

  const stepIcons = [Sprout, Filter, Layers, Globe];
  const getStepIcon = (idx: number) => {
    const Icon = stepIcons[idx % stepIcons.length];
    return <Icon className="w-4 h-4" />;
  };

  const visiblePartners = ceoSection.partners.filter(
    (p) => p.name || p.image || p.quote || p.description
  );

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
                onClick={() => navigate(ROUTES.export)}
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
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-secondary to-transparent hidden lg:block" />

          <div className="space-y-20 relative">
            {millProcess.steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx}
                  className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0 relative z-10"
                >
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

                  <div className="relative z-10 flex items-center justify-center order-1 lg:order-2">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold font-sans shadow-md border-4 border-white">
                      {getStepIcon(idx)}
                    </div>
                  </div>

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

      {/* Managing Partners */}
      {visiblePartners.map((partner, idx) => {
        const reversed = idx % 2 === 1;
        return (
          <section key={idx} className={`py-24 overflow-hidden ${idx % 2 === 0 ? "bg-white" : "bg-surface-container-low"}`}>
            <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reversed ? "lg:[direction:rtl]" : ""}`}>
              <div className={`relative max-w-md mx-auto lg:mx-0 ${reversed ? "lg:[direction:ltr]" : ""}`}>
                {partner.image && (
                  <>
                    <div className="absolute -top-10 -left-10 w-32 h-32 border-t-2 border-l-2 border-secondary/30 pointer-events-none" />
                    <div className="h-[520px] w-full rounded-xl overflow-hidden shadow-2xl relative z-10">
                      <img
                        src={partner.image}
                        alt={partner.name || `Managing Partner ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className={`space-y-8 ${reversed ? "lg:[direction:ltr]" : ""}`}>
                {partner.quote && (
                  <>
                    <span className="text-secondary text-5xl font-serif-title select-none opacity-40 block">&ldquo;</span>
                    <h2 className="font-serif-title text-3xl sm:text-4xl text-primary font-medium leading-snug italic">
                      &ldquo;{partner.quote}&rdquo;
                    </h2>
                  </>
                )}
                {partner.description && (
                  <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                    {partner.description}
                  </p>
                )}
                {(partner.name || partner.rank) && (
                  <div>
                    {partner.name && (
                      <p className="font-serif-title text-2xl text-primary font-semibold">{partner.name}</p>
                    )}
                    {partner.rank && (
                      <p className="font-sans text-xs text-secondary font-bold uppercase tracking-widest mt-1">{partner.rank}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* Team Section */}
      <section className="py-24 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 space-y-3">
          <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">The Architects of Quality</h2>
          <p className="font-sans text-base text-on-surface-variant">A global team of agronomists, logistics managers, and master millers.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamSection.members.map((member) => (
            <div key={member.id} className="group flex flex-col h-full bg-white rounded-xl p-5 border border-outline-variant/25 hover:shadow-lg transition-all duration-300">
              <div className="h-72 w-full overflow-hidden rounded-lg mb-6">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="font-serif-title text-xl font-bold text-primary">{member.name}</h3>
              <p className="font-sans text-xs text-secondary font-bold uppercase tracking-widest mt-1">{member.rank}</p>
              {member.description && (
                <p className="font-sans text-xs text-on-surface-variant/80 mt-3 leading-relaxed">
                  {member.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
