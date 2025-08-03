import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getQuickNoteHistoryAction } from '@/actions'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCalendarDateLabel } from '@/utils'
import { SchemaType } from './filter-form'
import { HospitalInitialHistoryParams } from './types'

interface Store {
  error?: string
  loading?: boolean
  formValues?: Partial<SchemaType>
  selectedRow?: QuickNoteHistory
  labAndOrdersHistory?: QuickNoteHistory[]
  fetchLabAndOrdersHistories: (
    patientId: string,
    sectionName: QuickNoteSectionName,
    formValues?: Partial<SchemaType>,
  ) => void
  setSelectedRow: (row: QuickNoteHistory | undefined) => void
  setHospitalInitialHistory: (history: QuickNoteHistory[]) => void
}

const useStore = create<Store>((set) => ({
  error: undefined,
  loading: undefined,
  formValues: undefined,
  selectedRow: undefined,
  labAndOrdersHistory: [],

  fetchLabAndOrdersHistories: async (
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
    const payload: HospitalInitialHistoryParams = {
      ...(historyCreatedFrom && {
        historyCreatedFrom: getCalendarDateLabel(historyCreatedFrom),
      }),
      ...(historyCreatedTo && {
        historyCreatedTo: getCalendarDateLabel(historyCreatedTo),
      }),
    }

    const result = await getQuickNoteHistoryAction(
      patientId,
      sectionName,
      payload,
    )

    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to fetch lab & orders history')
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
      labAndOrdersHistory: histories,
      selectedRow: histories.length > 0 ? histories[0] : undefined,
      loading: false,
    })
  },

  setSelectedRow: (row: QuickNoteHistory | undefined) =>
    set({ selectedRow: row }),

  setHospitalInitialHistory: (history: QuickNoteHistory[]) =>
    set({ labAndOrdersHistory: history }),
}))

export { useStore }
