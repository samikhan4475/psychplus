import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { Claim, ClaimSubmissionResponse, Patient } from './types'

interface ClaimFiltersPayload {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  patientId?: number
  insuranceId?: string
  claimId?: string
  locationId?: string
  dateType?: string
  isIncludePatientInsurancePlan?: boolean
  receiverName?: string
}

interface ClaimSubmissionPayload {
  batchId: number
  batchName: string
  errorMessage: string
  hcfatype: string
  insuranceType: string
  receiverId: string
  submissionType: string
  subscriptionTypeViewOnly: string
  claimType: string
  claimIds: string[]
  insurancePolicyPriority: string
  isScrubOnly: boolean
}

const getClaimList = (payload: ClaimFiltersPayload): Promise<Claim[]> =>
  handleRequest(
    fetch(`/revcycle/api/claims/actions/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const deleteClaim = (claimId: string): Promise<Claim> =>
  handleRequest(
    fetch(`/revcycle/api/claims/${claimId}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const submitClaim = (
  payload: ClaimSubmissionPayload,
): Promise<ClaimSubmissionResponse> =>
  handleRequest(
    fetch(`/revcycle/api/claimssubmissions/actions/srcubandsubmit`, {
      method: 'POST',
      cache: 'no-store',
      headers: createHeaders(),
      body: JSON.stringify(payload),
    }),
  )

const getPatients = (payload: { name: string }): Promise<Patient[]> =>
  handleRequest(
    fetch(`/revcycle/api/patients/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { getClaimList, deleteClaim, getPatients, submitClaim }
