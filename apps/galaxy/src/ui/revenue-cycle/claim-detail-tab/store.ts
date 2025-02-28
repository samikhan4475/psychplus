import { create } from 'zustand'
import { ClaimNotesFilter, ClaimNotesResponse } from '@/types'
import { getClaimNotesAction } from './actions'

interface Store {
  data: ClaimNotesResponse[]
  loading?: boolean
  error?: string
  payload: ClaimNotesFilter
  search: (payload: ClaimNotesFilter) => void
  openClaimNotesAlert: boolean
  openClaimNotesAudit: boolean
  openAlertModal: (openClaimNotesAlert: boolean) => void
  setOpenClaimNotesAudit: (openClaimNotesAudit: boolean) => void
  claimNotesId: string
  setClaimNotesId: (claimNotesId: string) => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  payload: {} as ClaimNotesFilter,
  search: async (payload: ClaimNotesFilter) => {
    set({
      data: [],
      error: undefined,
      loading: true,
      payload,
    })

    const result = await getClaimNotesAction({ payload })

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      data: result.data,
      loading: false,
    })
  },
  openClaimNotesAlert: false,
  openAlertModal: (openClaimNotesAlert: boolean) => {
    set((state) => {
      if (!openClaimNotesAlert) {
        return { openClaimNotesAlert, data: [] }
      }
      return { openClaimNotesAlert }
    })
  },
  openClaimNotesAudit: false,
  setOpenClaimNotesAudit: (openClaimNotesAudit: boolean) =>
    set({ openClaimNotesAudit }),
  claimNotesId: '',
  setClaimNotesId: (claimNotesId: string) => set({ claimNotesId }),
}))

export { useStore }
