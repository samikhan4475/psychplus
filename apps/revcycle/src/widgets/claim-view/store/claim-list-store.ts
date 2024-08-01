'use client'

import { type StateCreator } from 'zustand'
import { ClaimListState } from './types'

const claimListStore: StateCreator<ClaimListState> = (set) => ({
  claimList: [],
  setClaimList(claims) {
    set({ claimList: claims })
  },
})

export { claimListStore, type ClaimListState }
