import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] overflow-hidden flex items-center bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Elegancko urządzony salon w minimalistycznym i ciepłym stylu"
          fill
          priority
          sizes="100vw"
          loading="eager"
          className="object-cover object-center select-none"
        />
        {/* Soft overlay to ensure copy readability */}
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/15 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 py-16 flex flex-col justify-center h-full text-white">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start gap-6 sm:gap-8">
          
          {/* Eyebrow */}
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/95 drop-shadow-sm select-none">
            Kolekcja dla świadomego życia
          </span>

          {/* Heading */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-md select-none">
            Przedmioty <br />
            o <span className="italic font-light">Cichym</span> Pięknie
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light max-w-md sm:max-w-lg lg:max-w-xl leading-relaxed drop-shadow-xs">
            Ręcznie tworzone artykuły domowe i akcesoria lifestylowe, zaprojektowane tak, aby wnosić ciepło i harmonię do codziennych chwil.
          </p>

          {/* CTA Button */}
          <div className="mt-2 sm:mt-4">
            <Button
              asChild
              className="bg-primary hover:bg-primary/80 text-white font-semibold text-xs tracking-widest uppercase py-6 px-8 rounded-none border-0 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-3 cursor-pointer group"
            >
              <a href="/shop">
                Odkryj kolekcję
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/70 select-none">
        <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-white/80">
          Przewiń
        </span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-scroll-line" />
        </div>
      </div>
    </section>
  )
}
