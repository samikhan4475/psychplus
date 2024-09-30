import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { POSCodeSets } from '../coding-cpt/types'
import { insurancePaymentRecordStatuses } from './enums'
import {
  Claim,
  ClaimSubmissionHistory,
  CodeSet,
  InsurancePayer,
  InsurancePayment,
  Location,
  ResponseHistoryRecord,
  Staff,
  USAStates,
} from './types'

const defaultPayLoad = {
  isIncludePatientInsurancePlan: false,
  isIncludePatientInsurancePolicy: true,
  isIncludeClaimValidation: true,
}

const defaultInsurancePaymentPayload = {
  recordStatuses: [insurancePaymentRecordStatuses.ACTIVE],
}

const defaultResponsePayLoad = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getClaimsList = (): Promise<Claim[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/claims/actions/search`, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(defaultPayLoad),
      headers: createHeaders(),
    }),
  )
}

const getInsurancePayersList = (): Promise<InsurancePayer[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/insurance/payers`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

const getLocations = (): Promise<Location[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/clinics`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

const getPOSCodeSets = (): Promise<POSCodeSets> => {
  return handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/PlaceOfService?includeExtraDetails=false&offset=0&limit=100&orderBy=displayName asc`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const getStaff = (): Promise<Staff[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/staff?includeInactive=false&offset=0&limit=0&orderBy=legalName asc`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getAccidentCodeSets = async (): Promise<CodeSet[]> =>
  handleRequest(
    fetch(`${API_URL}/api/metadata/codesets`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getPaymentMethodCodeSets = async (): Promise<CodeSet> =>
  handleRequest(
    fetch(`${API_URL}/api/metadata/codesets/PaymentMethod`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getPaymentSourceTypeCodeSets = async (): Promise<CodeSet> =>
  handleRequest(
    fetch(`${API_URL}/api/metadata/codesets/PaymentSourceType`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getClaimPaymentFiltrationDateTypeCodeSets = async (): Promise<CodeSet> =>
  handleRequest(
    fetch(`${API_URL}/api/metadata/codesets/ClaimPaymentFiltrationDateType`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getUSAStates = async (): Promise<USAStates> => {
  return handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/UsStates??includeExtraDetails=false&offset=0&limit=0&orderBy=displayName%20asc`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}
const getClaimSubmissionHistoryList = (): Promise<ClaimSubmissionHistory[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/claimssubmissions/batches/actions/search`, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(defaultPayLoad),
      headers: createHeaders(),
    }),
  )
}

const getInsurancePaymentsList = (): Promise<InsurancePayment[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/payments/actions/search?orderBy=receivedDate desc`, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(defaultInsurancePaymentPayload),
      headers: createHeaders(),
    }),
  )
}
const getResponseHistory = (): Promise<ResponseHistoryRecord[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/claimssubmissions/responses/actions/search`, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(defaultResponsePayLoad),
      headers: createHeaders(),
    }),
  )
}

const getClaimsListCached = cache(getClaimsList)
const getPOSCodeSetsCached = cache(getPOSCodeSets)
const getStaffSetsCached = cache(getStaff)
const getInsurancePayersListCached = cache(getInsurancePayersList)
const getLocationsCached = cache(getLocations)
const getClaimSubmissionHistoryListCached = cache(getClaimSubmissionHistoryList)
const getAccidentCodeSetsCached = cache(getAccidentCodeSets)
const getUSAStatesCached = cache(getUSAStates)
const getInsurancePaymentsListCached = cache(getInsurancePaymentsList)
const getPaymentMethodCodeSetsCached = cache(getPaymentMethodCodeSets)
const getResponseHistoryCached = cache(getResponseHistory)
const getPaymentSourceTypeCodeSetsCached = cache(getPaymentSourceTypeCodeSets)
const getClaimPaymentFiltrationDateTypeCodeSetsCached = cache(
  getClaimPaymentFiltrationDateTypeCodeSets,
)

export {
  getClaimsListCached as getClaimsList,
  getPOSCodeSetsCached as getPOSCodeSets,
  getStaffSetsCached as getStaff,
  getInsurancePayersListCached as getInsurancePayersList,
  getLocationsCached as getLocations,
  getClaimSubmissionHistoryListCached as getClaimSubmissionHistoryList,
  getAccidentCodeSetsCached as getAccidentCodeSets,
  getUSAStatesCached as getUSAStates,
  getInsurancePaymentsListCached as getInsurancePaymentsList,
  getPaymentMethodCodeSetsCached as getPaymentMethodCodeSets,
  getResponseHistoryCached as getResponseHistory,
  getPaymentSourceTypeCodeSetsCached as getPaymentSourceTypeCodeSets,
  getClaimPaymentFiltrationDateTypeCodeSetsCached as getClaimPaymentFiltrationDateTypeCodeSets,
}
