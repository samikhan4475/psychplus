import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import {
  type ClaimStatus,
  type ClaimStatusDiff,
  type ClaimStatusDiffs,
} from '../types'

interface ClaimStatusConfigState extends CodeSetState {
  addClaimStatusDiff: (...diffs: ClaimStatusDiff[]) => void
  claimStatusDiff?: ClaimStatusDiffs
  claimStatusForEdit?: ClaimStatus
  setClaimStatusForEdit: (claimStatus: ClaimStatus) => void
  clearClaimStatusForEdit: () => void
}

type ClaimStatusConfigStoreType = UseBoundStore<
  StoreApi<ClaimStatusConfigState>
>

const createClaimStatusConfigStore: StateCreator<ClaimStatusConfigState> = (
  set,
  get,
  store,
) => ({
  ...createCodeSetStore(set, get, store),
  claimStatusDiff: undefined,
  claimStatusForEdit: undefined,
  addClaimStatusDiff: (...diffs) => {
    set((state) => ({
      claimStatusDiff: mergeClaimStatusDiffs(state.claimStatusDiff, ...diffs),
    }))
  },
  setClaimStatusForEdit: (claimStatusForEdit) => set({ claimStatusForEdit }),
  clearClaimStatusForEdit: () => set({ claimStatusForEdit: undefined }),
})

const mergeClaimStatusDiffs = (
  current?: ClaimStatusDiffs,
  ...diffs: ClaimStatusDiff[]
) =>
  diffs.reduce(
    (acc, diff) => ({
      ...acc,
      [diff.id]: {
        ...current?.[diff.id],
        ...diff,
      },
    }),
    current,
  )

export {
  createClaimStatusConfigStore,
  type ClaimStatusConfigStoreType,
  type ClaimStatusConfigState,
}
