'use server'

import * as api from '@/api'
import { ExternalProviderDetail } from '../../types'

const fetchExternalProviderWithPatientAction = async (
  patientId: string,
): Promise<api.ActionResult<ExternalProviderDetail[]>> => {
  const payload = {
    patientId: patientId,
    relationships: ['PrimaryCare'],
    isIncludeExternalProvider: true,
  }
  const result = await api.POST(
    api.FETCH_EXTERNAL_PROVIDER_WITH_PATIENT_ENDPOINT(),
    payload,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data as ExternalProviderDetail[],
  }
}

export { fetchExternalProviderWithPatientAction }
