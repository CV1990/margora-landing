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
