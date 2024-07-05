import type { PatientRelationship } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

const createPatientRelationship = async (
  relationship: PatientRelationship,
  patientId: number,
): Promise<PatientRelationship> =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/relationships`, {
      method: 'POST',
      body: JSON.stringify(relationship),
      headers: createHeaders(),
    }),
  )

const updatePatientRelationship = async (
  patientId: number,
  relationshipId: string,
  body: PatientRelationship,
) =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/relationships/${relationshipId}`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify(body),
    }),
  )

export { createPatientRelationship, updatePatientRelationship }
