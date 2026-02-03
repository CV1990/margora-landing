import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EnvProvider } from "@/components/env-provider"
import { Newsletter } from "@/components/newsletter"

describe("Newsletter", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("muestra 'Suscripción no configurada' cuando no hay clave", async () => {
    const user = userEvent.setup()
    render(
      <EnvProvider web3FormsKey={undefined}>
        <Newsletter />
      </EnvProvider>
    )
    await user.type(screen.getByPlaceholderText(/tu@email\.com/i), "test@test.com")
    await user.click(screen.getByRole("button", { name: /suscribirse/i }))

    await waitFor(() => {
      expect(screen.getByText("Suscripción no configurada")).toBeInTheDocument()
    })
  })

  it("llama a fetch con el email cuando hay clave", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    )
    const user = userEvent.setup()
    render(
      <EnvProvider web3FormsKey="key-newsletter">
        <Newsletter />
      </EnvProvider>
    )
    await user.type(screen.getByPlaceholderText(/tu@email\.com/i), "user@mail.com")
    await user.click(screen.getByRole("button", { name: /suscribirse/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.web3forms.com/submit",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("user@mail.com"),
        })
      )
    })
    fetchSpy.mockRestore()
  })

  it("muestra error cuando la API falla", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: false, message: "Límite alcanzado" }), { status: 200 })
    )
    const user = userEvent.setup()
    render(
      <EnvProvider web3FormsKey="key">
        <Newsletter />
      </EnvProvider>
    )
    await user.type(screen.getByPlaceholderText(/tu@email\.com/i), "user@test.com")
    await user.click(screen.getByRole("button", { name: /suscribirse/i }))

    await waitFor(() => {
      expect(screen.getByText(/Límite alcanzado|Error al suscribirse/i)).toBeInTheDocument()
    })
    vi.restoreAllMocks()
  })
})
