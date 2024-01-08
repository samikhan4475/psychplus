import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { Referral } from './types'

const getReferrals = async ({
  patientId,
}: {
  patientId: number
}): Promise<Referral[]> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/referrals`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getReferralsCached = cache(getReferrals)

export { getReferralsCached as getReferrals }
