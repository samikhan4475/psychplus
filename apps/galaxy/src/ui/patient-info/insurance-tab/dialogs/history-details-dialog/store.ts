import toast from 'react-hot-toast'
import { create } from 'zustand'
import { RawInsurance } from '@/types'
import { getCalendarDateLabel } from '@/utils'
import { getPatientPolicyHistoriesAction } from '../../actions'
import { InsuranceHistoryParams } from '../../types'
import { SchemaType } from './filter-form'

interface Store {
  error?: string
  loading?: boolean
  formValues?: Partial<SchemaType>
  selectedRow?: RawInsurance
  insuranceHistory?: RawInsurance[]
  fetchInsuranceHistories: (
    patientId: string,
    policyId: string,
    formValues?: Partial<SchemaType>,
  ) => void
  setSelectedRow: (row: RawInsurance | undefined) => void
  setInsuranceHistory: (history: RawInsurance[]) => void
}

const useStore = create<Store>((set, get) => ({
  error: undefined,
  loading: undefined,
  formValues: undefined,
  selectedRow: undefined,
  insuranceHistory: [],

  fetchInsuranceHistories: async (
    patientId: string,
    policyId: string,
    formValues?: Partial<SchemaType>,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const { historyCreatedFrom, historyCreatedTo, username } = formValues || {}
    const payload: InsuranceHistoryParams = {
      ...(historyCreatedFrom && {
        historyCreatedFrom: getCalendarDateLabel(historyCreatedFrom),
      }),
      ...(historyCreatedTo && {
        historyCreatedTo: getCalendarDateLabel(historyCreatedTo),
      }),
    }

    const result = await getPatientPolicyHistoriesAction(
      patientId,
      policyId,
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
      ? fetchedData.filter(({ metadata: { createdByFullName = '' } = {} }) =>
          createdByFullName.toLowerCase().includes(username.toLowerCase()),
        )
      : fetchedData

    set({
      insuranceHistory: histories,
      selectedRow: histories.length > 0 ? histories[0] : undefined,
      loading: false,
    })
  },

  setSelectedRow: (row: RawInsurance | undefined) => set({ selectedRow: row }),

  setInsuranceHistory: (history: RawInsurance[]) =>
    set({ insuranceHistory: history }),
}))

export { useStore }
