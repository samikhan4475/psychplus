'use server'

import * as api from '@/api'

const deletePatientRelationshipAction = async (
  patientId: string,
  relationshipId: string,
) => {
  const result = await api.DELETE(
    api.DELETE_PATIENT_RELATIONSHIP_ENDPOINT(patientId, relationshipId),
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

export { deletePatientRelationshipAction }
