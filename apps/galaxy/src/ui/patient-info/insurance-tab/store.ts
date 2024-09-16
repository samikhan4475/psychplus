import { create } from 'zustand'
import { getPatientInsurnacesAction } from './actions'
import { Insurance } from './types'

interface Store {
  insurances?: Insurance[]
  error?: string
  loading?: boolean
  activeStatus?: boolean
  patientBilling?: string
  fetchInsurances: () => void
  setActiveStatus: (status: boolean) => void
  setPatientBilling: (status: string) => void
  isAddFormOpen: boolean
  setAddFormOpen: (value: boolean) => void
}

const useStore = create<Store>((set, get) => ({
  insurances: [],
  isAddFormOpen: false,
  error: undefined,
  loading: undefined,
  activeStatus: undefined,
  patientBilling: 'self-pay',
  fetchInsurances: async () => {
    set({
      error: undefined,
      loading: true,
    })

    const result = await getPatientInsurnacesAction()

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      insurances: result.data || [],
      loading: false,
    })
  },
  setAddFormOpen: (value) => set({ isAddFormOpen: value }),
  setActiveStatus: (status) => set({ activeStatus: status }),
  setPatientBilling: (value) => set({ patientBilling: value }),
}))

export { useStore }
