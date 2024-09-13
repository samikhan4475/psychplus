'use server'

import * as api from '@/api'
import { PatientRelationship } from '../types'

const getPatientRelationshipsAction = async (
  id: string,
): Promise<api.ActionResult<PatientRelationship[]>> => {
  const result = await api.GET<PatientRelationship[]>(
    api.GET_PATIENT_RELATIONSHIPS(id),
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

export { getPatientRelationshipsAction }
