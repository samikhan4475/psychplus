'use server'

import * as api from '@/api'
import { Relationship } from '@/types'

interface PatientRelationshipProps {
  patientId: number
  body: Relationship
  relationshipId: string
}

const updatePatientRelationshipAction = async ({
  patientId,
  body,
  relationshipId,
}: PatientRelationshipProps): Promise<api.ActionResult<Relationship>> => {
  const result = await api.PUT<Relationship>(
    api.UPDATE_PATIENT_RELATIONSHIP_ENDPOINT(patientId, relationshipId),
    body,
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

export { updatePatientRelationshipAction }
