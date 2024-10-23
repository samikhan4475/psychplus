'use server'

import * as api from '@/api'
import { CodeItem } from '@/types'

interface ApiResponse {
  codeSystemName: string
  displayName: string
  version: string
  oid: string
  codes: CodeItem[]
}

interface GetServiceCPTResponse {
  serviceCPTData: CodeItem[]
}

const getServiceCPTCodes = async (
  value: string,
): Promise<api.ActionResult<GetServiceCPTResponse>> => {
  const response = await api.GET<ApiResponse>(api.GET_PROCEDURES_CODES(value))
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      serviceCPTData: response.data.codes,
    },
  }
}

export { getServiceCPTCodes }
