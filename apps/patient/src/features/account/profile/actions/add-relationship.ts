'use server'

import { type ActionResult } from '@psychplus-v2/api'
import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { RelationshipData } from '@psychplus-v2/types'


const addRelationship = async (
  data: RelationshipData,
): Promise<ActionResult<RelationshipData>> => {
  const result = await api.POST<RelationshipData>(
    `${API_URL}/api/patients/${data.patientId}/relationships`,
    data,
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

export { addRelationship }