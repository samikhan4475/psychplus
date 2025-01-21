import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Encounter, SelectOptionType, StaffResource } from '@/types'
import { getCosignersAction, getVisitTypesAction } from './actions'

interface Store {
  visitTypes: Encounter[]
  cosigners: StaffResource[]
  loading: boolean
  cosignersLoading: boolean
  fetchVisitTypes: (locationType: string) => void
  fetchCosigners: () => void
  providerOptions: SelectOptionType[]
}
const useStore = create<Store>()((set) => ({
  visitTypes: [],
  cosigners: [],
  cosignersLoading: false,
  providerOptions: [],
  loading: false,
  fetchVisitTypes: async (locationType: string) => {
    set({ loading: true })
    const response = await getVisitTypesAction(locationType)
    if (response.state === 'error') {
      set({ loading: false })
      return toast.error(response?.error)
    }
    set({ loading: false, visitTypes: response?.data ?? [] })
  },
  fetchCosigners: async () => {
    set({ cosignersLoading: true })
    const response = await getCosignersAction()
    if (response.state === 'error') {
      set({ cosignersLoading: false })

      return toast.error(response?.error)
    }
    set({ cosignersLoading: false, cosigners: response?.data ?? [] })
  },
}))

export { useStore }
