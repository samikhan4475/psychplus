import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getPatientStatementDetailListAction } from '../../actions'
import {
  PatientStatementPayload,
  PatientStatementsListResponse,
} from '../../types'

interface Store {
  patientStatementData?: PatientStatementsListResponse
  patientStatementLoading?: boolean
  patientStatementError?: string
  patientStatementPayload?: PatientStatementPayload
  patientId: number
  sort?: Sort
  pageCache: Record<number, PatientStatementsListResponse>
  selectedStatements: string[]
  search: (
    patientId: number,
    payload?: PatientStatementPayload,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  setSelectedStatements: (value: string[]) => void
}

const useStore = create<Store>((set, get) => ({
  patientStatementData: undefined,
  page: 1,
  pageCache: {},
  sort: undefined,
  selectedStatements: [],
  patientId: 0,
  setSelectedStatements: (selectedStatements) => set({ selectedStatements }),
  search: async (
    patientId: number,
    payload?: PatientStatementPayload,
    page = 1,
    reset = false,
  ) => {
    set({
      patientStatementError: undefined,
      patientStatementLoading: true,
      patientStatementPayload: payload,
      patientId,
    })
    const result = await getPatientStatementDetailListAction({
      payload,
      sort: get().sort,
    })
    if (result.state === 'error') {
      return set({
        patientStatementError: result.error,
        patientStatementLoading: false,
      })
    }
    set({
      patientStatementData: result.data,
      patientStatementLoading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
    })
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().patientId, get().patientStatementPayload, 1, true)
  },
}))

export { useStore }
