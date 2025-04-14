import { create } from 'zustand'
import { LabOrderResponseList, LabOrders, Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getLabOrderResults } from '../actions/get-lab-order-results'
import { LabOrderResultPayload } from '../types'

interface StoreState {
  data: LabOrderResponseList
  loading: boolean
  error?: string
  appointmentId?: string
  payload?: LabOrderResultPayload
  selectedRow: LabOrders | undefined
  selectedRows: LabOrders[]
  pageCache: Record<number, LabOrderResponseList>
  page: number
  isReviewDialogOpen: boolean
  sort?: Sort

  setSelectedRow: (value: LabOrders | undefined) => void
  setSelectedRows: (value: LabOrders[]) => void
  fetchLabOrderResults: (
    payload: LabOrderResultPayload,
    page?: number,
    reset?: boolean,
  ) => void
  openReviewDialog: () => void
  closeReviewDialog: () => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
}

const useStore = create<StoreState>((set, get) => ({
  appointmentId: '',
  page: 1,
  pageCache: {},
  data: {
    labOrders: [],
    total: 0,
  },
  selectedRow: undefined,
  selectedRows: [],
  isReviewDialogOpen: false,
  loading: true,
  error: undefined,
  payload: undefined,

  setSelectedRow: (selectedRow) => set({ selectedRow }),
  setSelectedRows: (selectedRows) => set({ selectedRows }),

  openReviewDialog: () => set({ isReviewDialogOpen: true }),
  closeReviewDialog: () => set({ isReviewDialogOpen: false, selectedRows: [] }),

  fetchLabOrderResults: async (payload, page = 1, reset = false) => {
    set({ error: undefined, loading: true, payload })
    const result = await getLabOrderResults({ payload, page, sort: get().sort, })
    if (result.state === 'error') {
      set({
        error: result.error,
        loading: false,
      })
    } else {
      const labOrders = result.data.labOrders?.filter(
        (laborder) => laborder.recordStatus === 'Active',
      )

      const labOrdersData = {
        ...result.data,
        labOrders,
      }

      set({
        data: labOrdersData,
        loading: false,
        pageCache: reset
          ? { [page]: labOrdersData }
          : { ...get().pageCache, [page]: labOrdersData },
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
    get().fetchLabOrderResults(get().payload!, page)
  },

  prev: () => {
    const page = get().page - 1
    if (page >= 1) {
      set({
        data: get().pageCache[page],
        page,
      })
    }
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().fetchLabOrderResults(get().payload!, 1)
  },
  jumpToPage: (page: number) => {
    if (page < 1) return

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().fetchLabOrderResults(get().payload!, page)
  },
}))

export { useStore }
