"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#metodologias", label: "Metodologías" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#blog", label: "Blog" },
  { href: "#contacto-formulario", label: "Contacto" },
]

const sectionIds = navLinks.map((l) => l.href.slice(1))

function navHref(hashLink: string, pathname: string | null) {
  return pathname === "/" ? hashLink : `/${hashLink}`
}

function clearSelectionAndFadeBar(
  setActiveSection: (v: string) => void,
  setBarExiting: (v: boolean) => void,
  setBarVisible: (v: boolean) => void,
  setExitUnderline: (u: { left: number; width: number }) => void,
  currentUnderline: { left: number; width: number },
  skipScrollUpdateUntilRef: React.MutableRefObject<number>
) {
  setActiveSection("")
  setBarVisible(false)
  setExitUnderline(currentUnderline)
  setBarExiting(true)
  skipScrollUpdateUntilRef.current = Date.now() + 1500
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const [underline, setUnderline] = useState({ left: 0, width: 0 })
  const [barExiting, setBarExiting] = useState(false)
  const [barVisible, setBarVisible] = useState(true)
  const [exitUnderline, setExitUnderline] = useState({ left: 0, width: 0 })
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const skipScrollUpdateUntil = useRef(0)

  const updateUnderline = () => {
    const activeIndex = navLinks.findIndex((l) => l.href === activeSection)
    if (activeIndex === -1 || !navRef.current) {
      return
    }
    const el = linkRefs.current[activeIndex]
    const nav = navRef.current
    if (el) {
      const navRect = nav.getBoundingClientRect()
      const linkRect = el.getBoundingClientRect()
      setUnderline({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      })
    }
  }

  useEffect(() => {
    if (activeSection && navRef.current) updateUnderline()
  }, [activeSection])

  useEffect(() => {
    if (pathname !== "/") return
    const observers: IntersectionObserver[] = []
    const observer = new IntersectionObserver(
      (entries) => {
        if (skipScrollUpdateUntil.current > Date.now()) return
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.getAttribute("id")
          if (id && sectionIds.includes(id)) setActiveSection(`#${id}`)
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        observers.push(observer)
      }
    })
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    const onResize = () => updateUnderline()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [activeSection])

  useEffect(() => {
    if (activeSection && !barExiting) {
      const raf = requestAnimationFrame(() => setBarVisible(true))
      const t = window.setTimeout(() => setBarVisible(true), 100)
      return () => {
        cancelAnimationFrame(raf)
        window.clearTimeout(t)
      }
    }
  }, [activeSection, barExiting])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Margora - Inicio"
            onClick={() =>
              clearSelectionAndFadeBar(
                setActiveSection,
                setBarExiting,
                setBarVisible,
                setExitUnderline,
                underline,
                skipScrollUpdateUntil
              )
            }
          >
            <Image
              src="/assets/images/logo.png"
              alt="Margora"
              width={220}
              height={64}
              className="h-12 sm:h-14 w-auto object-contain"
              priority
            />
          </Link>

          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-10 relative"
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                ref={(el) => { linkRefs.current[i] = el }}
                href={navHref(link.href, pathname)}
                onClick={() => setActiveSection(link.href)}
                className={`relative text-sm font-medium transition-colors ${
                  activeSection === link.href
                    ? "text-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {((activeSection && (underline.width > 0 || !barExiting)) || barExiting) && (
              <span
                className={`absolute bottom-0 h-0.5 bg-primary rounded-full transition-[left,width,opacity] duration-300 ease-out ${
                  barExiting ? "opacity-0" : barVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  left: barExiting ? exitUnderline.left : underline.left,
                  width: barExiting ? exitUnderline.width : underline.width,
                  transform: "translateY(100%)",
                }}
                onTransitionEnd={() => barExiting && setBarExiting(false)}
                aria-hidden
              />
            )}
          </nav>

          <div className="hidden md:flex items-center">
            <Button asChild size="sm" className="rounded-full px-5 shadow-lg shadow-primary/20">
              <Link
                href={navHref("#contacto-formulario", pathname)}
                onClick={(e) => {
                  clearSelectionAndFadeBar(
                    setActiveSection,
                    setBarExiting,
                    setBarVisible,
                    setExitUnderline,
                    underline,
                    skipScrollUpdateUntil
                  )
                }}
              >
                Contactar
              </Link>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground p-2 rounded-xl hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={navHref(link.href, pathname)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-3 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-border/50">
                <Button asChild size="sm" className="rounded-full justify-center shadow-lg shadow-primary/20">
                  <Link href={navHref("#contacto-formulario", pathname)} onClick={() => setIsMenuOpen(false)}>
                    Contactar
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
