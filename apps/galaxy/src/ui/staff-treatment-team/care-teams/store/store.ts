import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getProviderCareTeams } from '../actions'
import { CareTeam } from '../types'

interface Store {
  clinicalStaffData: CareTeam[]
  adminData: CareTeam[]
  loadingClinicalStaff: boolean
  loadingAdmin: boolean
  fetchClinicalStaff: (staffId: number) => void
  fetchAdmin: (staffId: number) => void
}

const useStore = create<Store>((set) => ({
  clinicalStaffData: [],
  adminData: [],
  loadingClinicalStaff: false,
  loadingAdmin: false,
  fetchAdmin: async (staffId) => {
    set({ loadingAdmin: true })

    const result = await getProviderCareTeams({
      staffId: staffId,
      isOnlyCareManagers: true,
    })
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching data')
      set({ loadingAdmin: false })
      return
    }

    set({
      adminData: result.data,
      loadingAdmin: false,
    })
  },
  fetchClinicalStaff: async (staffId) => {
    set({ loadingClinicalStaff: true })

    const result = await getProviderCareTeams({
      staffId,
      isOnlyMedicalAssistants: true,
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching data')
      set({ loadingClinicalStaff: false })
      return
    }

    set({
      clinicalStaffData: result.data,
      loadingClinicalStaff: false,
    })
  },
}))

export { useStore }
