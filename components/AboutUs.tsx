"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, HandHeart, Star, Clock } from "lucide-react"

function SectionDivider() {
  return (
    <div className='flex items-center gap-3 justify-center'>
      <span className='block h-px w-10 bg-primary/40' />
      <span className='block h-1 w-1 rounded-full bg-primary/60' />
      <span className='block h-px w-10 bg-primary/40' />
    </div>
  )
}

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const steps = 60
          const stepTime = duration / steps
          let current = 0
          const increment = end / steps
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, stepTime)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 12, suffix: "+", label: "lat doświadczenia" },
  { value: 340, suffix: "+", label: "artyzanów i twórców" },
  { value: 98, suffix: "%", label: "zadowolonych klientów" },
  { value: 2400, suffix: "+", label: "unikalnych przedmiotów" },
]

const values = [
  {
    icon: HandHeart,
    title: "Rękodzieło",
    description:
      "Każdy przedmiot w naszej kolekcji jest wybrany ze względu na historię twórcy i wyjątkowość wykonania.",
  },
  {
    icon: Leaf,
    title: "Zrównoważoność",
    description:
      "Współpracujemy wyłącznie z artyzanami, którzy dbają o środowisko i używają naturalnych materiałów.",
  },
  {
    icon: Star,
    title: "Ponadczasowość",
    description:
      "Stawiamy na przedmioty, które pięknieją z wiekiem i towarzyszą przez wiele lat.",
  },
  {
    icon: Clock,
    title: "Slow Living",
    description:
      "Wierzymy w piękno powolnego życia — w przestrzenie, które zapraszają do zatrzymania się.",
  },
]

export default function AboutUs() {
  return (
    <section
      id='about-us'
      className='w-full bg-background border-t border-border/60'
    >
      <div className='relative w-full py-28 px-6 sm:px-8 flex flex-col items-center text-center overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl' />
        </div>

        <div className='relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6 select-none'>
          <span className='text-[10px] tracking-[0.35em] font-semibold uppercase text-primary'>
            O nas
          </span>

          <SectionDivider />

          <h2 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-[1.15] tracking-tight'>
            Wierzymy w piękno powolnego życia&nbsp;— w przedmioty tworzone z
            troską, materiały, które{" "}
            <em className='italic font-light'>pięknieją z wiekiem</em>, i
            przestrzenie, które zapraszają do{" "}
            <em className='font-light'>zatrzymania</em>.
          </h2>

          <p className='text-sm sm:text-base font-light text-muted-foreground max-w-xl leading-relaxed'>
            Każdy przedmiot w naszej kolekcji jest wybrany ze względu na
            integralność materiałową, historię twórcy i zdolność do przetrwania
            w piękny sposób. Współpracujemy z artyzanami, którzy podzielają
            nasze zaangażowanie w rzemiosło i zrównoważony rozwój.
          </p>

          <div className='mt-4'>
            <Button
              asChild
              variant='outline'
              className='rounded-none border-foreground/30 hover:border-primary hover:text-primary text-foreground/80 font-semibold text-[10px] tracking-[0.2em] uppercase py-6 px-8 transition-all duration-300 group cursor-pointer'
            >
              <a href='/about'>
                Nasza historia
                <ArrowRight
                  size={13}
                  className='ml-2 transition-transform duration-300 group-hover:translate-x-1.5'
                />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className='border-y border-border/60 bg-primary/3'>
        <div className='max-w-5xl mx-auto px-6 sm:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-4'>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className='flex flex-col items-center gap-1 text-center select-none'
            >
              <span className='font-serif text-4xl sm:text-5xl font-normal text-primary leading-none'>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </span>
              <span className='text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground mt-1'>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='max-w-5xl mx-auto px-6 sm:px-8 py-24'>
        <div className='flex flex-col items-center text-center mb-16 gap-4 select-none'>
          <span className='text-[10px] tracking-[0.3em] font-semibold uppercase text-primary'>
            Nasze wartości
          </span>
          <SectionDivider />
          <h3 className='font-serif text-3xl sm:text-4xl font-normal text-foreground leading-[1.1]'>
            Co nami kieruje
          </h3>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/40'>
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className='group bg-background p-8 sm:p-10 flex flex-col gap-4 hover:bg-primary/3 transition-colors duration-300'
              >
                <div className='w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300'>
                  <Icon size={18} strokeWidth={1.5} />
                </div>

                <h4 className='font-serif text-xl font-normal text-foreground leading-tight'>
                  {value.title}
                </h4>
                <p className='text-sm font-light text-muted-foreground leading-relaxed'>
                  {value.description}
                </p>

                <span className='block mt-2 h-px w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-12' />
              </div>
            )
          })}
        </div>
      </div>

      <div className='relative w-full bg-foreground overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none opacity-10'>
          <div className='absolute top-0 left-1/4 w-px h-full bg-primary-foreground' />
          <div className='absolute top-0 right-1/4 w-px h-full bg-primary-foreground' />
        </div>

        <div className='relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-20 flex flex-col items-center text-center gap-8 select-none'>
          <span className='text-[10px] tracking-[0.35em] font-semibold uppercase text-primary'>
            Nasze zobowiązanie
          </span>

          <blockquote className='font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-background leading-tight tracking-tight'>
            &ldquo;Piękno tkwi w szczegółach — w sęku drewna, w fakturze gliny,
            w zapachu lnu. To właśnie szukamy dla Ciebie.&rdquo;
          </blockquote>

          <div className='flex flex-col items-center gap-1'>
            <span className='block h-px w-8 bg-primary/60 mb-3' />
            <span className='text-xs uppercase tracking-[0.25em] font-semibold text-background/60'>
              Zespół Domu&shy;owego Piękna
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
