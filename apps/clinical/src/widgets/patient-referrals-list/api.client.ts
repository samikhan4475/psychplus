import { type PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { type Referral } from './types'

const getReferrals = ({ patientId }: PatientParams): Promise<Referral[]> =>
  handleRequest(
    fetch(`/api/patients/${patientId}/referrals`, {
      cache: 'no-store',
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

export { getReferrals, updatePatientReferral }
