import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getPatientBillingHistoryAction } from './actions'
import { BillingFilterSchemaType } from './filter-form'
import { transformOut } from './transform'
import type { GetBillingHistoryData } from './types'

interface Store {
  data?: GetBillingHistoryData
  error?: string
  loading?: boolean
  showFilters: boolean
  formValues?: Partial<BillingFilterSchemaType>
  pageCache: Record<number, GetBillingHistoryData>
  page: number
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  fetchBillingHistory: (
    formValues?: Partial<BillingFilterSchemaType>,
    page?: number,
    reset?: boolean,
  ) => void
  toggleFilters: () => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,
  showFilters: true,
  page: 1,
  pageCache: {},
  toggleFilters: () => set({ showFilters: !get().showFilters }),
  fetchBillingHistory: async (
    formValues: Partial<BillingFilterSchemaType> = {},
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getPatientBillingHistoryAction(
      transformOut(formValues),
      page,
    )

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching Billing History')
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
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().fetchBillingHistory(get().formValues, page)
  },
  prev: () => {
    const page = get().page - 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }
    get().fetchBillingHistory(get().formValues, page)
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
    get().fetchBillingHistory(get().formValues, page)
  },
}))

export { useStore }
