import { cache } from 'react'
import { APP_HOST } from '@psychplus/utils/constants'
import { forwardQuery } from '@psychplus/utils/server'
import { type Patient, type PatientParams } from './types'

const getPatient = async ({ patientId }: PatientParams): Promise<Patient> =>
  fetch(forwardQuery(`${APP_HOST}/api/patients/${patientId}`), {
    cache: 'no-store',
  }).then((res) => res.json())

const getPatientCached = cache(getPatient)

export { getPatientCached as getPatient }
