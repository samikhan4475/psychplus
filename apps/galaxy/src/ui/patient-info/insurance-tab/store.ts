import { create } from 'zustand'
import { Insurance } from '@/types'

interface Store {
  insurances?: Insurance[]
  filteredInsurances?: Insurance[]
  error?: string
  loading?: boolean
  activeStatus: boolean | null
  inactiveStatus: boolean | null
  patientBilling?: string
  setPatientBilling: (status: string) => void
  isAddFormOpen: boolean
  setAddFormOpen: (value: boolean) => void
  setFilteredInsurances: (
    isActive: boolean | null,
    isInactive: boolean | null,
  ) => void
  setInsurances: (insurances: Insurance[]) => void
}

const useStore = create<Store>((set, get) => ({
  insurances: [],
  filteredInsurances: [],
  isAddFormOpen: false,
  error: undefined,
  loading: undefined,
  activeStatus: true,
  inactiveStatus: false,
  patientBilling: 'self-pay',
  setAddFormOpen: (value) => set({ isAddFormOpen: value }),
  setPatientBilling: (value) => set({ patientBilling: value }),

  setInsurances: (patientInsurances: Insurance[]) => {
    set({ error: undefined, loading: true })
    set({ insurances: patientInsurances, loading: false })
    const { activeStatus, inactiveStatus } = get()
    get().setFilteredInsurances(activeStatus, inactiveStatus)
  },
  setFilteredInsurances: (
    isActive: boolean | null,
    isInactive: boolean | null,
  ) => {
    const allInsurances = get().insurances || []

    const filterActive = isActive === true
    const filterInactive = isInactive === true
    const filteredInsurances = allInsurances.filter((insurance) => {
      const isInsuranceActive = insurance.isActive
      if (!filterActive && !filterInactive) {
        return false
      }
      if (filterActive && !filterInactive) {
        return isInsuranceActive
      }
      if (!filterActive && filterInactive) {
        return !isInsuranceActive
      }

      return true
    })

    set({
      filteredInsurances,
      activeStatus: isActive,
      inactiveStatus: isInactive,
    })
  },
}))

export { useStore }
