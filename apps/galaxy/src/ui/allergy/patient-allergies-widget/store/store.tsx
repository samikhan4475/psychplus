import { createContext } from 'react'
import { createStore as zustandCreateStore } from 'zustand'
import type { GetPatientAllergiesResponse } from '../types'
import { getPatientAllergiesAction } from '../actions'

interface StoreInit {
  patientId: string
}

interface StoreState {
  patientId: string
  data?: GetPatientAllergiesResponse
  loading?: boolean
  error?: string
  fetch: (page?: number, reset?: boolean) => void
}

type Store = ReturnType<typeof createStore>

const createStore = (init: StoreInit) => {
  return zustandCreateStore<StoreState>()((set, get) => ({
    patientId: init.patientId,
    data: undefined,
    loading: true,
    error: undefined,
    fetch: async (page = 1, reset = false) => {
      set({
        error: undefined,
        loading: true,
      })

      const result = await getPatientAllergiesAction({
        patientId: get().patientId,
        page,
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
