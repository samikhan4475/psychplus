'use client'

import { type StateCreator } from 'zustand'
import { Claim } from '../types'

interface ClaimState {
  claimList: Claim[]
  setClaimList: (codes: Claim[]) => void
}

const createClaimStore: StateCreator<ClaimState> = (set) => ({
  claimList: [],
  setClaimList: (claimList: Claim[]) => set({ claimList }),
})

export { createClaimStore, type ClaimState }
