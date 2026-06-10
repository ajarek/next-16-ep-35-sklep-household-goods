"use client"

import { products } from "@/data/products"
import { collections } from "@/data/collections"
import { Heart, ChevronRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState, useMemo, Suspense } from "react"
import { formatPrice } from "@/data/format"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const categoryMap: Record<string, string> = {
  lighting: "Oświetlenie",
  ceramics: "Ceramika",
  furniture: "Meble",
  textiles: "Tekstylia",
  decor: "Dekoracje i Wazony",
  seasonal: "Kolekcja Sezonowa",
}

const ShopContent = () => {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")

  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (initialCategory && categoryMap[initialCategory]) {
      return categoryMap[initialCategory]
    }
    return "Wszystkie"
  })
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Sync state with URL parameter changes
  const [prevInitialCategory, setPrevInitialCategory] = useState(initialCategory)
  if (initialCategory !== prevInitialCategory) {
    setPrevInitialCategory(initialCategory)
    const mapped = initialCategory ? categoryMap[initialCategory] : "Wszystkie"
    if (mapped && mapped !== activeCategory) {
      setActiveCategory(mapped)
    }
  }

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Wszystkie") return products
    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  const currentBackground = useMemo(() => {
    const categoryToFind = hoveredCategory || (activeCategory !== "Wszystkie" ? activeCategory : null)
    if (!categoryToFind) return null
    return collections.find((c) => c.title === categoryToFind)?.image || null
  }, [hoveredCategory, activeCategory])

  return (
    <div className='relative min-h-screen bg-background transition-colors duration-700'>
      {/* Dynamic Background Overlay */}
      <div className='absolute inset-0 z-0 h-[600px] overflow-hidden pointer-events-none'>
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            currentBackground ? "opacity-15" : "opacity-0"
          )}
        >
          {currentBackground && (
            <Image
              src={currentBackground}
              alt='Background'
              fill
              className='object-cover blur-3xl scale-110'
              priority
              loading="eager"
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          )}
        </div>
        <div className='absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background' />
      </div>

      <section className='relative z-10 flex flex-col p-8 sm:p-12 lg:p-16 max-w-7xl mx-auto'>
        {/* Header Section */}
        <header className='mb-16 space-y-8'>
          <div className='space-y-4'>
            <span className='text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60'>
              Nasza Oferta
            </span>
            <h2 className='font-serif text-4xl sm:text-5xl lg:text-7xl font-normal text-foreground leading-tight'>
              {activeCategory === "Wszystkie" ? "Wszystkie Produkty" : activeCategory}
            </h2>
            <p className='text-muted-foreground max-w-2xl text-lg font-light leading-relaxed'>
              Odkryj naszą starannie wyselekcjonowaną kolekcję przedmiotów, które łączą rzemieślniczą precyzję z ponadczasowym designem.
            </p>
          </div>

          {/* Collection Filter */}
          <div className='flex flex-wrap items-center gap-4 py-4'>
            <button
              onClick={() => setActiveCategory("Wszystkie")}
              onMouseEnter={() => setHoveredCategory(null)}
              className={cn(
                "px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border cursor-pointer",
                activeCategory === "Wszystkie"
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-background/50 text-foreground/60 border-border/50 hover:border-primary/40 hover:text-primary backdrop-blur-sm"
              )}
            >
              Wszystkie
            </button>
            {collections.map((col) => (
              <button
                key={col.id}
                onClick={() => setActiveCategory(col.title)}
                onMouseEnter={() => setHoveredCategory(col.title)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={cn(
                  "group relative flex items-center gap-3 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-500 border overflow-hidden cursor-pointer",
                  activeCategory === col.title
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                    : "bg-background/50 text-foreground/60 border-border/50 hover:border-primary/40 hover:text-primary backdrop-blur-sm"
                )}
              >
                <div className='relative w-5 h-5 overflow-hidden rounded-full border border-border/20 group-hover:scale-110 transition-transform duration-500'>
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    loading='eager'
                  />
                </div>
                {col.title}
              </button>
            ))}
          </div>
        </header>

        {/* Product Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const isWishlisted = !!wishlist[product.id]
              return (
                <div
                  key={product.id}
                  className='group flex flex-col h-full cursor-pointer'
                >
                  {/* Image Wrapper */}
                  <div className='relative aspect-[4/5] w-full overflow-hidden bg-muted/40 mb-6 shadow-2xs group-hover:shadow-xl transition-all duration-700 ease-out'>
                    {/* Badge */}
                    {product.tag && (
                      <span className='absolute top-6 left-6 z-10 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-[0.2em] py-1.5 px-4 select-none shadow-sm'>
                        {product.tag === "featured" ? "Polecany" : "Nowość"}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className='absolute top-6 right-6 z-10 bg-background/80 hover:bg-background border border-border/20 backdrop-blur-md text-foreground rounded-full p-3 shadow-sm transition-all duration-300 hover:scale-110 active:scale-90 group/heart cursor-pointer'
                      aria-label='Dodaj do ulubionych'
                    >
                      <Heart
                        size={16}
                        strokeWidth={1.5}
                        className={cn(
                          "transition-all duration-300",
                          isWishlisted
                            ? "fill-red-500 stroke-red-500 scale-110"
                            : "text-foreground/70 group-hover/heart:text-primary group-hover/heart:scale-105",
                        )}
                      />
                    </button>

                    {/* Product Image */}
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      className='object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110'
                      loading='eager'
                    />

                    {/* Hover Button Overlay */}
                    <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center'>
                       <Link href={`/product/${product.id}`} className='bg-background/90 backdrop-blur-md text-foreground text-[10px] tracking-[0.3em] font-bold uppercase py-4 px-8 shadow-2xl border border-border/50 transition-all translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500 flex items-center gap-2'>
                        Szczegóły
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className='flex flex-col grow px-1'>
                    {/* Category */}
                    <span className='text-[10px] tracking-[0.25em] font-bold uppercase text-primary/60 mb-2'>
                      {product.category}
                    </span>

                    {/* Title */}
                    <h3 className='font-serif text-xl text-foreground font-normal mb-2 transition-colors duration-500 group-hover:text-primary line-clamp-1'>
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className='text-sm font-light text-muted-foreground/70 leading-relaxed mb-6 line-clamp-2'>
                      {product.description}
                    </p>

                    {/* Footer Row */}
                    <div className='flex items-baseline justify-between pt-4 border-t border-border/40 mt-auto'>
                      <span className='text-base font-semibold text-foreground tracking-tight'>
                        {formatPrice(product.price)}
                      </span>
                      <span className='text-[10px] text-muted-foreground/60 font-medium tracking-widest uppercase italic'>
                        {product.details}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='col-span-full py-20 text-center'>
              <p className='text-muted-foreground font-light text-lg'>Brak produktów w tej kategorii.</p>
              <button 
                onClick={() => setActiveCategory("Wszystkie")}
                className="mt-4 text-primary font-bold uppercase text-xs tracking-widest hover:underline cursor-pointer"
              >
                Pokaż wszystkie
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

const ShopPage = () => {
  return (
    <Suspense fallback={<div className="p-20 text-center font-serif text-2xl">Ładowanie...</div>}>
      <ShopContent />
    </Suspense>
  )
}

export default ShopPage