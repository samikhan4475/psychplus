import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { type MarketingBenefit } from './types'

const getPlusMembershipBenefits = async (): Promise<MarketingBenefit> =>
  handleRequest(
    fetch('/api/metadata/marketing/benefits?set=PLUS-MEMBERSHIP', {
      next: {
        revalidate: 3600,
      },
      headers: createHeaders(),
    }),
  )

const getPlusMembershipBenefitsCached = cache(getPlusMembershipBenefits)

export { getPlusMembershipBenefitsCached as getPlusMembershipBenefits }
