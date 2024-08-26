'use client'

import { type StateCreator } from 'zustand'
import { LocationsState } from '.'

const locationStore: StateCreator<LocationsState> = (set) => ({
  locations: [],
  setLocations: (locations) => set({ locations }),
})

export { locationStore }
