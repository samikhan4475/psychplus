import { type PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { Referral, ReferredByName } from './types'

interface CreateReferralRequest {
  patientId: number
  service: string
  servicesStatus: string
  comments: string
  referredByName: ReferredByName
}

const createReferral = (request: CreateReferralRequest): Promise<void> =>
  handleRequest(
    fetch(`/api/patients/${request.patientId}/referrals`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: createHeaders(),
    }),
  )

const getReferrals = ({ patientId }: PatientParams): Promise<Referral[]> =>
  handleRequest(
    fetch(`/api/patients/${patientId}/referrals`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { createReferral, getReferrals }
