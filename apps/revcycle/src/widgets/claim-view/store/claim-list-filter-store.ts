'use client'

import { type StateCreator } from 'zustand'
import { ClaimFiltersState } from './types'

const initialClaimListFilterState = {
  isIncludeMetadataResourceChangeControl: false,
  isIncludeMetadataResourceIds: false,
  isIncludeMetadataResourceStatus: false,
  patientId: 0,
  insuranceId: '',
  claimId: '',
  locationId: '',
  dateType: '',
  fromDate: undefined,
  toDate: undefined,
  isIncludePatientInsurancePlan: false,
}

const claimListFilterStore: StateCreator<ClaimFiltersState> = (set) => ({
  filters: initialClaimListFilterState,
  handleFiltersChange: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }))
  },
})

export { claimListFilterStore, initialClaimListFilterState }
