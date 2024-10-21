import { Claim, SelectOptionType } from '@/types'
import {
  ClaimResponseType,
  ClaimSubmissionResponse,
  ClearingHouseReceiver,
} from '../types'

const transformIn = (data: ClaimSubmissionResponse, claims?: Claim[]) => {
  const claimLookup: Record<string, string> =
    claims?.reduce((acc, claim) => {
      acc[claim.id] = claim.claimNumber
      return acc
    }, {} as Record<string, string>) || {}

  const claimErrorResponses: ClaimResponseType[] = Object.entries(
    data.claimsWithErrorMessages,
  ).map(([errorClaimId, errorMessages]) => ({
    claimId: claimLookup[errorClaimId] ?? '',
    message: errorMessages.map((error) => error.errorMessage),
  }))

  const claimCleanResponses: ClaimResponseType[] = data.cleanClaimIds.map(
    (claimId) => ({
      claimId: claimLookup[claimId] ?? '',
      message: [],
    }),
  )
  return { claimErrorResponses, claimCleanResponses }
}

const transformInSubmissionOptions = (
  data: ClearingHouseReceiver[],
): SelectOptionType[] =>
  data.map((submissionType) => ({
    label: submissionType.clearingHouseName,
    value: submissionType.id,
  }))

export { transformIn, transformInSubmissionOptions }
