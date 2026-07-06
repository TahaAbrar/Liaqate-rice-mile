import { ArrowRight, Shield, Award, Globe, CheckCircle, Settings, Sprout, Truck, Search } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { ROUTES, useRouter } from "../lib/router";
import { LocationMapEmbed } from "./LocationMap";

export default function HomeView() {
  const { navigate } = useRouter();
  const { banners, legacySection, globalStandards, globalFootprint, products } = useAdminData();
  
  const featuredProducts = products.slice(0, 3);

  // Icon maps for dynamic standards box render
  const icons = [Search, Award, Settings, Truck];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[680px] flex items-center overflow-hidden bg-primary/20">
        <div className="absolute inset-0 z-0">
          <img 
            src={banners.home.image}
            alt="Vibrant green rice paddies farmland"
            className="w-full h-full object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-white">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-ping"></span>
              <span className="text-secondary-fixed text-xs font-bold uppercase tracking-[0.25em]">
                {banners.home.subtitle}
              </span>
            </div>
            <h1 className="font-serif-title text-4xl sm:text-6xl text-white font-medium leading-none tracking-tight">
              {banners.home.title}
            </h1>
            <p className="font-sans text-base sm:text-lg text-surface-variant/90 max-w-xl leading-relaxed">
              {banners.home.desc}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate(ROUTES.products)}
                className="bg-primary text-white hover:bg-white hover:text-primary border border-primary px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-md"
              >
                Explore Products 
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate(ROUTES.export)}
                className="border border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300"
              >
                Export Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy of Excellence Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="pt-12 space-y-4">
                <div className="w-full h-72 rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={legacySection.images[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuDVWueDBCFd1owMqfqegNt-HbeBq5ZOR5rLHuzVpnC0rgC9z45Uo36qOutxzonLPqizUs3tlVr4geaqjVG6UtYLjbS4VmUJ-5eGQkpYVuc-yhFGoDDG0PMJhMNuwADEQcUjUw2uEiyQPpamVuTdaLPOq_jPAOWMHOBCUiY22SyZxgrD1XPARtGBAFz6fqKILat0vXmhPQv0I-enkz06anV8sWukbiDTlvmPbDNmZywIQtJ3McD0zXK0cqW_4pymwqfrP4k3Thvz2Ac"}
                    alt="Rice milling details"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={legacySection.images[1] || "https://lh3.googleusercontent.com/aida-public/AB6AXuAz_1thT9uLeV-AjPmcqkqibTk4zZYcDq3JMvk34qJjlzarpbQOhvpbaOig1aIRUg7rr22v--PigyMsZyoqsHGn-xWx9zw61Coz4v6ExYEEIZlBe0qrkA8vtsWOD3GnQHDGZMbovFG1EbNspOMCpJxLxKzF7pjerHqIk4QBTPI_3I9qNc5sh06pUj94jtCM856MmVPiXxI4Zdj-7gZePAD82FSvBHBjT1bvrbzS4gRLtoX5ncpm81OPsGo1QTLOoQMrh6lNK1geOxg"}
                    alt="Legacy archival mill"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={legacySection.images[2] || "https://lh3.googleusercontent.com/aida-public/AB6AXuCRRmSpc7j10e-CZql4EVAQhyj2PMYO19SC2LLyRNKxt2MwDysZXZSEknZKiHymrOjzvzq5KOkISY7sijrLjgxxIb1xpGwyqHsIwCJhcXJT-1D-YXkFDhNGL719Wy_hEPKfgG78F6nfYo0K4VxxjD1Ybi2-UNi-if1M65Qe-zDf0NZ21ufhQ14pX42rYN8l3hIbADICqFlnETuQlHw-l-qTyHsxwgWCofTm4qUyUNqiboDSvB9gJUpYuTFW5eQFXDRQ9b4SHajdgRE"}
                    alt="Automated milling machines"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-full h-80 rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={legacySection.images[3] || "https://lh3.googleusercontent.com/aida-public/AB6AXuBz9OX7J6E0XeGYYVgXmwJMp-UjvbTad7o6uDpo1sed7c5l310NziwPkf2kiZbCGpQAizFaPNgx0s97OHR04p8R8CGn6RkQlCByJ4B2fwOX05Hd-vz8fVcdSyDNfQyb6uKBPhXIuYVYSILJajnggPsSOiVOY6rs9Jo08Bt0I10mjPuab0TxY8Fu-U0UzgASoFB37JRtGDdwYvBPPTBGMsqjgitZv7cwkYnR3pG5QXKFX8COMbEZznUx4hDV1oqpx66MtVo72gTzwaM"}
                    alt="Inspection lab quality control"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary-container p-6 rounded-xl shadow-lg max-w-[180px] hidden sm:block">
              <p className="font-serif-title text-4xl text-on-secondary-container font-bold leading-none">
                {legacySection.yearsCount}
              </p>
              <p className="font-sans text-xs text-on-secondary-container font-medium mt-2">
                {legacySection.yearsLabel}
              </p>
            </div>
          </div>

          {/* Texts block */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest">{legacySection.sub}</span>
              <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium leading-tight">
                {legacySection.title}
              </h2>
            </div>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              {legacySection.desc1}
            </p>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed">
              {legacySection.desc2}
            </p>
            <ul className="space-y-4 pt-2">
              {legacySection.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3 font-sans text-base font-semibold text-primary">
                  <CheckCircle className="text-secondary w-5 h-5 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <button
                onClick={() => navigate(ROUTES.about)}
                className="inline-flex items-center gap-2 font-sans font-bold text-sm text-primary hover:text-secondary group transition-all"
              >
                Learn our history
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">
              Our Finest Selections
            </h2>
            <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto">
              Discover the aromatic essence and superior grain length of our signature exports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full"
              >
                {/* Image */}
                <div className="h-64 w-full overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest shadow-sm">
                      {product.tagName}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="font-serif-title text-2xl text-primary font-medium mb-2">
                    {product.name}
                  </h3>
                  <p className="text-on-surface-variant font-sans text-sm mb-6 leading-relaxed flex-grow">
                    {product.description}
                  </p>
                  <button 
                    onClick={() => navigate(ROUTES.productDetail(product.id))}
                    className="w-full py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    Specifications
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us: Global Standards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl space-y-3">
              <h2 className="font-serif-title text-3xl sm:text-5xl text-primary font-medium">
                {globalStandards.title}
              </h2>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                {globalStandards.desc}
              </p>
            </div>
            <div>
              <button 
                onClick={() => navigate(ROUTES.about)}
                className="text-secondary hover:text-primary font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-2 group transition-colors"
              >
                VIEW QUALITY PROTOCOLS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalStandards.boxes.map((box, index) => {
              const IconComponent = icons[index] || Search;
              return (
                <div key={index} className="bg-white p-8 rounded-xl border border-outline-variant/20 hover:shadow-md hover:border-primary/20 transition-all duration-300 space-y-6">
                  <div className="w-12 h-12 bg-primary-fixed-dim/30 rounded-full flex items-center justify-center text-primary">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-lg text-primary">{box.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {box.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Export Section */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grain-texture"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-secondary-fixed font-bold text-xs uppercase tracking-widest block">
                {globalFootprint.sub}
              </span>
              <h2 className="font-serif-title text-3xl sm:text-5xl text-white font-medium leading-tight">
                {globalFootprint.title}
              </h2>
            </div>
            <p className="text-on-primary-container text-base sm:text-lg leading-relaxed max-w-lg">
              {globalFootprint.desc}
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 max-w-sm">
              <div>
                <p className="font-serif-title text-4xl text-secondary font-bold">
                  {globalFootprint.countriesCount}
                </p>
                <p className="font-sans text-xs opacity-75 uppercase tracking-wider mt-1">Target Countries</p>
              </div>
              <div>
                <p className="font-serif-title text-4xl text-secondary font-bold">
                  {globalFootprint.tonsCount}
                </p>
                <p className="font-sans text-xs opacity-75 uppercase tracking-wider mt-1">Tons Exported Annually</p>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => navigate(ROUTES.export)}
                className="bg-white text-primary hover:bg-secondary hover:text-white px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-md"
              >
                Inquire for International Export
              </button>
            </div>
          </div>

          {/* Interactive location map */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
            <LocationMapEmbed
              locationName={globalFootprint.locationName}
              latitude={globalFootprint.latitude || "28.4202"}
              longitude={globalFootprint.longitude || "70.2989"}
              className="rounded-2xl"
            />
            {globalFootprint.locationName && (
              <div className="absolute bottom-3 left-3 bg-primary/90 text-white text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-md">
                {globalFootprint.locationName}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
