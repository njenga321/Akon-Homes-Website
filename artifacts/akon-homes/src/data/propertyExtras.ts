// Extended content for Development Detail page
// Keyed by property ID; falls back to defaults for unlisted IDs

export interface FloorPlan {
  label: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  // SVG-based simplified floor plan layout descriptor
  rooms: { name: string; w: number; h: number; x: number; y: number }[];
}

export interface PaymentPlan {
  name: string;
  icon: string;
  deposit: string;
  installments: string;
  duration: string;
  highlight?: boolean;
}

export interface TimelinePhase {
  phase: string;
  label: string;
  date: string;
  done: boolean;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Landmark {
  name: string;
  category: string;
  distance: string;
  time: string;
}

export interface PropertyExtras {
  tagline: string;
  philosophy: string;
  lifestyle: string;
  units: number;
  acreage: string;
  completionDate: string;
  storeys: number;
  floorPlans: FloorPlan[];
  paymentPlans: PaymentPlan[];
  timeline: TimelinePhase[];
  faqs: FAQItem[];
  landmarks: Landmark[];
}

const defaultExtras: PropertyExtras = {
  tagline: "Where architecture meets aspiration.",
  philosophy:
    "Every line, every surface, every material choice has been made in service of a singular vision: to create a home that earns its place in the landscape and in history. We do not design to trends. We design to endure.",
  lifestyle:
    "Life here is lived at a different pace. Morning light fills rooms designed to harness it. Common spaces invite connection without demanding it. The city is close; its noise is not. This is what considered architecture can do.",
  units: 48,
  acreage: "2.4",
  completionDate: "Q3 2026",
  storeys: 22,
  floorPlans: [
    {
      label: "The Residence — 2 Bed",
      beds: 2,
      baths: 2,
      sqft: 1420,
      price: "From $320,000",
      rooms: [
        { name: "Living", w: 220, h: 130, x: 0, y: 0 },
        { name: "Kitchen", w: 110, h: 130, x: 220, y: 0 },
        { name: "Master", w: 165, h: 120, x: 0, y: 130 },
        { name: "Bed 2", w: 110, h: 120, x: 165, y: 130 },
        { name: "Bath 1", w: 55, h: 120, x: 275, y: 130 },
        { name: "Terrace", w: 330, h: 60, x: 0, y: 250 },
      ],
    },
    {
      label: "The Grand — 3 Bed",
      beds: 3,
      baths: 3,
      sqft: 2100,
      price: "From $450,000",
      rooms: [
        { name: "Living", w: 200, h: 140, x: 0, y: 0 },
        { name: "Dining", w: 130, h: 140, x: 200, y: 0 },
        { name: "Kitchen", w: 120, h: 140, x: 0, y: 140 },
        { name: "Master", w: 180, h: 130, x: 120, y: 140 },
        { name: "Ensuite", w: 50, h: 130, x: 300, y: 140 },
        { name: "Bed 2", w: 110, h: 110, x: 0, y: 280 },
        { name: "Bed 3", w: 110, h: 110, x: 110, y: 280 },
        { name: "Bath", w: 60, h: 110, x: 220, y: 280 },
        { name: "Terrace", w: 350, h: 70, x: 0, y: 390 },
      ],
    },
    {
      label: "The Penthouse",
      beds: 4,
      baths: 4,
      sqft: 3800,
      price: "From $980,000",
      rooms: [
        { name: "Grand Salon", w: 280, h: 160, x: 0, y: 0 },
        { name: "Chef's Kitchen", w: 140, h: 160, x: 280, y: 0 },
        { name: "Master Suite", w: 200, h: 140, x: 0, y: 160 },
        { name: "Dressing", w: 80, h: 140, x: 200, y: 160 },
        { name: "Ensuite", w: 70, h: 140, x: 280, y: 160 },
        { name: "Bed 2", w: 130, h: 120, x: 0, y: 300 },
        { name: "Bed 3", w: 130, h: 120, x: 130, y: 300 },
        { name: "Bed 4", w: 100, h: 120, x: 260, y: 300 },
        { name: "Wrap Terrace", w: 420, h: 80, x: 0, y: 420 },
      ],
    },
  ],
  paymentPlans: [
    {
      name: "Standard",
      icon: "🏠",
      deposit: "30%",
      installments: "70% on completion",
      duration: "On completion",
      highlight: false,
    },
    {
      name: "Flexible",
      icon: "📅",
      deposit: "20%",
      installments: "5% quarterly",
      duration: "24 months",
      highlight: true,
    },
    {
      name: "Extended",
      icon: "📋",
      deposit: "10%",
      installments: "3% monthly",
      duration: "36 months",
      highlight: false,
    },
  ],
  timeline: [
    { phase: "01", label: "Foundation & Substructure", date: "Completed", done: true },
    { phase: "02", label: "Structural Frame", date: "Completed", done: true },
    { phase: "03", label: "External Envelope", date: "In Progress", done: false },
    { phase: "04", label: "MEP Installation", date: "Q1 2026", done: false },
    { phase: "05", label: "Interior Fit-Out", date: "Q2 2026", done: false },
    { phase: "06", label: "Practical Completion", date: "Q3 2026", done: false },
  ],
  faqs: [
    {
      q: "What documents do I need to purchase?",
      a: "For Nigerian residents, you will need a valid government-issued ID, proof of address, and your TIN (Tax Identification Number). Diaspora buyers require a valid passport. Our sales team handles all documentation and will guide you through each step of the conveyancing process.",
    },
    {
      q: "Can I purchase off-plan and what are the benefits?",
      a: "Yes. Off-plan purchases give access to early-bird pricing — typically 10–15% below completion pricing — and the best selection of units. You benefit from capital appreciation during the construction period. Our payment plans are structured to make off-plan purchasing accessible.",
    },
    {
      q: "Are mortgage or financing options available?",
      a: "We have partnerships with several leading Nigerian and diaspora-focused banks to offer preferential mortgage terms for qualifying buyers. Our sales advisors can introduce you to partner lenders. Dollar-denominated financing is also available through select international banks.",
    },
    {
      q: "What is included in the service charge?",
      a: "The service charge covers building maintenance, landscaping, security, common area utilities, lift maintenance, and management. It is calculated per square metre annually and will be confirmed at exchange of contracts. Our management team operates transparently with annual accounts provided to all residents.",
    },
    {
      q: "Can I let my apartment as an investment property?",
      a: "Yes. Akon Homes properties have consistently achieved strong occupancy rates. We offer an optional managed letting service through our property management division, providing end-to-end rental management including tenant sourcing, rent collection, and maintenance coordination.",
    },
    {
      q: "What warranty does the development carry?",
      a: "All Akon Homes developments carry a 10-year structural warranty and a 2-year defects liability period. Mechanical, electrical, and plumbing installations carry separate manufacturer warranties. Our after-care team remains available for the lifetime of the building.",
    },
  ],
  landmarks: [
    { name: "Lagos Business District", category: "Business", distance: "1.2km", time: "5 min drive" },
    { name: "Victoria Island Beach", category: "Leisure", distance: "0.8km", time: "3 min drive" },
    { name: "Four Seasons Hotel", category: "Hospitality", distance: "0.4km", time: "2 min walk" },
    { name: "Eko Atlantic City", category: "Development", distance: "2.1km", time: "8 min drive" },
    { name: "International Airport", category: "Transport", distance: "18km", time: "25 min drive" },
    { name: "Premium Schools Hub", category: "Education", distance: "1.5km", time: "6 min drive" },
  ],
};

// Property-specific overrides (partial)
const propertyOverrides: Partial<Record<string, Partial<PropertyExtras>>> = {
  "meridian-residences": {
    tagline: "Lagos's new pinnacle of residential design.",
    units: 64,
    acreage: "1.8",
    completionDate: "Q3 2026",
    storeys: 28,
    landmarks: [
      { name: "Victoria Island CBD", category: "Business", distance: "0.6km", time: "4 min walk" },
      { name: "Bar Beach", category: "Leisure", distance: "1.1km", time: "5 min drive" },
      { name: "The Wheatbaker Hotel", category: "Hospitality", distance: "0.3km", time: "2 min walk" },
      { name: "Eko Atlantic City", category: "Development", distance: "2.4km", time: "9 min drive" },
      { name: "Murtala International", category: "Transport", distance: "20km", time: "28 min drive" },
      { name: "American International School", category: "Education", distance: "2.0km", time: "7 min drive" },
    ],
  },
  "riviera-villas": {
    tagline: "Seven villas. One Atlantic coastline.",
    units: 7,
    acreage: "3.6",
    completionDate: "Q2 2026",
    storeys: 3,
  },
  "crestline-tower": {
    tagline: "The Thames on your horizon. London at your feet.",
    units: 32,
    acreage: "0.9",
    completionDate: "Completed 2024",
    storeys: 34,
    landmarks: [
      { name: "Canary Wharf", category: "Business", distance: "0.5km", time: "6 min walk" },
      { name: "Thames Path", category: "Leisure", distance: "0.1km", time: "2 min walk" },
      { name: "Four Seasons Canary Wharf", category: "Hospitality", distance: "0.4km", time: "5 min walk" },
      { name: "Westfield Stratford", category: "Retail", distance: "3.2km", time: "12 min tube" },
      { name: "Heathrow Airport", category: "Transport", distance: "34km", time: "45 min tube" },
      { name: "City of London School", category: "Education", distance: "3.8km", time: "15 min tube" },
    ],
  },
};

export function getPropertyExtras(id: string): PropertyExtras {
  const override = propertyOverrides[id] ?? {};
  return { ...defaultExtras, ...override };
}
