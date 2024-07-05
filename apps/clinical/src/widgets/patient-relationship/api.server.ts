import { cache } from 'react'
import { PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { PatientRelationship } from '@psychplus/patient'

const getPatientRelationships = ({
  patientId,
}: PatientParams): Promise<PatientRelationship[]> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/relationships`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getPatientRelationshipsCached = cache(getPatientRelationships)

export { getPatientRelationshipsCached as getPatientRelationships }
