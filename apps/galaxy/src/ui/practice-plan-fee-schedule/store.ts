import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { FeeSchedule, StaffSearchParams } from './types'

interface Store {
  data?: FeeSchedule[]
  loading?: boolean
  error?: string
  payload?: Partial<StaffSearchParams>
  sort?: Sort
  showFilters: boolean
  toggleFilters: () => void
  search: (payload?: Partial<StaffSearchParams>) => void
  sortData: (column: string) => void
}

const data = [
  {
    id: '1',
    cpt: '99213',
    description: 'Established patient office visit',
    status: 'Active',
    mdDo: '50.00',
    np: '50.00',
    pa: '50.00',
    psyD: '50.00',
    masters: '50.00',
    paymentResponsibility: '',
    edit: false,
  },
  {
    id: '2',
    cpt: '99213',
    description: 'Established patient office visit',
    status: 'Active',
    mdDo: '50.00',
    np: '50.00',
    pa: '50.00',
    psyD: '50.00',
    masters: '50.00',
    paymentResponsibility: '',
    edit: true,
  },
  {
    id: '3',
    cpt: '99213',
    description: 'Established patient office visit',
    status: 'Active',
    mdDo: '50.00',
    np: '50.00',
    pa: '50.00',
    psyD: '50.00',
    masters: '50.00',
    paymentResponsibility: '',
    edit: false,
  },
  {
    id: '4',
    cpt: '99213',
    description: 'Established patient office visit',
    status: 'Active',
    mdDo: '50.00',
    np: '50.00',
    pa: '50.00',
    psyD: '50.00',
    masters: '50.00',
    paymentResponsibility: '',
    edit: true,
  },
  {
    id: '4',
    cpt: '99213',
    description: 'Established patient office visit',
    status: 'Active',
    mdDo: '50.00',
    np: '50.00',
    pa: '50.00',
    psyD: '50.00',
    masters: '50.00',
    paymentResponsibility: '',
    edit: false,
  },
]

const useStore = create<Store>((set, get) => ({
  data: undefined,
  sort: undefined,
  showFilters: true,
  toggleFilters: () => set({ showFilters: !get().showFilters }),
  search: async (payload?: Partial<StaffSearchParams>) => {
    set({
      error: undefined,
      loading: true,
      payload: payload,
    })

    set({
      data,
      loading: false,
    })
  },
  sortData: (column) => {
    set({
      sort: {
        column,
        direction: getNewSortDir(column, get().sort),
      },
    })
    get().search(get().payload)
  },
}))

export { useStore }
