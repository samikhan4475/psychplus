import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import {
  Claim,
  ClaimSubmissionResponse,
  CPTResponse,
  ICD10Code,
  ModifiersResponse,
  Patient,
} from './types'

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

const getPatients = (payload: { name: string }): Promise<Patient[]> =>
  handleRequest(
    fetch(`/revcycle/api/patients/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getIcdCodes = (codeStartsWith: string): Promise<ICD10Code[]> => {
  const payload = { codeOrDescription: codeStartsWith }
  return handleRequest(
    fetch(
      '/revcycle/api/metadata/icd10codes/actions/search?offset=0&limit=0&orderBy=HcpcsCode%20asc',
      {
        method: 'POST',
        body: JSON.stringify(payload),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const getCPTCodes = (codeStartsWith: string): Promise<CPTResponse> =>
  handleRequest(
    fetch(
      `/revcycle/api/codeset/authorities/AMA/codesets/CPT4?codeStartsWith=${codeStartsWith}&includeExtraDetails=false&offset=0&limit=0&orderBy=displayName%20asc`,
      {
        headers: createHeaders(),
      },
    ),
  )

const getModifiersCodes = (
  codeStartsWith: string,
): Promise<ModifiersResponse> =>
  handleRequest(
    fetch(
      `/revcycle/api/codeset/authorities/AMA/codesets/CPT4Modifiers?codeStartsWith=${codeStartsWith}&includeExtraDetails=false&offset=0&limit=0&orderBy=displayName%20asc`,
      {
        headers: createHeaders(),
      },
    ),
  )

const getClaimById = (claimId: string): Promise<Claim> =>
  handleRequest(
    fetch(`/revcycle/api/claims/${claimId}`, {
      headers: createHeaders(),
    }),
  )

const updateClaim = (id: string, body = {}) =>
  fetch(`/revcycle/api/claims/${id}`, {
    headers: createHeaders(),
    method: 'PUT',
    body: JSON.stringify(body),
  })
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
export {
  getClaimList,
  getIcdCodes,
  deleteClaim,
  getCPTCodes,
  getClaimById,
  getModifiersCodes,
  getPatients,
  updateClaim,
  submitClaim,
}
