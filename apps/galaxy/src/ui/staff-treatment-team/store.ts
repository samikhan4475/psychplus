import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getVisitsListAction } from './actions/get-visits-lists'
import { TreatmentTeamTab, VisitsList } from './types'

type Tab = TreatmentTeamTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
  visitsData: VisitsList[]
  loadingVisits: boolean
  fetchVistsList: (staffId: number) => void
}

const useStore = create<Store>((set, get) => ({
  activeTab: TreatmentTeamTab.Care_Teams,
  viewedTabs: new Set([TreatmentTeamTab.Care_Teams]),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)
    set({
      activeTab: activeTab,
      viewedTabs,
    })
  },
  visitsData: [],
  loadingVisits: false,
  fetchVistsList: async (staffId: number) => {
    set({ loadingVisits: true })

    const result = await getVisitsListAction({ staffId: staffId, payload: {} })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching data')
      return set({ loadingVisits: false })
    }

    set({
      visitsData: result.data.map((visit) => ({
        ...visit,
      })),
      loadingVisits: false,
    })
  },
}))

export { useStore }
