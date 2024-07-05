import '@psychplus/patient'
import { PatientParams, type PatientRelationship } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

interface UpdateRelationshipProps extends Omit<PatientParams, 'patientId'> {
  patientId?: number
  body: PatientRelationship
  relationshipId?: string
}

const deleteRelationship = async (patientId: number, relationshipId: string) =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/relationships/${relationshipId}`, {
      method: 'DELETE',
      headers: createHeaders(),
    }),
  )

const getPatientRelationships = (
  patientId: number,
): Promise<PatientRelationship[]> =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/relationships`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updatePatientRelationship = ({
  patientId,
  body,
  relationshipId,
}: UpdateRelationshipProps) =>
  handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/relationships/${relationshipId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: createHeaders(),
    }),
  )

export {
  deleteRelationship,
  getPatientRelationships,
  updatePatientRelationship,
}
