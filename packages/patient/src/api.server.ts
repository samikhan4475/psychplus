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

const getPatientCached = cache(getPatient)

export { getPatientCached as getPatient }
