export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  property: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Purchasing at The Meridian was one of the most significant decisions of my life, and Akon Homes made the process feel effortless. The quality of the finished home exceeded every expectation — there is a level of care in the details that you simply do not find elsewhere in the Nigerian market.",
    author: "Oluwafemi Adebayo",
    title: "Managing Director, Adebayo Capital",
    property: "The Meridian Residences",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "After years of looking at premium properties in London and Lagos, we found that Akon Homes offered something different — genuine international quality rooted in the Nigerian context. Our villa at Riviera is everything we hoped it would be, and the after-care service has been exceptional.",
    author: "Ngozi Okafor-Williams",
    title: "Barrister, Inner Temple",
    property: "Riviera Villas",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The Crestline penthouse represents the finest residential property I have owned in any market globally. The views, the finishes, the service — Akon Homes has demonstrated that African developers can produce work that competes with the very best in London and New York.",
    author: "Chukwuemeka Obi",
    title: "Founder, Obi Global Investments",
    property: "The Crestline Tower",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "We were diaspora buyers making a significant investment from the UK. The transparency and professionalism of the Akon Homes team gave us complete confidence throughout. They understand international buyers, and they delivered exactly what they promised.",
    author: "Dr. Amara Nwachukwu",
    title: "Consultant Cardiologist, NHS",
    property: "The Meridian Residences",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "What distinguishes Akon Homes is not just the quality of their buildings but the integrity of their process. They told us exactly what to expect and delivered on every commitment. In a market where trust is hard-won, they have earned ours completely.",
    author: "Senator Babatunde Fashola-Martins",
    title: "Former State Commissioner",
    property: "Riviera Villas",
    rating: 5,
  },
];
