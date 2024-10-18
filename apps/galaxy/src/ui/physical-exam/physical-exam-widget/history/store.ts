import toast from 'react-hot-toast'
import { create } from 'zustand'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCalendarDateLabel } from '@/utils'
import { PhysicalExamHistoryParams } from '../types'
import { getPhysicalExamHistoryAction } from './actions/get-physical-exam-history'
import { SchemaType } from './filter-form'

interface Store {
  error?: string
  loading?: boolean
  formValues?: Partial<SchemaType>
  selectedRow?: QuickNoteHistory
  physicalExamHistory?: QuickNoteHistory[]
  fetchPhysicalExamHistories: (
    patientId: string,
    sectionName: QuickNoteSectionName,
    formValues?: Partial<SchemaType>,
  ) => void
  setSelectedRow: (row: QuickNoteHistory | undefined) => void
  setPhysicalExamHistory: (history: QuickNoteHistory[]) => void
}

const useStore = create<Store>((set) => ({
  error: undefined,
  loading: undefined,
  formValues: undefined,
  selectedRow: undefined,
  physicalExamHistory: [],

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
    const payload: PhysicalExamHistoryParams = {
      ...(historyCreatedFrom && {
        historyCreatedFrom: getCalendarDateLabel(historyCreatedFrom),
      }),
      ...(historyCreatedTo && {
        historyCreatedTo: getCalendarDateLabel(historyCreatedTo),
      }),
    }

    const result = await getPhysicalExamHistoryAction(
      patientId,
      sectionName,
      payload,
    )

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
      physicalExamHistory: histories,
      selectedRow: histories.length > 0 ? histories[0] : undefined,
      loading: false,
    })
  },

  setSelectedRow: (row: QuickNoteHistory | undefined) =>
    set({ selectedRow: row }),

  setPhysicalExamHistory: (history: QuickNoteHistory[]) =>
    set({ physicalExamHistory: history }),
}))

export { useStore }
