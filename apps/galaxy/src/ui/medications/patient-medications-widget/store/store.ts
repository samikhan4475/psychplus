import { create } from 'zustand'
import toast from 'react-hot-toast'
import { getScriptSureExternalPatient } from '@/actions'
import { getPatientMedicationsAction } from '../client-actions'
import type { GetPatientMedicationsResponse } from '../types'

interface StoreState {
  patientId?: string
  data?: GetPatientMedicationsResponse
  loading?: boolean
  error?: string
  externalPatientId?: number
  fetchPatientMedications: (patientId: string) => void
  fetchExternalScriptsurePatientId: (patientId: string) => void
  updateStatus: (updatedMedication: GetPatientMedicationsResponse) => void
}

const useStore = create<StoreState>((set, get) => ({
  externalPatiendId: undefined,
  patientId: undefined,
  data: undefined,
  loading: false,
  error: undefined,

  updateStatus: (updatedMedication: GetPatientMedicationsResponse) => {
    set({
      data: updatedMedication,
    })
  },
  fetchExternalScriptsurePatientId: async (patientId: string) => {
    const response = await getScriptSureExternalPatient(patientId)

    if (response.state === 'error') {
      return toast.error(response.error ?? 'Failed to Fetch Scriptsure Patient')
    }

    set({
      externalPatientId: response.data.externalPatientId,
    })
  },
  fetchPatientMedications: async (patientId: string) => {
    set({
      patientId,
      error: undefined,
      data: undefined,
      loading: true,
    })

    const result = await getPatientMedicationsAction({
      patientIds: [patientId],
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

export { useStore }
