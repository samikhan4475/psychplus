import { Claim, SharedCode } from '@/types'
import { getClaimStatusDisplay } from '../../utils'

const transformInClaims = (claimStatusCodes: SharedCode[], claims: Claim[]) =>
  claims?.map((claim) => ({
    ...claim,
    claimStatusCode: getClaimStatusDisplay(
      claimStatusCodes,
      claim.claimStatusCode,
    ),
  })) ?? []

export { transformInClaims }
