import { create } from 'zustand'
import { Claim, Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getInsurancePaymentListAction } from '../actions'
import {
  GetInsurancePaymentListResponse,
  InsurancePaymentSearchParams,
} from '../types'

interface Store {
  data?: GetInsurancePaymentListResponse
  loading?: boolean
  error?: string
  payload?: InsurancePaymentSearchParams
  page: number
  sort?: Sort
  pageCache: Record<number, GetInsurancePaymentListResponse>
  paymentPostingClaim: Record<string, Claim | undefined>
  setPaymentPostingClaim: (paymentId: string, postingClaim?: Claim) => void
  jumpToPage: (page: number) => void
  search: (
    payload?: InsurancePaymentSearchParams,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  page: 1,
  pageCache: {},
  sort: undefined,
  paymentPostingClaim: {},
  setPaymentPostingClaim: (paymentId: string, postingClaim?: Claim) => {
    const matchingPostingClaim = get().paymentPostingClaim[paymentId]

    const newPaymentPostingClaims = { ...get().paymentPostingClaim }

    if (matchingPostingClaim) {
      delete newPaymentPostingClaims[paymentId]
    } else {
      newPaymentPostingClaims[paymentId] = postingClaim
    }

    set({ paymentPostingClaim: newPaymentPostingClaims })
  },
  search: async (
    payload?: InsurancePaymentSearchParams,
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })
    const result = await getInsurancePaymentListAction({
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
