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
import { Handbag, TextAlignJustify } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export type NavigationSection = {
  title: string
  href: string
}

const navigationData: NavigationSection[] = [
  {
    title: "Kolekcja",
    href: "/collection",
  },
  {
    title: "Produkty",
    href: "/products",
  },
  {
    title: "O nas",
    href: "/about",
  },
  {
    title: "Kontakt",
    href: "/contact",
  },
]

const Navbar = () => {
  const [sticky, setSticky] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50)
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
    <div>
      <header className='bg-background border-2 border-gray-400'>
        <div className='max-w-7xl mx-auto w-full px-4 py-4 sm:px-6'>
          <nav
            className={cn(
              "w-full flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
              sticky
                ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
                : "bg-transparent border-transparent",
            )}
          >
            <Link href='/' className='cursor-pointer'>
              <Logo />
            </Link>
            <div>
              <NavigationMenu className='max-lg:hidden bg-muted p-0.5 rounded-full'>
                <NavigationMenuList className='flex gap-0'>
                  {navigationData.map((navItem) => (
                    <NavigationMenuItem key={navItem.title}>
                      <NavigationMenuLink
                        href={navItem.href}
                        className='px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-background outline outline-transparent hover:outline-border hover:shadow-xs transition uppercase tracking-wider'
                      >
                        {navItem.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className='flex gap-4 items-center'>
              <Handbag />
              <AnimatedThemeToggler />
            </div>

            <div className='lg:hidden'>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className='rounded-full bg-background border border-border p-2 outline-none flex items-center justify-center cursor-pointer transition-colors'>
                  <TextAlignJustify size={20} />
                  <span className='sr-only'>Menu</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end' className='w-56 mt-2'>
                  {navigationData.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <a
                        href={item.href}
                        className='w-full cursor-pointer text-sm font-medium'
                      >
                        {item.title}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Navbar
