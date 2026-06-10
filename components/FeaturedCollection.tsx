import Image from "next/image"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

const FeaturedCollection = () => {
  return (
    <section className=' w-full min-h-[calc(100vh-80px)]  overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 bg-background px-8 pt-20 '>
      {/* Background Image */}
      <div className='relative z-0 w-full h-[400px] md:h-full'>
        <Image
          src='/lamp.jpg'
          alt='Elegancko urządzony salon w minimalistycznym i ciepłym stylu'
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover object-center select-none'
        />
        {/* Soft overlay to ensure copy readability */}
        <div className='absolute inset-0 bg-black/20 mix-blend-multiply' />
        <div className='absolute inset-0 bg-linear-to-r from-black/40 via-black/15 to-transparent' />
      </div>

      {/* Content Container */}
      <div className=' z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 py-16 flex flex-col justify-center h-full '>
        <div className='max-w-2xl lg:max-w-3xl flex flex-col items-start gap-6 sm:gap-8'>
          {/* Eyebrow */}
          <span className='text-xs font-bold uppercase tracking-[0.25em] drop-shadow-sm select-none'>
            Polecana kolekcja
          </span>

          {/* Heading */}
          <h1 className='font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.05] tracking-tight  drop-shadow-md select-none'>
            Oświetlenie
          </h1>

          {/* Description */}
          <p className='text-base sm:text-lg lg:text-xl /90 font-light max-w-md sm:max-w-lg lg:max-w-xl leading-relaxed drop-shadow-xs'>
            Rzeźbiarskie formy rzucają ciepło i cień. Odkryj rzeźbiarskie formy,
            które rzucają ciepło i cień, zaprojektowane, aby przekształcić każdą
            przestrzeń w sanktuarium światła.
          </p>

          {/* CTA Button */}
          <div className='mt-2 sm:mt-4'>
            <Button
              asChild
              className='bg-primary text-white  hover:bg-primary/80  font-semibold text-xs tracking-widest uppercase py-6 px-8 rounded-none border-0 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-3 cursor-pointer group'
            >
              <a href='/shop'>
                Kup oświetlenie
                <ArrowRight
                  size={14}
                  className='transition-transform duration-300 group-hover:translate-x-1.5'
                />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 /70 select-none'>
        <span className='text-[9px] font-semibold tracking-[0.3em] uppercase /80'>
          Przewiń
        </span>
        <div className='w-0.25 h-12 bg-white/20 relative overflow-hidden'>
          <div className='absolute inset-0 bg-white animate-scroll-line' />
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection
