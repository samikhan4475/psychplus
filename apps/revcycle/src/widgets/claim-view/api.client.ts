import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { ClearingHouseReceiver } from '../clearing-house-receiver-list/types'
import {
  Claim,
  ClaimSubmissionHistory,
  ClaimSubmissionHistoryDetail,
  ClaimSubmissionHistoryFilters,
  ClaimSubmissionResponse,
  CPTResponse,
  ErrorMessage,
  ICD10Code,
  InsurancePayer,
  InsurancePayment,
  InsurancePaymentRecordPayload,
  InsurancePaymentsPayload,
  ModifiersResponse,
  Patient,
  PaymentAttachments,
  ResponseHistoryDetail,
  ResponseHistoryRecord,
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
interface ResponseHistoryPayload {
  receiverName?: string
  createdOn?: Date
}

const defaultInsurancePaymentPayload = {
  recordStatuses: ['Active'],
}
const defaultPayLoad = {
  isIncludePatientInsurancePlan: false,
  isIncludePatientInsurancePolicy: true,
  isIncludeClaimValidation: true,
}

const defaultInsurancePaymentRecordPayload = {
  isDuplicate: false,
  status: 'Posted',
  recordStatus: 'Active',
  paymentType: 'Eob',
}

const getClaimList = (payload: ClaimFiltersPayload): Promise<Claim[]> =>
  handleRequest(
    fetch(`/revcycle/api/claims/actions/search`, {
      method: 'POST',
      body: JSON.stringify({ ...payload, ...defaultPayLoad }),
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

const getClaimSubmissionHistoryList = (
  payload: ClaimSubmissionHistoryFilters,
): Promise<ClaimSubmissionHistory[]> =>
  handleRequest(
    fetch(`/revcycle/api/claimssubmissions/batches/actions/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const getReceivers = (payload: {
  receiverName: string
}): Promise<ClearingHouseReceiver[]> =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousereceivers/actions/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getClaimSubmissionHistoryDetail = (
  batchId: string,
): Promise<ClaimSubmissionHistoryDetail[]> =>
  handleRequest(
    fetch(
      `/revcycle/api/claimssubmissions/batches/${batchId}/details/actions/search?isIncludeMetadataResourceChangeControl=true`,
      {
        method: 'POST',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getInsurancePaymentsList = (
  payload: InsurancePaymentsPayload = {},
): Promise<InsurancePayment[]> =>
  handleRequest(
    fetch(`/revcycle/api/payments/actions/search?orderBy=receivedDate desc`, {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ ...defaultInsurancePaymentPayload, ...payload }),
      headers: createHeaders(),
    }),
  )
const getClaimSubmissionRejectionDetail = (
  claimsId: string,
): Promise<ErrorMessage[]> =>
  handleRequest(
    fetch(`/revcycle/api/claims/${claimsId}/claimvalidations/actions/search`, {
      method: 'POST',
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const getResponseHistoryList = (
  payload: ResponseHistoryPayload,
): Promise<ResponseHistoryRecord[]> =>
  handleRequest(
    fetch(`/revcycle/api/claimssubmissions/responses/actions/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getResponseHistoryDetail = (
  batchId: string,
): Promise<ResponseHistoryDetail[]> =>
  handleRequest(
    fetch(
      `/revcycle/api/claimssubmissions/responses/${batchId}/details/actions/search`,
      {
        method: 'POST',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const deleteInsurancePaymentRecord = (
  recordId: string,
): Promise<InsurancePayment> =>
  handleRequest(
    fetch(`/revcycle/api/payments/${recordId}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getInsurancePayers = (name: string): Promise<InsurancePayer[]> =>
  handleRequest(
    fetch(`/revcycle/api/insurance/plans/actions/search`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        recordStatuses: ['Active'],
      }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createInsurancePayment = (
  payload: InsurancePaymentRecordPayload,
): Promise<InsurancePayment> =>
  handleRequest(
    fetch(`/revcycle/api/payments`, {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        ...defaultInsurancePaymentRecordPayload,
      }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createInsurancePaymentAttachments = (
  payload: FormData,
  paymentId: string,
): Promise<PaymentAttachments[]> =>
  handleRequest(
    fetch(`/revcycle/api/payments/${paymentId}/attachments`, {
      method: 'POST',
      body: payload,
      cache: 'no-store',
      headers: {
        ...createHeaders(),
        accept: 'application/json',
      },
    }),
  )

const updateInsurancePayment = (
  payload: InsurancePaymentRecordPayload,
  id: string,
): Promise<InsurancePayment> =>
  handleRequest(
    fetch(`/revcycle/api/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...payload,
        ...defaultInsurancePaymentRecordPayload,
      }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export {
  getInsurancePaymentsList,
  createInsurancePayment,
  updateInsurancePayment,
  deleteClaim,
  getClaimList,
  getPatients,
  getReceivers,
  getResponseHistoryDetail,
  getResponseHistoryList,
  getIcdCodes,
  getCPTCodes,
  getClaimById,
  getModifiersCodes,
  updateClaim,
  submitClaim,
  getClaimSubmissionHistoryList,
  getClaimSubmissionHistoryDetail,
  getClaimSubmissionRejectionDetail,
  deleteInsurancePaymentRecord,
  getInsurancePayers,
  createInsurancePaymentAttachments,
}
