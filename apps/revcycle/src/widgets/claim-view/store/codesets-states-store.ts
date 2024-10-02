'use client'

import { type StateCreator } from 'zustand'
import { Claim, SelectOption, StaffDataCodeSet, StateCodes } from '../types'
import { MetaDataCodeSet, PracticeList } from './types'

interface ClaimState {
  claimList: Claim[]
  setClaimList: (codes: Claim[]) => void
  practiceList: PracticeList[]
  setPracticeList: (list: PracticeList[]) => void
  posCodeSets: MetaDataCodeSet[]
  setCodingPosCodeSets: (codes: MetaDataCodeSet[]) => void
  staffCodeSets: StaffDataCodeSet[]
  setStaffCodeSets: (staff: StaffDataCodeSet[]) => void
  accidentTypeCodesets: MetaDataCodeSet[]
  setAccidentTypeCodesets: (codes: MetaDataCodeSet[]) => void
  usaStatesCodeSets: StateCodes[]
  setUSAStatesCodeSets: (codes: StateCodes[]) => void
  paymentMethodCodeSets: SelectOption[]
  setPaymentMethodCodeSets: (codes: SelectOption[]) => void
  paymentSourceTypeCodeSets: SelectOption[]
  setPaymentSourceTypeCodeSets: (codes: SelectOption[]) => void
  claimPaymentFiltrationDateType: SelectOption[]
  setClaimPaymentFiltrationDateType: (codes: SelectOption[]) => void
}

const createClaimStore: StateCreator<ClaimState> = (set) => ({
  claimList: [],
  setClaimList: (claimList: Claim[]) => set({ claimList }),
  practiceList: [],
  setPracticeList: (list: PracticeList[]) => set({ practiceList: list }),
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
  setUSAStatesCodeSets: (usaStatesCodeSets: StateCodes[]) =>
    set({ usaStatesCodeSets }),
  paymentMethodCodeSets: [],
  setPaymentMethodCodeSets: (paymentMethodCodeSets: StateCodes[]) =>
    set({ paymentMethodCodeSets }),
  paymentSourceTypeCodeSets: [],
  setPaymentSourceTypeCodeSets: (paymentSourceTypeCodeSets: StateCodes[]) =>
    set({ paymentSourceTypeCodeSets }),
  claimPaymentFiltrationDateType: [],
  setClaimPaymentFiltrationDateType: (
    claimPaymentFiltrationDateType: StateCodes[],
  ) => set({ claimPaymentFiltrationDateType }),
})

export { createClaimStore, type ClaimState }
