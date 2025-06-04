import toast from 'react-hot-toast'
import { create } from 'zustand'
import {
  getPatientsOfProviders,
  ProviderRequest,
} from './client-actions/get-patients-of-providers'
import { Patient } from './types'

interface Store {
  primaryPatients: Patient[]
  secondaryPatients: Patient[]
  loadingPrimaryProviders: boolean
  loadingSecondaryProviders: boolean
  fetchPatientsOfProvider: (
    staffId: number,
    isPrimary: boolean,
    providerType: string,
  ) => void
}

const useStore = create<Store>((set) => ({
  primaryPatients: [],
  secondaryPatients: [],
  loadingPrimaryProviders: false,
  loadingSecondaryProviders: false,
  fetchPatientsOfProvider: async (staffId, isPrimary, providerType) => {
    set({ loadingPrimaryProviders: true })

    const payload: ProviderRequest = {
      isNotCareManagers: true,
      isNotMedicalAssistants: true,
      recordStatus: 'Active',
      isIncludePatientInfo: true,
      isPrimaryProvider: isPrimary,
      providerType,
      staffId,
    }

    const result = await getPatientsOfProviders(payload)

    if (result.state === 'error') {
      toast.error(result.error || 'Error while fetching data')
      return set({ loadingPrimaryProviders: false })
    }

    const data = isPrimary
      ? { primaryPatients: result.data }
      : { secondaryPatients: result.data }

    set({
      ...data,
      loadingPrimaryProviders: false,
    })
  },
}))

export { useStore }
