"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón cuando el scroll sea mayor a 600px
      if (window.scrollY > 600) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Escuchar eventos de scroll
    window.addEventListener("scroll", toggleVisibility)

    // Limpiar el listener al desmontar
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        "fixed bottom-8 right-8 z-50 rounded-full shadow-lg shadow-primary/25",
        "h-12 w-12 bg-primary hover:bg-primary/90",
        "transition-all duration-300 ease-in-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Volver al inicio"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}
