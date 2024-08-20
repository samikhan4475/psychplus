'use client'

import { type StateCreator } from 'zustand'
import { ClaimSubmissionState } from './types'

const ClaimSubmissionStore: StateCreator<ClaimSubmissionState> = (set) => ({
  claimSubmissionData: {
    selectedClaims: [],
    claimsWithErrorMessages: {},
    cleanClaimIds: [],
    submissionType: '',
  },
  setClaimSubmissionData(data) {
    set({ claimSubmissionData: data })
  },
  claimSubmissionModal: false,
  setClaimSubmissionModal(open) {
    set({ claimSubmissionModal: open })
  },

  claimSubmissionDetailModal: false,
  setClaimSubmissionDetailModal(open) {
    set({ claimSubmissionDetailModal: open })
  },

  selectedClaim: '',
  setSelectedClaim(value) {
    set({ selectedClaim: value })
  },
})

export { ClaimSubmissionStore, type ClaimSubmissionState }
