'use client'

import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getPatientStaffCommentsAction } from '@/actions'
import { StaffComment, StaffCommentParams } from '@/types'
import { TREATMENT_TAB } from './constants'
import { GetCommentsData } from './types'

interface Store {
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

const useStore = create<Store>((set, get) => ({
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
      RecordStatuses: null,
    })

    if (result.state === 'error') {
      toast.error(result.error ?? 'Error while fetching Staff Comments')
      return set({
        error: result.error,
        loading: false,
      })
    }

    if (formValues.IsTreatment) {
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

export { useStore }
