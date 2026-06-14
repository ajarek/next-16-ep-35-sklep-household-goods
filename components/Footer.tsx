"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
      <circle cx='12' cy='12' r='4' />
      <circle cx='17.5' cy='6.5' r='0.5' fill='currentColor' stroke='none' />
    </svg>
  )
}
function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
    </svg>
  )
}
function IconPinterest({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.566 0-2.387-1.716-4.057-4.164-4.057-2.836 0-4.5 2.126-4.5 4.322 0 .856.33 1.773.741 2.273a.3.3 0 0 1 .069.286c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z' />
    </svg>
  )
}

const navColumns = [
  {
    heading: "Kolekcje",
    links: [
      { label: "Oświetlenie", href: "/shop?category=lighting" },
      { label: "Ceramika", href: "/shop?category=ceramics" },
      { label: "Meble", href: "/shop?category=furniture" },
      { label: "Tekstylia", href: "/shop?category=textiles" },
      { label: "Dekoracje i Wazony", href: "/shop?category=decor" },
      { label: "Kolekcja Sezonowa", href: "/shop?category=seasonal" },
    ],
  },
  {
    heading: "Odkryj",
    links: [
      { label: "Wszystkie produkty", href: "/shop" },
      { label: "Nasza historia", href: "/about" },
      { label: "Koszyk", href: "/cart" },
    ],
  },
  {
    heading: "Pomoc",
    links: [
      { label: "Dostawa i zwroty", href: "/shipping" },
      { label: "Przewodnik pielęgnacji", href: "/care" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Kontakt",
    links: [
      {
        label: "hello@Przytulny Domek.com",
        href: "mailto:hello@Przytulny Domek.com",
      },
      { label: "Pn–Pt, 9–18 CET", href: "#", static: true },
    ],
  },
]

const socials = [
  { icon: IconInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: IconFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: IconPinterest, href: "https://pinterest.com", label: "Pinterest" },
]

function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail("")
  }

  return (
    <div className='flex flex-col gap-3'>
      <span className='text-[9px] font-semibold uppercase tracking-[0.3em] text-stone-500'>
        Bądź z nami w kontakcie
      </span>

      {sent ? (
        <p className='text-sm font-light text-stone-400 italic py-3'>
          Dziękujemy! Zapisałeś się do newslettera.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className='flex w-full max-w-xs'>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Twój adres e-mail'
            className='
              flex-1 min-w-0 bg-white/5 border border-white/10 text-stone-300
              placeholder:text-stone-600 text-[13px] font-light
              px-4 py-3 outline-none
              focus:border-primary/50 focus:bg-white/8
              transition-colors duration-200
            '
          />
          <button
            type='submit'
            aria-label='Zapisz się'
            className='
              flex items-center justify-center w-12 shrink-0
              bg-primary hover:bg-primary/80 text-white
              border border-primary hover:border-primary/80
              transition-colors duration-200 cursor-pointer
            '
          >
            <ArrowRight size={15} />
          </button>
        </form>
      )}

      <div className='flex items-center gap-4 mt-1'>
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={label}
            className='text-stone-600 hover:text-primary transition-colors duration-200'
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='w-full bg-[#1c1917]'>
      <div className='max-w-[1440px] mx-auto px-6 sm:px-8 pt-16 pb-12'>
        <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-10'>
          <div className='flex flex-col gap-3 max-w-xs'>
            <span className='font-serif text-2xl tracking-widest font-medium text-stone-100 transition-opacity hover:opacity-75 select-none'>
              Przytulny Domek
            </span>
            <p className='text-sm font-light text-stone-500 leading-relaxed'>
              Starannie dobrane przedmioty domowe i akcesoria lifestyle&apos;owe
              dla{" "}
              <em className='not-italic text-stone-400'>świadomego życia</em>.
            </p>
          </div>

          <NewsletterForm />
        </div>
      </div>

      <div className='max-w-[1440px] mx-auto px-6 sm:px-8'>
        <div className='h-px bg-white/8' />
      </div>

      <div className='max-w-[1440px] mx-auto px-6 sm:px-8 py-12'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10'>
          {navColumns.map((col) => (
            <div key={col.heading} className='flex flex-col gap-4'>
              <span className='text-[9px] font-semibold uppercase tracking-[0.3em] text-stone-600 select-none'>
                {col.heading}
              </span>

              <ul className='flex flex-col gap-2.5'>
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.static ? (
                      <span className='text-sm font-light text-stone-600 select-none'>
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className='
                          text-sm font-light text-stone-400
                          hover:text-primary
                          transition-colors duration-200
                          relative group inline-block
                        '
                      >
                        {link.label}
                        <span className='absolute -bottom-px left-0 h-px w-0 bg-primary transition-[width] duration-300 group-hover:w-full' />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='border-t border-white/8'>
        <div className='max-w-[1440px] mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <span className='text-[11px] font-light text-stone-600'>
            © {year} Przytulny Domek. Wszelkie prawa zastrzeżone.
          </span>

          <div className='flex items-center gap-6'>
            <Link
              href='/privacy'
              className='text-[11px] font-light text-stone-600 hover:text-primary transition-colors duration-200'
            >
              Polityka prywatności
            </Link>
            <Link
              href='/terms'
              className='text-[11px] font-light text-stone-600 hover:text-primary transition-colors duration-200'
            >
              Warunki usługi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
