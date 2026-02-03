import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Newsletter } from "@/components/newsletter"

describe("Newsletter", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("envía el email a /api/newsletter y muestra éxito", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    )
    const user = userEvent.setup()
    render(<Newsletter />)
    await user.type(screen.getByPlaceholderText(/tu@email\.com/i), "user@mail.com")
    await user.click(screen.getByRole("button", { name: /suscribirse/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        "/api/newsletter",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "user@mail.com" }),
        })
      )
    })
    await waitFor(() => {
      expect(screen.getByText(/Gracias por suscribirte/i)).toBeInTheDocument()
    })
    fetchSpy.mockRestore()
  })

  it("muestra error cuando la API devuelve error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Error al guardar" }), { status: 500 })
    )
    const user = userEvent.setup()
    render(<Newsletter />)
    await user.type(screen.getByPlaceholderText(/tu@email\.com/i), "user@test.com")
    await user.click(screen.getByRole("button", { name: /suscribirse/i }))

    await waitFor(() => {
      expect(screen.getByText(/Error al guardar|Error al suscribirse/i)).toBeInTheDocument()
    })
    vi.restoreAllMocks()
  })
})
