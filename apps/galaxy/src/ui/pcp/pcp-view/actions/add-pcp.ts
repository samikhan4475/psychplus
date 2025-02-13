'use server'

import * as api from '@/api'
import { deepSanitizeFormData } from '@/utils'
import { ExternalProvider } from '../../types'

const addPcpAction = async (
  pcp: ExternalProvider,
): Promise<api.ActionResult<ExternalProvider>> => {
  const payload = deepSanitizeFormData(pcp)
  const result = await api.POST(api.ADD_PCP_ENDPOINT(), payload)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data as ExternalProvider,
  }
}

export { addPcpAction }
