import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { EnvProvider, useWeb3FormsKey } from "@/components/env-provider"

function TestConsumer() {
  const key = useWeb3FormsKey()
  return <span data-testid="key">{key ?? "EMPTY"}</span>
}

describe("EnvProvider", () => {
  it("proporciona web3FormsKey cuando está definida", () => {
    render(
      <EnvProvider web3FormsKey="test-key-123">
        <TestConsumer />
      </EnvProvider>
    )
    expect(screen.getByTestId("key")).toHaveTextContent("test-key-123")
  })

  it("proporciona undefined cuando web3FormsKey no está definida", () => {
    render(
      <EnvProvider web3FormsKey={undefined}>
        <TestConsumer />
      </EnvProvider>
    )
    expect(screen.getByTestId("key")).toHaveTextContent("EMPTY")
  })

  it("proporciona cadena vacía como valor (no undefined)", () => {
    render(
      <EnvProvider web3FormsKey="">
        <TestConsumer />
      </EnvProvider>
    )
    expect(screen.getByTestId("key")).toHaveTextContent("")
  })
})
