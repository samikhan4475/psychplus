import { create } from 'zustand'
import { getPatientVitalsAction } from '../actions'
import type { PatientVital } from '../types'

interface VitalsParams {
  patientId: string
  appointmentId: string
  recordStatuses: string[]
}

interface StoreState {
  patientId: string
  appointmentId: number
  data?: PatientVital[]
  loading?: boolean
  error?: string
  payload?: any
  fetch: (payload: VitalsParams) => void
}

const useStore = create<StoreState>((set, get) => ({
  patientId: '',
  appointmentId: 0,
  data: undefined,
  loading: true,
  error: undefined,
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
