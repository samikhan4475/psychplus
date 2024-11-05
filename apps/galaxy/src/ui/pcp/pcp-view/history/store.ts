import toast from 'react-hot-toast'
import { create } from 'zustand'
import { formatDateToISOString } from '@/utils'
import { ExternalProviderDetail, PcpHistoryParams } from '../../types'
import { getPcpHistoryAction } from './actions/get-pcp-history'
import { SchemaType } from './filter-form'

interface Store {
  error?: string
  loading?: boolean
  formValues?: Partial<SchemaType>
  pcpHistory?: ExternalProviderDetail[]
  fetchPcpHistories: (
    patientId: string,
    formValues?: Partial<SchemaType>,
  ) => void
  setPcpHistory: (history: ExternalProviderDetail[]) => void
}

const useStore = create<Store>((set) => ({
  error: undefined,
  loading: undefined,
  formValues: undefined,
  pcpHistory: [],
  fetchPcpHistories: async (
    patientId: string,
    formValues?: Partial<SchemaType>,
  ) => {
    set({
      error: undefined,
      loading: true,
      formValues,
    })

    const { createdFrom, createdTo, createdBy } = formValues || {}
    const payload: PcpHistoryParams = {
      ...(createdFrom && {
        createdFrom: formatDateToISOString(createdFrom),
      }),
      ...(createdTo && {
        createdTo: formatDateToISOString(createdTo),
      }),
    }

    const result = await getPcpHistoryAction(patientId, payload)

    if (result.state === 'error') {
      toast.error(result.error)
      return set({
        error: result.error,
        loading: false,
      })
    }

    const fetchedData = result.data || []

    const histories = createdBy
      ? fetchedData.filter((data) =>
          data?.externalProvider?.legalName?.firstName
            .toLowerCase()
            .includes(createdBy.toLowerCase()),
        )
      : fetchedData

    set({
      pcpHistory: histories,
      loading: false,
    })
  },

  setPcpHistory: (history: ExternalProviderDetail[]) =>
    set({ pcpHistory: history }),
}))

export { useStore }
