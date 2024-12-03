import { createContext } from 'react'
import { createStore as zustandCreateStore } from 'zustand'
import { getPatientMedicationsAction } from '../actions'
import type { GetPatientMedicationsResponse } from '../types'

interface StoreInit {
  patientId: string
}

interface StoreState {
  patientId: string
  data?: GetPatientMedicationsResponse
  loading?: boolean
  error?: string
  fetchPatientMedications: () => void
}

type Store = ReturnType<typeof createStore>

const createStore = (init: StoreInit) => {
  return zustandCreateStore<StoreState>()((set, get) => ({
    patientId: init.patientId,
    data: undefined,
    loading: true,
    error: undefined,
    fetchPatientMedications: async () => {
      set({
        error: undefined,
        loading: true,
      })

      const result = await getPatientMedicationsAction({
        patientIds: [get().patientId],
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
  }))
}

const StoreContext = createContext<Store | null>(null)

export { createStore, StoreContext, type Store, type StoreInit }
