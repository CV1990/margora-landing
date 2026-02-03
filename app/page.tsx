import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Methodologies } from "@/components/methodologies"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Blog } from "@/components/blog"
import { ContactForm } from "@/components/contact-form"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: 'Empresa de Software y Desarrollo Web a la Medida | Margora',
  description: 'Proveedor de software y desarrollo web a la medida. ¿Quién me puede hacer un sitio web? Dónde hacer un sitio web a la medida. Margora: empresa de software, sitios web personalizados y consultoría.',
  openGraph: {
    title: 'Empresa de Software y Desarrollo Web a la Medida | Margora',
    description: 'Proveedor de software, sitio web a la medida. ¿Quién me puede hacer un sitio web? Desarrollo web a la medida.',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Methodologies />
      <Testimonials />
      <CTA />
      <Blog />
      <ContactForm />
      <Newsletter />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
