import { getLocalTimeZone, today } from '@internationalized/date'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getDateString } from '@/ui/schedule/utils'
import { getVisitsListAction } from '../actions'
import { VISITS_TABLE_PAGE_SIZE } from '../constant'
import { GetVisitListData, VisitListPayload } from '../types'

interface Store {
  visitsData?: GetVisitListData
  loadingVisits: boolean
  fetchVisitsList: (
    payload: VisitListPayload,
    page?: number,
    pageSize?: number,
    reset?: boolean,
  ) => void
  pageCache: Record<number, GetVisitListData>
  page: number
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  payload?: VisitListPayload
  pageSize: number
  onPageSizeChange: (pageSize: number) => void
}

const useStore = create<Store>((set, get) => ({
  page: 1,
  pageCache: {},
  visitsData: undefined,
  pageSize: VISITS_TABLE_PAGE_SIZE,
  loadingVisits: false,
  fetchVisitsList: async (
    payload,
    page = 1,
    pageSize = VISITS_TABLE_PAGE_SIZE,
    reset = false,
  ) => {
    payload.startingDate = payload?.startingDate
      ? payload.startingDate
      : getDateString(today(getLocalTimeZone()))

    set({
      loadingVisits: true,
      payload: payload,
      page,
      pageSize,
    })
    const result = await getVisitsListAction(payload, page)
    if (result.state === 'error') {
      let error = 'Failed to fetch visits'
      if (result.error) error = result.error
      toast.error(error)
      return set({ loadingVisits: false })
    }
    set({
      visitsData: result.data,
      loadingVisits: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
    })
  },
  onPageSizeChange: (pageSize: number) => {
    set({ pageSize, page: 1, pageCache: {} })
    get().fetchVisitsList(get().payload as VisitListPayload, 1, get().pageSize)
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        visitsData: get().pageCache[page],
        page,
      })
    }

    get().fetchVisitsList(
      get().payload as VisitListPayload,
      page,
      get().pageSize,
    )
  },
  prev: () => {
    const page = get().page - 1
    if (get().pageCache[page]) {
      return set({
        visitsData: get().pageCache[page],
        page,
      })
    }
    get().fetchVisitsList(
      get().payload as VisitListPayload,
      page,
      get().pageSize,
    )
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }
    if (get().pageCache[page]) {
      return set({
        visitsData: get().pageCache[page],
        page,
      })
    }
    get().fetchVisitsList(
      get().payload as VisitListPayload,
      page,
      get().pageSize,
    )
  },
}))

export { useStore }
