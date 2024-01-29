import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { ConfigurationProtected, type MarketingBenefit } from './types'

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

const getConfigurationProtected = async (): Promise<ConfigurationProtected> =>
  handleRequest(
    fetch('/api/metadata/configuration/protected', {
      headers: createHeaders(),
    }),
  )

const getConfigurationProtectedCached = cache(getConfigurationProtected)

export {
  getPlusMembershipBenefitsCached as getPlusMembershipBenefits,
  getConfigurationProtectedCached as getConfigurationProtected,
}
