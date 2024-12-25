import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getClinicalStaffAction } from './actions/get-clinical-staff'
import { getVisitsListAction } from './actions/get-visits-lists'
import { ClinicalStaffList, TreatmentTeamTab, VisitsList } from './types'

type Tab = TreatmentTeamTab | string

interface Store {
  activeTab: Tab
  viewedTabs: Set<Tab>
  setActiveTab: (tab: Tab) => void
  visitsData: VisitsList[]
  clinicalStaffData: ClinicalStaffList[]
  loadingVisits: boolean
  loadingClinicalstaff: boolean
  fetchVistsList: (staffId: number) => void
  fetchClinicalStaff: (staffId: number) => void
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
  clinicalStaffData: [],
  loadingVisits: false,
  loadingClinicalstaff: false,
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
  fetchClinicalStaff: async (staffId: number) => {
    set({ loadingClinicalstaff: true })

    const result = await getClinicalStaffAction({
      staffId: staffId,
      payload: {},
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching data')
      return set({ loadingClinicalstaff: false })
    }

    set({
      clinicalStaffData: result.data.map((clinical) => ({
        ...clinical,
      })),
      loadingClinicalstaff: false,
    })
  },
}))

export { useStore }
