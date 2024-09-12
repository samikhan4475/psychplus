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
  claimSubmissionHistoryList: [],
  setClaimSubmissionHistoryList(data) {
    set({ claimSubmissionHistoryList: data })
  },

  claimSubmissionHistoryModalOpen: false,
  setClaimSubmissionHistoryModalOpen(open) {
    set({ claimSubmissionHistoryModalOpen: open })
  },
  claimSubmissionHistoryBatchId: '',
  setClaimSubmissionHistoryBatchId(batchId) {
    set({ claimSubmissionHistoryBatchId: batchId })
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
