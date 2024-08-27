'use client'

import { type StateCreator } from 'zustand'
import { ServiceState } from '.'

const serviceStore: StateCreator<ServiceState> = (set) => ({
  services: [],
  setServices: (services) => set({ services }),
})

export { serviceStore }