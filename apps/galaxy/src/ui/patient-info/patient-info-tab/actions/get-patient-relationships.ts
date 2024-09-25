'use server'

import * as api from '@/api'
import { Relationship } from '@/types'

const getPatientRelationshipsAction = async (
  id: string,
): Promise<api.ActionResult<Relationship[]>> => {
  const result = await api.GET<Relationship[]>(
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
