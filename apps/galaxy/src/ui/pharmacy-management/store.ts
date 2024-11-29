import toast from 'react-hot-toast'
import { create } from 'zustand'
import { searchPharmaciesAction } from './actions'
import { FilterSchemaType } from './filter-form'
import type { GetPharmacyResponse, Pharmacy, PharmacyParams } from './types'

interface Store {
  data?: Pharmacy[]
  total?: number
  loading?: boolean
  error?: string
  formValues?: Partial<FilterSchemaType>
  page: number
  pageCache: Record<number, GetPharmacyResponse>
  fetchPatientPharmacies: (
    formValues?: Partial<FilterSchemaType>,
    page?: number,
    reset?: boolean,
  ) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  total: undefined,
  loading: false,
  error: undefined,
  formValues: undefined,
  page: 1,
  pageCache: {},

  fetchPatientPharmacies: async (
    formValues: Partial<FilterSchemaType> = {},
    page = 1,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const payload: PharmacyParams = {
      ...formValues,
      isOnlyDefaults: false,
    }

    const result = await searchPharmaciesAction(payload, page)

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching Pharmacies')
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      data: result.data.pharmacies,
      total: result.data.total,
      loading: false,
      page,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
    })
  },

  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page].pharmacies,
        total: get().pageCache[page].total,
        page,
      })
    }

    get().fetchPatientPharmacies(get().formValues, page)
  },

  prev: () => {
    const page = get().page - 1
    if (page < 1) return

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page].pharmacies,
        total: get().pageCache[page].total,
        page,
      })
    }
    get().fetchPatientPharmacies(get().formValues, page)
  },

  jumpToPage: (page: number) => {
    if (page < 1) return

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page].pharmacies,
        total: get().pageCache[page].total,
        page,
      })
    }

    get().fetchPatientPharmacies(get().formValues, page)
  },
}))

export { useStore }
