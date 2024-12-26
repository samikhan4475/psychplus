import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getClinicalStaffAction } from '../actions'
import { ClinicalStaffList } from '../types'

interface Store {
  clinicalStaffData: ClinicalStaffList[]
  loadingClinicalstaff: boolean
  fetchClinicalStaff: (staffId: number) => void
}

const useStore = create<Store>((set) => ({
  clinicalStaffData: [],
  loadingClinicalstaff: false,
  fetchClinicalStaff: async (staffId: number) => {
    set({ loadingClinicalstaff: true })

    const result = await getClinicalStaffAction({
      staffId: staffId,
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching data')
      return set({ loadingClinicalstaff: false })
    }

    set({
      clinicalStaffData: result.data,
      loadingClinicalstaff: false,
    })
  },
}))

export { useStore }
