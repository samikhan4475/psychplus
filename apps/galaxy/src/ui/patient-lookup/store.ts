import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { searchPatientsAction } from './actions'
import { PATIENT_LOOKUP_FILTERS_KEY } from './constants'
import { PatientLookUpSchemaType } from './patient-filter-form'
import { transformOut } from './transform'
import type { SearchPatientsData } from './types'

interface Store {
  data?: SearchPatientsData
  error?: string
  sort?: Sort
  loading?: boolean
  page: number
  showFilters: boolean
  formValues?: Partial<PatientLookUpSchemaType>
  pageCache: Record<number, SearchPatientsData>
  search: (
    formValues?: Partial<PatientLookUpSchemaType>,
    page?: number,
    reset?: boolean,
  ) => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  toggleFilters: () => void
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      data: undefined,
      error: undefined,
      loading: undefined,
      sort: undefined,
      page: 1,
      showFilters: false,
      formValues: undefined,
      pageCache: {},
      toggleFilters: () => set({ showFilters: !get().showFilters }),

      search: async (
        formValues: Partial<PatientLookUpSchemaType> = {},
        page = 1,
        reset = false,
      ) => {
        set({
          error: undefined,
          loading: true,
          formValues,
        })

        const result = await searchPatientsAction({
          ...transformOut(formValues),
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

        set({
          data: get().pageCache[page],
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
      sortData: (column) => {
        set({
          sort: {
            column,
            direction: getNewSortDir(column, get().sort),
          },
        })

        get().search(get().formValues, 1, true)
      },
    }),
    {
      name: PATIENT_LOOKUP_FILTERS_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        formValues: state.formValues,
        showFilters: state.showFilters,
      }),
    },
  ),
)

export { useStore }
