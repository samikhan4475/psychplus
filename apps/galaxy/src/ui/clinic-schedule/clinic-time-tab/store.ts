import { create } from 'zustand'
import { getStaffById } from '@/actions'
import { ActionResult, Sort, StaffResource } from '@/types'
import {
  getClinicVisitList,
  getLocationAndCosignersOfStateAndServices,
  getStaffActiveStates,
  updateClinicScheduleStatus as patchClinicScheduleStatus,
} from './actions'
import { getPrimaryStatesLocations } from './client-actions'
import { ClinicScheduleStatus } from './constants'
import {
  ClinicSchedule,
  PartialClinicTimeFilterSchema,
  State,
  StatesPrimaryLocation,
  StateWithLocationAndCosigners,
} from './types'

interface Store {
  page: number
  total: number
  pageCache: Record<number, ClinicSchedule[]>
  data?: ClinicSchedule[]
  pendingClinicSchedules?: ClinicSchedule[]
  staff?: StaffResource
  loading?: boolean
  error?: string
  formValues?: PartialClinicTimeFilterSchema
  sort?: Sort
  states?: State[]
  primaryStateLocations: StatesPrimaryLocation[]
  stateWithLocationAndCosigners?: StateWithLocationAndCosigners[]
  fetchClinicSchedules: (
    staffId: string,
    page?: number,
    formValues?: PartialClinicTimeFilterSchema,
  ) => Promise<void>
  fetchPendingClinicSchedules: (staffId: string) => Promise<void>
  updateClinicScheduleStatus: (
    staffId: string,
    clinicTimeId: number,
    status: string,
  ) => Promise<ActionResult<ClinicSchedule>>
  fetchStaffData: (staffId: number) => Promise<void>
  fetchStates: (staffId: number) => Promise<void>
  fetchPrimaryStateLocations: () => Promise<void>
  resetStates: () => void
  fetchLocationWithCosigners: (
    stateCode: string,
    servicesOfferedList: string[],
  ) => Promise<void>
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  refetch: (staffId: number, clinicTimeId?: number) => void
}

const useStore = create<Store>()((set, get) => ({
  data: undefined,
  error: undefined,
  loading: true,
  page: 1,
  total: 10,
  pageCache: {},
  primaryStateLocations: [],
  fetchClinicSchedules: async (staffId, page = 1, formValues = {}) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })
    const result = await getClinicVisitList({ staffId, page, formValues })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      data: result.data,
      loading: false,
      total: result.total,
      page,
    })
  },
  fetchPendingClinicSchedules: async (staffId) => {
    const result = await getClinicVisitList({
      staffId,
      formValues: { scheduleStatus: ClinicScheduleStatus.Pending },
    })
    if (result.state === 'success') {
      set({
        pendingClinicSchedules: result.data,
        loading: false,
      })
    }
  },
  updateClinicScheduleStatus: async (staffId, clinicTimeId, status) => {
    const resp = await patchClinicScheduleStatus(staffId, clinicTimeId, status)
    return resp
  },
  fetchStaffData: async (staffId) => {
    const response = await getStaffById(staffId)
    if (response.state === 'success') {
      set({
        staff: response.data,
      })
    }
  },
  fetchStates: async (staffId) => {
    const response = await getStaffActiveStates(staffId)
    if (response.state === 'success') {
      !get().states?.length && set({ states: response.data })
    }
  },
  fetchPrimaryStateLocations: async () => {
    const response = await getPrimaryStatesLocations()
    if (response.state === 'success') {
      set({
        primaryStateLocations: response.data,
      })
    }
  },
  resetStates: () => {
    set({ states: undefined })
  },
  fetchLocationWithCosigners: async (stateCode, servicesOfferedList) => {
    const response = await getLocationAndCosignersOfStateAndServices(
      stateCode,
      servicesOfferedList,
    )
    if (response.state === 'success') {
      const previousStatesWithCosigners = get().stateWithLocationAndCosigners
      if (!previousStatesWithCosigners) {
        set({
          stateWithLocationAndCosigners: [
            {
              stateCode,
              locationsWithCosigners: response.data.map((el) => ({
                ...el,
                cosigners: el.cosigners?.filter(
                  (cosigner) => String(cosigner.id) !== get().staff?.id,
                ),
              })),
            },
          ],
        })
        return
      }
      set({
        stateWithLocationAndCosigners: [
          ...previousStatesWithCosigners,
          {
            stateCode,
            locationsWithCosigners: response.data.map((el) => ({
              ...el,
              cosigners: el.cosigners?.filter(
                (cosigner) => String(cosigner.id) !== get().staff?.id,
              ),
            })),
          },
        ],
      })
    }
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().fetchClinicSchedules(String(get().staff?.id), page, get().formValues)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
      })
    }
    get().fetchClinicSchedules(String(get().staff?.id), page, get().formValues)
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
      })
    }
    get().fetchClinicSchedules(String(get().staff?.id), page, get().formValues)
  },
  refetch: (staffId, clinicTimeId) => {
    if (clinicTimeId === undefined) {
      get().fetchClinicSchedules(String(staffId), get().page, get().formValues)
      return
    }
    const clinicScheduleFoundInPendingSchedules =
      get().pendingClinicSchedules?.find((el) => el.id === clinicTimeId)
    const clinicScheduleFound = get().data?.find((el) => el.id === clinicTimeId)
    if (clinicScheduleFoundInPendingSchedules) {
      get().fetchPendingClinicSchedules(String(staffId))
    }
    if (clinicScheduleFound) {
      get().fetchClinicSchedules(String(staffId), get().page, get().formValues)
    }
  },
}))

export { useStore }
