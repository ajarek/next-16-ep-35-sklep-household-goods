export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  /** Small eyebrow label above the title, e.g. "KOLEKCJA" */
  badge?: string;
  /** Optional CTA label; when set the card shows an "explore" row */
  exploreText?: string;
  layout: {
    /**
     * Tailwind grid-column span classes applied to the card wrapper.
     * The grid is 12-column on large screens.
     */
    gridSpan: string;
    /**
     * Tailwind aspect-ratio / height classes – controls card height.
     */
    aspectRatio: string;
    textPosition: "bottom-left" | "bottom-right" | "top-left" | "center";
    /** Tailwind bg-black/* overlay, supports group-hover variant */
    overlayOpacity: string;
  };
}

export const collections: CollectionItem[] = [
  // ── Row 1 ─────────────────────────────────────────────────────────────────
  {
    id: "oświetlenie",
    title: "Oświetlenie",
    description:
      "Rzeźbiarskie formy rzucające ciepło i cień, które definiują charakter każdego wnętrza.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
    href: "/shop?category=lighting",
    layout: {
      gridSpan: "col-span-1 lg:col-span-8",
      aspectRatio: "aspect-[4/3] lg:h-[520px]",
      textPosition: "bottom-left",
      overlayOpacity: "bg-black/15 group-hover:bg-black/28",
    },
  },
  {
    id: "ceramika",
    title: "Ceramika",
    description:
      "Ręcznie toczone naczynia z naturalnej gliny, łączące tradycję z nowoczesną formą.",
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=ceramics",
    badge: "Kolekcja",
    exploreText: "Odkryj",
    layout: {
      gridSpan: "col-span-1 lg:col-span-4",
      aspectRatio: "aspect-[4/5] lg:h-[520px]",
      textPosition: "bottom-left",
      overlayOpacity: "bg-black/25 group-hover:bg-black/38",
    },
  },

  // ── Row 2 ─────────────────────────────────────────────────────────────────
  {
    id: "meble",
    title: "Meble",
    description:
      "Ponadczasowe projekty i naturalne materiały stworzone z myślą o pokoleniach.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=900&auto=format&fit=crop",
    href: "/shop?category=furniture",
    layout: {
      gridSpan: "col-span-1 lg:col-span-4",
      aspectRatio: "aspect-[3/4] lg:h-[480px]",
      textPosition: "bottom-left",
      overlayOpacity: "bg-black/20 group-hover:bg-black/32",
    },
  },
  {
    id: "tekstylia",
    title: "Tekstylia",
    description:
      "Naturalne włókna tkane z intencją, wnoszące miękkość i ciepło do Twojego domu.",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=900&auto=format&fit=crop",
    href: "/shop?category=textiles",
    badge: "Kolekcja",
    exploreText: "Odkryj",
    layout: {
      gridSpan: "col-span-1 lg:col-span-4",
      aspectRatio: "aspect-[3/4] lg:h-[480px]",
      textPosition: "bottom-left",
      overlayOpacity: "bg-black/20 group-hover:bg-black/32",
    },
  },
  {
    id: "dekoracje",
    title: "Dekoracje i Wazony",
    description:
      "Starannie wyselekcjonowane detale, które dopełniają przestrzeń i nadają jej wyrazu.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=900&auto=format&fit=crop",
    href: "/shop?category=decor",
    layout: {
      gridSpan: "col-span-1 lg:col-span-4",
      aspectRatio: "aspect-[3/4] lg:h-[480px]",
      textPosition: "bottom-left",
      overlayOpacity: "bg-black/15 group-hover:bg-black/28",
    },
  },

  // ── Row 3 – full-width panoramic ──────────────────────────────────────────
  {
    id: "sezonowa",
    title: "Kolekcja Sezonowa",
    description:
      "Limitowane serie produktów inspirowane zmieniającym się światłem i rytmem natury.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    href: "/shop?category=seasonal",
    badge: "Kolekcja",
    exploreText: "Odkryj",
    layout: {
      gridSpan: "col-span-1 lg:col-span-12",
      aspectRatio: "aspect-[16/9] md:aspect-[21/8] lg:h-[440px]",
      textPosition: "bottom-left",
      overlayOpacity: "bg-black/25 group-hover:bg-black/38",
    },
  },
];
