"use client"

import React, { useSyncExternalStore, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  CreditCard,
  Loader2,
} from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { formatPrice } from "@/data/format"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function CartPage() {
  const {
    items,
    increment,
    decrement,
    removeItemFromCart,
    total,
    removeAllFromCart,
  } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  if (!isClient) return null

  const cartTotal = total()
  const shippingThreshold = 500
  const isFreeShipping = cartTotal >= shippingThreshold
  const shippingProgress = Math.min((cartTotal / shippingThreshold) * 100, 100)

  const handleCheckout = async () => {
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Zamówienie przyjęte!", {
      description: "Dziękujemy za zakupy. Twoje zamówienie jest już w realizacji.",
    })

    removeAllFromCart()
    setIsProcessing(false)
    router.push("/")
  }

  if (items.length === 0) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center gap-8 px-6 text-center'>
        <div className='w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground/40'>
          <ShoppingBag size={40} strokeWidth={1} />
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='font-serif text-3xl sm:text-4xl text-foreground'>
            Twój koszyk jest pusty
          </h1>
          <p className='text-sm font-light text-muted-foreground max-w-xs mx-auto'>
            Wygląda na to, że nie dodałeś jeszcze żadnych produktów do swojego
            koszyka.
          </p>
        </div>
        <Button
          asChild
          className='rounded-none px-10 py-7 text-[10px] tracking-[0.2em] uppercase font-bold'
        >
          <Link href='/shop'>Zacznij Zakupy</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='w-full bg-background min-h-screen pb-24'>
      <div className='max-w-7xl mx-auto px-6 sm:px-8 py-12 flex flex-col gap-4 border-b border-border/60'>
        <h1 className='font-serif text-4xl sm:text-5xl text-foreground'>
          Koszyk
        </h1>
        <div className='flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-muted-foreground'>
          <span>Twój wybór</span>
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
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16 items-start'>
          <div className='lg:col-span-8 flex flex-col gap-8'>
            <div className='bg-primary/5 p-6 border border-primary/10 flex flex-col gap-4'>
              <div className='flex items-center justify-between text-[10px] tracking-widest uppercase font-bold'>
                <span className='flex items-center gap-2'>
                  <Truck size={14} className='text-primary' />
                  {isFreeShipping
                    ? "Gratulacje! Masz darmową dostawę"
                    : "Darmowa dostawa od 500 PLN"}
                </span>
                {!isFreeShipping && (
                  <span className='text-primary'>
                    Brakuje {formatPrice(shippingThreshold - cartTotal)}
                  </span>
                )}
              </div>
              <div className='h-1 w-full bg-primary/10 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-primary transition-all duration-1000 ease-out'
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            <div className='flex flex-col border-t border-border/60'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='grid grid-cols-1 sm:grid-cols-12 gap-6 py-8 border-b border-border/60 group'
                >
                  <div className='sm:col-span-3'>
                    <Link
                      href={`/product/${item.id}`}
                      className='block relative aspect-4/5 bg-muted/40 overflow-hidden'
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        loading='eager'
                        className='object-cover transition-transform duration-700 group-hover:scale-105'
                      />
                    </Link>
                  </div>

                  <div className='sm:col-span-5 flex flex-col justify-between py-1'>
                    <div className='flex flex-col gap-1'>
                      <span className='text-[9px] uppercase tracking-widest text-primary font-bold'>
                        {item.category}
                      </span>
                      <Link
                        href={`/product/${item.id}`}
                        className='font-serif text-xl hover:text-primary transition-colors'
                      >
                        {item.title}
                      </Link>
                      <p className='text-xs font-light text-muted-foreground mt-2 line-clamp-1'>
                        {item.details}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className='flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-muted-foreground hover:text-destructive transition-colors mt-4 sm:mt-0'
                    >
                      <Trash2 size={12} />
                      Usuń produkt
                    </button>
                  </div>

                  <div className='sm:col-span-4 flex flex-col items-end justify-between py-1'>
                    <div className='flex items-center border border-border/60'>
                      <button
                        onClick={() => decrement(item.id)}
                        className='p-3 hover:bg-muted transition-colors'
                      >
                        <Minus size={12} />
                      </button>
                      <span className='w-8 text-center text-xs font-bold'>
                        {item.quantity ?? 1}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        className='p-3 hover:bg-muted transition-colors'
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className='flex flex-col items-end gap-1'>
                      <span className='text-lg font-semibold'>
                        {formatPrice(item.price * (item.quantity ?? 1))}
                      </span>
                      {(item.quantity ?? 1) > 1 && (
                        <span className='text-[10px] text-muted-foreground italic'>
                          {formatPrice(item.price)} / sztuka
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href='/shop'
              className='flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold text-foreground hover:text-primary transition-colors group self-start mt-4'
            >
              <ArrowLeft
                size={14}
                className='transition-transform group-hover:-translate-x-1'
              />
              Kontynuuj zakupy
            </Link>
          </div>

          <div className='lg:col-span-4 sticky top-32'>
            <div className='bg-primary/3 p-8 flex flex-col gap-8 border border-border/40'>
              <h2 className='font-serif text-2xl text-foreground border-b border-border/60 pb-6'>
                Podsumowanie
              </h2>

              <div className='flex flex-col gap-4'>
                <div className='flex justify-between text-sm'>
                  <span className='font-light text-muted-foreground'>
                    Wartość produktów
                  </span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='font-light text-muted-foreground'>
                    Dostawa
                  </span>
                  <span
                    className={cn(
                      isFreeShipping && "text-primary font-semibold",
                    )}
                  >
                    {isFreeShipping ? "Gratis" : formatPrice(25)}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='font-light text-muted-foreground'>
                    Podatek VAT
                  </span>
                  <span>W cenie</span>
                </div>
              </div>

              <div className='flex justify-between items-baseline border-t border-border/60 pt-6'>
                <span className='font-serif text-xl'>Razem</span>
                <span className='text-3xl font-semibold text-foreground'>
                  {formatPrice(isFreeShipping ? cartTotal : cartTotal + 25)}
                </span>
              </div>

              <div className='flex flex-col gap-4 mt-4'>
                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className='w-full rounded-none py-8 text-[11px] tracking-[0.25em] uppercase font-bold group'
                >
                  {isProcessing ? (
                    <Loader2 size={16} className='animate-spin' />
                  ) : (
                    <>
                      Przejdź do kasy
                      <ArrowRight
                        size={16}
                        className='ml-2 transition-transform group-hover:translate-x-1'
                      />
                    </>
                  )}
                </Button>

                <div className='grid grid-cols-1 gap-4 mt-4 pt-6 border-t border-border/40'>
                  <div className='flex items-center gap-3 text-muted-foreground'>
                    <ShieldCheck size={16} className='text-primary/60' />
                    <span className='text-[9px] uppercase tracking-widest font-bold'>
                      Bezpieczne zakupy
                    </span>
                  </div>
                  <div className='flex items-center gap-3 text-muted-foreground'>
                    <CreditCard size={16} className='text-primary/60' />
                    <span className='text-[9px] uppercase tracking-widest font-bold'>
                      Płatność kartą lub BLIK
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
