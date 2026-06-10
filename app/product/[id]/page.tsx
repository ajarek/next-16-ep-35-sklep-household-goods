"use client"

import React, { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Heart, 
  ShoppingBag, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Leaf,
  Plus,
  Minus,
  ArrowLeft
} from "lucide-react"
import { products } from "@/data/products"
import { formatPrice } from "@/data/format"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// ─── Reusable Accordion Component ──────────────────────────────────────────

function AccordionItem({ title, children, isOpen, onClick }: { 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onClick: () => void 
}) {
  return (
    <div className="border-b border-border/60">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left group transition-colors hover:text-primary"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
          {title}
        </span>
        <Plus 
          size={14} 
          className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-45"
          )} 
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] pb-6" : "max-h-0"
        )}
      >
        <div className="text-sm font-light text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<string | null>("szczegoly")

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6">
        <h1 className="font-serif text-3xl text-foreground">Produkt nie został znaleziony</h1>
        <Button asChild variant="outline">
          <Link href="/shop">Wróć do sklepu</Link>
        </Button>
      </div>
    )
  }

  // Find related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    toast.success(`Dodano ${quantity} szt. ${product.title} do koszyka`)
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.info(isWishlisted ? "Usunięto z ulubionych" : "Dodano do ulubionych")
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* ── Breadcrumbs & Navigation ─────────────────────────────────── */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-muted-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">Główna</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-primary transition-colors">Sklep</Link>
          <ChevronRight size={10} />
          <span className="text-foreground">{product.title}</span>
        </div>
        
        <Link 
          href="/shop" 
          className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold text-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Powrót do sklepu
        </Link>
      </div>

      <div className="max-w-8xl mx-auto px-6 sm:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* ── Left Column: Images ───────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-4/5 w-full bg-muted/30 overflow-hidden group">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              {product.tag && (
                <span className="absolute top-6 left-6 z-10 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-[0.2em] py-1.5 px-4 shadow-md">
                  {product.tag === "featured" ? "Polecany" : "Nowość"}
                </span>
              )}
            </div>
            
            {/* Grid of secondary images (placeholders using product images) */}
            <div className="grid grid-cols-2 gap-6">
                <div className="relative aspect-square bg-muted/20 overflow-hidden group">
                    <Image src={product.image} alt="Detal 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                </div>
                <div className="relative aspect-square bg-muted/20 overflow-hidden group">
                    <Image src={product.image} alt="Detal 2" fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                </div>
            </div>
          </div>

          {/* ── Right Column: Info ────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex flex-col gap-4 border-b border-border/60 pb-10">
              <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-primary">
                {product.category}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-tight tracking-tight">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-4 mt-2">
                <span className="text-2xl font-semibold text-foreground">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-muted-foreground italic">Cena zawiera podatek VAT</span>
              </div>
              
              <p className="text-base font-light text-muted-foreground leading-relaxed mt-4">
                {product.description}
              </p>
            </div>

            {/* Selection & Actions */}
            <div className="py-10 flex flex-col gap-8">
              {/* Material/Color (Visual only) */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground">
                  Materiał: <span className="text-muted-foreground font-normal">{product.details}</span>
                </span>
                <div className="flex gap-3">
                    <button className="w-8 h-8 rounded-full border-2 border-primary bg-primary/20 transition-transform hover:scale-110" aria-label="Naturalny" />
                    <button className="w-8 h-8 rounded-full border border-border bg-foreground/10 transition-transform hover:scale-110" aria-label="Ciemny" />
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border/60">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:bg-muted transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-12 text-center font-semibold text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-4 hover:bg-muted transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                </div>
                
                <Button 
                    onClick={handleAddToCart}
                    className="flex-1 rounded-none py-7 text-[10px] tracking-[0.2em] uppercase font-bold"
                >
                    <ShoppingBag size={16} className="mr-2" />
                    Dodaj do koszyka
                </Button>

                <button 
                    onClick={toggleWishlist}
                    className={cn(
                        "p-4 border border-border/60 transition-all duration-300 hover:bg-muted flex items-center justify-center",
                        isWishlisted ? "text-red-500 bg-red-50/10 border-red-200" : "text-foreground"
                    )}
                    aria-label="Ulubione"
                >
                    <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
                </button>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-4 py-8 border-y border-border/40">
                <div className="flex items-center gap-3">
                    <Leaf size={18} className="text-primary/60" />
                    <span className="text-[9px] uppercase tracking-widest font-semibold">Naturalne materiały</span>
                </div>
                <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-primary/60" />
                    <span className="text-[9px] uppercase tracking-widest font-semibold">2 lata gwarancji</span>
                </div>
                <div className="flex items-center gap-3">
                    <Truck size={18} className="text-primary/60" />
                    <span className="text-[9px] uppercase tracking-widest font-semibold">Szybka dostawa</span>
                </div>
                <div className="flex items-center gap-3">
                    <RotateCcw size={18} className="text-primary/60" />
                    <span className="text-[9px] uppercase tracking-widest font-semibold">30 dni na zwrot</span>
                </div>
            </div>

            {/* Accordions */}
            <div className="flex flex-col mt-4">
              <AccordionItem 
                title="Szczegóły Produktu" 
                isOpen={activeAccordion === "szczegoly"} 
                onClick={() => setActiveAccordion(activeAccordion === "szczegoly" ? null : "szczegoly")}
              >
                Ten produkt został wykonany z najwyższej jakości surowców, z dbałością o najmniejszy detal. {product.details} użyty w tym projekcie pochodzi ze sprawdzonych, ekologicznych źródeł. Każdy egzemplarz jest unikatowy ze względu na naturalne różnice w strukturze materiału.
              </AccordionItem>
              
              <AccordionItem 
                title="Dostawa i Zwroty" 
                isOpen={activeAccordion === "dostawa"} 
                onClick={() => setActiveAccordion(activeAccordion === "dostawa" ? null : "dostawa")}
              >
                Oferujemy darmową dostawę dla zamówień powyżej 500 PLN. Standardowy czas wysyłki to 2-4 dni robocze. Jeśli produkt nie spełni Twoich oczekiwań, masz 30 dni na darmowy zwrot bez podania przyczyny.
              </AccordionItem>

              <AccordionItem 
                title="Pielęgnacja" 
                isOpen={activeAccordion === "pielegnacja"} 
                onClick={() => setActiveAccordion(activeAccordion === "pielegnacja" ? null : "pielegnacja")}
              >
                Zalecamy czyszczenie miękką, lekko wilgotną szmatką. Unikać bezpośredniego kontaktu z silnymi detergentami oraz długotrwałej ekspozycji na mocne światło słoneczne, co pozwoli zachować głębię koloru i strukturę materiału na lata.
              </AccordionItem>
            </div>

            {/* Creative Quote */}
            <div className="mt-12 p-8 bg-primary/5 border-l-2 border-primary/40 flex flex-col gap-3 italic">
                <p className="text-sm font-serif text-foreground/80 leading-relaxed">
                    &ldquo;Przedmioty, którymi się otaczamy, kształtują nasz nastrój i codzienną harmonię. Ten element został stworzony, by wnosić spokój do Twojej przestrzeni.&rdquo;
                </p>
                <span className="text-[9px] uppercase tracking-widest font-bold text-primary/70">— Zespół Projektowy</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ─────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="bg-muted/10 py-24 px-6 sm:px-8 border-t border-border/40">
            <div className="max-w-8xl mx-auto">
                <div className="flex flex-col gap-4 mb-16 items-center text-center">
                    <span className="text-[10px] tracking-[0.3em] font-semibold uppercase text-primary">Kolekcja</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">Inne produkty z tej kategorii</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((p) => (
                        <Link 
                            key={p.id} 
                            href={`/product/${p.id}`}
                            className="group flex flex-col gap-4"
                        >
                            <div className="relative aspect-4/5 bg-muted/40 overflow-hidden shadow-2xs group-hover:shadow-xs transition-shadow duration-500">
                                <Image 
                                    src={p.image} 
                                    alt={p.title} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] uppercase tracking-widest text-primary font-bold">{p.category}</span>
                                <h3 className="font-serif text-lg group-hover:text-primary transition-colors">{p.title}</h3>
                                <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* ── Newsletter Section ───────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-8 border-y border-border/40">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
            <div className="flex flex-col gap-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">Dołącz do naszego świata</h2>
                <p className="text-sm font-light text-muted-foreground max-w-lg mx-auto">
                    Zapisz się do newslettera, aby otrzymywać informacje o nowych kolekcjach rzemieślniczych i inspiracje do aranżacji wnętrz.
                </p>
            </div>
            <div className="flex w-full max-w-md border-b border-foreground/30 pb-2 group focus-within:border-primary transition-colors">
                <input 
                    type="email" 
                    placeholder="Twój adres e-mail" 
                    className="flex-1 bg-transparent text-sm font-light outline-none py-2 placeholder:text-muted-foreground/50" 
                />
                <button className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-primary transition-colors px-4">
                    Dołącz
                </button>
            </div>
        </div>
      </section>
    </div>
  )
}
