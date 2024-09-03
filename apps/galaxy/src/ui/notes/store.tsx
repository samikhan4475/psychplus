import { create } from 'zustand'
import { getPatientNotesAction } from './actions'
import type { GetPatientNotesResponse } from './types'

interface Store {
  patientId: string
  data?: GetPatientNotesResponse
  loading?: boolean
  error?: string
  fetch: (page?: number, reset?: boolean) => void
  selectedRow: string | undefined
  selectedRows: string[]
  setSelectedRow: (value: string | undefined) => void
  setSelectedRows: (value: string[]) => void
  isCreateNoteView: boolean
  setIsCreateNoteView: (value: boolean) => void
}

const useStore = create<Store>((set, get) => ({
  patientId: '',
  data: undefined,
  loading: true,
  error: undefined,
  fetch: async () => {
    set({
      error: undefined,
      loading: true,
    })

    const result = await getPatientNotesAction({
      patientId: get().patientId,
    })

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
  selectedRow: undefined,
  selectedRows: [],
  setSelectedRow: (selectedRow) => set({ selectedRow }),
  setSelectedRows: (selectedRows) => set({ selectedRows }),
  isCreateNoteView: false,
  setIsCreateNoteView: (isCreateNoteView) => set({ isCreateNoteView }),
}))

export { useStore }
