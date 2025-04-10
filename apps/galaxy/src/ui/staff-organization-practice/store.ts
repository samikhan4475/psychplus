import { create } from 'zustand'
import { StaffResource } from '@/types'
import {
  getAllOrganizationPracticesListAction,
  getStaffOrganizationsAction,
} from './actions'
import { Practice } from './types'

interface Store {
  staff?: StaffResource
  data?: Practice[]
  staffOrganizations?: string[]
  dialogTableData?: Practice[]
  loading?: boolean
  dialogTableLoading?: boolean
  error?: string
  setStaff: (setStaff: StaffResource) => void
  search: (payload: Partial<Practice>) => void
  searchStaffOrganizations: (userId: string) => void
  searchDialogPractices: (payload: Partial<Practice>) => void
}
const useStore = create<Store>((set, get) => ({
  data: undefined,
  dialogTableData: undefined,
  staffOrganizations: [],
  staff: undefined,
  setStaff: (staff: StaffResource) => {
    set({
      staff,
    })
  },
  search: async (payload: Partial<Practice>) => {
    set({
      error: undefined,
      loading: true,
    })
    const result = await getAllOrganizationPracticesListAction(payload)
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
  searchStaffOrganizations: async (userId: string) => {
    const result = await getStaffOrganizationsAction(userId)
    if (result.state === 'error') {
      return set({
        staffOrganizations: [],
      })
    }
    set({
      staffOrganizations: result.data,
    })
  },

  searchDialogPractices: async (payload: Partial<Practice>) => {
    set({
      dialogTableLoading: true,
    })
    const result = await getAllOrganizationPracticesListAction(payload)
    if (result.state === 'error') {
      return set({
        dialogTableLoading: false,
      })
    }
    set({
      dialogTableData: result.data,
      dialogTableLoading: false,
    })
  },
}))

export { useStore }
