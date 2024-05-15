'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { MembershipBenefit } from '@/features/billing/membership/types'

const getBenefits = async (): Promise<ActionResult<MembershipBenefit>> => {
  const result = await api.GET<MembershipBenefit>(
    `${API_URL}/api/metadata/marketing/benefits?set=PLUS-MEMBERSHIP`,
    {
      next: {
        revalidate: 3600,
      },
    },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getBenefits }
