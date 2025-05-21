import { create } from 'zustand'
import { LinkAccountType, Sort } from '@/types'
import { searchPatientsAction } from '@/ui/patient-lookup/actions'
import { Patient, SearchPatientsData } from '@/ui/patient-lookup/types'
import { getNewSortDir } from '@/utils'
import { getMedicationsListAction } from '../actions'
import { MedicationOrdersTabs } from '../constant'
import {
  MapPatientTypes,
  MedicationRefill,
  MedicationRefillAPIRequest,
  MedicationRefillResponseList,
} from '../types'

interface StoreState {
  data: MedicationRefillResponseList
  loading: boolean
  error?: string
  payload?: MedicationRefillAPIRequest
  activeTab: string
  viewedTabs: Set<string>
  sortData: (column: string) => void
  sort?: Sort
  searchMedicationsList: (
    payload?: MedicationRefillAPIRequest,
    page?: number,
    reset?: boolean,
  ) => Promise<void>
  loadingPatients: boolean
  patientsData?: SearchPatientsData
  searchPatients: (payload?: Partial<MapPatientTypes>, page?: number) => void
  selectedPatient: Patient | null
  setSelectedPatient: (patient: Patient | null) => void
  setActiveTab: (tab: string) => void
  pageCache: Record<number, MedicationRefillResponseList>
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  page: number
}

const useStore = create<StoreState>((set, get) => ({
  appointmentId: '',
  page: 1,
  pageCache: {},
  data: {
    refillRequests: [],
    total: 0,
  },
  selectedTestId: undefined,
  error: undefined,
  payload: undefined,
  loading: false,
  loadingPatients: false,
  activeTab: MedicationOrdersTabs.REFILL_REQUESTS,
  viewedTabs: new Set([MedicationOrdersTabs.REFILL_REQUESTS]),
  sort: undefined,
  searchMedicationsList: async (
    payload?: MedicationRefillAPIRequest,
    page = 1,
    reset = false,
  ) => {
    set({
      loading: true,
      payload: payload,
    })
    const result = await getMedicationsListAction({
      payload,
      sort: get().sort,
      page,
    })
    if (result.state === 'error') {
      return set({
        loading: false,
      })
    }
    set({
      data: result.data,
      loading: false,
      page,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
    })
  },
  searchPatients: async (payload: Partial<LinkAccountType> = {}, page = 1) => {
    set({
      loadingPatients: true,
    })
    const result = await searchPatientsAction({
      ...payload,
      page,
      sort: get().sort,
    })

    if (result.state === 'error') {
      return set({
        patientsData: undefined,
        loadingPatients: false,
      })
    }
    set({
      patientsData: result.data,
      loadingPatients: false,
    })
  },
  setActiveTab: (activeTab) => {
    const { viewedTabs } = get()
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },

  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      set({
        data: get().pageCache[page],
        page,
      })
    } else {
      const { payload } = get()
      if (payload) {
        get().searchMedicationsList()
      }
    }
  },

  prev: () => {
    const page = get().page - 1

    if (page >= 1 && get().pageCache[page]) {
      set({
        data: get().pageCache[page],
        page,
      })
    }
  },

  jumpToPage: (page: number) => {
    if (page < 1) return

    if (get().pageCache[page]) {
      set({
        data: get().pageCache[page],
        page,
      })
    } else {
      const { payload } = get()
      if (payload) {
        get().searchMedicationsList()
      }
    }
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().searchMedicationsList(get().payload, 1, true)
  },
  selectedPatient: null,
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
}))

export { useStore }
