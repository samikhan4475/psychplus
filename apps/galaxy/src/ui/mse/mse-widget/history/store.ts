import toast from 'react-hot-toast'
import { create } from 'zustand'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCalendarDateLabel } from '@/utils'
import { MseHistoryParams } from '../types'
import { getMseHistoryAction } from './actions/get-mse-history'
import { SchemaType } from './mse-filter-form'

interface Store {
  error?: string
  loading?: boolean
  formValues?: Partial<SchemaType>
  selectedRow?: QuickNoteHistory
  mseHistory?: QuickNoteHistory[]
  fetchPhysicalExamHistories: (
    patientId: string,
    sectionName: QuickNoteSectionName,
    formValues?: Partial<SchemaType>,
  ) => void
  setSelectedRow: (row: QuickNoteHistory | undefined) => void
  setMseHistory: (history: QuickNoteHistory[]) => void
}

const useStore = create<Store>((set) => ({
  error: undefined,
  loading: undefined,
  formValues: undefined,
  selectedRow: undefined,
  mseHistory: [],

  fetchPhysicalExamHistories: async (
    patientId: string,
    sectionName: QuickNoteSectionName,
    formValues?: Partial<SchemaType>,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const { historyCreatedFrom, historyCreatedTo, username } = formValues || {}
    const payload: MseHistoryParams = {
      ...(historyCreatedFrom && {
        historyCreatedFrom: getCalendarDateLabel(historyCreatedFrom),
      }),
      ...(historyCreatedTo && {
        historyCreatedTo: getCalendarDateLabel(historyCreatedTo),
      }),
    }

    const result = await getMseHistoryAction(patientId, sectionName, payload)

    if (result.state === 'error') {
      toast.error(result.error)
      return set({
        error: result.error,
        loading: false,
      })
    }

    const fetchedData = result.data || []

    const histories = username
      ? fetchedData.filter((data) =>
          data.createdByFullName.toLowerCase().includes(username.toLowerCase()),
        )
      : fetchedData

    set({
      mseHistory: histories,
      selectedRow: histories.length > 0 ? histories[0] : undefined,
      loading: false,
    })
  },

  setSelectedRow: (row: QuickNoteHistory | undefined) =>
    set({ selectedRow: row }),

  setMseHistory: (history: QuickNoteHistory[]) => set({ mseHistory: history }),
}))

export { useStore }
