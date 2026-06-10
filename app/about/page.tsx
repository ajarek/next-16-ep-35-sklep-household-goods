"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Wind, 
  Paintbrush,
  Users,
  Compass
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Reusable Components ───────────────────────────────────────────────────

function SectionHeading({ 
  eyebrow, 
  title, 
  description,
  align = "center" 
}: { 
  eyebrow: string; 
  title: string; 
  description?: string;
  align?: "left" | "center"
}) {
  return (
    <div className={`flex flex-col gap-4 mb-16 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
      <span className='text-[10px] tracking-[0.3em] font-semibold uppercase text-primary'>
        {eyebrow}
      </span>
      <div className='flex items-center gap-3'>
        <span className='block h-px w-8 bg-primary/40' />
        <span className='block h-1 w-1 rounded-full bg-primary/60' />
        <span className='block h-px w-8 bg-primary/40' />
      </div>
      <h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight max-w-2xl'>
        {title}
      </h2>
      {description && (
        <p className='text-sm sm:text-base font-light text-muted-foreground max-w-xl leading-relaxed mt-2'>
          {description}
        </p>
      )}
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className='w-full bg-background overflow-hidden'>
      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className='relative w-full min-h-[70vh] flex items-center justify-center px-6 sm:px-8 py-20'>
        {/* Subtle background patterns */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.03),transparent_70%)]' />
          <div className='absolute top-20 right-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl animate-pulse' />
          <div className='absolute bottom-20 left-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl' />
        </div>

        <div className='relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8'>
          <span className='text-[10px] tracking-[0.4em] font-bold uppercase text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            Nasza Historia
          </span>
          <h1 className='font-serif text-5xl sm:text-6xl lg:text-8xl font-normal text-foreground leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200'>
            Rzemiosło, które <br />
            <em className='italic font-light'>definiuje przestrzeń</em>.
          </h1>
          <p className='text-base sm:text-lg font-light text-muted-foreground max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400'>
            W Domowym Pięknie nie tylko sprzedajemy przedmioty. Kurujemy kolekcje, które niosą ze sobą duszę, historię rąk, które je stworzyły, i obietnicę trwałości.
          </p>
          <div className='flex gap-4 mt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600'>
             <Button asChild className="rounded-none px-8 py-6 text-[10px] tracking-[0.2em] uppercase font-semibold">
                <a href="#story">Odkryj więcej</a>
             </Button>
          </div>
        </div>
      </section>

      {/* ── Our Narrative Section ────────────────────────────────────── */}
      <section id="story" className='max-w-7xl mx-auto px-6 sm:px-8 py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
          <div className='relative aspect-square w-full bg-muted/30 group'>
            <Image 
              src="/meble-1.jpg" 
              alt="Praca rzemieślnicza" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className='absolute -bottom-6 -right-6 w-48 h-48 border border-primary/20 bg-background/80 backdrop-blur-md p-6 hidden sm:flex flex-col justify-end gap-2'>
               <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Od 2012</span>
               <p className="text-xs font-serif italic">Pasja do detalu, która stała się sposobem na życie.</p>
            </div>
          </div>
          
          <div className='flex flex-col gap-8'>
            <SectionHeading 
              eyebrow="Korzenie" 
              title="Zaczęło się od jednego wazonu i marzenia." 
              align="left"
            />
            <div className='space-y-6 text-sm sm:text-base font-light text-muted-foreground leading-relaxed'>
              <p>
                Wszystko zaczęło się w małym warsztacie na przedmieściach, gdzie pierwszy założyciel Domowego Piękna odkrył magię surowej gliny i naturalnego lnu. Fascynacja tym, jak jeden, dobrze wykonany przedmiot może zmienić atmosferę całego pokoju, przerodziła się w misję.
              </p>
              <p>
                Dziś współpracujemy z ponad 300 rzemieślnikami z całego świata — od lokalnych garncarzy po mistrzów tkactwa. Każdy z nich podziela naszą wizję "Slow Living": tworzenia przedmiotów, które nie tylko służą, ale stają się częścią rodzinnej historii.
              </p>
            </div>
            <div className='flex items-center gap-4 pt-4'>
                <div className='flex flex-col'>
                    <span className='font-serif text-2xl text-foreground italic'>Anna & Piotr</span>
                    <span className='text-[10px] uppercase tracking-widest text-primary font-bold'>Założyciele</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy / Values ──────────────────────────────────────── */}
      <section className='bg-primary/5 py-24 px-6 sm:px-8 border-y border-border/40'>
        <div className='max-w-7xl mx-auto'>
          <SectionHeading 
            eyebrow="Filozofia" 
            title="Wartości, które tkamy w każdy detal." 
            description="Nasze podejście opiera się na trzech filarach, które definiują każdy produkt w naszej ofercie."
          />

          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mt-16'>
            {/* Value 1 */}
            <div className='flex flex-col items-center text-center gap-6 group'>
              <div className='w-16 h-16 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 shadow-sm'>
                <Paintbrush size={24} strokeWidth={1.5} />
              </div>
              <h3 className='font-serif text-2xl font-normal text-foreground'>Etyczna Produkcja</h3>
              <p className='text-sm font-light text-muted-foreground leading-relaxed'>
                Wspieramy godną pracę i uczciwe wynagrodzenie. Znamy twarze ludzi, którzy tworzą nasze meble i tekstylia.
              </p>
            </div>

            {/* Value 2 */}
            <div className='flex flex-col items-center text-center gap-6 group'>
              <div className='w-16 h-16 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 shadow-sm'>
                <Wind size={24} strokeWidth={1.5} />
              </div>
              <h3 className='font-serif text-2xl font-normal text-foreground'>Naturalne Materiały</h3>
              <p className='text-sm font-light text-muted-foreground leading-relaxed'>
                Len, lite drewno, mosiądz, kamionka. Wybieramy surowce, które żyją, oddychają i szlachetnie się starzeją.
              </p>
            </div>

            {/* Value 3 */}
            <div className='flex flex-col items-center text-center gap-6 group'>
              <div className='w-16 h-16 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 shadow-sm'>
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
              <h3 className='font-serif text-2xl font-normal text-foreground'>Trwałość Pokoleniowa</h3>
              <p className='text-sm font-light text-muted-foreground leading-relaxed'>
                Przeciwstawiamy się kulturze jednorazowości. Nasze produkty projektujemy tak, by cieszyły przez dekady.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Artisans / Process ───────────────────────────────────────── */}
      <section className='max-w-7xl mx-auto px-6 sm:px-8 py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
          <div className='order-2 lg:order-1 flex flex-col gap-10'>
             <div className='flex flex-col gap-4'>
                <span className='text-[10px] tracking-[0.3em] font-semibold uppercase text-primary'>Proces</span>
                <h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight'>
                   Od szkicu do Twojego salonu.
                </h2>
             </div>
             
             <div className='space-y-10'>
                {/* Step 1 */}
                <div className='flex gap-6 items-start'>
                    <div className='shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold'>01</div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='text-lg font-serif font-medium'>Selekcja Artyzanów</h4>
                        <p className='text-sm font-light text-muted-foreground'>Szukamy twórców, dla których praca jest formą medytacji i wyrazem najwyższego kunsztu.</p>
                    </div>
                </div>
                {/* Step 2 */}
                <div className='flex gap-6 items-start'>
                    <div className='shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold'>02</div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='text-lg font-serif font-medium'>Dobór Materiałów</h4>
                        <p className='text-sm font-light text-muted-foreground'>Testujemy trwałość, dotyk i zapach. Każdy materiał musi spełniać nasze rygorystyczne normy.</p>
                    </div>
                </div>
                {/* Step 3 */}
                <div className='flex gap-6 items-start'>
                    <div className='shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold'>03</div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='text-lg font-serif font-medium'>Ostatni Szlif</h4>
                        <p className='text-sm font-light text-muted-foreground'>Zanim produkt trafi do Ciebie, przechodzi przez nasze ręce, byśmy mieli pewność, że jest doskonały.</p>
                    </div>
                </div>
             </div>
          </div>

          <div className='order-1 lg:order-2 grid grid-cols-2 gap-4 h-[500px]'>
             <div className='relative h-full bg-muted/20'>
                <Image src="/lampa-1.jpg" alt="Rzemiosło" fill className="object-cover" />
             </div>
             <div className='flex flex-col gap-4 h-full'>
                <div className='relative flex-1 bg-muted/20'>
                    <Image src="/wazony-1.jpg" alt="Rzemiosło" fill className="object-cover" />
                </div>
                <div className='relative flex-1 bg-muted/20'>
                    <Image src="/tekstylia-1.jpg" alt="Rzemiosło" fill className="object-cover" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── Stats / Numbers ──────────────────────────────────────────── */}
      <section className='w-full py-20 px-6 sm:px-8 border-t border-border/40'>
        <div className='max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center'>
            <div className='flex flex-col gap-2'>
                <span className='font-serif text-5xl text-primary'>300+</span>
                <span className='text-[10px] uppercase tracking-widest font-bold text-muted-foreground'>Twórców</span>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='font-serif text-5xl text-primary'>15k</span>
                <span className='text-[10px] uppercase tracking-widest font-bold text-muted-foreground'>Domów</span>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='font-serif text-5xl text-primary'>12</span>
                <span className='text-[10px] uppercase tracking-widest font-bold text-muted-foreground'>Lat Tradycji</span>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='font-serif text-5xl text-primary'>100%</span>
                <span className='text-[10px] uppercase tracking-widest font-bold text-muted-foreground'>Eko-Paczek</span>
            </div>
        </div>
      </section>

      {/* ── Team Section ─────────────────────────────────────────────── */}
      <section className='py-24 px-6 sm:px-8 bg-foreground text-background'>
        <div className='max-w-7xl mx-auto flex flex-col items-center gap-16'>
           <div className='flex flex-col items-center text-center gap-4'>
                <span className='text-[10px] tracking-[0.3em] font-semibold uppercase text-primary'>Nasz Zespół</span>
                <h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight'>
                    Ludzie, którzy <em className="italic font-light">kochają to, co robią</em>.
                </h2>
           </div>

           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full'>
                {[
                    { name: "Aleksandra", role: "Główna Kuratorka", icon: Compass },
                    { name: "Marek", role: "Logistyka i Jakość", icon: ShieldCheck },
                    { name: "Zofia", role: "Relacje z Artyzanami", icon: Users },
                ].map((person) => (
                    <div key={person.name} className='flex flex-col items-center gap-6 group'>
                        <div className='w-32 h-32 rounded-full border border-primary/20 bg-background/5 flex items-center justify-center transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-105'>
                            <person.icon size={48} strokeWidth={1} className="text-primary/60" />
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                            <h4 className='font-serif text-xl'>{person.name}</h4>
                            <span className='text-[10px] uppercase tracking-widest text-primary/80 font-bold'>{person.role}</span>
                        </div>
                    </div>
                ))}
           </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className='relative py-32 px-6 sm:px-8 text-center'>
        <div className='max-w-3xl mx-auto flex flex-col items-center gap-8'>
            <Sparkles className='text-primary animate-bounce' size={32} strokeWidth={1.5} />
            <h2 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-tight'>
                Gotowy wprowadzić piękno <br /> do swojego domu?
            </h2>
            <p className='text-base font-light text-muted-foreground leading-relaxed'>
                Przejrzyj naszą najnowszą kolekcję i znajdź przedmioty, które będą Ci towarzyszyć przez lata.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                <Button asChild className="rounded-none px-10 py-7 text-[10px] tracking-[0.2em] uppercase font-semibold">
                    <Link href="/shop">Zacznij Zakupy</Link>
                </Button>
                <Button variant="outline" asChild className="rounded-none px-10 py-7 text-[10px] tracking-[0.2em] uppercase font-semibold">
                    <Link href="/collections">Zobacz Kolekcje</Link>
                </Button>
            </div>
        </div>
        
        {/* Decorative corner accents */}
        <div className='absolute top-0 left-0 w-24 h-24 border-t border-l border-primary/20' />
        <div className='absolute bottom-0 right-0 w-24 h-24 border-b border-r border-primary/20' />
      </section>
    </div>
  )
}
