import { create } from 'zustand'
import { getPatientNotesAction, GetPatientNotesParams } from './actions'
import type { GetPatientNotesResponse } from './types'

interface Store {
  patientId: string
  data?: GetPatientNotesResponse
  loading?: boolean
  error?: string
  fetch: (
    payload: GetPatientNotesParams,
    page?: number,
    reset?: boolean,
  ) => void
  selectedRow: string | undefined
  selectedRows: string[]
  setPatientId: (id: string) => void
  setSelectedRow: (value: string | undefined) => void
  setSelectedRows: (value: string[]) => void
  isCreateNoteView: boolean
  setIsCreateNoteView: (value: boolean) => void
  errorMessage: string
  setErrorMessage: (value: string) => void
  isErrorAlertOpen: boolean
  setIsErrorAlertOpen: (value: boolean) => void
}

const useStore = create<Store>((set, get) => ({
  patientId: '',
  data: undefined,
  loading: true,
  error: undefined,
  fetch: async (payload) => {
    // if (!get().patientId) return

    set({
      error: undefined,
      loading: true,
    })

    console.log('🚀 ~ getPatientNotesAction ~ calling:')

    const result = await getPatientNotesAction(payload)

    if (result.state === 'error') {
      console.log('🚀 ~ fetch: ~ result.error:', result.error)
      return set({
        error: result.error,
        loading: false,
      })
    }

    console.log('🚀 ~ getPatientNotesAction ~ result.data:', result.data)

    set({
      data: result.data,
      loading: false,
    })
  },
  selectedRow: undefined,
  selectedRows: [],
  setPatientId: (patientId) => set({ patientId }),
  setSelectedRow: (selectedRow) => set({ selectedRow }),
  setSelectedRows: (selectedRows) => set({ selectedRows }),
  isCreateNoteView: false,
  setIsCreateNoteView: (isCreateNoteView) => set({ isCreateNoteView }),
  errorMessage: '',
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  isErrorAlertOpen: false,
  setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
}))

export { useStore }
