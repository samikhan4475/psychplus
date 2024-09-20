'use client'

import { create } from 'zustand'
import { SecureMessage, SecureMessageStoreType } from './types'

const useStore = create<SecureMessageStoreType>((set, get) => ({
  secureMessages: [],
  setSecureMessages: (secureMessages: SecureMessage[]) =>
    set({ secureMessages }),
}
))

export { useStore }
