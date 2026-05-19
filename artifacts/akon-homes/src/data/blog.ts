export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "rise-of-luxury-real-estate-nigeria",
    title: "The Rise of Luxury Real Estate in Nigeria: What's Driving Demand",
    excerpt:
      "Nigeria's high-end property market is experiencing a remarkable renaissance. We examine the economic, social, and demographic forces reshaping what it means to live and invest in premium Nigerian real estate.",
    category: "Market Insight",
    author: "Adebola Okonkwo",
    authorTitle: "Head of Research",
    date: "March 18, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85&auto=format&fit=crop",
    content: `The Nigerian luxury real estate market has undergone a profound transformation over the past decade. Where once the definition of premium property was confined to a handful of Lagos addresses, today's high-end buyers are sophisticated, well-travelled, and uncompromisingly discerning.

What has changed? Three forces converge: a growing population of ultra-high-net-worth Nigerians who demand world-class living standards domestically, a large diaspora returning with international expectations, and a new generation of local professionals who will not accept the quality gap that defined their parents' era.

The infrastructure question — long the Achilles heel of Nigerian luxury development — is being answered by developers who build their own ecosystem. Backup power, water treatment, high-speed connectivity, and security are no longer differentiators; they are baseline requirements. The conversation has moved upward to design philosophy, material provenance, and the quality of the human experience within these spaces.

International developers have begun to take notice. Joint ventures between Nigerian and European firms are bringing genuine expertise in sustainable construction, acoustic engineering, and wellness-integrated design to markets that were previously served only by imitations of international trends.

The demographic tailwind is significant. Nigeria's middle class is projected to reach 80 million by 2030. Within that, the premium tier — those capable of and interested in luxury home ownership — is growing at roughly double the rate of the broader middle class. This cohort is younger, more globally connected, and places enormous weight on living environment as an expression of identity.`,
  },
  {
    slug: "design-philosophy-behind-meridian",
    title: "Architecture as Aspiration: The Design Philosophy Behind The Meridian",
    excerpt:
      "Our creative director reveals the thinking that shaped The Meridian Residences — from the angle of the facade to the sourcing of every stone. A conversation about beauty, permanence, and the responsibility of building.",
    category: "Design",
    author: "Chidinma Eze",
    authorTitle: "Creative Director",
    date: "February 4, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85&auto=format&fit=crop",
    content: `When we began work on The Meridian, we asked ourselves a question that sounds simple but proved profoundly difficult to answer: what does it mean to build something worthy of the Nigerian landscape?

The easy answer is to import European or American luxury vernacular wholesale. The skylines of many African cities are crowded with buildings that could exist anywhere on earth — curtain walls, generic lobbies, hotel-like common areas that feel managed rather than lived in. We were determined to build something that could only exist here.

That determination shaped every decision, from the orientation of the building to maximise the prevailing coastal breeze, reducing mechanical cooling requirements without sacrificing comfort, to the selection of local craftspeople who carved the feature wall in the main lobby — a relief that references the geometric patterns of Yoruba architectural tradition.

The facade is perhaps where this dialogue between the global and the local is most visible. We worked with a Portuguese ceramics studio to develop a tile system inspired by traditional Nigerian textile patterns — the kind of depth and craft that rewards sustained attention, that changes as the light moves across it throughout the day.

Inside, we commissioned a series of works from Nigerian artists at various stages of their careers — not as decoration but as an integral part of the architectural programme. Art is woven into the experience of moving through the building.

The result, we hope, is a building that feels genuinely of its place — one that future generations will look at and understand as an expression of Nigeria at its most assured and ambitious.`,
  },
  {
    slug: "investing-in-nigerian-property-guide",
    title: "A Serious Buyer's Guide to Investing in Nigerian Property in 2025",
    excerpt:
      "From due diligence to title verification, currency considerations to rental yield expectations — everything an informed investor needs to know before committing capital to the Nigerian real estate market.",
    category: "Investment",
    author: "Emeka Nwosu",
    authorTitle: "Director of Sales",
    date: "January 22, 2025",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=85&auto=format&fit=crop",
    content: `Investing in Nigerian real estate can be one of the most rewarding decisions an investor makes. It can also be one of the most costly mistakes if approached without rigour. This guide is written for serious buyers who want neither rose-tinted optimism nor paralysing caution — but the clear-eyed assessment they need to make an informed decision.

The first principle is title. Nigeria's land tenure system, governed by the Land Use Act of 1978, vests all land in the Governor of each state. This means what you are purchasing is in practice a leasehold — typically 99 years — rather than freehold in the conventional sense. The key document is the Certificate of Occupancy (C of O), issued by the relevant state government. Any purchase without a perfected C of O or at minimum a Governor's Consent on a deed of assignment is a purchase at significant legal risk.

Currency is the second critical variable. For diaspora or international buyers transacting in foreign currency, the Nafex (Investors and Exporters) window rate governs most formal transactions. Gains in Naira terms can be eroded by exchange rate movements — but the converse is also true, and many dollar-denominated transactions in Lagos have proved excellent hedges against Naira weakness over the medium term.

Rental yields in Lagos prime locations currently range from 5-8% gross, with some commercial areas delivering higher. Net yields after service charges, management fees, and occasional vacancy periods are typically 3-5%. These compare favourably with London (2-3%) and New York (3-4%), particularly when capital appreciation is factored in.`,
  },
  {
    slug: "future-of-sustainable-development-africa",
    title: "Building Tomorrow: Sustainable Architecture and Africa's Urban Future",
    excerpt:
      "As African cities grow at an unprecedented pace, developers face a choice: build fast or build right. Akon Homes argues there is only one option — and it is both ethical and commercially compelling.",
    category: "Sustainability",
    author: "Dr. Kemi Adeyemi",
    authorTitle: "Head of Sustainability",
    date: "December 11, 2024",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=900&q=85&auto=format&fit=crop",
    content: `Sub-Saharan Africa's urban population is expected to triple by 2050. The buildings that house this growth are being designed and constructed right now. The decisions made in the next decade will determine the environmental and human outcomes for hundreds of millions of people over the next century.

This context makes sustainability in African real estate development not merely a marketing proposition but a moral imperative. And yet — we are not naive. Sustainability must be commercially viable, or it will not happen at scale. Our experience is that it can be both, and the tension between these goals is more apparent than real.

Take passive design. Buildings oriented to capture prevailing breezes and maximise natural light reduce mechanical system loads dramatically. In Lagos's climate, this can reduce cooling energy consumption by 30-40% compared to a conventionally designed tower. That is an energy saving that pays for the design investment within the first few years of operation, and continues paying for the life of the building.

Water harvesting and treatment present similar opportunities. Our developments now incorporate rainwater harvesting, greywater recycling, and sustainable drainage systems that reduce mains water dependency by over 60%. In cities where water supply reliability is a persistent challenge, this is not just environmentally responsible — it is a direct quality-of-life improvement for residents.

The materials question is perhaps most complex. Cement production is carbon-intensive, and Nigerian construction is heavily cement-dependent. We are working with suppliers to increase the proportion of supplementary cementitious materials — volcanic ash, rice husk ash — in our concrete mixes, reducing carbon content without compromising structural performance.`,
  },
];
