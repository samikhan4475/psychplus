import { cache } from 'react'
import { MOCK_API_URL } from '@psychplus/env'
import type {
  Patient,
  PatientParams,
  PatientReferral,
  TokenParams,
  User,
} from '@psychplus/types'
import { createCommonHeaders } from './utils'

const getUser = async ({ token }: Partial<TokenParams>): Promise<User> => {
  const response = await fetch(`${MOCK_API_URL}/api/user`, {
    cache: 'no-store',
    headers: createCommonHeaders({ token }),
  })

  if (!response.ok) {
    throw new Error()
  }

  return response.json()
}

const getPatient = async ({
  token,
  patientId,
}: Partial<TokenParams> & PatientParams): Promise<Patient> => {
  const response = await fetch(`${MOCK_API_URL}/api/patients/${patientId}`, {
    cache: 'no-store',
    headers: createCommonHeaders({ token }),
  })

  if (!response.ok) {
    throw new Error()
  }

  return response.json()
}

const getPatientReferrals = async ({
  token,
  patientId,
}: Partial<TokenParams> & PatientParams): Promise<PatientReferral[]> => {
  const response = await fetch(
    `${MOCK_API_URL}/api/patients/${patientId}/referrals`,
    {
      cache: 'no-store',
      headers: createCommonHeaders({ token }),
    },
  )

  if (!response.ok) {
    throw new Error()
  }

  return response.json()
}

const getUserCached = cache(getUser)
const getPatientCached = cache(getPatient)
const getPatientReferralsCached = cache(getPatientReferrals)

export {
  getUserCached as getUser,
  getPatientCached as getPatient,
  getPatientReferralsCached as getPatientReferrals,
}
