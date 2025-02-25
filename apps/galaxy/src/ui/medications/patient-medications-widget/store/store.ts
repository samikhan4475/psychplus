import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getScriptSureExternalPatient, getScriptSureSessionToken } from '@/actions'
import { saveWidgetAction } from '@/actions/save-widget'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getPatientMedicationsAction } from '../client-actions'
import { PatientPrescriptionStatus, type GetPatientMedicationsResponse } from '../types'
import { DAWSYS } from '@/constants'

interface StoreState {
  patientId?: string
  data?: GetPatientMedicationsResponse
  loading?: boolean
  error?: string
  externalPatientId?: number
  isPmpReviewed: boolean
  scriptSureSessionToken?: string
  setPmpReviewed: (value: boolean) => void
  setScriptSureSessionToken: (token: string) => void; 
  fetchPatientMedications: (patientId: string, showOnlyActiveMedications?:boolean) => void
  fetchExternalScriptsurePatientId: (patientId: string) => void
  updateStatus: (updatedMedication: GetPatientMedicationsResponse) => void
  saveIsPmpReviewedForMedication: (patientId: string) => Promise<void>
  fetchScriptSureSessionToken: () => Promise<void>
}

const useStore = create<StoreState>((set, get) => ({
  externalPatiendId: undefined,
  patientId: undefined,
  data: undefined,
  loading: false,
  error: undefined,
  isPmpReviewed: false,
  scriptSureSessionToken: undefined,
  setPmpReviewed: (value: boolean) => set({ isPmpReviewed: value }),
  updateStatus: (updatedMedication: GetPatientMedicationsResponse) => {
    set({
      data: updatedMedication,
    })
  },
  setScriptSureSessionToken: (token: string) => set({ scriptSureSessionToken: token }),
  fetchExternalScriptsurePatientId: async (patientId: string) => {
    const response = await getScriptSureExternalPatient(patientId)

    if (response.state === 'error') {
      return toast.error(response.error ?? 'Failed to Fetch Scriptsure Patient')
    }

    set({
      externalPatientId: response.data.externalPatientId,
    })
  },
  fetchPatientMedications: async (patientId: string, showOnlyActiveMedications?:boolean) => {
    set({
      patientId,
      error: undefined,
      data: undefined,
      loading: true,
    })

    const result = await getPatientMedicationsAction({
      patientIds: [patientId],
      medicationStatuses: showOnlyActiveMedications ? [PatientPrescriptionStatus.ACTIVE, PatientPrescriptionStatus.CURRENT_MEDICATION] : [],
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
  fetchScriptSureSessionToken: async () => {
      set({ scriptSureSessionToken: undefined });
      const response = await getScriptSureSessionToken(DAWSYS);
      if (response.state === 'success') {
        set({ scriptSureSessionToken: response.data });
      } else {
        toast.error(response.error ?? 'Failed to fetch scriptsure session token');
      }
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
