import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getPatientStatementsListAction } from '../actions'
import {
  PatientStatement,
  PatientStatementPayload,
  PatientStatementsListResponse,
} from '../types'

interface Store {
  data?: PatientStatementsListResponse
  loading?: boolean
  error?: string
  payload?: PatientStatementPayload
  page: number
  sort?: Sort
  pageCache: Record<number, PatientStatementsListResponse>
  patientStatement: PatientStatement[]
  setPatientStatement: (value: PatientStatement[]) => void
  search: (
    payload?: PatientStatementPayload,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  page: 1,
  pageCache: {},
  sort: undefined,
  patientStatement: [],
  setPatientStatement: (patientStatement) => set({ patientStatement }),
  search: async (
    payload?: PatientStatementPayload,
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getPatientStatementsListAction({
      payload,
      sort: get().sort,
      page,
    })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
        data: undefined,
      })
    }
    set({
      data: result.data,
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
    })
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().search(get().payload, page)
  },
  prev: () => {
    const page = get().page - 1

    set({
      data: get().pageCache[page],
      page,
    })
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().payload, 1, true)
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().payload, page)
  },
}))

export { useStore }
