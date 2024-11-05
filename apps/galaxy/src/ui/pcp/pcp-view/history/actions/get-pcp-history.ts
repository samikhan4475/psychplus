'use server'

import * as api from '@/api'
import { ExternalProviderDetail, PcpHistoryParams } from '@/ui/pcp/types'

const getPcpHistoryAction = async (
  patientId: string,
  payload: PcpHistoryParams,
): Promise<api.ActionResult<ExternalProviderDetail[]>> => {
  const response = await api.POST<ExternalProviderDetail[]>(
    api.PCP_HISTORY_ENDPOINT,
    {
      patientId: patientId,
      relationships: ['PrimaryCare'],
      isIncludeExternalProvider: true,
      ...payload,
    },
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data,
  }
}

export { getPcpHistoryAction }
