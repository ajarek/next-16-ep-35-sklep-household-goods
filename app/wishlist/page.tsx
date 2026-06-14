"use client"

import React, { useSyncExternalStore } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react"
import { useWishlistStore } from "@/store/wishlistStore"
import { useCartStore } from "@/store/cartStore"
import { formatPrice } from "@/data/format"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { Product } from "@/types/typeProduct"

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const addItemToCart = useCartStore((state) => state.addItemToCart)

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const handleAddToCart = (product: Product) => {
    addItemToCart({
      ...product,
      quantity: 1,
    })
    toast.success(`Dodano ${product.title} do koszyka`)
  }

  const handleRemoveFromWishlist = (id: string, title: string) => {
    removeItem(id)
    toast.info(`Usunięto ${title} z ulubionych`)
  }

  if (!isClient) {
    return (
      <div className='w-full bg-background min-h-screen pb-24'>
        <div className='max-w-7xl mx-auto px-6 sm:px-8 py-12 flex flex-col gap-4 border-b border-border/60'>
          <h1 className='font-serif text-4xl sm:text-5xl text-foreground'>
            Lista życzeń
          </h1>
          <div className='h-4 w-24 bg-muted animate-pulse rounded mt-2' />
        </div>
        <div className='max-w-7xl mx-auto px-6 sm:px-8 py-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12'>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className='flex flex-col gap-4 animate-pulse'>
                <div className='aspect-4/5 bg-muted w-full rounded-xs' />
                <div className='h-3 bg-muted w-1/3 rounded-xs' />
                <div className='h-4 bg-muted w-2/3 rounded-xs' />
                <div className='h-8 bg-muted w-full mt-4 rounded-xs' />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center gap-8 px-6 text-center animate-in fade-in duration-700'>
        <div className='w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground/30'>
          <Heart size={40} strokeWidth={1} />
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='font-serif text-3xl sm:text-4xl text-foreground'>
            Twoja lista życzeń jest pusta
          </h1>
          <p className='text-sm font-light text-muted-foreground max-w-sm mx-auto'>
            Dodaj przedmioty, które Ci się podobają, aby móc do nich łatwo wrócić lub dodać je do koszyka w przyszłości.
          </p>
        </div>
        <Button
          asChild
          className='rounded-none px-10 py-7 text-[10px] tracking-[0.2em] uppercase font-bold'
        >
          <Link href='/shop'>Przejdź do sklepu</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='w-full bg-background min-h-screen pb-24 animate-in fade-in duration-500'>
      <div className='max-w-7xl mx-auto px-6 sm:px-8 py-12 flex flex-col gap-4 border-b border-border/60'>
        <h1 className='font-serif text-4xl sm:text-5xl text-foreground'>
          Lista życzeń
        </h1>
        <div className='flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-muted-foreground'>
          <span>Twoje ulubione</span>
          <span className='block w-1 h-1 rounded-full bg-primary/40' />
          <span>
            {items.length}{" "}
            {items.length === 1
              ? "produkt"
              : items.length < 5
                ? "produkty"
                : "produktów"}
          </span>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 sm:px-8 py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12'>
          {items.map((product) => (
            <div
              key={product.id}
              className='group flex flex-col h-full cursor-pointer relative'
            >
              <div className='relative aspect-4/5 w-full overflow-hidden bg-muted/40 mb-4 shadow-2xs group-hover:shadow-xs transition-shadow duration-500'>
                {product.tag && (
                  <span className='absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-[0.15em] py-1 px-3.5 select-none shadow-sm'>
                    {product.tag === "featured" ? "Polecany" : "Nowość"}
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleRemoveFromWishlist(product.id, product.title)
                  }}
                  className='absolute top-4 right-4 z-10 bg-background/80 hover:bg-background border border-border/20 backdrop-blur-md text-foreground rounded-full p-2.5 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 group/heart cursor-pointer'
                  aria-label='Usuń z ulubionych'
                >
                  <Heart
                    size={15}
                    strokeWidth={1.5}
                    className='transition-all duration-300 fill-red-500 stroke-red-500 scale-110'
                  />
                </button>

                <Link href={`/product/${product.id}`} className='block w-full h-full relative'>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    loading='eager'
                    className='object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-115'
                  />
                </Link>

                <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6'>
                  <Link
                    href={`/product/${product.id}`}
                    className='bg-card text-card-foreground hover:bg-muted text-[10px] tracking-widest font-semibold uppercase py-3 px-6 shadow-md border border-border hover:border-foreground/20 transition-all translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500'
                  >
                    Zobacz Szczegóły
                  </Link>
                </div>
              </div>

              <div className='flex flex-col grow'>
                <span className='text-[10px] tracking-[0.2em] font-bold uppercase text-primary/70 mb-1'>
                  {product.category}
                </span>

                <Link href={`/product/${product.id}`} className='block'>
                  <h3 className='font-serif text-lg text-foreground font-normal mb-1.5 transition-colors duration-300 group-hover:text-primary line-clamp-1'>
                    {product.title}
                  </h3>
                </Link>

                <p className='text-xs font-light text-muted-foreground/80 leading-relaxed mb-4 line-clamp-2'>
                  {product.description}
                </p>

                <div className='flex items-baseline justify-between pt-3 border-t border-border/60 mt-auto'>
                  <span className='text-sm font-semibold text-foreground'>
                    {formatPrice(product.price)}
                  </span>
                  <span className='text-[10px] text-muted-foreground font-light tracking-wide italic'>
                    {product.details}
                  </span>
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  className='w-full rounded-none mt-4 py-5 text-[10px] tracking-[0.25em] uppercase font-bold group/cart'
                >
                  <ShoppingBag size={14} className='mr-2 transition-transform group-hover/cart:scale-110' />
                  Dodaj do koszyka
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Link
          href='/shop'
          className='flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold text-foreground hover:text-primary transition-colors group self-start mt-16 border-t border-border/40 pt-8'
        >
          <ArrowLeft
            size={14}
            className='transition-transform group-hover:-translate-x-1'
          />
          Kontynuuj zakupy
        </Link>
      </div>
    </div>
  )
}
