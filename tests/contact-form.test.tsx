import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EnvProvider } from "@/components/env-provider"
import { ContactForm } from "@/components/contact-form"

describe("ContactForm - Web3Forms key", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("muestra 'Formulario no configurado' al enviar cuando NO hay clave (web3FormsKey undefined)", async () => {
    const user = userEvent.setup()
    render(
      <EnvProvider web3FormsKey={undefined}>
        <ContactForm />
      </EnvProvider>
    )

    await user.type(screen.getByLabelText(/nombre/i), "Test")
    await user.type(screen.getByLabelText(/empresa/i), "Empresa")
    await user.type(screen.getByLabelText(/correo/i), "test@test.com")
    await user.type(screen.getByLabelText(/mensaje/i), "Mensaje")
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }))

    await waitFor(() => {
      expect(screen.getByText("Formulario no configurado")).toBeInTheDocument()
    })
  })

  it("muestra 'Formulario no configurado' al enviar cuando la clave es cadena vacía", async () => {
    const user = userEvent.setup()
    render(
      <EnvProvider web3FormsKey="">
        <ContactForm />
      </EnvProvider>
    )

    await user.type(screen.getByLabelText(/nombre/i), "Test")
    await user.type(screen.getByLabelText(/empresa/i), "Empresa")
    await user.type(screen.getByLabelText(/correo/i), "test@test.com")
    await user.type(screen.getByLabelText(/mensaje/i), "Mensaje")
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }))

    await waitFor(() => {
      expect(screen.getByText("Formulario no configurado")).toBeInTheDocument()
    })
  })

  it("llama a fetch con access_key cuando SÍ hay clave", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    )

    const user = userEvent.setup()
    render(
      <EnvProvider web3FormsKey="mi-clave-web3forms">
        <ContactForm />
      </EnvProvider>
    )

    await user.type(screen.getByLabelText(/nombre/i), "Juan")
    await user.type(screen.getByLabelText(/empresa/i), "Acme")
    await user.type(screen.getByLabelText(/correo/i), "juan@acme.com")
    await user.type(screen.getByLabelText(/mensaje/i), "Hola")
    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.web3forms.com/submit",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.stringContaining('"access_key":"mi-clave-web3forms"'),
        })
      )
    })

    fetchSpy.mockRestore()
  })
})
