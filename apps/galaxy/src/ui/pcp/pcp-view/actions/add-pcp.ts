'use server'

import * as api from '@/api'
import { ExternalProvider } from '../../types'

const addPcpAction = async (
  pcp: ExternalProvider,
): Promise<api.ActionResult<ExternalProvider>> => {
  const result = await api.POST(api.ADD_PCP_ENDPOINT(), pcp)

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
