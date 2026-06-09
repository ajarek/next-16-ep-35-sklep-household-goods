"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Grid3X3,
  LayoutList,
  SlidersHorizontal,
  Sparkles,
  Flame,
  Snowflake,
  Sun,
  Leaf,
  Star,
  X,
} from "lucide-react"
import { collections, type CollectionItem } from "@/data/collections"
import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// ─── Decorative divider ───────────────────────────────────────────────────
function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 justify-center", className)}>
      <span className='block h-px w-10 bg-primary/40' />
      <span className='block h-1 w-1 rounded-full bg-primary/60' />
      <span className='block h-px w-10 bg-primary/40' />
    </div>
  )
}

// ─── Season / mood filters ────────────────────────────────────────────────
const filters = [
  { id: "all", label: "Wszystkie", icon: Grid3X3 },
  { id: "oświetlenie", label: "Oświetlenie", icon: Sparkles },
  { id: "ceramika", label: "Ceramika", icon: Flame },
  { id: "meble", label: "Meble", icon: Leaf },
  { id: "tekstylia", label: "Tekstylia", icon: Snowflake },
  { id: "dekoracje", label: "Dekoracje", icon: Sun },
  { id: "sezonowa", label: "Sezonowa", icon: Star },
]

// ─── Mood tags per collection (for display only) ──────────────────────────
const moodTags: Record<string, string[]> = {
  oświetlenie: ["Ciepłe", "Rzeźbiarskie", "Delikatne"],
  ceramika: ["Naturalne", "Ręczne", "Artyzańskie"],
  meble: ["Klasyczne", "Solidne", "Ekologiczne"],
  tekstylia: ["Miękkie", "Naturalne", "Przytulne"],
  dekoracje: ["Eleganckie", "Nowoczesne", "Minimalne"],
  sezonowa: ["Limitowane", "Inspirowane naturą", "Ekskluzywne"],
}

// ─── Extended collection card (page view) ────────────────────────────────
function CollectionCard({
  item,
  index,
  view,
}: {
  item: CollectionItem
  index: number
  view: "grid" | "list"
}) {
  const tags = moodTags[item.id] ?? []

  if (view === "list") {
    return (
      <Link
        href={item.href}
        aria-label={`Przejdź do kolekcji: ${item.title}`}
        className='group flex flex-col sm:flex-row gap-0 overflow-hidden rounded-sm border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all duration-500 bg-card'
      >
        <div className='relative w-full sm:w-72 lg:w-96 h-56 sm:h-auto shrink-0 overflow-hidden'>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes='(max-width: 640px) 100vw, 384px'
            className='object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]'
            priority={index < 2}
          />
          <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500' />
          {item.badge && (
            <span className='absolute top-4 left-4 text-[9px] font-bold uppercase tracking-[0.25em] text-white bg-primary/80 backdrop-blur-sm px-2.5 py-1'>
              {item.badge}
            </span>
          )}
        </div>

        <div className='flex flex-col justify-between p-7 sm:p-9 flex-1'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-wrap gap-1.5'>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className='text-[9px] font-semibold uppercase tracking-[0.2em] text-primary border border-primary/25 px-2 py-0.5'
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className='font-serif text-2xl sm:text-3xl font-normal text-foreground leading-tight'>
              {item.title}
            </h3>
            <p className='text-sm font-light text-muted-foreground leading-relaxed max-w-md'>
              {item.description}
            </p>
          </div>

          <div className='mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary border-b border-primary/25 pb-0.5 w-fit hover:border-primary transition-colors duration-300 group/cta'>
            <span>Odkryj kolekcję</span>
            <ArrowRight
              size={11}
              className='transition-transform duration-300 group-hover/cta:translate-x-1'
            />
          </div>
        </div>

        {/* Animated bottom accent */}
        <span className='absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-full' />
      </Link>
    )
  }

  // Grid view
  return (
    <Link
      href={item.href}
      aria-label={`Przejdź do kolekcji: ${item.title}`}
      style={{ animationDelay: `${index * 80}ms` }}
      className='group relative overflow-hidden flex flex-col justify-end rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 ease-out aspect-3/4'
    >
      {/* Background image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className='object-cover object-center transition-transform duration-700 ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-[1.06]'
          priority={index < 3}
        />
        <div className='absolute inset-0 bg-black/20 group-hover:bg-black/32 transition-colors duration-500 mix-blend-multiply' />
        <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-1' />
      </div>

      {/* Badge */}
      {item.badge && (
        <span className='absolute top-4 left-4 z-10 text-[9px] font-bold uppercase tracking-[0.25em] text-white bg-primary/80 backdrop-blur-sm px-2.5 py-1'>
          {item.badge}
        </span>
      )}

      {/* Tags */}
      <div className='absolute top-4 right-4 z-10 flex flex-col items-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        {tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className='text-[8px] font-semibold uppercase tracking-[0.2em] text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5'
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Text content */}
      <div className='relative z-10 p-6 flex flex-col gap-2 text-white pointer-events-none select-none'>
        <h3 className='font-serif text-2xl sm:text-3xl font-normal leading-tight text-white'>
          {item.title}
        </h3>
        <p className='text-xs font-light text-white/75 leading-relaxed line-clamp-2'>
          {item.description}
        </p>
        {item.exploreText && (
          <div className='pointer-events-auto mt-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90 border-b border-white/25 pb-0.5 w-fit group-hover:border-white/60 transition-colors duration-300'>
            <span>{item.exploreText}</span>
            <ArrowRight
              size={10}
              className='transition-transform duration-300 group-hover:translate-x-1'
            />
          </div>
        )}
      </div>

      {/* Hover accent line */}
      <span className='absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-full z-20' />
    </Link>
  )
}

// ─── Stats strip ─────────────────────────────────────────────────────────
const statsData = [
  { value: "6", label: "Kolekcji tematycznych" },
  { value: "340+", label: "Unikalnych produktów" },
  { value: "100%", label: "Naturalne materiały" },
  { value: "12+", label: "Lat tradycji" },
]

// ─── Page component ───────────────────────────────────────────────────────
export default function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered =
    activeFilter === "all"
      ? collections
      : collections.filter((c) => c.id === activeFilter)

  return (
    <div className='w-full bg-background'>
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className='relative w-full min-h-[70vh] flex items-end overflow-hidden'>
        {/* Background mosaic of collection images */}
        <div className='absolute inset-0 z-0 grid grid-cols-3 grid-rows-2 gap-0'>
          {collections.slice(0, 6).map((col, i) => (
            <div key={col.id} className='relative overflow-hidden'>
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes='33vw'
                className='object-cover object-center scale-110'
                priority={i < 3}
              />
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className='absolute inset-0 z-1 bg-linear-to-t from-black/85 via-black/45 to-black/20' />
        <div className='absolute inset-0 z-1 bg-linear-to-r from-black/40 to-transparent' />

        {/* Theme toggle – top-right */}
        <div className='absolute top-6 right-6 z-20'>
          <AnimatedThemeToggler
            variant='circle'
            duration={500}
            className='w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/20'
          />
        </div>

        {/* Content */}
        <div className='relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 pb-20 pt-40'>
          <div className='max-w-3xl flex flex-col gap-6 select-none'>
            <span className='text-[10px] font-bold uppercase tracking-[0.35em] text-primary'>
              Dom pełen historii
            </span>

            <SectionDivider className='justify-start' />

            <h1 className='font-serif text-5xl sm:text-6xl lg:text-8xl font-normal leading-[1.05] text-white'>
              Nasze{" "}
              <em className='italic font-light text-white/80'>Kolekcje</em>
            </h1>

            <p className='text-base sm:text-lg font-light text-white/75 max-w-xl leading-relaxed'>
              Każda kolekcja to starannie skomponowana opowieść o pięknie,
              materiałach i rzemieśle. Odkryj przestrzenie pełne charakteru —
              stworzone, by trwać pokolenia.
            </p>

            <div className='flex flex-wrap gap-3 mt-2'>
              <Button
                asChild
                className='rounded-none bg-primary hover:bg-primary/80 text-white font-semibold text-[10px] tracking-[0.2em] uppercase py-5 px-7 border-0 transition-all duration-300 group'
              >
                <a href='#collections-grid'>
                  Przeglądaj kolekcje
                  <ArrowRight
                    size={12}
                    className='ml-2 transition-transform duration-300 group-hover:translate-x-1.5'
                  />
                </a>
              </Button>
              <Button
                asChild
                variant='outline'
                className='rounded-none border-white/30 hover:border-white text-white hover:text-white hover:bg-white/10 font-semibold text-[10px] tracking-[0.2em] uppercase py-5 px-7 transition-all duration-300 bg-transparent'
              >
                <a href='/shop'>Wszystkie produkty</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 right-10 z-10 flex flex-col items-center gap-2 text-white/60 select-none'>
          <span className='text-[8px] font-semibold tracking-[0.3em] uppercase'>
            Przewiń
          </span>
          <div className='w-px h-10 bg-white/20 relative overflow-hidden'>
            <div className='absolute inset-0 bg-white/70 animate-scroll-line' />
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <div className='border-y border-border/60 bg-primary/5'>
        <div className='max-w-5xl mx-auto px-6 sm:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4'>
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className='flex flex-col items-center gap-1 text-center select-none'
            >
              <span className='font-serif text-4xl sm:text-5xl font-normal text-primary leading-none'>
                {stat.value}
              </span>
              <span className='text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground mt-1'>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Collections grid section ─────────────────────────────────────── */}
      <section id='collections-grid' className='w-full py-20 px-6 sm:px-8'>
        <div className='max-w-[1440px] mx-auto'>
          {/* Section header */}
          <div className='flex flex-col items-center text-center mb-14 gap-4 select-none'>
            <span className='text-[10px] tracking-[0.3em] font-semibold uppercase text-primary'>
              Przeglądaj według
            </span>
            <SectionDivider />
            <h2 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-[1.1]'>
              Wszystkie Kolekcje
            </h2>
            <p className='text-sm font-light text-muted-foreground max-w-md leading-relaxed'>
              Odkryj nasze starannie dobrane kolekcje — każda opowiada własną
              historię o pięknie codzienności.
            </p>
          </div>

          {/* Toolbar: filters + view toggle */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/60'>
            {/* Filter tabs (desktop) */}
            <div className='hidden sm:flex flex-wrap gap-2'>
              {filters.map((f) => {
                const Icon = f.icon
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={cn(
                      "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] px-3.5 py-2 transition-all duration-200 border",
                      activeFilter === f.id
                        ? "bg-primary text-white border-primary"
                        : "bg-transparent text-foreground/60 border-border/60 hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    <Icon size={11} />
                    {f.label}
                  </button>
                )
              })}
            </div>

            {/* Filter button (mobile) */}
            <button
              className='sm:hidden flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] px-4 py-2.5 border border-border/60 hover:border-primary/50 transition-colors'
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <SlidersHorizontal size={12} />
              Filtry
              {activeFilter !== "all" && (
                <span className='ml-1 w-4 h-4 rounded-full bg-primary text-white text-[8px] flex items-center justify-center font-bold'>
                  1
                </span>
              )}
            </button>

            {/* View toggle */}
            <div className='flex items-center gap-1 border border-border/60'>
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "p-2.5 transition-colors duration-200",
                  view === "grid"
                    ? "bg-foreground text-background"
                    : "text-foreground/50 hover:text-foreground",
                )}
                aria-label='Widok siatki'
              >
                <Grid3X3 size={15} />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "p-2.5 transition-colors duration-200",
                  view === "list"
                    ? "bg-foreground text-background"
                    : "text-foreground/50 hover:text-foreground",
                )}
                aria-label='Widok listy'
              >
                <LayoutList size={15} />
              </button>
            </div>
          </div>

          {/* Mobile filter panel */}
          {filterOpen && (
            <div className='sm:hidden mb-6 p-4 border border-border/60 bg-card'>
              <div className='flex items-center justify-between mb-3'>
                <span className='text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
                  Wybierz kategorię
                </span>
                <button
                  onClick={() => setFilterOpen(false)}
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  <X size={14} />
                </button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {filters.map((f) => {
                  const Icon = f.icon
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        setActiveFilter(f.id)
                        setFilterOpen(false)
                      }}
                      className={cn(
                        "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 transition-all duration-200 border",
                        activeFilter === f.id
                          ? "bg-primary text-white border-primary"
                          : "bg-transparent text-foreground/60 border-border/60 hover:border-primary/50",
                      )}
                    >
                      <Icon size={10} />
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Active filter chip */}
          {activeFilter !== "all" && (
            <div className='flex items-center gap-2 mb-6'>
              <span className='text-xs font-light text-muted-foreground'>
                Filtrowanie:
              </span>
              <button
                onClick={() => setActiveFilter("all")}
                className='flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors duration-200'
              >
                {filters.find((f) => f.id === activeFilter)?.label}
                <X size={9} />
              </button>
            </div>
          )}

          {/* Collections */}
          {filtered.length === 0 ? (
            <div className='py-24 flex flex-col items-center gap-4 text-center'>
              <span className='text-4xl'>🏺</span>
              <p className='text-muted-foreground font-light text-sm'>
                Brak kolekcji w tej kategorii.
              </p>
              <button
                onClick={() => setActiveFilter("all")}
                className='text-[10px] font-semibold uppercase tracking-[0.2em] text-primary underline underline-offset-4'
              >
                Pokaż wszystkie
              </button>
            </div>
          ) : view === "grid" ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filtered.map((item, index) => (
                <CollectionCard
                  key={item.id}
                  item={item}
                  index={index}
                  view='grid'
                />
              ))}
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              {filtered.map((item, index) => (
                <CollectionCard
                  key={item.id}
                  item={item}
                  index={index}
                  view='list'
                />
              ))}
            </div>
          )}

          {/* Footer CTA */}
          <div className='mt-16 flex justify-center'>
            <Link
              href='/shop'
              className='group inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 hover:text-primary border-b border-foreground/20 hover:border-primary pb-0.5 transition-all duration-300'
            >
              Przejdź do sklepu — wszystkie produkty
              <ArrowRight
                size={13}
                className='transition-transform duration-300 group-hover:translate-x-1.5'
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Inspirational quote / manifesto ──────────────────────────────── */}
      <section className='relative w-full bg-foreground overflow-hidden py-28'>
        {/* Decorative lines */}
        <div className='absolute inset-0 pointer-events-none opacity-10'>
          <div className='absolute top-0 left-1/4 w-px h-full bg-primary-foreground' />
          <div className='absolute top-0 right-1/4 w-px h-full bg-primary-foreground' />
          <div className='absolute top-1/2 left-0 h-px w-full bg-primary-foreground' />
        </div>
        {/* Radial glow */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl' />
        </div>

        <div className='relative z-10 max-w-4xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center gap-8 select-none'>
          <span className='text-[10px] tracking-[0.35em] font-semibold uppercase text-primary'>
            Nasze podejście
          </span>
          <SectionDivider />
          <blockquote className='font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-background leading-tight tracking-tight'>
            &ldquo;Otaczamy się przedmiotami, które coś{" "}
            <em className='italic text-primary'>opowiadają</em> — o tkaczu, o
            glinie, o lesie. Dlatego każda kolekcja zaczyna się od
            historii.&rdquo;
          </blockquote>
          <div className='flex flex-col items-center gap-1'>
            <span className='block h-px w-8 bg-primary/60 mb-3' />
            <span className='text-xs uppercase tracking-[0.25em] font-semibold text-background/60'>
              Zespół Domowego Piękna
            </span>
          </div>
        </div>
      </section>

      {/* ── Newsletter / seasonal highlight ──────────────────────────────── */}
      <section className='w-full py-24 px-6 sm:px-8 bg-primary/5 border-t border-border/60'>
        <div className='max-w-2xl mx-auto flex flex-col items-center text-center gap-8'>
          <span className='text-[10px] tracking-[0.3em] font-semibold uppercase text-primary'>
            Bądź na bieżąco
          </span>
          <SectionDivider />
          <h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.1]'>
            Nowe kolekcje prosto na Twoją skrzynkę
          </h2>
          <p className='text-sm font-light text-muted-foreground max-w-sm leading-relaxed'>
            Zapisz się do naszego newslettera i jako pierwszy dowiedz się o
            nowych kolekcjach, limitowanych edycjach i inspiracjach
            wnętrzarskich.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              toast.success(
                "Dziękujemy za zapisanie się do naszego newslettera!",
              )
              e.target.reset()
            }}
            className='w-full flex flex-col sm:flex-row gap-0 max-w-md'
          >
            <input
              type='email'
              id='newsletter-email'
              placeholder='Twój adres e-mail'
              className='flex-1 px-5 py-3.5 bg-background text-foreground border border-border/80 focus:border-primary focus:outline-none text-sm font-light placeholder:text-muted-foreground transition-colors duration-200'
              required
            />
            <button
              type='submit'
              className='bg-primary hover:bg-primary/80 text-white font-semibold text-[10px] uppercase tracking-[0.2em] px-7 py-3.5 transition-all duration-300 flex items-center justify-center gap-2 group shrink-0'
            >
              Zapisz się
              <ArrowRight
                size={11}
                className='transition-transform duration-300 group-hover:translate-x-1'
              />
            </button>
          </form>

          <p className='text-[10px] text-muted-foreground/70 font-light tracking-wide'>
            Bez spamu. Możesz zrezygnować w każdej chwili.
          </p>
        </div>
      </section>
    </div>
  )
}
