import { cache } from 'react'
import { api } from '@psychplus/api'
import { MOCK_API_URL } from '@psychplus/utils/constants'
import { type Patient, type PatientParams } from './types'

const getPatient = async ({ patientId }: PatientParams): Promise<Patient> =>
  api(`${MOCK_API_URL}/api/patients/${[patientId]}`, { cache: 'no-store' })

const getPatientCached = cache(getPatient)

export { getPatientCached as getPatient }
