import { create } from 'zustand'
import { Role } from '@/types'
import { getAllOrganizationPracticesListAction } from './actions'

interface Store {
  data?: Role[]
  loading?: boolean
  error?: string
  search: (practiceId: string, staffId: string) => void
  selectedStaffId?: string
  setSelectedStaffId: (staffId: string) => void
}
const useStore = create<Store>((set) => ({
  data: undefined,
  dialogTableData: undefined,
  staff: undefined,
  selectedStaffId: undefined,
  setSelectedStaffId: (staffId: string) => set({ selectedStaffId: staffId }),
  search: async (practiceId: string, staffId: string) => {
    set({
      error: undefined,
      loading: true,
    })
    const result = await getAllOrganizationPracticesListAction(
      practiceId,
      staffId,
    )
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
}))

export { useStore }
