'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { RelationshipData } from '@psychplus-v2/types'

const deleteRelationship = async (
  data: RelationshipData,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    `${API_URL}/api/patients/${data.patientId}/relationships/${data.id}`, 
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { deleteRelationship }