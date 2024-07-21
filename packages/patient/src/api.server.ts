import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { type Patient, type PatientParams } from './types'

const getPatient = async ({ patientId }: PatientParams): Promise<Patient> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/profile`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getPatients = async (payload?: {
  firstNameContains: string
  lastNameContains: string
  dateOfBirth: string
}): Promise<Patient[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/patients/search`, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify(payload || {}),
      headers: createHeaders(),
    }),
  )
}

const getPatientHistory = ({
    patientId,
  }: PatientParams): Promise<Patient[]> => {

    return handleRequest(
      fetch(
        `${API_URL}/api/patients/${patientId}/history/search`,
        {
          method: 'POST',
          cache: 'no-store',
          headers: createHeaders(),
          body: JSON.stringify({
            historyCreatedFrom: "2024-05-20T01:24:08.290Z",
          }),
        },
      ),
    )
  }

const getPatientCached = cache(getPatient)

const getPatientHistoryCached = cache(getPatientHistory)

const getPatientsCached = cache(getPatients)


export { 
  getPatientCached as getPatient,
  getPatientHistoryCached as getPatientHistory,
  getPatientsCached as getPatients,
}
