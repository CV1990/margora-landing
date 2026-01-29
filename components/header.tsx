"use client"

import { useState } from "react"
import Link from "next/link"
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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
            margora<span className="text-muted-foreground">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <Button asChild size="sm" className="rounded-full px-5 shadow-lg shadow-primary/20">
              <Link href="#contacto-formulario">Contactar</Link>
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
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-3 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-border/50">
                <Button asChild size="sm" className="rounded-full justify-center shadow-lg shadow-primary/20">
                  <Link href="#contacto-formulario" onClick={() => setIsMenuOpen(false)}>
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
