import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getQuickNoteHistoryAction } from '@/actions'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getCalendarDateLabel } from '@/utils'
import { SchemaType } from './filter-form'
import { UdsHistoryParams } from './types'

interface Store {
  error?: string
  loading?: boolean
  formValues?: Partial<SchemaType>
  selectedRow?: QuickNoteHistory
  udsHistory?: QuickNoteHistory[]
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  fetchUdsHistories: (
    patientId: string,
    sectionName: QuickNoteSectionName,
    formValues?: Partial<SchemaType>,
  ) => void
  setSelectedRow: (row: QuickNoteHistory | undefined) => void
  setUdsHistory: (history: QuickNoteHistory[]) => void
}

const useStore = create<Store>((set) => ({
  error: undefined,
  loading: undefined,
  formValues: undefined,
  selectedRow: undefined,
  udsHistory: [],
  dialogOpen: false,
  setDialogOpen: (open) => set({ dialogOpen: open }),

  fetchUdsHistories: async (
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
    const payload: UdsHistoryParams = {
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
      udsHistory: histories,
      selectedRow: histories.length > 0 ? histories[0] : undefined,
      loading: false,
    })
  },

  setSelectedRow: (row: QuickNoteHistory | undefined) =>
    set({ selectedRow: row }),

  setUdsHistory: (history: QuickNoteHistory[]) => set({ udsHistory: history }),
}))

export { useStore }
