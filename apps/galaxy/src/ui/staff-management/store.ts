import { create } from 'zustand'
import { SelectOptionType, Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getStaffListAction } from './actions'
import { getStaffRolesOrganizationAction } from './actions/get-organization-staff-roles'
import { STAFF_LIST_TABLE_PAGE_SIZE } from './constants'
import { Staff } from './types'

interface Store {
  data?: Staff[]
  loading?: boolean
  error?: string
  payload?: Partial<Staff>
  page: number
  sort?: Sort
  pageSize: number
  total?: number
  pageCache: Record<number, Staff[] | undefined>
  onPageSizeChange: (pageSize: number) => void
  jumpToPage: (page: number) => void
  search: (
    payload?: Partial<Omit<Staff, 'language'>>,
    page?: number,
    pageSize?: number,
    reset?: boolean,
  ) => void
  getDropDownOptions: () => void
  dropDownOptions: Record<
    'staffs' | 'organizations' | 'roles' | 'practices',
    SelectOptionType[]
  >

  showFilters: boolean
  toggleFilters: () => void
  sortData: (column: string) => void
  next: () => void
  prev: () => void
}

const useStore = create<Store>((set, get) => ({
  data: [],
  page: 1,
  pageCache: {},
  total: undefined,
  pageSize: STAFF_LIST_TABLE_PAGE_SIZE,
  sort: undefined,
  showFilters: true,
  dropDownOptions: {
    organizations: [],
    staffs: [],
    practices: [],
    roles: [],
  },
  getDropDownOptions: async () => {
    const result = await getStaffRolesOrganizationAction()
    if (result.state === 'success') {
      const { organizations, staffs, roles, practices } = result.data
      set({
        dropDownOptions: {
          organizations,
          staffs,
          practices,
          roles,
        },
      })
    }
  },
  toggleFilters: () => set({ showFilters: !get().showFilters }),
  search: async (
    payload,
    page = 1,
    pageSize = STAFF_LIST_TABLE_PAGE_SIZE,
    reset = false,
  ) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
      page: 1,
      pageSize: STAFF_LIST_TABLE_PAGE_SIZE,
    })
    const result = await getStaffListAction({
      payload,
      sort: get().sort,
      page,
      pageSize,
    })
    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }
    set({
      data: result.data,
      total: result.total,
      loading: false,
      pageCache: reset
        ? { [page]: result.data }
        : { ...get().pageCache, [page]: result.data },
      page,
      pageSize,
    })
  },
  onPageSizeChange: (pageSize: number) => {
    set({ pageSize, page: 1, pageCache: {} })
    get().search(get().payload, 1, get().pageSize)
  },
  next: () => {
    const page = get().page + 1

    if (get().pageCache[page]) {
      return set({
        data: get().pageCache[page],
        page,
      })
    }

    get().search(get().payload, page, get().pageSize)
  },
  prev: () => {
    const page = get().page - 1
    if (page < 1) return
    if (get().pageCache[page]) {
      set({
        data: get().pageCache[page],
        page,
      })
    }
    get().search(get().payload, page, get().pageSize)
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().payload, 1, get().pageSize, true)
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
    get().search(get().payload, page, get().pageSize)
  },
}))

export { useStore }
