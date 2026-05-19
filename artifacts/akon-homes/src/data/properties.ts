export interface Property {
  id: string;
  name: string;
  location: string;
  country: string;
  price: string;
  priceFrom: number;
  status: "Now Selling" | "Coming Soon" | "Sold Out" | "Under Construction";
  type: "Apartments" | "Townhouses" | "Penthouses" | "Villas" | "Waterfront";
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  features: string[];
  image: string;
  images: string[];
  yearCompletion: string;
}

export const properties: Property[] = [
  {
    id: "meridian-residences",
    name: "The Meridian Residences",
    location: "Lagos Island, Nigeria",
    country: "Nigeria",
    price: "From $450,000",
    priceFrom: 450000,
    status: "Now Selling",
    type: "Apartments",
    beds: 3,
    baths: 3,
    sqft: 2100,
    description:
      "Rising above the vibrant skyline of Lagos Island, The Meridian Residences redefines contemporary luxury living. Each residence is a masterclass in refined design — floor-to-ceiling glazing frames panoramic ocean views, while bespoke interiors crafted from the finest materials set a new standard for Nigerian luxury real estate.",
    features: [
      "Panoramic ocean views",
      "Concierge service",
      "Infinity pool",
      "Private gym",
      "Underground parking",
      "24/7 security",
    ],
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85&auto=format&fit=crop",
    ],
    yearCompletion: "Q3 2026",
  },
  {
    id: "ashbourne-gardens",
    name: "Ashbourne Gardens",
    location: "Abuja, Nigeria",
    country: "Nigeria",
    price: "From $280,000",
    priceFrom: 280000,
    status: "Coming Soon",
    type: "Townhouses",
    beds: 4,
    baths: 4,
    sqft: 3400,
    description:
      "Nestled within the leafy corridors of Abuja's most prestigious enclave, Ashbourne Gardens offers an intimate collection of townhouses where architectural elegance meets natural serenity. Each home is set within a landscaped sanctuary, designed for families who demand the finest without compromise.",
    features: [
      "Private garden",
      "Rooftop terrace",
      "Smart home system",
      "Gated community",
      "Children's play area",
      "Clubhouse access",
    ],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=85&auto=format&fit=crop",
    ],
    yearCompletion: "Q1 2027",
  },
  {
    id: "crestline-tower",
    name: "The Crestline Tower",
    location: "London, United Kingdom",
    country: "United Kingdom",
    price: "From $1,200,000",
    priceFrom: 1200000,
    status: "Sold Out",
    type: "Penthouses",
    beds: 4,
    baths: 5,
    sqft: 4800,
    description:
      "A landmark address in one of London's most coveted postcodes. The Crestline Tower's penthouse collection occupies the uppermost floors of this award-winning building, commanding sweeping views across the Thames. Interiors by a celebrated European atelier; every detail chosen with obsessive precision.",
    features: [
      "Thames panorama",
      "Private lift lobby",
      "Wine cellar",
      "Cinema room",
      "Valet parking",
      "Residents' lounge",
    ],
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491892-03d54c37f5c8?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85&auto=format&fit=crop",
    ],
    yearCompletion: "Completed 2024",
  },
  {
    id: "riviera-villas",
    name: "Riviera Villas",
    location: "Lekki, Lagos, Nigeria",
    country: "Nigeria",
    price: "From $680,000",
    priceFrom: 680000,
    status: "Now Selling",
    type: "Villas",
    beds: 5,
    baths: 6,
    sqft: 5200,
    description:
      "An exclusive gated enclave of seven villas set along Lagos's coveted Atlantic coastline. Each villa is a private sanctuary of space and light — generous living volumes, private pools, and direct beach access create an unparalleled sense of escape within the city.",
    features: [
      "Private pool",
      "Direct beach access",
      "Staff quarters",
      "3-car garage",
      "Solar backup",
      "Private jetty",
    ],
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=1200&q=85&auto=format&fit=crop",
    ],
    yearCompletion: "Q2 2026",
  },
  {
    id: "parkview-heights",
    name: "Parkview Heights",
    location: "Maitama, Abuja, Nigeria",
    country: "Nigeria",
    price: "From $320,000",
    priceFrom: 320000,
    status: "Under Construction",
    type: "Apartments",
    beds: 2,
    baths: 2,
    sqft: 1650,
    description:
      "Positioned at the heart of Abuja's diplomatic district, Parkview Heights offers a curated collection of contemporary apartments for the discerning professional. Clean architectural lines, thoughtful layouts, and premium finishes create a home that works as hard as its residents.",
    features: [
      "Co-working lounge",
      "Rooftop garden",
      "Electric vehicle charging",
      "Concierge app",
      "Fitness studio",
      "Bicycle storage",
    ],
    image:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=900&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=85&auto=format&fit=crop",
    ],
    yearCompletion: "Q4 2026",
  },
  {
    id: "waterfront-collection",
    name: "The Waterfront Collection",
    location: "GRA, Port Harcourt, Nigeria",
    country: "Nigeria",
    price: "From $520,000",
    priceFrom: 520000,
    status: "Now Selling",
    type: "Waterfront",
    beds: 3,
    baths: 3,
    sqft: 2800,
    description:
      "Where the Niger Delta meets refined living. The Waterfront Collection is an architectural statement — a series of residences that blur the boundary between interior space and the natural spectacle of the waterway. Dramatic cantilevered decks, floor-to-ceiling glass, and handcrafted interiors.",
    features: [
      "Waterfront views",
      "Private marina access",
      "Floating deck",
      "Smart building system",
      "Spa and wellness",
      "Fine dining bistro",
    ],
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=85&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491892-03d54c37f5c8?w=1200&q=85&auto=format&fit=crop",
    ],
    yearCompletion: "Q1 2026",
  },
];
