import toast from 'react-hot-toast'
import { create } from 'zustand'
import { getPatientHistoryAction } from '@/actions'
import { PatientProfile } from '@/types'
import { getCalendarDateLabel } from '@/utils'
import { SchemaType } from './filter-form'
import { PatientHistoryParams } from './types'

interface Store {
  error?: string
  loading?: boolean
  formValues?: Partial<SchemaType>
  selectedRow?: PatientProfile
  patientInfoHistory?: PatientProfile[]
  fetchPatientInfoHistories: (
    patientId: string,
    formValues?: Partial<SchemaType>,
  ) => void
  setSelectedRow: (row: PatientProfile | undefined) => void
  setPatientInfoHistory: (history: PatientProfile[]) => void
}

const useStore = create<Store>((set) => ({
  error: undefined,
  loading: undefined,
  formValues: undefined,
  selectedRow: undefined,
  patientInfoHistory: [],

  fetchPatientInfoHistories: async (
    patientId: string,
    formValues?: Partial<SchemaType>,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const { historyCreatedFrom, historyCreatedTo, username } = formValues || {}
    const payload: PatientHistoryParams = {
      ...(historyCreatedFrom && {
        historyCreatedFrom: getCalendarDateLabel(historyCreatedFrom),
      }),
      ...(historyCreatedTo && {
        historyCreatedTo: getCalendarDateLabel(historyCreatedTo),
      }),
    }

    const result = await getPatientHistoryAction(patientId, payload)

    if (result.state === 'error') {
      toast.error(result.error)
      return set({
        error: result.error,
        loading: false,
      })
    }

    const fetchedData = result.data || []

    const histories = username
      ? fetchedData.filter(({ metadata: { createdByFullName = '' } = {} }) =>
          createdByFullName.toLowerCase().includes(username.toLowerCase()),
        )
      : fetchedData

    set({
      patientInfoHistory: histories,
      selectedRow: histories.length > 0 ? histories[0] : undefined,
      loading: false,
    })
  },

  setSelectedRow: (row: PatientProfile | undefined) =>
    set({ selectedRow: row }),

  setPatientInfoHistory: (history: PatientProfile[]) =>
    set({ patientInfoHistory: history }),
}))

export { useStore }
