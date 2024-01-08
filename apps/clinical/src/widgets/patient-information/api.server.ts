import { cache } from 'react'
import { type PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { type PatientProfileInformation } from './types'

const getPatientInformation = ({
  patientId,
}: PatientParams): Promise<PatientProfileInformation> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/profile`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getPatientInformationCached = cache(getPatientInformation)

export { getPatientInformationCached as getPatientInformation }
