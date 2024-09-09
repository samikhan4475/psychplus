import { create } from 'zustand'
import { getStaffCommentsAction } from './actions'
import { getStaffOptionsAction } from './actions/get-staff'
import { TREATMENT_TAB } from './constants'
import { CommentSchemaType} from './shared'
import { GetCommentsData, SelectOptionType, StaffComment } from './types'

interface Store {
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
  data?: GetCommentsData
  error?: string
  loading?: boolean
  billComments: StaffComment[]
  treatmentComments: StaffComment[]
  formValues?: Partial<CommentSchemaType>
  fetch: (formValues?: Partial<CommentSchemaType>) => void
  fetchStaffOptions: () => void
  staffOptions: SelectOptionType[]
}

const useStore = create<Store>((set, get) => ({
  billComments: [],
  treatmentComments: [],
  staffOptions: [],
  activeTab: TREATMENT_TAB,
  viewedTabs: new Set([TREATMENT_TAB]),
  setActiveTab: (activeTab) => {
    const viewedTabs = get().viewedTabs
    viewedTabs.add(activeTab)

    set({
      activeTab,
      viewedTabs,
    })
  },
  fetch: async (formValues: Partial<CommentSchemaType> = {}) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getStaffCommentsAction({
      ...formValues,
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
      billComments: result?.data?.comments,
      treatmentComments: result?.data?.comments,
    })
  },
  fetchStaffOptions: async () => {
    const result = await getStaffOptionsAction()

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      staffOptions: result.data,
      loading: false,
    })
  },
}))

export { useStore }
