import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { Referral } from './types'

const updateReferral = (referral: Referral): Promise<void> =>
  handleRequest(
    fetch(`/api/patients/${referral.patientId}/referrals/${referral.id}`, {
      method: 'PUT',
      body: JSON.stringify(referral),
      headers: createHeaders(),
    }),
  )

export { updateReferral }
