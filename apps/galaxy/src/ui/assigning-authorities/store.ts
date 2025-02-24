import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getCodesetCodes, GetCodesetCodesResponse } from './actions'
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
  selectedCodesetCodes: GetCodesetCodesResponse | undefined
  selectedCode: Code | undefined
  page: number
  pageCache: Record<number, GetCodesetCodesResponse | undefined>
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
  setAssigningAuthorities: (assigningAuthorities: AssigningAuthority[]) => void
  setSelectedAssigningAuthority: (
    selectedAssigningAuthority: AssigningAuthority | undefined,
  ) => void
  setSelectedCodeset: (selectedCodeset: Codeset | undefined) => void
  setSelectedCode: (selectedCode: Code | undefined) => void
  fetchSelectedCodesetCodes: (page?: number, reset?: boolean) => void
  updateCurrentPageData: (
    updatedCodesetCodes: GetCodesetCodesResponse | undefined,
  ) => Promise<void>
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
  selectedCodesetCodes: undefined,
  selectedCode: undefined,
  page: 1,
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
    const { page, pageCache } = get()
    set({
      selectedCodesetCodes: updatedCodesetCodes,
      pageCache: {
        ...pageCache,
        [page]: updatedCodesetCodes,
      },
    })
  },
  fetchSelectedCodesetCodes: async (page = 1, reset = false) => {
    const { selectedAssigningAuthority, selectedCodeset } = get()
    if (!selectedAssigningAuthority || !selectedCodeset)
      return set({ loading: false })

    set({ loading: true, error: '' })

    const response = await getCodesetCodes({
      assigningAuthorityId: selectedAssigningAuthority?.id,
      codesetId: selectedCodeset?.id,
      page,
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
      pageCache: reset
        ? { [page]: response.data }
        : { ...get().pageCache, [page]: response.data },
      page,
    })
  },
  next: () => {
    const page = get().page + 1
    if (get().pageCache[page]) {
      return set({
        selectedCodesetCodes: get().pageCache[page],
        page,
      })
    }
    get().fetchSelectedCodesetCodes(page)
  },
  prev: () => {
    const page = get().page - 1
    if (get().pageCache[page]) {
      return set({
        selectedCodesetCodes: get().pageCache[page],
        page,
      })
    }
    get().fetchSelectedCodesetCodes(page)
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

    get().fetchSelectedCodesetCodes(page)
  },
}))

export { useStore }
