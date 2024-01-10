import type { PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { Referral } from './types'

const getPatientReferrals = ({
  patientId,
}: PatientParams): Promise<Referral[]> =>
  handleRequest(
    fetch(`/api/patients/${patientId}/referrals`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const searchReferrals = (): Promise<Referral[]> =>
  handleRequest(
    fetch(`/api/referrals/search?limit=500`, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({}),
      headers: createHeaders(),
    }),
  )

const updatePatientReferral = (referral: Referral): Promise<void> =>
  handleRequest(
    fetch(`/api/patients/${referral.patientId}/referrals/${referral.id}`, {
      method: 'PUT',
      body: JSON.stringify(referral),
      headers: createHeaders(),
    }),
  )

export { getPatientReferrals, searchReferrals, updatePatientReferral }
