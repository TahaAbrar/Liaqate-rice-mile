import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Product } from "../data";
import { PRODUCTS as DEFAULT_PRODUCTS } from "../data";
import {
  fetchAllContent,
  fetchProducts,
  saveSection as apiSaveSection,
  type SectionKey,
} from "../api";

// Types for customizable items
export interface Banner {
  title: string;
  subtitle: string;
  desc: string;
  image: string;
}

export interface LegacySection {
  sub: string;
  title: string;
  desc1: string;
  desc2: string;
  bullets: string[];
  yearsCount: string;
  yearsLabel: string;
  images: string[];
}

export interface BoxStandard {
  title: string;
  desc: string;
}

export interface GlobalStandards {
  title: string;
  desc: string;
  boxes: BoxStandard[];
}

export interface GlobalFootprint {
  sub: string;
  title: string;
  desc: string;
  countriesCount: string;
  tonsCount: string;
  mapImage: string;
  locationName: string;
  latitude: string;
  longitude: string;
}

export interface CorePhilosophy {
  sub: string;
  title: string;
  missionTitle: string;
  missionDesc: string;
  annualTonnage: string;
  globalMarkets: string;
  visionTitle: string;
  visionDesc: string;
  leftImage: string;
  rightImage: string;
}

export interface JourneyStepCustom {
  step: string;
  title: string;
  description: string;
  image: string;
}

export interface MillProcess {
  sub: string;
  title: string;
  desc: string;
  steps: JourneyStepCustom[];
}

export interface CeoSection {
  quote: string;
  description: string;
  name: string;
  rank: string;
  image: string;
}

export interface ProductPageContent {
  badge: string;
  title: string;
  desc: string;
  bespokeTitle: string;
  bespokeDesc: string;
  downloadBrochureLabel: string;
  talkToExpertLabel: string;
  inquiryDashboardTitle: string;
  monthlyCapacityLabel: string;
  monthlyCapacityValue: string;
  exportMarketsLabel: string;
  exportMarketsValue: string;
  certificationsLabel: string;
  certifications: string[];
}

export interface ExportCertificationBadge {
  name: string;
  subtitle: string;
}

export interface ExportLifecycleStep {
  num: string;
  title: string;
  desc: string;
}

export interface ExportPageContent {
  sub: string;
  title: string;
  desc: string;
  cardMaritimeTitle: string;
  cardMaritimeHeading: string;
  cardMaritimeDesc: string;
  incoterms: string[];
  cardDocHeading: string;
  cardDocDesc: string;
  docs: string[];
  cardQcHeading: string;
  cardQcDesc: string;
  cardQcBadge: string;
  cardLogisticsHeading: string;
  cardLogisticsDesc: string;
  cardLogisticsImage: string;
  chainTitle: string;
  chainDesc: string;
  chainCountriesCount: string;
  chainCountriesLabel: string;
  chainTonsCount: string;
  chainTonsLabel: string;
  chainLiveVessel: string;
  lifecycleSub: string;
  lifecycleTitle: string;
  lifecycleDesc: string;
  lifecycleSteps: ExportLifecycleStep[];
  certificationsSectionTitle: string;
  certificationsSectionDesc: string;
  certificationBadges: ExportCertificationBadge[];
}

export interface AdminDataContextType {
  banners: {
    home: Banner;
    about: Banner;
    export: Banner;
  };
  legacySection: LegacySection;
  globalStandards: GlobalStandards;
  globalFootprint: GlobalFootprint;
  corePhilosophy: CorePhilosophy;
  millProcess: MillProcess;
  ceoSection: CeoSection;
  productPageContent: ProductPageContent;
  exportPageContent: ExportPageContent;
  products: Product[];
  loading: boolean;
  updateData: (key: string, value: unknown) => void;
  saveSection: (key: SectionKey) => Promise<void>;
  resetToDefault: () => void;
  refreshFromBackend: () => Promise<void>;
}

const DEFAULT_DATA = {
  banners: {
    home: {
      title: "Premium Quality Rice For Global Markets",
      subtitle: "Est. 1978 | Liaqat Rice Mill",
      desc: "From fertile Pakistani fields to prestigious international destinations, we deliver the world's finest Basmati through precision milling, rigorous inspection, and sustainable logistics.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3RBSaP3301DMFAZyZfcDqMxWIdTKbuXmPfhlCWSm-DYUccfiEEao0jfDfMIxrGBXJRUrdqJyef4VFw0AoEMTNHLCGGGYMd6OlLx6mA6upJjft8D0qMonvfTWNwoOaH4U8gWlfb7L-WLU7EPUdoUaCCtOBPfcDW-z-oZ_p_CeyAXsQ3K1V-59XtMLAuBfiWBZVw5rz1-JKvyUmA01-Sc8ZYDGirstGy9SWdmT4xoK9nwjI9TYp4a9y00vT0ibYkIf4xhmAkekrgMY",
    },
    about: {
      title: "Pioneering the Future of Pure Basmati.",
      subtitle: "Since 1978 | Liaqat Rice Mill",
      desc: "Liaqat Rice Mill combines generations of agricultural heritage with state-of-the-art Buhler-grade processing to deliver the world's finest grains to over 40 countries.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnVbO9ZoupsB8HB8siSnMNE3UboNLKVpx5aLTEtb9WAY3J4Qy6C4KHZo80GclGyfckfG7OPrOMKIeyDnmRoAG--Ff8bMVZM4Mv6lyNRVsJD00zD7pdpJem503V3AsIkkHvLqt4FR0xXb7IUxB0v0tuETL1to_BlTfOcqkUef96nNZL7m5gXhRc2LpGUdM_AL8Qe-uA5MTxYOfIkdhL7O6Zorc9ijrRn-M6jmm7HRfp-j69jpTBSLbHwHNImEBXPg8885V-g5obDag",
    },
    export: {
      title: "Feeding the World with Excellence",
      subtitle: "Liaqat Rice Mill Export Division",
      desc: "From Punjab's fertile floodplains to the international dinner table, we deliver the finest Basmati and long-grain rice through a seamless, certified supply chain.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTcLSJvcOPicuJV9RZfsD_KL_HD5JAiQA0cetoTvCCmezMcITf0KINquIs0yog_lz3N_3eleFAj0DCzxJ5vw5BUPhL9zJDsWYspLfkiIW8cdNxAm_VTutBSosZhZBpnyQHgvmZiZls5HJCK8MVzmptNo13Gz-5pNSe_nc2ADNygAndkqY9GYZEdyziA1NzJscJmxU2EY_2VWrEMNsUYthRPbqh-YkWWHBgayxgCEGXohXWQ4uRzrnxjHMPII8sagVlrtdUNIDFalk",
    },
  },
  legacySection: {
    sub: "Heritage of Purity",
    title: "Legacy of Excellence",
    desc1: "Since our inception in 1978, Liaqat Rice Mill has stood as a beacon of agricultural integrity. Our journey began in the heart of Punjab's premium rice-growing belt, driven by a simple mission: to provide the world with the aromatic perfection of authentic Pakistani Basmati.",
    desc2: "Today, we blend decades of generational knowledge with cutting-edge global technology, ensuring every grain that leaves our facility meets the most stringent international standards of purity, shape consistency, and aroma.",
    bullets: [
      "HACCP & ISO Certified Processing Units",
      "Sustainable, Ethical Farming Partnerships",
      "Direct Grain Exports to 30+ Nations",
    ],
    yearsCount: "45+",
    yearsLabel: "Years of Milling Excellence",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVWueDBCFd1owMqfqegNt-HbeBq5ZOR5rLHuzVpnC0rgC9z45Uo36qOutxzonLPqizUs3tlVr4geaqjVG6UtYLjbS4VmUJ-5eGQkpYVuc-yhFGoDDG0PMJhMNuwADEQcUjUw2uEiyQPpamVuTdaLPOq_jPAOWMHOBCUiY22SyZxgrD1XPARtGBAFz6fqKILat0vXmhPQv0I-enkz06anV8sWukbiDTlvmPbDNmZywIQtJ3McD0zXK0cqW_4pymwqfrP4k3Thvz2Ac",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAz_1thT9uLeV-AjPmcqkqibTk4zZYcDq3JMvk34qJjlzarpbQOhvpbaOig1aIRUg7rr22v--PigyMsZyoqsHGn-xWx9zw61Coz4v6ExYEEIZlBe0qrkA8vtsWOD3GnQHDGZMbovFG1EbNspOMCpJxLxKzF7pjerHqIk4QBTPI_3I9qNc5sh06pUj94jtCM856MmVPiXxI4Zdj-7gZePAD82FSvBHBjT1bvrbzS4gRLtoX5ncpm81OPsGo1QTLOoQMrh6lNK1geOxg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRRmSpc7j10e-CZql4EVAQhyj2PMYO19SC2LLyRNKxt2MwDysZXZSEknZKiHymrOjzvzq5KOkISY7sijrLjgxxIb1xpGwyqHsIwCJhcXJT-1D-YXkFDhNGL719Wy_hEPKfgG78F6nfYo0K4VxxjD1Ybi2-UNi-if1M65Qe-zDf0NZ21ufhQ14pX42rYN8l3hIbADICqFlnETuQlHw-l-qTyHsxwgWCofTm4qUyUNqiboDSvB9gJUpYuTFW5eQFXDRQ9b4SHajdgRE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBz9OX7J6E0XeGYYVgXmwJMp-UjvbTad7o6uDpo1sed7c5l310NziwPkf2kiZbCGpQAizFaPNgx0s97OHR04p8R8CGn6RkQlCByJ4B2fwOX05Hd-vz8fVcdSyDNfQyb6uKBPhXIuYVYSILJajnggPsSOiVOY6rs9Jo08Bt0I10mjPuab0TxY8Fu-U0UzgASoFB37JRtGDdwYvBPPTBGMsqjgitZv7cwkYnR3pG5QXKFX8COMbEZznUx4hDV1oqpx66MtVo72gTzwaM",
    ],
  },
  globalStandards: {
    title: "Global Standards",
    desc: "Our commitment to excellence transcends borders. We utilize state-of-the-art milling technologies to ensure zero impurities, high nutrition, and immaculate grain length.",
    boxes: [
      {
        title: "Color Sorting",
        desc: "Advanced optical CCD color sorters ensure every grain is perfectly uniform in color, translucent, and clean.",
      },
      {
        title: "Triple Polishing",
        desc: "Our unique multi-stage water and silk polishing process gives each grain a pearly finish and enhanced shelf life.",
      },
      {
        title: "Custom Packaging",
        desc: "From luxury burlap to customized BOPP bags and big bulk loads, we offer packaging sizes tailored for global retail.",
      },
      {
        title: "Seamless Logistics",
        desc: "Our integrated supply chain management and port relations ensure timely deliveries and correct phytosanitary documentation.",
      },
    ],
  },
  globalFootprint: {
    sub: "Global Footprint",
    title: "Exporting Excellence Across Continents",
    desc: "Our logistics network connects the fertile heartland of Punjab, Pakistan to distributors, supermarket chains, and national reserves in over 30 countries worldwide. We handle all international trade complexities, from port clearance to Certificate of Origin compliance.",
    countriesCount: "30+",
    tonsCount: "150k",
    mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjpagPfeLkqvx8ktixc_Hc9OnyoHHt9m0l3ceLZ1s7LBdbyQOmVir0TB4CI-dS0GdU2FtgyuNK-ACh7MD5_PaI28uggTHZ3s6VamFibmC5ZFV8IPfbfZ2XnNeSfk-cvCYsYQTUXCEckPmyGDQQRXh2C2u8WaHbDVddMEBt4-8qwms3JC1HiTWJ28PGrrVzRqjHa3lhGMGWCQg_zO19_qWmtq6WRpV22Gi_3Du-SdEHQStxGJfRY-KXEwOPp2APzSd5oU5wbWy3BnM",
    locationName: "Liaqat Rice Mill, Rahim Yar Khan, Pakistan",
    latitude: "28.4202",
    longitude: "70.2989",
  },
  corePhilosophy: {
    sub: "Core Philosophy",
    title: "Heritage & Innovation",
    missionTitle: "Our Mission",
    missionDesc: "To empower global palates by ensuring every grain of rice processed at Liaqat Rice Mill meets the highest standards of purity, nutrition, and ecological sustainability. We are committed to fostering equitable farming practices that respect both our soil and our communities.",
    annualTonnage: "500k",
    globalMarkets: "42+",
    visionTitle: "Vision",
    visionDesc: "Becoming the definitive global benchmark for premium grain logistics, ethical milling, and sustainable food chains worldwide.",
    leftImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsyqM86RZTlSG4FeycIrREG68D1FSzjRotVasqnargSsvyDaEbexjpq0Fr33EecAopov1L5e8a1X4Ve7so2BZILTi9xK2PRcZJzvmXFd4PfIILWXaQ_17-VPOIcirImAjQ_a8_yB05S-tUjDBEcA_5hdKcN1FNGFNhNnHJLy1iVm8OvUAoR--9GH9EyKHYWwbM-4IaSQrRIVhrWHaHQ9Uh9NFOzbFslmjFNHNWu8FdbGPZ3GuJ6Vnnw1mzImY5z8Lvz0dMN6UA7nw",
    rightImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8RuU28FevmwLIflxDeb7NhVFP93e8_ETs0GszG-tfQbZxc0VoLEDeMu37vlc7LVGMPaSRE18xOPG13LCWpMCWmBzcYMyHAy7fCtCHXlh68QpNx9VjL2-W1yFhti39awN2_Y3ONqPaCxBgSyGE3RMfGLKJnXpIzwQQeqhhg05_O969LpJvZvOOXHLdTC3GukXQlSbg4XxteQj2z2Eeb2qlKJqEfB7apP2wwztvj6IrfveeOxKqhfDAl3Nd4iS5pg18Yn89EqMtGx8",
  },
  millProcess: {
    sub: "The Mill Process",
    title: "The Journey of a Grain",
    desc: "Witness how our meticulous processing converts fields of green paddies into pristine packaged grains.",
    steps: [
      {
        step: "01",
        title: "Procurement",
        description: "We source directly from the fertile Indus basins, selecting only the highest grade paddy through rigorous field inspections and fair-trade partnerships with generation-linked farmers.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLVvGgdAsmBzO-VvPWl-c5-TKQcfcZSyX89KZHDK-x-PFiXPxuvcll7zq_LeB1HNedMzQtbAoGCnf_tAaw0xlTSUZEQjPBHSR9ESPrNrhhHvntC-whzCU2qDjN4z6QMFNn0Y3cPfRojPiMuh5le0HOSpctbo-tzznY4-v8qvPjJgIsuw4n4nm4fdHZ-EZ2va6IptS8xBQpc4voh8eg5ZS2y1eopFnbIDJ5TpBd1As87SEzDwKqwSEb6b6iwyMRiY_vvUpUoz1M-10",
      },
      {
        step: "02",
        title: "Cleaning & Processing",
        description: "Using Buhler-grade technology, grains undergo a multi-stage cleaning process to remove physical impurities, dust, and husks without cracking the delicate pearlescent grain core.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACKG-lspG-EqqXdJe0PQntUcvhmlqk2a4mH2CTdDiQE-vTfNBowb8R1qcJsNyXDgY_dAfLAR1jqHk2OTalQnZ7-QrQqg1lZ6Fi6b9HwAuorScVWMlGijxta9LDaQrGUrYDLi8rZcvbtyelm7ikFcyEPNiWOfYJJeZCEaA0wKBXI0QUUbGoN05YOL9V0XOqBHC3972NrYyYDe7c1BDLArebRqKlx5pFKPPo8VsoFt70v5WHWI-BsJTo2nFejWC5JrDxoewTdDtcFLM",
      },
      {
        step: "03",
        title: "Grading & Packaging",
        description: "Advanced CCD laser sorters analyze every single grain, checking length consistency and optical color purity. Grains are then nitrogen-flushed and packaged into moisture-sealed bags.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-1JRltra9UPwcCgyOaowLG6qT2eSN8kSGQVkblK9XKkujEFiFuwMk3VNQJs1N8CzTYVvHjsdVhP8TRVjUIfYjGgQHLwkX6gVYrEcsAezvz1TOHOl2bGM1QXmVKonsw6T1nPDlELpiAIwr6EsKKM1inmAT5BsFWOUcwSGMCHuFb6wtO0H7fzkWom4ITaqwWh_snTApQp7uoBSbM3c85NhJXkIi35lCNLikJJarSCckPbWIh1hrEbO74pC8MhaZ6UFezdsnk5xJVtg",
      },
      {
        step: "04",
        title: "Global Export",
        description: "From Port Qasim and Karachi Port to ports worldwide, we coordinate the complete logistics chain, maritime freight, and customs documentation for flawless delivery.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIiQAPb-BQn4uT1fwlwbU3h05lcoQpQe3N-5c2QNk-Mq_r8PkHJEFu1K38P5NRPMFER097zOXuQ1i169M0x2iXyupWvTs40s9nktYCgDlxQC03Td2owqhjrRF5z84_yiz-EVKo16_yNrbuBnnC2JjykEUYyGA2GmGdAZ1Rjnov_WaA5d-UDkBvJup80sZwpzn5WtwXzcDnCUGg0F7CIOZLZzJed_OtQ_4E1gAp_gcCg8Af3iMOOMeWYhn3zJ8qd4MnpvlN0a5JmV4",
      },
    ],
  },
  ceoSection: {
    quote: "Our legacy isn't measured in tonnes, but in the trust of the millions we feed every day.",
    description: "At Liaqat Rice Mill, we believe that agriculture is the most noble of human pursuits. Since our founding, we have operated on a simple principle: Purity without compromise. As we look to the next century, we are integrating smart milling technology and advanced optical sorting into our heritage practices to ensure sustainability for generations to come.",
    name: "Chaudhry Liaqat Ali",
    rank: "Chairman & Founder",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzDwS2d2hqJJHqqpvhNB23e9R0d-lTiLqE9evVMbM4bNwG31hvZ8Bc2Ih2C_k8pzkfi-gXqy-KRdfMHr7k_lJpk-CiaVUnujn_pP7aB9FwTnDZIVmi350NfFRVcK20lmdcFleSlPiP9OZWO41p1-lLGQHz3IA3Ylft2KDuc6EzvyWSBSsAAQbBF2AEdgItd04eQnMW67vq2H2YvzJy7WZcIctQ63Nrg10NuUwQLByRdXzZxD6L82v8XPBwXYjFhmQD4gVux0PIXJ0",
  },
  productPageContent: {
    badge: "Liaqat Rice Mill Portfolio",
    title: "Refining the Essence of Premium Grain",
    desc: "Discover our collection of world-class Basmati and non-Basmati varieties, processed with precision engineering and traditional heritage to meet global export standards.",
    bespokeTitle: "Bespoke Export Solutions for Global Partners",
    bespokeDesc: "We provide customized high-grade packaging, private labeling options, and flexible maritime logistics to ensure our premium rice reaches your warehouse in pristine, aromatic condition.",
    downloadBrochureLabel: "Download Brochure",
    talkToExpertLabel: "Talk to an Expert",
    inquiryDashboardTitle: "Inquiry Dashboard",
    monthlyCapacityLabel: "Monthly Capacity",
    monthlyCapacityValue: "15,000 MT",
    exportMarketsLabel: "Export Markets",
    exportMarketsValue: "45+ Countries",
    certificationsLabel: "Quality Certifications",
    certifications: ["ISO 9001", "HACCP", "FDA APPROVED", "HALAL"],
  },
  exportPageContent: {
    sub: "Export Capabilities",
    title: "Export Capabilities",
    desc: "Precision-engineered maritime logistics and strict quality control pipelines for international industrial partners.",
    cardMaritimeTitle: "Maritime Transport",
    cardMaritimeHeading: "Worldwide Shipping",
    cardMaritimeDesc: "Seamless multimodal container transportation from Port Qasim and Karachi Port to any major maritime destination globally, ensuring moisture protection and grain structure integrity.",
    incoterms: ["FOB", "CIF", "CFR", "DDP"],
    cardDocHeading: "Clear Documentation",
    cardDocDesc: "Full transparency with comprehensive export paperwork, customs clearance, and phytosanitary certificates.",
    docs: ["Bill of Lading (B/L)", "Certificate of Origin (COO)"],
    cardQcHeading: "Strict Quality Control",
    cardQcDesc: "Rigorous 3-tier testing protocols for moisture ratios, DNA varietal purity, and average grain length before every dispatch load.",
    cardQcBadge: "99.8% Batch Pass Rate",
    cardLogisticsHeading: "Logistics Technology",
    cardLogisticsDesc: "Real-time tracking systems and humidity-controlled storage silos to preserve distinct basmati aroma, freshness, and prevent pest infestation.",
    cardLogisticsImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA21jYnDTPsY0ZS0TVOGaXDIST2cUmsZN9TLcQArtwH9BAKZOePZ3wFNse-lxdc_GqyWLt-bEjNBF_8Ygkr761yrVMKw9Ptaj3HKAU8JZIOQ4YoLOk72FDUurxUB_nqYkyGvVnG2T8Yds45nLOZ7tiHGOJkxgVbsgKzlUexVL7QMk8W2dCCxXQMLotzDASKueSlG7GTDxtn8sRSxoW4Q2dOfgspxtSRR50GEcq05sLov-X1CavkUL1toeePTsY4y0M11pVMaUIEhRk",
    chainTitle: "A Truly Global Supply Chain",
    chainDesc: "Operating from our core state-of-the-art facilities in Punjab, Pakistan, Liaqat Rice Mill has established a robust trade network spanning Europe, North America, the GCC countries, and Southeast Asia. We are more than simple exporters; we are trusted long-term partners in sovereign food security.",
    chainCountriesCount: "50+",
    chainCountriesLabel: "Countries Served",
    chainTonsCount: "200k",
    chainTonsLabel: "Tons Exported Annually",
    chainLiveVessel: "Vessel: Orient Grain V-24A",
    lifecycleSub: "Operational Flow",
    lifecycleTitle: "The Export Lifecycle",
    lifecycleDesc: "Our structured 4-step workflow guarantees transparent execution and timely dispatch.",
    lifecycleSteps: [
      { num: "01", title: "Quotation & Samples", desc: "Review our grades, request physical samples for laboratory analysis, and receive fixed-term volume pricing packages." },
      { num: "02", title: "Contractual Agreement", desc: "Letter of Credit (L/C) opening and formalization of shipping terms (Incoterms 2020) with our corporate legal and trade finance departments." },
      { num: "03", title: "Processing & Inspection", desc: "Custom milling, de-husking, polishing, and optical sortexing to your precise specifications, followed by SGS/BV third-party inspection certificates." },
      { num: "04", title: "Dispatch & Documentation", desc: "Sturdy secure loading at Karachi Port or Port Qasim, followed by immediate digital and physical document set transmission (BL, COO, Phytosanitary)." },
    ],
    certificationsSectionTitle: "Certified Quality for Global Markets",
    certificationsSectionDesc: "We strictly maintain the highest international standards for food safety, operational management, and plant inspection.",
    certificationBadges: [
      { name: "ISO 9001:2015", subtitle: "Quality Systems" },
      { name: "HACCP Certified", subtitle: "Food Safety" },
      { name: "FDA Registered", subtitle: "US Compliance" },
      { name: "HALAL Certified", subtitle: "Islamic Audit" },
    ],
  },
};

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

function mapApiProducts(raw: Record<string, unknown>[]): Product[] {
  if (!raw?.length) return DEFAULT_PRODUCTS;
  return raw.map((p) => ({ ...p, id: String(p.id || p.slug) })) as Product[];
}

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [banners, setBanners] = useState(DEFAULT_DATA.banners);
  const [legacySection, setLegacySection] = useState(DEFAULT_DATA.legacySection);
  const [globalStandards, setGlobalStandards] = useState(DEFAULT_DATA.globalStandards);
  const [globalFootprint, setGlobalFootprint] = useState(DEFAULT_DATA.globalFootprint);
  const [corePhilosophy, setCorePhilosophy] = useState(DEFAULT_DATA.corePhilosophy);
  const [millProcess, setMillProcess] = useState(DEFAULT_DATA.millProcess);
  const [ceoSection, setCeoSection] = useState(DEFAULT_DATA.ceoSection);
  const [productPageContent, setProductPageContent] = useState(DEFAULT_DATA.productPageContent);
  const [exportPageContent, setExportPageContent] = useState(DEFAULT_DATA.exportPageContent);
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);

  const applySections = useCallback((sections: Record<string, unknown>) => {
    if (sections.banners) setBanners(sections.banners as typeof DEFAULT_DATA.banners);
    if (sections.legacySection) setLegacySection(sections.legacySection as typeof DEFAULT_DATA.legacySection);
    if (sections.globalStandards) setGlobalStandards(sections.globalStandards as typeof DEFAULT_DATA.globalStandards);
    if (sections.globalFootprint) setGlobalFootprint(sections.globalFootprint as typeof DEFAULT_DATA.globalFootprint);
    if (sections.corePhilosophy) setCorePhilosophy(sections.corePhilosophy as typeof DEFAULT_DATA.corePhilosophy);
    if (sections.millProcess) setMillProcess(sections.millProcess as typeof DEFAULT_DATA.millProcess);
    if (sections.ceoSection) setCeoSection(sections.ceoSection as typeof DEFAULT_DATA.ceoSection);
    if (sections.productPageContent) setProductPageContent(sections.productPageContent as typeof DEFAULT_DATA.productPageContent);
    if (sections.exportPageContent) setExportPageContent(sections.exportPageContent as typeof DEFAULT_DATA.exportPageContent);
  }, []);

  const refreshFromBackend = useCallback(async () => {
    try {
      const [contentRes, productsRes] = await Promise.all([
        fetchAllContent(),
        fetchProducts(),
      ]);
      if (contentRes.sections && Object.keys(contentRes.sections).length > 0) {
        applySections(contentRes.sections);
      }
      setProducts(mapApiProducts(productsRes));
    } catch (e) {
      console.warn("Backend unavailable, using default data", e);
    } finally {
      setLoading(false);
    }
  }, [applySections]);

  useEffect(() => {
    refreshFromBackend();
  }, [refreshFromBackend]);

  const getSectionValue = (key: SectionKey): unknown => {
    switch (key) {
      case "banners": return banners;
      case "legacySection": return legacySection;
      case "globalStandards": return globalStandards;
      case "globalFootprint": return globalFootprint;
      case "corePhilosophy": return corePhilosophy;
      case "millProcess": return millProcess;
      case "ceoSection": return ceoSection;
      case "productPageContent": return productPageContent;
      case "exportPageContent": return exportPageContent;
      default: return null;
    }
  };

  const updateData = (key: string, value: unknown) => {
    switch (key) {
      case "banners":
        setBanners(value as typeof DEFAULT_DATA.banners);
        break;
      case "legacySection":
        setLegacySection(value as typeof DEFAULT_DATA.legacySection);
        break;
      case "globalStandards":
        setGlobalStandards(value as typeof DEFAULT_DATA.globalStandards);
        break;
      case "globalFootprint":
        setGlobalFootprint(value as typeof DEFAULT_DATA.globalFootprint);
        break;
      case "corePhilosophy":
        setCorePhilosophy(value as typeof DEFAULT_DATA.corePhilosophy);
        break;
      case "millProcess":
        setMillProcess(value as typeof DEFAULT_DATA.millProcess);
        break;
      case "ceoSection":
        setCeoSection(value as typeof DEFAULT_DATA.ceoSection);
        break;
      case "productPageContent":
        setProductPageContent(value as typeof DEFAULT_DATA.productPageContent);
        break;
      case "exportPageContent":
        setExportPageContent(value as typeof DEFAULT_DATA.exportPageContent);
        break;
      default:
        return;
    }
  };

  const saveSection = async (key: SectionKey) => {
    const value = getSectionValue(key);
    await apiSaveSection(key, value);
  };

  const resetToDefault = () => {
    setBanners(DEFAULT_DATA.banners);
    setLegacySection(DEFAULT_DATA.legacySection);
    setGlobalStandards(DEFAULT_DATA.globalStandards);
    setGlobalFootprint(DEFAULT_DATA.globalFootprint);
    setCorePhilosophy(DEFAULT_DATA.corePhilosophy);
    setMillProcess(DEFAULT_DATA.millProcess);
    setCeoSection(DEFAULT_DATA.ceoSection);
    setProductPageContent(DEFAULT_DATA.productPageContent);
    setExportPageContent(DEFAULT_DATA.exportPageContent);
    setProducts(DEFAULT_PRODUCTS);
  };

  return (
    <AdminDataContext.Provider
      value={{
        banners,
        legacySection,
        globalStandards,
        globalFootprint,
        corePhilosophy,
        millProcess,
        ceoSection,
        productPageContent,
        exportPageContent,
        products,
        loading,
        updateData,
        saveSection,
        resetToDefault,
        refreshFromBackend,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};
