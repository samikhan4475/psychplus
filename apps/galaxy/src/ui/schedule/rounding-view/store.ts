import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getUnitsGroupsAction } from '../actions'
import { GetUnitsGroupsResponse } from '../types'

interface Store {
  data: GetUnitsGroupsResponse
  error?: string
  loading?: boolean
  fetchUnitsAndGroups: (arg: string[]) => void
}

const useStore = create<Store>((set) => ({
  data: { serviceGroups: [], serviceUnits: [] },
  error: undefined,
  loading: undefined,
  fetchUnitsAndGroups: async (serviceIds) => {
    set({
      error: undefined,
      loading: true,
    })
    const result = await getUnitsGroupsAction(serviceIds)
    if (result.state === 'error') {
      toast.error('Failed to retrieve units and groups')
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
