import { createContext } from 'react'
import toast from 'react-hot-toast'
import { createStore as zustandCreateStore } from 'zustand'
import { getPatientStaffCommentsAction } from '@/actions'
import { StaffComment, StaffCommentParams } from '@/types'
import { TREATMENT_TAB } from '../constants'
import { GetCommentsData } from '../types'

interface StoreInit {
  patientId: string
  appointmentId: string
}

interface StoreState {
  patientId: string
  appointmentId: string
  activeTab: string
  viewedTabs: Set<string>
  setActiveTab: (tab: string) => void
  data?: GetCommentsData
  error?: string
  loading?: boolean
  billingComments: StaffComment[]
  treatmentComments: StaffComment[]
  formValues?: Partial<StaffCommentParams>
  fetchComments: (formValues: StaffCommentParams) => void
}

type Store = ReturnType<typeof createStore>

const createStore = (init: StoreInit) => {
  return zustandCreateStore<StoreState>()((set, get) => ({
    patientId: init.patientId,
    appointmentId: init.appointmentId,
    billingComments: [],
    treatmentComments: [],
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
    fetchComments: async (formValues: StaffCommentParams) => {
      set({
        error: undefined,
        loading: true,
        formValues,
      })

      const result = await getPatientStaffCommentsAction({
        ...formValues,
        patientId: get().patientId,
      })

      if (result.state === 'error') {
        toast.error(result.error ?? 'Error while fetching Staff Comments')
        return set({
          error: result.error,
          loading: false,
        })
      }

      if (formValues.isTreatment) {
        set({
          loading: false,
          treatmentComments: result?.data?.comments,
        })
      } else {
        set({
          loading: false,
          billingComments: result?.data?.comments,
        })
      }
    },
  }))
}

const StoreContext = createContext<Store | null>(null)

export { createStore, StoreContext, type Store, type StoreInit }
