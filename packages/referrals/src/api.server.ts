import { cache } from 'react'
import type { PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { Referral } from './types'

const getPatientReferrals = ({
  patientId,
}: PatientParams): Promise<Referral[]> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/referrals`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const searchReferrals = (): Promise<Referral[]> =>
  handleRequest(
    fetch(`${API_URL}/api/referrals/search?limit=500`, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({}),
      headers: createHeaders(),
    }),
  )

const getPatientReferralsCached = cache(getPatientReferrals)
const searchReferralsCached = cache(searchReferrals)

export {
  getPatientReferralsCached as getPatientReferrals,
  searchReferralsCached as searchReferrals,
}
