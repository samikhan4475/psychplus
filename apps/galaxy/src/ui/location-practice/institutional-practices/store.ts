import { create } from 'zustand'
import { LocationPractice } from '@/types'
import { getLocationListAction } from '../actions'
import { GetLocationListResponse } from './types'

interface Store {
  data?: GetLocationListResponse
  loading?: boolean
  error?: string
  checkedRecord?: string
  setCheckedRecord: (checkedRecord: string) => void
  setData: (data: LocationPractice[]) => void
  fetchLocations: (payload: {
    locationId: string
    practiceType: string
  }) => void
}

const useStore = create<Store>()((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  checkedRecord: undefined,
  setCheckedRecord: (checkedRecord) => set({ checkedRecord }),
  setData: (locations) =>
    set({ data: { locations, total: Number(get().data?.total) } }),
  fetchLocations: async (payload) => {
    set({
      error: undefined,
      loading: true,
    })
    const result = await getLocationListAction(payload)
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
