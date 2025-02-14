import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getScriptSureExternalPatient } from '@/actions'
import { saveWidgetAction } from '@/actions/save-widget'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getPatientMedicationsAction } from '../client-actions'
import type { GetPatientMedicationsResponse } from '../types'

interface StoreState {
  patientId?: string
  data?: GetPatientMedicationsResponse
  loading?: boolean
  error?: string
  externalPatientId?: number
  isPmpReviewed: boolean
  setPmpReviewed: (value: boolean) => void
  fetchPatientMedications: (patientId: string) => void
  fetchExternalScriptsurePatientId: (patientId: string) => void
  updateStatus: (updatedMedication: GetPatientMedicationsResponse) => void
  saveIsPmpReviewedForMedication: (patientId: string) => Promise<void>
}

const useStore = create<StoreState>((set, get) => ({
  externalPatiendId: undefined,
  patientId: undefined,
  data: undefined,
  loading: false,
  error: undefined,
  isPmpReviewed: false,
  setPmpReviewed: (value: boolean) => set({ isPmpReviewed: value }),
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

  saveIsPmpReviewedForMedication: async (patientId) => {
    const isPmpReviewed = get().isPmpReviewed
    const response = await saveWidgetAction({
      patientId,
      data: [
        {
          pid: Number(patientId),
          sectionName: QuickNoteSectionName.QuicknoteSectionMedications,
          sectionItem: 'isPmpReviewed',
          sectionItemValue: isPmpReviewed ? 'Yes' : 'No',
        },
      ],
    })

    if (response.state === 'error') {
      toast.error(response.error)
    }
  },
}))

export { useStore }
