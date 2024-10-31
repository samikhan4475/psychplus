import { create } from 'zustand'
import { getPatientVitalsAction } from '../actions'
import type { PatientVital } from '../types'

interface VitalsParams {
  patientId: string
  appointmentId: string
  recordStatuses?: string[]
  fromDateTime?: string
  toDateTime?: string
}

interface StoreState {
  data?: PatientVital[]
  loading?: boolean
  error?: string
  isFilterEnabled: boolean
  setIsFilterEnabled: (value: boolean) => void
  setData: (data: PatientVital[]) => void
  setError: (error: string) => void
  fetch: (payload: VitalsParams) => void
}

const useStore = create<StoreState>((set, get) => ({
  data: undefined,
  loading: true,
  error: undefined,
  isFilterEnabled: false,
  setIsFilterEnabled: (isFilterEnabled: boolean) => set({ isFilterEnabled }),
  setError: (error: string) => set({ error }),
  setData: (data: PatientVital[]) => set({ data }),
  fetch: async (payload, page = 1, reset = false) => {
    set({
      error: undefined,
      loading: true,
    })

    const result = await getPatientVitalsAction({
      payload: {
        ...payload,
        appointmentId: Number(payload.appointmentId),
      },
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

export { useStore, type VitalsParams }
