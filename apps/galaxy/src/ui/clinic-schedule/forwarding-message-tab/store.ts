import toast from 'react-hot-toast'
import { create } from 'zustand'
import { SelectOptionType, Sort } from '@/types'
import { getForwardingMessagesAction, getStaffOptionsAction } from './actions'
import { transformInForwardings } from './transform'
import {
  ForwardingMessage,
  ForwardingMessageFilters,
  RecordStatus,
} from './types'

interface Store {
  data: ForwardingMessage[]
  total: number
  error?: string
  sort?: Sort
  loading?: boolean
  page: number
  showFilters: boolean
  formValues?: ForwardingMessageFilters
  pageCache: Record<number, ForwardingMessage[]>
  fetchForwardingMessageList: (
    formValues?: ForwardingMessageFilters,
    page?: number,
    reset?: boolean,
  ) => void
  fetchStaffOptions: (userId: number) => void
  setData: (data: ForwardingMessage[]) => void
  staffOptions: SelectOptionType[]
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  refetch: () => void
  staffLoading: boolean
}

const useStore = create<Store>()((set, get) => ({
  data: [],
  total: 0,
  error: undefined,
  loading: false,
  sort: undefined,
  page: 1,
  showFilters: false,
  formValues: undefined,
  pageCache: {},
  staffOptions: [],
  staffLoading: false,

  fetchForwardingMessageList: async (formValues, page = 1, reset = false) => {
    set({ error: undefined, loading: true, formValues })
    const result = await getForwardingMessagesAction({
      payload: {
        ...formValues,
        recordStatuses: formValues?.recordStatuses?.length
          ? formValues?.recordStatuses
          : [RecordStatus.Active, RecordStatus.InActive],
      },
      page,
    })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    const data = transformInForwardings(result.data)
    set({
      data,
      loading: false,
      pageCache: reset
        ? { [page]: data }
        : { ...get().pageCache, [page]: data },
      page,
    })
  },
  fetchStaffOptions: async (userId) => {
    set({ staffLoading: true })
    const result = await getStaffOptionsAction()
    if (result.state === 'error') {
      set({ staffLoading: false })
      return toast.error(result.error)
    }
    const filteredData = result?.data.filter(
      (option) => Number(option.value) !== userId,
    )
    set({ staffOptions: filteredData ?? [], staffLoading: false })
  },
  setData: (data) => set({ data: transformInForwardings(data) }),
  next: () => {
    const page = get().page + 1
    if (get().pageCache[page]) {
      return set({ data: get().pageCache[page], page })
    }
    get().fetchForwardingMessageList(get().formValues, page)
  },
  prev: () => {
    const page = get().page - 1
    if (page < 1) return
    if (get().pageCache[page]) {
      return set({ data: get().pageCache[page], page })
    }
    get().fetchForwardingMessageList(get().formValues, page)
  },
  jumpToPage: (page: number) => {
    if (page < 1) return
    if (get().pageCache[page]) {
      return set({ data: get().pageCache[page], page })
    }
    get().fetchForwardingMessageList(get().formValues, page)
  },
  refetch: () => {
    get().fetchForwardingMessageList(get().formValues, get().page, true)
  },
}))

export { useStore }
