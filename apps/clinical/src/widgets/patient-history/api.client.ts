import { Patient, PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

interface BodyType {
  historyCreatedFrom: string
  historyCreatedTo?: string
  username?: string
}

interface PatientHistory extends PatientParams {
  body: BodyType
}

const getPatientHistory = ({
  patientId,
  body,
}: PatientHistory): Promise<Patient[]> => {
  return handleRequest(
    fetch(`/galaxy/api/patients/${patientId}/history/search`, {
      method: 'POST',
      cache: 'no-store',
      headers: createHeaders(),
      body: JSON.stringify(body),
    }),
  )
}

export { getPatientHistory, type BodyType }
