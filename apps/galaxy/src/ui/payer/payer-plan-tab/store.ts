import { create } from 'zustand'
import { SharedCode, Sort } from '@/types'
import {
  PayerPlanAddressResponse,
  PayerPlanFilter,
  PayerPlanListResponse,
} from '@/types/payer'
import { getNewSortDir } from '@/utils'
import {
  getPayerPlanListAction,
  getPayersPlanAddressesListAction,
} from '../actions'

interface Store {
  data?: PayerPlanListResponse
  addressData?: PayerPlanAddressResponse[]
  addressLoading?: boolean
  loading?: boolean
  error?: string
  payload?: Partial<PayerPlanFilter>
  sort?: Sort
  page: number
  pageCache: Record<number, PayerPlanListResponse>
  jumpToPage: (page: number) => void
  next: () => void
  prev: () => void
  sortData: (column: string) => void
  search: (
    payload?: Partial<PayerPlanFilter>,
    page?: number,
    reset?: boolean,
  ) => void
  searchAddress: (payerId: string,states:SharedCode[]) => void
}

const useStore = create<Store>((set, get) => ({
  addressData: [],
  data: undefined,
  sort: undefined,
  page: 1,
  pageCache: {},
  search: async (
    payload?: Partial<PayerPlanFilter>,
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getPayerPlanListAction({
      payload,
      sort: get().sort,
      page,
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
    })
  },
  searchAddress: async (payerId,states) => {
    set({
      addressLoading: true,
    })
    const result = await getPayersPlanAddressesListAction(payerId,states)
    if (result.state === 'error') {
      return set({
        addressData: [],
        addressLoading: false,
      })
    }

    set({
      addressData: result.data.filter(
        (item) => item.recoredStatus !== 'Deleted',
      ),
      addressLoading: false,
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

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().payload, page)
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
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().payload, 1, true)
  },
}))

export { useStore }
