export interface Product {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  grade: string;
  age: string;
  length: string;
  moisture: string;
  broken: string;
  admixture: string;
  purity: string;
  polishing: string;
  testingMethodMoisture: string;
  testingMethodBroken: string;
  testingMethodAdmixture: string;
  testingMethodPurity: string;
  testingMethodPolishing: string;
  description: string;
  fullDescription: string;
  image: string; // Detail image
  catalogImage: string; // Catalog grid image
  category: "Basmati" | "Non-Basmati" | "Sella" | "Premium Export";
  badges: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
  iconName: "Sprout" | "Sparkles" | "Layers" | "Globe" | "Filter" | "Heart" | "Shield";
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "super-basmati",
    name: "Super Basmati",
    title: "Super Basmati",
    subtitle: "The King of Grain",
    grade: "GRADE A+",
    age: "2 Years",
    length: "7.2mm+",
    moisture: "Under 12% Max",
    broken: "Under 2% Max",
    admixture: "0.5% Max",
    purity: "95% Pure Basmati",
    polishing: "Silk Double Polished",
    testingMethodMoisture: "ISO 712:2009",
    testingMethodBroken: "Visual & Sieve Analysis",
    testingMethodAdmixture: "Purity Verification",
    testingMethodPurity: "DNA Fingerprinting",
    testingMethodPolishing: "Mechanical Friction",
    description: "The pinnacle of aromatic rice, known for its distinct fragrance and non-sticky texture. Perfect for high-end retail and gourmet culinary applications.",
    fullDescription: "Meticulously harvested from the fertile plains at the foothills of the Himalayas, our Super Basmati is renowned for its incomparable aroma and slender, elongated profile that doubles upon cooking. The natural aging process of two years enhances the distinctive nutty fragrance that has defined Basmati for centuries. Each grain releases a subtle, floral perfume upon steaming, offering an unmatched sensory heritage.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9UZLsz0xDBIKAp1CAmJWcEEmjsICcEG6mHcUtj23_nLHc4fhaJs-brWSORVdkawq74hTvffxLLJgM6P5FTjTog2TwYxpyhQ5FpoTskpLwIWkRwHQmbc5H6MuEspxuY5FxojNcMSHZ8bq6EdtWmDslpqj9A03Ag2TM-M24mM5OlZXmUaLeoTF8Tr5RvHGiaPoDtXZTtsQXsnRj8R9Z8T8em6XSWYcwpqRCiK6u94dMTJuZFQfHd5tSf6XAkoFHcUt9ve19uoArrkQ",
    catalogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo93_lOTfLIOS5uTYqrzvJ-ztt4pUeCrPTTXjouncki1ukv0GqOGLHStO-xr9XEtofcnRbLfcTiRjBtSSsRAsbUhzOWucxnhfJ9JxywT8m9u1GyaCpw4W0JJrlgArKr0sNvLT2z_BM4-oVVDR4e7U-ai2K7SJQc11eIozrWveak35h71YH3WbRGT07v7M6BvIFP_kBE_fE0u_F-sODHtY893NONXDl4d0woGcQUF-yZktzdPx129LYQZuq1XTEHlhwdX5WUNDWo6A",
    category: "Basmati",
    badges: ["Aged Heritage", "Export Grade"]
  },
  {
    id: "pk-386",
    name: "PK-386 Long Grain",
    title: "PK-386 Long Grain",
    subtitle: "Everyday Luxury Dining",
    grade: "PREMIUM",
    age: "1 Year",
    length: "6.8mm",
    moisture: "Under 12.5% Max",
    broken: "Under 5% Max",
    admixture: "1.0% Max",
    purity: "90% Pure Long Grain",
    polishing: "Silk Polished",
    testingMethodMoisture: "ISO 712:2009",
    testingMethodBroken: "Mechanical Sorting",
    testingMethodAdmixture: "Optical Verification",
    testingMethodPurity: "Grain Sizing analysis",
    testingMethodPolishing: "Friction Milling",
    description: "A versatile long grain variety favored for its excellent cooking results and uniform appearance. Ideal for Middle Eastern and African markets.",
    fullDescription: "Ideal for everyday luxury dining, PK-386 provides excellent elongation and a fluffy, dry texture at a highly competitive value. Cultivated in the fertile canal-irrigated districts of Punjab, this non-basmati long-grain rice is processed in our state-of-the-art mills with precision silk polishing, delivering a clean, pearlescent finish that is perfect for biryanis and everyday rice dishes.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2cZQnVbeKCax7fDYR6dRSb4De8Plk-Ljf_4MOG8ZJewAJaAzxkvZBACStxg7sxc-_T27ENy4InhTij_UJ1qM5x9OtzHfSJ5Ybtjf2YtyhfQz4rEvwNqXdCkx2udrPaBmSCyHPnb6xIK_XNMnVMoOT7bnfQT0JuFhK6Z_mSEuYFIxWcGM45sCKSv8rbdf69bnWb3eNEdmgm2vZLHja3zXpMMMwndN83SQ_5ys0_e_SWPHSTgI0YjqYcXPa1UYDYNwHhdeT_qH82Nw",
    catalogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCS7ZnVH79KBVGEEssJrr9LIyQhZpJimNTP568LfwPF0-CKSTzHcAiOFCvaPFkkhTvqqpJYnqQMMRvLO6r9sb8BZlST_x7VcGi6_uTdVeu79JejpaVt2EpqY33u6-UNIrhDCBzkNmST_WagmQI7PKtNsFeCo1EbCjV22-cKanc6yDfhhlV4C_AXNxGm2ywLDx8Nj70Tfps1cbA-HllIs-YeIC7tNeA5H7JZs7Gq9KPsPupe6O4NF4HwJAxm7M0NPf_4EjeOqHKP9ug",
    category: "Non-Basmati",
    badges: ["High Yield", "Premium Export"]
  },
  {
    id: "1121-sella",
    name: "1121 Sella Rice",
    title: "1121 Sella Rice",
    subtitle: "The Giant of Basmati",
    grade: "GOLDEN GRADE",
    age: "1.5 Years",
    length: "8.3mm+",
    moisture: "Under 11.5% Max",
    broken: "Under 1% Max",
    admixture: "0.2% Max",
    purity: "98% Pure 1121 Basmati",
    polishing: "Double Silk Polished",
    testingMethodMoisture: "ISO 712:2009",
    testingMethodBroken: "Laser Sortexed",
    testingMethodAdmixture: "Handpicked Sorting",
    testingMethodPurity: "DNA Fingerprinting",
    testingMethodPolishing: "Steam Parboiling & Polish",
    description: "The world's longest grain rice, steam-processed to maintain structural integrity and a robust, golden appearance during commercial cooking.",
    fullDescription: "World-renowned for its incredible grain length (exceeding 8.3mm) and magnificent expansion upon cooking, 1121 Sella (Golden Parboiled) is the premium choice for professional chefs and caterers. Our advanced steaming process ensures that nutrients are locked deep inside the grain core while strengthening its physical structure, guaranteeing zero broken grains and fluffy, non-sticky separation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMbuAvlmWo3ssbTbZzNKs974Iodhx1T8JPEdzRubEygM-oRaQJZZVgypZkQdkIa9m1UukCJaWXWtleC70aTnqMghk007WgMOoDzCUUfWZb7uIhaYNmaCHmyjSfQd0S8RepztFkQnWxpIb9zcpHoWWsDBfEMSBkGDPnVGjFEp5wq_-jcMgo9mYJtWm7cVp5WC0D1vNNMOiE5TJZjoUFK5lK3OEvS4MGpRYIJfeBzcmNbwnNjMO2Jsio4G3HzMbx3xs26OifwJH2T_0",
    catalogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDteVDnGsERVxI6yYoWvkSgPSuifnhnYPpz0Y2JWJDMwQSp1LeLoMoihgJsOGyqA6Hc1JPp2kHp3BDpE6Y4A3a8Wa7k97TRHbAaPjYVuhuXeiNdh39rdtvQelMxmcFrAzR1MRxpf25pxYBW50t8Ih2OnAqlIf8GvmJyORaAldGuQHQhesGpZB2gXztU5gTwTCW1M2OrsxIx_LXcLF0idOtiUErIv7gwlrwvJP5kx6BJi34KOfEEagp37C3exwW-GnO_LvKFfHYcVC0",
    category: "Sella",
    badges: ["King of Grain", "Premium Export"]
  },
  {
    id: "brown-basmati",
    name: "Brown Basmati",
    title: "Brown Basmati",
    subtitle: "Organic Wholesome Goodness",
    grade: "ORGANIC",
    age: "1 Year",
    length: "7.0mm",
    moisture: "Under 12% Max",
    broken: "Under 2% Max",
    admixture: "0.5% Max",
    purity: "100% Organic Basmati",
    polishing: "Unpolished Husk",
    testingMethodMoisture: "Moisture Analyzer",
    testingMethodBroken: "Sieve Sizer",
    testingMethodAdmixture: "Purity Assay",
    testingMethodPurity: "Certified Organic Audit",
    testingMethodPolishing: "De-husking Only",
    description: "Health-conscious choice with the full nutritional benefit of the bran layer. Retains all the aroma of Basmati with a nutty flavor finish.",
    fullDescription: "Our unpolished Brown Basmati retains the natural bran layer and germ, offering a nutrient-dense profile rich in dietary fiber, essential vitamins, and minerals. Cultivated using strictly organic farming methods, it carries an appealing rustic earthy flavor and a nutty, chewy texture while delivering the glorious signature fragrance of authentic Himalayan Basmati.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA17u6l6zcqJ04AL4tTcteXHr2uMJK-rVE6Qkc4XAl-Z-ESGRAJaJ8qs91fqYFCsav5Xisrtppo6G-ala3LpxSN0Co70BpUbbz-AzrziJTyBRCQiTWPjLfHH6RPAMtaCXf4zgO8Yu1ug6spbSRwNUfS6GTE0NZWjseV30Sj5d_7yFhyNclBTp807g6kydK6cTW1GilbohZWnvhiBTl9KlUz2X46QMoL95pdb-dIsZRk-Fa1vpoo6cxDh2tAo2i7ks9xHefTKtTSOVk",
    catalogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTz-D-8ChmWhplN8-NvgCc342eb0eOlyayaOr9TqAVGxWF-2_kbEhAUy_PKMX0R6KHKvUGQgO5gCOtEO0AKERONdBLwd0ZkxavCJhM-ejvxnGX8MrEmzW71QPDsoFc-keGjSvFGBJCgqk4sYQGf4v-wpmnAUYEYBpAIAz4dQvxOPllRE8iqsEsPgWcZkRIoNqNGYwLnXZ57zJTfnCor_5eIqFsS0CW6sJLUhifrF282ood3ClA59YdKIaK8qoOP1TmIvv_yf9UdwA",
    category: "Basmati",
    badges: ["Whole Grain", "Organic"]
  },
  {
    id: "irri-6-white",
    name: "IRRI-6 White Rice",
    title: "IRRI-6 White Rice",
    subtitle: "Global Staple Food",
    grade: "EXPORT STANDARD",
    age: "6 Months",
    length: "6.0mm",
    moisture: "Under 14% Max",
    broken: "Under 5% Max",
    admixture: "1.5% Max",
    purity: "100% Pure IRRI-6",
    polishing: "Silk Polished",
    testingMethodMoisture: "ISO 712:2009",
    testingMethodBroken: "Optical Sorting",
    testingMethodAdmixture: "Sieving Analysis",
    testingMethodPurity: "Varietal Inspection",
    testingMethodPolishing: "Single Friction Polish",
    description: "The staple export variety for African and Asian markets. Known for its consistent quality and durability in long-distance shipping.",
    fullDescription: "IRRI-6 is a widely popular, medium-long non-basmati grain cultivated extensively in the southern regions of Pakistan. Extremely popular in West Africa, East Africa, and several parts of Asia, it is recognized for its sturdy structure, high energy value, and excellent cooking yield. Our silk-polishing and dual-pass optical sorting lines guarantee a dust-free, clean product optimized for global industrial distributions.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATaAwkO-VI4iA33kOYhgK56K46n6-qrJGkSrFGk6ifFdQawaIUbV_XV0nNM4I4yWF5FdiHp9JL4KYU-NlIvN6zyFb_VzxQgrSzRFC3TjOACmJqq0yOFDhrwr95GxEa1Aa9FRqm-Vv7WczST6tbZHaVfNr1K8EByM8k1bgzPCNQY5g9ujqlQvxyhv1Y5fVf0CO8UHYr35QX2vaHSRThwRB_BpiEvTYLtZDQv3rRg7_6zeaCIvMxptA3idIH4nIp7xEy1Ag8QrLtsH0",
    catalogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuATaAwkO-VI4iA33kOYhgK56K46n6-qrJGkSrFGk6ifFdQawaIUbV_XV0nNM4I4yWF5FdiHp9JL4KYU-NlIvN6zyFb_VzxQgrSzRFC3TjOACmJqq0yOFDhrwr95GxEa1Aa9FRqm-Vv7WczST6tbZHaVfNr1K8EByM8k1bgzPCNQY5g9ujqlQvxyhv1Y5fVf0CO8UHYr35QX2vaHSRThwRB_BpiEvTYLtZDQv3rRg7_6zeaCIvMxptA3idIH4nIp7xEy1Ag8QrLtsH0",
    category: "Non-Basmati",
    badges: ["Global Favorite", "High Durability"]
  },
  {
    id: "c1-broken",
    name: "C-1 Broken Rice",
    title: "C-1 Broken Rice",
    subtitle: "Precision Sorted Industrial Grade",
    grade: "INDUSTRIAL",
    age: "N/A",
    length: "3.5mm",
    moisture: "Under 14% Max",
    broken: "100% Broken Grains",
    admixture: "0.5% Max",
    purity: "99% Pure Sortex Broken",
    polishing: "Double Polished",
    testingMethodMoisture: "ISO 712:2009",
    testingMethodBroken: "Vibratory Sieving",
    testingMethodAdmixture: "Optical Sortex Inspection",
    testingMethodPurity: "Debris Gravimetric Test",
    testingMethodPolishing: "Dual-mill Polish",
    description: "Specifically processed for food processing industries, brewing, and flour manufacturing with optical sorting.",
    fullDescription: "C-1 Broken Rice represents the clean, shattered grains extracted during the precision milling of first-grade long-grain white rice. This starch-rich product undergoes double polishing and advanced optical laser sorting (Sortex) to remove all foreign matter, black spots, and impurities. Highly prized by food manufacturing groups, industrial bakers, and starch processing plants globally.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwEhnUrQV2L7YFa4ZlLPz-UHifpZPeaq1W81Al7SLWlnJ-XHTArXKdRJRdQVTjV78fpIvh6xUhgAQDH9YfdNjZetMbWv-zHdAcLE0UGINRDQllck7ZVAGej7FH-670Vto_SCR58qYiCnrpN0zuJ3jXPWp9xF8U_Pl5_OPia0f4ofHY8wGSQEW6aqs0VWd-d7N3_dQdvD4UhhO1aHIIGVuKVehZ7upFJQNmbY1G8l4-wuIoQfRky7Ah8GML9Xks5i0b1kzVpV73e_E",
    catalogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwEhnUrQV2L7YFa4ZlLPz-UHifpZPeaq1W81Al7SLWlnJ-XHTArXKdRJRdQVTjV78fpIvh6xUhgAQDH9YfdNjZetMbWv-zHdAcLE0UGINRDQllck7ZVAGej7FH-670Vto_SCR58qYiCnrpN0zuJ3jXPWp9xF8U_Pl5_OPia0f4ofHY8wGSQEW6aqs0VWd-d7N3_dQdvD4UhhO1aHIIGVuKVehZ7upFJQNmbY1G8l4-wuIoQfRky7Ah8GML9Xks5i0b1kzVpV73e_E",
    category: "Non-Basmati",
    badges: ["Precision Sortex", "High Starch Yield"]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Head of Global Export",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQLpBlWBIMgDP6Fj80PRPBFmEM3roZFBEpU0aRRi4iCv9LTikAW0AteK9wLIqlTKkUXr95gyaFOHdQOF_0eXwrktT1qC6W7l_jTg7YgJND-GpIeZm14pVu76w41jE4vjxKhzIyqRyfSFYLDPsfv6N1AzQmNnM9Or5a_jzQl5S0YvEEMlkB7qZ6BFweHgvKB18T9x2WZSIRlgfGdFiG0-onWulIgEZ3J7oI2gKdBWbtG-hKISm-k0mSwNJKvBxRk3yhkeuzq3fKCxg",
    bio: " Sarah manages Elite Grain's logistics channels, shipping networks, and compliance pathways to deliver premium products securely."
  },
  {
    name: "Arsalan Khan",
    role: "Quality Assurance Lead",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOq68qhOludEs0YGh4Zif4GYGyBPTjroFbKxwTLxrHcNk6srbjFHo0uvUDRwUCRPQ-2Yoo-tOQdbxa_Kc9vgWVkF2tI7hXsV4jHFCLKXGb2shCKYeeJxhE7SrI7x51Pu8G3VwmH9dTPZx2fTeX5vSC1A8DEpjfauswOyWys70pJksfkgzuHXYwTCMihoWPDhjBuMNGym0gmwDjeKgRFRiyPPuAOk-XZ3SWslWjlKUDBEp-qVP1Y8lgX2tJjsY75eb35LVfR673yyI",
    bio: "With a background in agricultural biochemistry, Arsalan oversees physical and genetic testing protocols in our high-tech laboratories."
  },
  {
    name: "Michael Reeves",
    role: "Master Miller",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRQi1ew1jR6sTMAOfZsFpjOebLxiiBo3YYQragnfnjSHpN1GkYpRasU_cXLkCdJUy4bhESh3ixptI2SGzJRThSW0cKErtm4jclnLKB1rVqlZn3xcjqzrCKbZCTmNphRidDEuBd1ikRj_3f5tlBQ99DlOYVWDQ5f1v60vJidE_7zKLM6vk4Qy6SQgJAUdf8o7nbKnMjPKS_dztag-ls6RdioLGKAXoj1oeThS3d4VRJ7CAMy5Lhave22EsQlEgC-AVfcl4KpG3iX50",
    bio: "Michael leads our mechanical processing units, calibrating the dual-pass silk polishers and precision Sortex scanners."
  },
  {
    name: "Elena Rodriguez",
    role: "Logistics Operations",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfDS5jL1LJBYhjoXDvaGcQy8GYqP-ZyDvjfP4bMLHhU7LenWfMxFrk6aqkgkL469hxh9O8koU22C6zdsv4SPQ5AHEJQZ2N2YhziZpVt5D2C6CGgDg5RD-AhEWY1L6u0VEp3jxUCasfEP4l-aUcHf5vD0jxe-QEH_ud5R6Q-DMN-IntvtH4gp-RFiytppvv9OvHm0MmtTLlp8A08mGO4is-D6kgqzKUVs05wOtqjKw1Q1eBSPnUqZfLMzlb1HTgKtOoLfefxj--kvs",
    bio: "Elena handles the documentation pipeline, coordinating customs clearance and phytosanitary licensing with global authorities."
  }
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: "01",
    title: "Procurement",
    description: "We source directly from the fertile Indus basins, selecting only the highest grade paddy through rigorous field inspections and fair-trade partnerships with generation-linked farmers.",
    iconName: "Sprout",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLVvGgdAsmBzO-VvPWl-c5-TKQcfcZSyX89KZHDK-x-PFiXPxuvcll7zq_LeB1HNedMzQtbAoGCnf_tAaw0xlTSUZEQjPBHSR9ESPrNrhhHvntC-whzCU2qDjN4z6QMFNn0Y3cPfRojPiMuh5le0HOSpctbo-tzznY4-v8qvPjJgIsuw4n4nm4fdHZ-EZ2va6IptS8xBQpc4voh8eg5ZS2y1eopFnbIDJ5TpBd1As87SEzDwKqwSEb6b6iwyMRiY_vvUpUoz1M-10"
  },
  {
    step: "02",
    title: "Cleaning & Processing",
    description: "Using Buhler-grade technology, grains undergo a multi-stage cleaning process to remove physical impurities, dust, and husks without cracking the delicate pearlescent grain core.",
    iconName: "Filter",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACKG-lspG-EqqXdJe0PQntUcvhmlqk2a4mH2CTdDiQE-vTfNBowb8R1qcJsNyXDgY_dAfLAR1jqHk2OTalQnZ7-QrQqg1lZ6Fi6b9HwAuorScVWMlGijxta9LDaQrGUrYDLi8rZcvbtyelm7ikFcyEPNiWOfYJJeZCEaA0wKBXI0QUUbGoN05YOL9V0XOqBHC3972NrYyYDe7c1BDLArebRqKlx5pFKPPo8VsoFt70v5WHWI-BsJTo2nFejWC5JrDxoewTdDtcFLM"
  },
  {
    step: "03",
    title: "Grading & Packaging",
    description: "Advanced CCD laser sorters analyze every single grain, checking length consistency and optical color purity. Grains are then nitrogen-flushed and packaged into moisture-sealed bags.",
    iconName: "Layers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-1JRltra9UPwcCgyOaowLG6qT2eSN8kSGQVkblK9XKkujEFiFuwMk3VNQJs1N8CzTYVvHjsdVhP8TRVjUIfYjGgQHLwkX6gVYrEcsAezvz1TOHOl2bGM1QXmVKonsw6T1nPDlELpiAIwr6EsKKM1inmAT5BsFWOUcwSGMCHuFb6wtO0H7fzkWom4ITaqwWh_snTApQp7uoBSbM3c85NhJXkIi35lCNLikJJarSCckPbWIh1hrEbO74pC8MhaZ6UFezdsnk5xJVtg"
  },
  {
    step: "04",
    title: "Global Export",
    description: "From Port Qasim and Karachi Port to ports worldwide, we coordinate the complete logistics chain, maritime freight, and customs documentation for flawless delivery.",
    iconName: "Globe",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIiQAPb-BQn4uT1fwlwbU3h05lcoQpQe3N-5c2QNk-Mq_r8PkHJEFu1K38P5NRPMFER097zOXuQ1i169M0x2iXyupWvTs40s9nktYCgDlxQC03Td2owqhjrRF5z84_yiz-EVKo16_yNrbuBnnC2JjykEUYyGA2GmGdAZ1Rjnov_WaA5d-UDkBvJup80sZwpzn5WtwXzcDnCUGg0F7CIOZLZzJed_OtQ_4E1gAp_gcCg8Af3iMOOMeWYhn3zJ8qd4MnpvlN0a5JmV4"
  }
];
