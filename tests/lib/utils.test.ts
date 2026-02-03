import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("lib/utils cn()", () => {
  it("combina clases", () => {
    expect(cn("a", "b")).toBe("a b")
  })

  it("omite falsy", () => {
    expect(cn("a", false, "b", null, undefined)).toBe("a b")
  })

  it("fusiona clases de Tailwind conflictivas", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })

  it("acepta arrays y objetos", () => {
    expect(cn(["a", "b"])).toBe("a b")
  })
})
