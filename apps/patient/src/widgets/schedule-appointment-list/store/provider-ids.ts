'use client'

import { type StateCreator } from 'zustand'
import { type providerIdsList } from './types'

const createProviderIdsStore: StateCreator<providerIdsList> = (set) => ({
  providerIds: [],
  setProviderIds: (ids) => set({ providerIds: ids }),
})

export { createProviderIdsStore }
