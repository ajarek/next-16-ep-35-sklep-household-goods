export interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  details: string;
  tag?: "featured" | "new" | null;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    category: "Oświetlenie",
    title: "Lampa wisząca Arc",
    description: "Elegancki, minimalistyczny łuk wykonany z ręcznie wyginanego mosiądzu i naturalnego lnu.",
    price: 1950,
    details: "Mosiądz i len",
    tag: "featured",
    image: "/lamp-arc.png",
  },
  {
    id: "2",
    category: "Oświetlenie",
    title: "Lampa stołowa Orb",
    description: "Dmuchane szkło łączy się z rzeźbiarskim brązem, tworząc ciepłe i nastrojowe światło.",
    price: 1190,
    details: "Szkło dmuchane",
    tag: "new",
    image: "/lamp-orb.png",
  },
  {
    id: "3",
    category: "Ceramika",
    title: "Duże naczynie rzeźbiarskie",
    description: "Ręcznie toczona kamionka pokryta naturalnym, matowym szkliwem popiołowym o unikalnej fakturze.",
    price: 1290,
    details: "Kamionka",
    tag: "featured",
    image: "/vessel-sculptural.png",
  },
  {
    id: "4",
    category: "Ceramika",
    title: "Miska do serwowania na co dzień",
    description: "Prosta, organiczna forma stworzona z myślą o codziennych posiłkach i domowych rytuałach.",
    price: 580,
    details: "Kamionka",
    tag: null,
    image: "/bowl-serving.png",
  },
];
