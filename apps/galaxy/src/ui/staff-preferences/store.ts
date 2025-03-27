import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Encounter, UserSetting } from '@/types'
import {
  getPreferenceSettings,
  getVisitEncounterTypesAction,
} from './client-actions'
import { transformData, transformVisitTypesData } from './transform'
import { VisitTypes } from './types'

interface Store {
  isPendingStatus: boolean
  loadingPreferences: boolean
  preferences: UserSetting[]
  mappedPreferences: { [key: string]: UserSetting }
  visitTypes: VisitTypes[]
  encounterTypes: Encounter[]
  fetchPreferences: (
    filters: { userId: number },
    useSavedEncounterTypes?: boolean,
  ) => Promise<any>
  setIsPendingStatus: (status: boolean) => void
}

const useStore = create<Store>((set, get) => ({
  isPendingStatus: false,
  loadingPreferences: true,
  preferences: [],
  visitTypes: [],
  encounterTypes: [],
  mappedPreferences: {},
  setIsPendingStatus: (status) => set({ isPendingStatus: status }),
  fetchPreferences: async (filters, useSavedEncounterTypes = false) => {
    set({ loadingPreferences: true })

    const result = await getPreferenceSettings(filters)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching Licenses')
      return set({ loadingPreferences: false })
    }

    const { isPendingStatus, mappedData } = transformData({
      data: result.data,
    })

    set({
      isPendingStatus,
      preferences: result.data,
      mappedPreferences: mappedData,
    })

    if (useSavedEncounterTypes && get().encounterTypes.length > 0) {
      const mappedVisitTypes = transformVisitTypesData(
        get().encounterTypes,
        mappedData,
      )
      set({ visitTypes: mappedVisitTypes, loadingPreferences: false })
      return
    }

    const res = await getVisitEncounterTypesAction()
    if (res.state === 'error') {
      toast.error(res.error ?? 'Error while fetching Licenses')
      return set({ loadingPreferences: false })
    }
    const mappedVisitTypes = transformVisitTypesData(res.data, mappedData)

    set({
      visitTypes: mappedVisitTypes,
      encounterTypes: res.data,
      loadingPreferences: false,
    })
  },
}))

export { useStore }
