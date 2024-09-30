'use server'

import * as api from '@/api'
import type { PatientConsent } from '@/types'
import { patientConsentTransformIn } from '../transform'

const getPatientConsentsAction = async (
  id: string,
): Promise<api.ActionResult<PatientConsent[]>> => {
  const result = await api.GET<PatientConsent[]>(
    api.GET_PATIENT_CONSENTS_ENDPOINT(id),
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: patientConsentTransformIn(result.data),
  }
}

export { getPatientConsentsAction }
