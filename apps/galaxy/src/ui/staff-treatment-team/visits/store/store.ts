import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getVisitsListAction } from '../actions'
import { GetVisitListData, VisitListPayload } from '../types'

interface Store {
  visitsData?: GetVisitListData
  loadingVisits: boolean
  fetchVistsList: (
    payload: VisitListPayload,
    page?: number,
    reset?: boolean,
  ) => void
  pageCache: Record<number, GetVisitListData>
  page: number
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  payload?: VisitListPayload
}

const useStore = create<Store>((set, get) => ({
  page: 1,
  pageCache: {},
  visitsData: undefined,
  loadingVisits: false,
  fetchVistsList: async (payload, page = 1, reset = false) => {
    set({ loadingVisits: true, payload: payload })

    const result = await getVisitsListAction(payload, page)

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching data')
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

  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        visitsData: get().pageCache[page],
        page,
      })
    }

    get().fetchVistsList(get().payload!, page)
  },
  prev: () => {
    const page = get().page - 1
    if (get().pageCache[page]) {
      return set({
        visitsData: get().pageCache[page],
        page,
      })
    }
    get().fetchVistsList(get().payload!, page)
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
    get().fetchVistsList(get().payload!, page)
  },
}))

export { useStore }
