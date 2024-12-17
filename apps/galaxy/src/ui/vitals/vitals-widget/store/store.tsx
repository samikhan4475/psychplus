import { create } from 'zustand'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from '../../data'
import { getPatientVitalsAction } from '../actions'
import type { PatientVital } from '../types'

interface VitalsParams {
  patientId: string
  recordStatuses?: string[]
  fromDateTime?: string
  toDateTime?: string
}

interface StoreState {
  data?: PatientVital[]
  quicknotesData?: PatientVital[]
  loading?: boolean
  quicknotesLoading?: boolean
  error?: string
  isFilterEnabled: boolean
  setIsFilterEnabled: (value: boolean) => void
  handleAddToNoteCheck: (id: number, checked: boolean) => void
  handleCheckAll: (checked: boolean) => void
  setData: (data: PatientVital[]) => void
  setQuicknotesData: (quicknotesData: PatientVital[]) => void
  setError: (error: string) => void
  fetch: (
    payload: VitalsParams,
    quickNoteView?: boolean,
    handleQuicknotesLoading?: boolean,
  ) => void
}

const useStore = create<StoreState>((set, get) => ({
  data: undefined,
  quicknotesData: undefined,
  loading: true,
  error: undefined,
  isFilterEnabled: false,
  setIsFilterEnabled: (isFilterEnabled: boolean) => set({ isFilterEnabled }),
  setError: (error: string) => set({ error }),
  setData: (data: PatientVital[]) => set({ data }),
  setQuicknotesData: (quicknotesData: PatientVital[]) =>
    set({ quicknotesData }),
  handleCheckAll: (checked: boolean) => {
    const data = get().data
    const newData = data?.map((item) => ({
      ...item,
      addToNote: item.recordStatus === 'Active' ? checked : false,
    }))

    set({ data: newData })
  },
  handleAddToNoteCheck: (id: number, checked: boolean) => {
    const data = get().data
    const newData = data?.map((item) =>
      item.id === id ? { ...item, addToNote: checked } : item,
    )

    set({ data: newData })
  },
  fetch: async (
    payload,
    quickNoteView = false,
    handleQuicknotesLoading = false,
  ) => {
    if (handleQuicknotesLoading) set({ quicknotesLoading: true })
    else set({ loading: true })

    set({ error: undefined })

    const result = await getPatientVitalsAction({
      payload: {
        ...payload,
      },
    })

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
        quicknotesLoading: false,
      })
    }

    set({
      data: result.data,
    })

    if (quickNoteView) {
      const response = await getQuickNoteDetailAction(payload.patientId, [
        QuickNoteSectionName.Vitals,
      ])

      if (response.state === 'error') {
        return set({
          error: response.error,
          loading: false,
          quicknotesLoading: false,
        })
      }

      const quickNoteVitalIds = transformIn(response.data).vitalsId

      const vitals = get().data

      const updatedVitals = vitals?.map((vital) => ({
        ...vital,
        addToNote: quickNoteVitalIds.includes(String(vital.id)),
      }))

      set({ data: updatedVitals })

      if (handleQuicknotesLoading)
        set({ quicknotesData: updatedVitals?.filter((item) => item.addToNote) })
    }

    set({
      loading: false,
      quicknotesLoading: false,
    })
  },
}))

export { useStore, type VitalsParams }
