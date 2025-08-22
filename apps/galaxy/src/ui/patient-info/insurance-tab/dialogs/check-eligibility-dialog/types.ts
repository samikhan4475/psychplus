import { Metadata } from '@/types'

interface EligibilityDetailResponseModel {
  eligibilityDetailResponse: EligibilityDetailResponse
  isSuccessful: boolean
}

interface EligibilityLogRequestPayload {
  summaryId: string
  patientId: string
  payerId: string
  memberId: string
  patientInsurancePolicyId: string
  locationId: string
  practiceId: string
  providerStaffId: string
  serviceDate: string | null
  serviceTypeCode: string
}

interface ResidingStateResponse {
  patientId: string
  patientResidingStateCode: string
  patientResidingStateName: string
  mostRecentAppointmentId: string
  mostRecentVisitDate: string
}

interface EligibilityRequestPayload {
  patientId: string
  patientInsurancePolicyId: string
  organizationId: string
  practiceId: string
  providerId: string
  serviceDate: string | null
  serviceTypeCode: string
  cptCodes: string[]
}

interface EligibilityDetailResponse {
  links: {
    self: {
      href: string
    }
  }
  id: string
  customerId: string
  controlNumber: string
  status: string
  statusCode: string
  createdDate: string
  updatedDate: string
  expirationDate: string
  asOfDate: string
  requestedServiceType: ServiceType[]
  validationMessages: string[]
  subscriber: PersonWithAddress
  patient: PersonWithAddress & {
    subscriberRelationship: string
    subscriberRelationshipCode: string
    updateYourRecords: boolean
  }
  payer: {
    name: string
    payerId: string
  }
  requestingProvider: {
    npi: string
    taxId: string
  }
  plans: Plan[]
  supplementalInformation: SupplementalInformation
}

interface ServiceType {
  code: string
  value: string
}

interface Name {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}

interface EligibilityLogResponse {
  patientPayorEligibilityId: string
  serviceDate: string
  patientName: Name
  memberId: string
  serviceTypeCode: string
  residingStateCode: string
  locationName: string
  payerName: string
  providerName: Name
  responseStatus: string
  requestedByName: Name
  coverageStatus: string
  metadata: Metadata
}

interface PersonWithAddress {
  firstName: string
  lastName: string
  memberId?: string
  gender: string
  genderCode: string
  birthDate: string
  address: {
    line1: string
    line2: string
    city: string
    state: string
    stateCode: string
    zipCode: string
  }
}

interface Plan {
  status: string
  statusCode: string
  groupNumber: string
  groupName: string
  serviceDate: string
  planStartDate: string
  benefits: Benefit[]
  payerNotes: PayerNote[]
}

interface Benefit {
  name: string
  type: string
  status: string
  statusCode: string
  statusDetails: BenefitDetail
  limitations: BenefitDetail
}

interface BenefitDetail {
  noNetwork: DetailItem[]
}

interface DetailItem {
  status: string
  statusCode: string
  level: string
  levelCode: string
  description: string
  quantity: string
  quantityQualifier: string
  quantityQualifierCode: string
  payerNotes: string[]
}

interface PayerNote {
  type: string
  typeCode: string
  message: string
}

interface SupplementalInformation {
  professionalPatientCostEstimator: boolean
  institutionalPatientCostEstimator: boolean
  patientCareSummary: boolean
  assessmentCarePlan: boolean
  outOfArea: boolean
}

export {
  type EligibilityLogRequestPayload,
  type EligibilityDetailResponseModel,
  type EligibilityDetailResponse,
  type EligibilityRequestPayload,
  type EligibilityLogResponse,
  type ResidingStateResponse,
}
