import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { APP_HOST } from '@psychplus/utils/constants'
import { forwardQuery } from '@psychplus/utils/server'
import { type Patient, type PatientParams } from './types'

const getPatient = async ({ patientId }: PatientParams): Promise<Patient> =>
  handleRequest(
    fetch(forwardQuery(`${APP_HOST}/api/patients/${patientId}`), {
      cache: 'no-store',
    }),
  )

const getPatientCached = cache(getPatient)

export { getPatientCached as getPatient }
