'use client'

import { useRef } from 'react'
import type { StateCreator, StoreApi, UseBoundStore } from 'zustand'

interface TokenState {
  token?: string
  getToken: () => string
  setToken: (token: string) => void
}

type TokenStoreType = UseBoundStore<StoreApi<TokenState>>

const createTokenStore: StateCreator<TokenState> = (set, get) => ({
  getToken: () => {
    const token = get().token

    if (!token) {
      throw new Error()
    }

    return token
  },
  setToken: (token) => set({ token }),
})

const TokenPreloader = ({
  token,
  store,
}: {
  token: string
  store: TokenStoreType[]
}) => {
  const loaded = useRef(false)
  const setters = store.map((s) => s((state) => state.setToken))

  if (!loaded.current) {
    loaded.current = true
    setters.forEach((set) => set(token))
  }

  return null
}

export { type TokenState, createTokenStore, TokenPreloader }
