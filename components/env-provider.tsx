"use client"

import React, { createContext, useContext } from "react"

type EnvContextValue = {
  web3FormsKey: string | undefined
}

const EnvContext = createContext<EnvContextValue>({ web3FormsKey: undefined })

export function EnvProvider({
  web3FormsKey,
  children,
}: {
  web3FormsKey: string | undefined
  children: React.ReactNode
}) {
  return (
    <EnvContext.Provider value={{ web3FormsKey }}>
      {children}
    </EnvContext.Provider>
  )
}

export function useWeb3FormsKey(): string | undefined {
  return useContext(EnvContext).web3FormsKey
}
