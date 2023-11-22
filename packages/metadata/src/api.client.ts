import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { forwardQuery } from '@psychplus/utils/client'
import { type MarketingBenefit } from './types'

const getPlusMembershipBenefits = async (): Promise<MarketingBenefit> =>
  handleRequest(
    fetch(
      forwardQuery('/api/metadata/marketing/benefits?set=PLUS-MEMBERSHIP'),
      {
        next: {
          revalidate: 3600,
        },
      },
    ),
  )

const getPlusMembershipBenefitsCached = cache(getPlusMembershipBenefits)

export { getPlusMembershipBenefitsCached as getPlusMembershipBenefits }
