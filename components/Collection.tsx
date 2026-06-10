"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { collections } from "@/data/collections"
import { cn } from "@/lib/utils"

// ─── Decorative divider used in the section header ────────────────────────
function SectionDivider() {
  return (
    <div className='flex items-center gap-3 justify-center'>
      <span className='block h-px w-10 bg-primary/40' />
      <span className='block h-1 w-1 rounded-full bg-primary/60' />
      <span className='block h-px w-10 bg-primary/40' />
    </div>
  )
}

// ─── Individual collection card ───────────────────────────────────────────
interface CollectionCardProps {
  item: (typeof collections)[number]
  index: number
}

function CollectionCard({ item, index }: CollectionCardProps) {
  const isBottomLeft = item.layout.textPosition === "bottom-left"

  return (
    <Link
      href={item.href}
      aria-label={`Przejdź do kolekcji: ${item.title}`}
      style={{ animationDelay: `${index * 80}ms` }}
      className={cn(
        // group enables child group-hover utilities
        "group",
        // grid span + dimensions
        "relative overflow-hidden flex flex-col justify-end",
        "rounded-sm",
        // subtle lift on hover
        "shadow-sm hover:shadow-md",
        // smooth transitions
        "transition-all duration-500 ease-out",
        // grid classes from data
        item.layout.gridSpan,
        item.layout.aspectRatio,
      )}
    >
      {/* ── Background image ──────────────────────────────────────────── */}
      <div className='absolute inset-0 z-0'>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 800px'
          loading='eager'
          className='object-cover object-center transition-transform duration-700 ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-[1.04]'
          priority={index < 2}
        />

        {/* colour wash */}
        <div
          className={cn(
            "absolute inset-0 transition-colors duration-500 mix-blend-multiply",
            item.layout.overlayOpacity,
          )}
        />

        {/* gradient vignette – always present */}
        <div className='absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent z-1' />
      </div>

      {/* ── Text content ──────────────────────────────────────────────── */}
      <div
        className={cn(
          "relative z-10 p-6 sm:p-8 flex flex-col w-full text-white pointer-events-none select-none",
          isBottomLeft
            ? "items-start justify-end"
            : "items-center justify-center text-center",
        )}
      >
        {/* Eyebrow badge */}
        {item.badge && (
          <span className='mb-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-white/75'>
            {item.badge}
          </span>
        )}

        {/* Title */}
        <h3
          className={cn(
            "font-serif font-normal leading-tight text-white",
            // panoramic card gets a bigger title
            item.layout.gridSpan.includes("col-span-12")
              ? "text-3xl sm:text-4xl lg:text-5xl mb-3"
              : "text-2xl sm:text-3xl mb-2",
          )}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className='text-xs sm:text-sm font-light text-white/80 max-w-xs sm:max-w-sm leading-relaxed'>
          {item.description}
        </p>

        {/* Explore CTA */}
        {item.exploreText && (
          <div className='pointer-events-auto mt-5 flex items-center gap-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 border-b border-white/25 pb-0.5 hover:border-white/60 transition-colors duration-300 group/cta'>
            <span>{item.exploreText}</span>
            <ArrowRight
              size={11}
              className='transition-transform duration-300 group-hover/cta:translate-x-1'
            />
          </div>
        )}
      </div>

      {/* ── Corner accent – thin primary-coloured line that grows on hover */}
      <span className='absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-full z-20' />
    </Link>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────
export default function Collection() {
  return (
    <section
      id='collections'
      className='w-full bg-background py-20 px-6 sm:px-8 border-t border-border/60'
    >
      <div className='max-w-[1440px] mx-auto'>
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className='flex flex-col items-center text-center mb-14 gap-4 select-none'>
          <span className='text-[10px] tracking-[0.3em] font-semibold uppercase text-primary'>
            Przeglądaj według
          </span>

          <SectionDivider />

          <h2 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-[1.1]'>
            Kolekcje
          </h2>

          <p className='text-sm font-light text-muted-foreground max-w-md leading-relaxed'>
            Odkryj nasze starannie dobrane kolekcje — każda opowiada własną
            historię o pięknie codzienności.
          </p>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────────── */}
        {/*
         * 12-column grid on lg, 1-column below.
         * Row 1: Lighting (8 col) + Ceramics (4 col)
         * Row 2: Furniture / Textiles / Decor (4 col each)
         * Row 3: Seasonal – full width (12 col)
         */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4'>
          {collections.map((item, index) => (
            <CollectionCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* ── Footer CTA ───────────────────────────────────────────────── */}
        <div className='mt-12 flex justify-center'>
          <Link
            href='/shop'
            className='group inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 hover:text-primary border-b border-foreground/20 hover:border-primary pb-0.5 transition-all duration-300'
          >
            Zobacz wszystkie kolekcje
            <ArrowRight
              size={13}
              className='transition-transform duration-300 group-hover:translate-x-1.5'
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
