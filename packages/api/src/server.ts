import { cache } from 'react'
import getConfig from 'next/config'
import { headers as nextHeaders } from 'next/headers'
import type {
  Patient,
  PatientParams,
  TokenParams,
  User,
} from '@psychplus/types'
import { getAuthToken } from '@psychplus/auth'

const { publicRuntimeConfig } = getConfig()

const API_URL = process.env.API_URL

const createHeaders = (params: TokenParams) => {
  const headers = new Headers()

  // Set Authorization header. By default, the provided token is used if it exists.
  // If it does not exist, it will fallback to using the token from request cookies.
  headers.set('Authorization', `Bearer ${params.token ?? getAuthToken()}`)

  // Set required PsychPlus headers.
  headers.set('PsychPlus-Application', `${process.env.APP_NAME ?? ''}`)
  headers.set('PsychPlus-AppVersion', `${publicRuntimeConfig?.version ?? ''}`)
  headers.set('PsychPlus-RunEnvironment', `${process.env.NODE_ENV ?? ''}`)
  headers.set('PsychPlus-Device', `${nextHeaders().get('user-agent') ?? ''}`)

  return headers
}

const getUser = async ({ token }: TokenParams): Promise<User> => {
  const response = await fetch(`${API_URL}/api/user`, {
    cache: 'no-store',
    headers: createHeaders({ token }),
  })

  if (!response.ok) {
    throw new Error()
  }

  return response.json() as Promise<User>
}

const getPatient = async ({
  token,
  patientId,
}: TokenParams & PatientParams): Promise<Patient> => {
  const response = await fetch(`${API_URL}/api/patients/${patientId}`, {
    cache: 'no-store',
    headers: createHeaders({ token }),
  })

  if (!response.ok) {
    throw new Error()
  }

  return response.json() as Promise<Patient>
}

const getUserCached = cache(getUser)
const getPatientCached = cache(getPatient)

export { getUserCached as getUser, getPatientCached as getPatient }
