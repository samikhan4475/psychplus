import { cache } from 'react'
import { type PatientParams } from '@psychplus/patient'
import { APP_HOST } from '@psychplus/utils/constants'
import { forwardQuery } from '@psychplus/utils/server'
import { type PatientProfileInformation } from './types'
import { handleRequest } from '@psychplus/utils/api'


const getPatientInformation = ({
  patientId,
}: PatientParams): Promise<PatientProfileInformation> =>
  handleRequest(
    fetch(
      forwardQuery(`${APP_HOST}/api/patients/${patientId}/profile`),
      {
        cache: 'no-store',
      },
    ),
  )


const getPatientInformationCached = cache(getPatientInformation)

export { getPatientInformationCached as getPatientInformation }
