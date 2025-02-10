import { create } from 'zustand'
import { Insurance } from '@/types'
import { FilterOptions } from './types'

interface Store {
  insurances?: Insurance[]
  filteredInsurances?: Insurance[]
  error?: string
  filterValue: FilterOptions
  loading?: boolean
  patientBilling?: string
  setPatientBilling: (status: string) => void
  isAddFormOpen: boolean
  setAddFormOpen: (value: boolean) => void
  setFilteredInsurances: (value: FilterOptions) => void
  setInsurances: (insurances: Insurance[]) => void
}

const useStore = create<Store>((set, get) => ({
  insurances: [],
  filteredInsurances: [],
  isAddFormOpen: false,
  error: undefined,
  loading: undefined,
  filterValue: FilterOptions.ALL,
  patientBilling: 'self-pay',
  setAddFormOpen: (value) => set({ isAddFormOpen: value }),
  setPatientBilling: (value) => set({ patientBilling: value }),
  setInsurances: (patientInsurances: Insurance[]) => {
    set({ error: undefined, loading: true })
    set({ insurances: patientInsurances, loading: false })
    const { filterValue } = get()
    get().setFilteredInsurances(filterValue)
  },
  setFilteredInsurances: (value: FilterOptions) => {
    const allInsurances = get().insurances || []

    const filteredInsurances =
      value === FilterOptions.ALL
        ? allInsurances
        : allInsurances?.filter((insurance) =>
            value === FilterOptions.ACTIVE
              ? insurance.isActive
              : !insurance.isActive,
          )

    set({
      filteredInsurances,
      filterValue: value,
    })
  },
}))

export { useStore }
