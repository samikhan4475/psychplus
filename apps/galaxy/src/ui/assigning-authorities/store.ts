import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getCodesetCodes } from './actions'
import { CODESET_CODES_TABLE_PAGE_SIZE } from './codesets'
import { AssigningAuthority, Code, Codeset } from './types'

interface Store {
  loading: boolean
  attributesLoading: boolean
  saving: boolean
  error: string
  setError: (error: string) => void
  setSaving: (saving: boolean) => void
  assigningAuthorities: AssigningAuthority[]
  selectedAssigningAuthority: AssigningAuthority | undefined
  selectedCodeset: Codeset | undefined
  selectedCodesetCodes: Code[]
  selectedCode: Code | undefined
  page: number
  pageSize: number
  total?: number
  pageCache: Record<number, Code[] | undefined>
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  setAssigningAuthorities: (assigningAuthorities: AssigningAuthority[]) => void
  setSelectedAssigningAuthority: (
    selectedAssigningAuthority: AssigningAuthority | undefined,
  ) => void
  setSelectedCodeset: (selectedCodeset: Codeset | undefined) => void
  setSelectedCode: (selectedCode: Code | undefined) => void
  fetchSelectedCodesetCodes: (
    page?: number,
    pageSize?: number,
    reset?: boolean,
  ) => void
  updateCurrentPageData: (updatedCodesetCodes: Code[]) => Promise<void>
}

const useStore = create<Store>((set, get) => ({
  loading: true,
  attributesLoading: false,
  saving: false,
  error: '',
  errors: [],
  assigningAuthorities: [],
  manageAttributes: [],
  selectedAssigningAuthority: undefined,
  selectedCodeset: undefined,
  selectedCodesetCodes: [],
  selectedCode: undefined,
  page: 1,
  total: undefined,
  pageSize: CODESET_CODES_TABLE_PAGE_SIZE,
  pageCache: {},
  setError: (error) => set({ error }),
  setSaving: (saving) => set({ saving }),
  setAssigningAuthorities: (assigningAuthorities) =>
    set({ assigningAuthorities, loading: false }),
  setSelectedAssigningAuthority: (selectedAssigningAuthority) =>
    set({ selectedAssigningAuthority }),
  setSelectedCodeset: (selectedCodeset) => set({ selectedCodeset }),
  setSelectedCode: (selectedCode) => set({ selectedCode }),
  updateCurrentPageData: async (updatedCodesetCodes) => {
    const { page, pageCache, total, selectedCodesetCodes } = get()
    set({
      selectedCodesetCodes: updatedCodesetCodes,
      pageCache: {
        ...pageCache,
        [page]: updatedCodesetCodes,
      },
      total:
        updatedCodesetCodes?.length > selectedCodesetCodes?.length && total
          ? total + 1
          : total,
    })
  },
  fetchSelectedCodesetCodes: async (
    page = 1,
    pageSize = CODESET_CODES_TABLE_PAGE_SIZE,
    reset = false,
  ) => {
    const { selectedAssigningAuthority, selectedCodeset } = get()
    if (!selectedAssigningAuthority || !selectedCodeset)
      return set({ loading: false })

    set({
      loading: true,
      page: 1,
      pageSize: CODESET_CODES_TABLE_PAGE_SIZE,
    })

    const response = await getCodesetCodes({
      assigningAuthorityId: selectedAssigningAuthority?.id,
      codesetId: selectedCodeset?.id,
      page,
      pageSize,
    })

    if (response.state === 'error') {
      toast.error(response.error ?? 'Error while fetching codeset codes')
      return set({
        error: response.error,
        loading: false,
      })
    }

    set({
      selectedCodesetCodes: response.data,
      loading: false,
      total: response.total,
      pageCache: reset
        ? { [page]: response.data }
        : { ...get().pageCache, [page]: response.data },
      page,
      pageSize,
    })
  },
  onPageSizeChange: (pageSize: number) => {
    set({ pageSize, page: 1, pageCache: {} })
    get().fetchSelectedCodesetCodes(1, get().pageSize)
  },
  next: () => {
    const page = get().page + 1
    if (get().pageCache[page]) {
      return set({
        selectedCodesetCodes: get().pageCache[page],
        page,
      })
    }
    get().fetchSelectedCodesetCodes(page, get().pageSize)
  },
  prev: () => {
    const page = get().page - 1
    if (page < 1) return
    if (get().pageCache[page]) {
      return set({
        selectedCodesetCodes: get().pageCache[page],
        page,
      })
    }
    get().fetchSelectedCodesetCodes(page, get().pageSize)
  },
  jumpToPage: (page: number) => {
    if (page < 1) {
      return
    }

    if (get().pageCache[page]) {
      return set({
        selectedCodesetCodes: get().pageCache[page],
        page,
      })
    }

    get().fetchSelectedCodesetCodes(page, get().pageSize)
  },
}))

export { useStore }
