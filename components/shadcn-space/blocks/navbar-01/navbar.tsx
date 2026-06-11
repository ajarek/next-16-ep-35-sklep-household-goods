"use client"
import Logo from "@/components/Logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Handbag, TextAlignJustify, Heart } from "lucide-react"
import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"

export type NavigationSection = {
  title: string
  href: string
}

const navigationData: NavigationSection[] = [
  {
    title: "Kolekcje",
    href: "/collections",
  },
  {
    title: "Sklep",
    href: "/shop",
  },
  {
    title: "O nas",
    href: "/about",
  },
]

const Navbar = () => {
  const [sticky, setSticky] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const cartItems = useCartStore((state) => state.items)
  const wishlistItems = useWishlistStore((state) => state.items)

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0,
  )
  const totalWishlistItems = wishlistItems.length

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 20)
  }, [])

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [handleScroll, handleResize])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        sticky
          ? "bg-background/80 backdrop-blur-md border-border/40 py-3 shadow-xs"
          : "bg-background border-transparent py-5",
      )}
    >
      <div className='max-w-7xl mx-auto w-full px-6 sm:px-8'>
        <nav className='w-full flex items-center justify-between gap-6'>
          {/* Logo Brand */}
          <Link href='/' className='cursor-pointer'>
            <Logo />
          </Link>

          {/* Center Navigation Menu */}
          <div className='hidden md:block'>
            <NavigationMenu className='bg-transparent'>
              <NavigationMenuList className='flex gap-8'>
                {navigationData.map((navItem) => (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuLink
                      href={navItem.href}
                      className='text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200'
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Action Icons */}
          <div className='flex gap-5 items-center text-muted-foreground'>
            <Link
              href='/wishlist'
              className='relative hover:text-foreground transition-colors duration-200'
            >
              <Heart size={20} strokeWidth={1.5} />
              {isClient && totalWishlistItems > 0 && (
                <span className='absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300'>
                  {totalWishlistItems}
                </span>
              )}
            </Link>
            <Link
              href='/cart'
              className='relative hover:text-foreground transition-colors duration-200'
            >
              <Handbag size={20} strokeWidth={1.5} />
              {isClient && totalItems > 0 && (
                <span className='absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center'>
                  {totalItems}
                </span>
              )}
            </Link>
            <div className='border-l border-border/60 h-4 mx-1 hidden sm:block' />
            <AnimatedThemeToggler />

            {/* Mobile Menu Trigger */}
            <div className='md:hidden'>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className='rounded-full bg-background border border-border p-2 outline-none flex items-center justify-center cursor-pointer transition-colors hover:bg-muted'>
                  <TextAlignJustify size={18} />
                  <span className='sr-only'>Menu</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end' className='w-56 mt-2'>
                  {navigationData.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link
                        href={item.href}
                        className='w-full cursor-pointer text-sm font-medium'
                      >
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
