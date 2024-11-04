'use server'

import * as api from '@/api'
import { PatientPreferredPartner } from '@/types'

const getPatientPreferredPartnersAction = async (
  id: string,
): Promise<api.ActionResult<PatientPreferredPartner[]>> => {
  const result = await api.GET<PatientPreferredPartner[]>(
    api.GET_PATIENT_PREFERRED_PARTNERS(id),
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { getPatientPreferredPartnersAction }
