import { create } from 'zustand'
import { getPatientSchedulingHistoryAction } from './actions'
import { SchedulingHistorySchemaType } from './filter-form'
import type { GetSchedulingHistoryData, SchedulingHistory } from './types'

interface Store {
  data?: GetSchedulingHistoryData
  error?: string
  loading?: boolean
  formValues?: Partial<SchedulingHistorySchemaType>
  fetchSchedulingHistory: (formValues?: Partial<SchedulingHistorySchemaType>) => void
  schedulingHistories:SchedulingHistory[]


}

const useStore = create<Store>((set, get) => ({
  data: undefined,
  error: undefined,
  loading: undefined,
  formValues: undefined,
  schedulingHistories:[],
  fetchSchedulingHistory: async (formValues: Partial<SchedulingHistorySchemaType> = {}) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const result = await getPatientSchedulingHistoryAction({
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
    })
  },


}))

export { useStore }