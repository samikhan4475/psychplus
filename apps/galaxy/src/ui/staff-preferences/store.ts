import toast from 'react-hot-toast'
import { create } from 'zustand'
import { Encounter, UserSetting } from '@/types'
import {
  getPreferenceSettings,
  getVisitEncounterTypesAction,
} from './client-actions'
import { transformResponse, transformVisitTypesData } from './transform'
import { PreferenceTab, VisitTypes } from './types'

interface Store {
  activeTab: PreferenceTab
  viewedTabs: Set<string>
  setActiveTab: (tab: PreferenceTab) => void

  dashboardStatus: {
    public: boolean
    alert: boolean
    cosigner: boolean
    visit: boolean
  }
  isPublicPendingStatus: boolean
  isAlertPendingStatus: boolean
  isCosignerInfoPendingStatus: boolean
  isVisitSettingsPendingStatus: boolean

  loadingPreferences: boolean
  preferences: UserSetting[]
  mappedPreferences: { [key: string]: UserSetting }
  visitTypes: VisitTypes[]
  encounterTypes: Encounter[]
  fetchPreferences: (
    filters: { userId: number },
    useSavedEncounterTypes?: boolean,
  ) => Promise<void>
  setIsPendingStatus: (
    key:
      | 'isPublicPendingStatus'
      | 'isAlertPendingStatus'
      | 'isCosignerInfoPendingStatus'
      | 'isVisitSettingsPendingStatus',
    status: boolean,
  ) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: PreferenceTab.Dashboard,
  viewedTabs: new Set([PreferenceTab.Dashboard]),
  setActiveTab: (tab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(tab)
    set({ activeTab: tab, viewedTabs })
  },

  dashboardStatus: {
    public: false,
    alert: false,
    cosigner: false,
    visit: false,
  },
  isPublicPendingStatus: false,
  isAlertPendingStatus: false,
  isCosignerInfoPendingStatus: false,
  isVisitSettingsPendingStatus: false,
  loadingPreferences: true,
  preferences: [],
  visitTypes: [],
  encounterTypes: [],
  mappedPreferences: {},
  setIsPendingStatus: (key, status) => set({ [key]: status }),
  fetchPreferences: async (filters, useSavedEncounterTypes = false) => {
    if (!filters.userId) return
    set({ loadingPreferences: true })

    const result = await getPreferenceSettings(filters)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching Licenses')
      set({ loadingPreferences: false })
      return
    }

    const { dashboardStatus, mappedData } = transformResponse({
      data: result.data,
    })

    set({
      preferences: result.data,
      dashboardStatus,
      isPublicPendingStatus: dashboardStatus.public,
      isAlertPendingStatus: dashboardStatus.alert,
      isCosignerInfoPendingStatus: dashboardStatus.cosigner,
      isVisitSettingsPendingStatus: dashboardStatus.visit,
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

    const res = await getVisitEncounterTypesAction({
      isIncludeDurations: true,
      isIncludeCptCodes: true,
    })
    if (res.state === 'error') {
      toast.error(res.error ?? 'Error while fetching Licenses')
      set({ loadingPreferences: false })
      return
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
