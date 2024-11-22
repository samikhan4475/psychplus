import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getSubmissionListAction } from '../actions/get-submissions-list'
import { GetSubmissionResponse } from '../types'
import { SchemaType } from './submission-filter-form'
import { TabValue } from './types'

interface Store {
  data?: GetSubmissionResponse
  error?: string
  sort?: Sort
  loading?: boolean
  page: number
  formValues?: Partial<SchemaType>
  pageCache: Record<number, GetSubmissionResponse>
  search: (
    formValues?: Partial<SchemaType>,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  jumpToPage: (page: number) => void
  next: () => void
  prev: () => void
  selectedRows: string[]
  setSelectedRows: (value: string[]) => void
  selectedTab: TabValue | string
  setSelectedTab: (value: string) => void
  reset: () => void
  filterInsurancePolicyPriority: string
  setFilterInsurancePolicyPriority: (value: string) => void
}
const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  sort: undefined,
  page: 1,
  formValues: undefined,
  pageCache: {},
  filterInsurancePolicyPriority: 'Primary',
  search: async (
    formValues: Partial<SchemaType> = {},
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })
    const result = await getSubmissionListAction({
      payload: {
        ...formValues,
        isForcePaper: get().selectedTab === TabValue.PaperSubmission,
      },
      page,
      sort: get().sort,
    })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      data: result.data,
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
      page,
    })
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
    get().search(get().formValues, page)
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().search(get().formValues, page)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().formValues, page)
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().formValues, 1, true)
  },
  reset: () =>
    set({
      data: undefined,
      error: undefined,
      loading: undefined,
      sort: undefined,
      page: 1,
      formValues: undefined,
      pageCache: {},
    }),
  selectedTab: TabValue.ElectronicSubmission,
  setSelectedTab: (currentTab) => set({ selectedTab: currentTab }),
  selectedRows: [],
  setSelectedRows: (selectedRows) => set({ selectedRows }),
  setFilterInsurancePolicyPriority: (value) =>
    set({ filterInsurancePolicyPriority: value }),
}))
export { useStore }
