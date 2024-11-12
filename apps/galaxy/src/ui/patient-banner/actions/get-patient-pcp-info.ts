'use server'

import * as api from '@/api'
import { ExternalProviderDetail } from '@/ui/pcp'

const getPcpInfoAction = async (
  patientId: string,
): Promise<api.ActionResult<ExternalProviderDetail[]>> => {
  const payload = {
    relationships: ['PrimaryCare'],
    isIncludeExternalProvider: true,
    patientIds: patientId,
  }
  const response = await api.POST<ExternalProviderDetail[]>(
    api.FETCH_EXTERNAL_PROVIDER_WITH_PATIENT_ENDPOINT(),
    payload,
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

export { getPcpInfoAction }
