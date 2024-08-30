'use client'

import { type StateCreator } from 'zustand'
import { Claim, StaffDataCodeSet, StateCodes } from '../types'
import { MetaDataCodeSet } from './types'

interface ClaimState {
  claimList: Claim[]
  setClaimList: (codes: Claim[]) => void
  posCodeSets: MetaDataCodeSet[]
  setCodingPosCodeSets: (codes: MetaDataCodeSet[]) => void
  staffCodeSets: StaffDataCodeSet[]
  setStaffCodeSets: (staff: StaffDataCodeSet[]) => void
  accidentTypeCodesets: MetaDataCodeSet[]
  setAccidentTypeCodesets: (codes: MetaDataCodeSet[]) => void
  usaStatesCodeSets: StateCodes[]
  setUSAStatesCodeSets: (codes: StateCodes[]) => void
}

const createClaimStore: StateCreator<ClaimState> = (set) => ({
  claimList: [],
  setClaimList: (claimList: Claim[]) => set({ claimList }),
  posCodeSets: [],
  setCodingPosCodeSets: (posCodeSets: MetaDataCodeSet[]) =>
    set({ posCodeSets }),
  staffCodeSets: [],
  setStaffCodeSets: (staffCodeSets: StaffDataCodeSet[]) =>
    set({ staffCodeSets }),
  accidentTypeCodesets: [],
  setAccidentTypeCodesets: (accidentTypeCodesets: MetaDataCodeSet[]) =>
    set({ accidentTypeCodesets }),
  usaStatesCodeSets: [],
  setUSAStatesCodeSets: (usaStatesCodeSets: StateCodes[]) =>set({ usaStatesCodeSets }),
})

export { createClaimStore, type ClaimState }
