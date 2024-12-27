import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getClinicalStaffAction } from '../actions'
import { getAdminsAction } from '../actions/get-admins'
import { AdminList, ClinicalStaffList } from '../types'

interface Store {
  clinicalStaffData: ClinicalStaffList[]
  adminData: AdminList[]
  loadingClinicalstaff: boolean
  loadingadmin: boolean
  fetchClinicalStaff: (staffId: number) => void
  fetchAdmin: (staffId: number) => void
}

const useStore = create<Store>((set) => ({
  clinicalStaffData: [],
  adminData: [],
  loadingClinicalstaff: false,
  loadingadmin: false,
  fetchAdmin: async (staffId: number) => {
    set({ loadingadmin: true })

    const result = await getAdminsAction({
      staffId: staffId,
    })
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching data')
      return set({ loadingadmin: false })
    }

    set({
      adminData: result.data,
      loadingadmin: false,
    })
  },
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
