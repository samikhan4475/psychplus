import { createContext, useContext, useRef } from 'react'
import toast from 'react-hot-toast'
import { StoreApi, useStore as zustandUseStore } from 'zustand'
import { createStore as zustandCreateStore } from 'zustand/vanilla'
import { getUserSettings } from '@/actions'
import { Sort, UserSetting } from '@/types'
import { getNewSortDir, sanitizeFormData } from '@/utils'
import { AUTO_TEXT_TABLE_DEFAULT_PAGE_SIZE } from '../constant'

interface Store {
  data?: UserSetting[]
  loading?: boolean
  name?: string
  total?: number
  sort?: Sort
  sortData: (column: string) => void
  pageSize: number
  onPageSizeChange: (pageSize: number) => void
  page: number
  pageCache: Record<number, UserSetting[]>
  jumpToPage: (page: number) => void
  fetchAutoText: (
    name?: string,
    page?: number,
    pageSize?: number,
    reset?: boolean,
  ) => void
  next: () => void
  prev: () => void
  refetch: () => void
}
const createStore = () =>
  zustandCreateStore<Store>()((set, get) => ({
    data: undefined,
    loading: undefined,
    page: 1,
    total: undefined,
    sort: undefined,
    pageSize: AUTO_TEXT_TABLE_DEFAULT_PAGE_SIZE,
    pageCache: {},
    fetchAutoText: async (
      namePartial = '',
      page = 1,
      pageSize = AUTO_TEXT_TABLE_DEFAULT_PAGE_SIZE,
      reset = false,
    ) => {
      set({
        loading: true,
        name: namePartial,
        page: 1,
        pageSize: AUTO_TEXT_TABLE_DEFAULT_PAGE_SIZE,
      })
      const payload = sanitizeFormData({
        isIncludeMetadataResourceChangeControl: true,
        isIncludeMetadataResourceIds: true,
        isIncludeMetadataResourceStatus: true,
        isHierarchicalQuery: true,
        settingStatusCode: 'Active',
        categoryCodes: ['Application'],
        categoryValue: 'AutoText',
        namePartial,
      })
      const result = await getUserSettings(payload, page, pageSize, get().sort)
      if (result.state === 'error') {
        set({ loading: false })
        return toast.error(result.error)
      }
      set({
        data: result.data,
        loading: false,
        total: result.total,
        pageCache: reset
          ? { [page]: result.data }
          : { ...get().pageCache, [page]: result.data },
        page,
        pageSize,
      })
    },
    next: () => {
      const page = get().page + 1
      if (get().pageCache[page]) {
        return set({ data: get().pageCache[page], page })
      }
      get().fetchAutoText(get().name, page, get().pageSize)
    },
    prev: () => {
      const page = get().page - 1
      if (page < 1) return
      if (get().pageCache[page]) {
        return set({ data: get().pageCache[page], page })
      }
      get().fetchAutoText(get().name, page, get().pageSize)
    },
    jumpToPage: (page: number) => {
      if (page < 1) return

      if (get().pageCache[page]) {
        return set({ data: get().pageCache[page], page })
      }

      get().fetchAutoText(get().name, page, get().pageSize)
    },
    onPageSizeChange: (pageSize: number) => {
      set({ pageSize, page: 1, pageCache: {} })
      get().fetchAutoText(get().name, 1, get().pageSize)
    },
    refetch: () => {
      get().fetchAutoText(get().name, get().page, get().pageSize, true)
    },
    sortData: (column) => {
      set({
        sort: {
          column,
          direction: getNewSortDir(column, get().sort),
        },
        page: 1,
      })
      get().fetchAutoText(get().name, 1, get().pageSize, true)
    },
  }))

const StoreContext = createContext<StoreApi<Store> | undefined>(undefined)

const StoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<StoreApi<Store>>()

  if (!storeRef.current) {
    storeRef.current = createStore()
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = <T,>(selector: (store: Store) => T): T => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error(`useStore must be use within StoreProvider`)
  }

  return zustandUseStore(context, selector)
}

export { useStore, StoreProvider }
