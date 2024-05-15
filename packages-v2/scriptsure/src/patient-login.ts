import * as api from '@psychplus-v2/api'
import {
  SCRIPTSURE_API_KEY,
  SCRIPTSURE_APP_URL,
  SCRIPTSURE_EMAIL,
  SCRIPTSURE_PLATFORM_URL,
} from '@psychplus-v2/env'
import { createPacket } from './login'
import type { Patient, Session } from './types'

const LOGIN_URL = `${SCRIPTSURE_PLATFORM_URL}/v1.0/login/byapp`

const scriptSurePatientLogin = async (
  patientId: string,
  patientName: string,
): Promise<Session | null> => {
  const packet = await createPacket()

  const loginResponse = await api.POST<{ sessionToken: string }>(
    LOGIN_URL,
    {
      apikey: packet,
      email: SCRIPTSURE_EMAIL,
    },
    {
      headers: {
        apikey: SCRIPTSURE_API_KEY,
      },
    },
  )

  if (loginResponse.state === 'error') {
    return null
  }

  const sessionToken = loginResponse.data.sessionToken

  const patientsResponse = await api.POST<{ results: Patient[] }>(
    `${SCRIPTSURE_APP_URL}/v1.0/patient/search?sessiontoken=${sessionToken}`,
    { query: patientName },
    { ignoreHeaders: true },
  )

  if (patientsResponse.state === 'error') {
    return null
  }

  const patient = patientsResponse.data.results.find(
    (patient) => patient.patientIdExternal === patientId,
  )

  if (!patient) {
    return null
  }

  return {
    patientId: patient.patientId,
    sessionToken,
  }
}

export { scriptSurePatientLogin }
