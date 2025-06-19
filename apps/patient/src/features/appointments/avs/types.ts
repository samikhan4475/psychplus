import React from 'react'

interface LabOrder {
  id: string
  labOrderNumber: number
  metadata: Metadata
  labId: string
  patientId: number
  appointmentId: number
  orderStatus: string
  orderingStaffId: number
  orderingStaffName: Name
  billType: string
  isFasting: boolean
  orderSendStatus: boolean
  isTest: boolean
  labOrderDate: string
  orderingLab: OrderingLab
  labTests: LabTest[]
  labResults: LabResult[]
  recordStatus: string
}

interface LabResult {
  id: string
  metadata: {
    createdOn: string
    createdBy: number
    createdByFullName: string
  }
  labTestId: string
  orderId: string
  observationTime: string
  resultCode: string
  resultName: string
  resultValue: string
  resultValueUnit: string
  recomendedValue: string
  statusCode: string
  abnormalRangeCode: string
  physicianComments: string
  labComments: string
  recordStatus: string
}

interface Metadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn?: string
  updatedBy?: number
  updatedByFullName?: string
}

interface Name {
  firstName: string
  middleName: string
  lastName: string
  honors: string
}

interface OrderingLab {
  id: string
  metadata: Metadata
  recordStatus: string
  name: string
  locationName: string
  locationId: string
  consolidatorId: string
  consolidator: Consolidator
  contactDetails: ContactDetails
  isTest: boolean
}

interface Consolidator {
  id: string
  metadata: Metadata
  recordStatus: string
  name: string
  shortName: string
}

interface ContactDetails {
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
}

interface PhoneNumber {
  type: string
  number: string
}

interface Address {
  type: string
  street1: string
  street2: string
  city: string
  state: string
  postalCode: string
  zipLast4: string
}

interface LabTest {
  id: string
  metadata: Metadata
  recordStatus: string
  orderId: string
  labTestCode: string
  testName: string
  labTestCodeType: string
  temperatureType: string
  papIndicator: string
}

interface Referral {
  id: string
  metadata: Metadata
  patientId: number
  patientName: Name
  patientStatus: string
  patientAge: number
  patientGender: string
  patientMrn: string
  patientDateOfBirth: string
  contactDetails: ContactDetails
  stateCode: string
  city: string
  zip: string
  referralDate: string
  resourceStatus: string
  referredByType: string
  referredByName: Name
  service: string
  servicesStatus: string
  contactStatus: string
  appointmentId: number
  comments: string
  initiatedByUserRole: string
  nextVisit: string
}

interface Name {
  firstName: string
  lastName: string
}

interface ContactDetails {
  email: string
  phoneNumbers: PhoneNumber[]
}

interface PhoneNumber {
  type: string
  number: string
}

interface TableColumn<T> {
  key: string
  label: string
  render?: (row: T) => React.JSX.Element | string | null
}

interface Appointment {
  id: number
  status: string
  type: string
  encounterNumber: string
  encounterTypeCode: number
  patientId: number
  clinic: Clinic
  specialist: Specialist
  specialistTypeCode: number
  locationId: string
  serviceId: string
  service: string
  providerStaffId: number
  providerUserId: number
  providerFullName: string
  providerName: string
  physicianName: PhysicianName
  startDate: string
  endDate: string
  duration: number
  coPay: number
  isCopayPaid: boolean
  isSelfPay: boolean
  visitNoteTitle: string
  visitType: string
  visitTypeCode: string
  visitSequence: string
  providerType: string
  isPatientHadAnyCheckedOutVisit: boolean
  isNoteSignedByProviderInLastYear: boolean
  cptModifiersCodes: CptModifier[]
  isRequiredPolicy: boolean
  isQuickNoteSigned: boolean
  cptCodes: string
  noteSignedStatus: string
  isServiceTimeDependent: boolean
  isPatientNeedsToAddCreditCard: boolean
  isPatientNeedsToAcceptPolicies: boolean
}

interface Clinic {
  id: string
  metadata: Metadata
  isTest: boolean
  name: string
  group: string
  description: string
  npi: string
  contact: ClinicContact
  timeZoneId: string
}

interface ClinicContact {
  phoneNumbers: PhoneNumber[]
  addresses: Address[]
}

interface PhoneNumber {
  type: string
  number: string
}

interface Address {
  type: string
  street1: string
  city: string
  state: string
  postalCode: string
  zipLast4: string
  geoCoordinates?: GeoCoordinates
  timeZoneId?: string
}

interface GeoCoordinates {
  longitude: number
  latitude: number
  altitude: number
}

interface Specialist {
  id: number
  userId: number
  metadata: SpecialistMetadata
  isTest: boolean
  legalName: NameWithHonors
  staffRoleCode: string
  contactInfo: SpecialistContact
  spokenLanguages: string[]
  hasPhoto: boolean
  hasBioVideo: boolean
  status: string
  gender: string
  phoneContact: string
  supervisedBy: string
  dateOfBirth: string
  isDefaultCosigner: boolean
  isMailingAddressSameAsPrimary: boolean
  timeZonePreference: string
}

interface SpecialistMetadata {
  createdOn: string
}

interface NameWithHonors {
  firstName: string
  lastName: string
  honors: string
}

interface SpecialistContact {
  email: string
  addresses: Address[]
}

interface PhysicianName {
  firstName: string
  middleName: string
  lastName: string
  honors: string
}

interface CptModifier {
  code: number
  isDefault: boolean
}

interface DiagnosisCodeDescription {
  code: string
  description: string
}

interface ResourceMetadata {
  createdOn: string
  createdBy: number
}

interface DiagnosisInfo {
  resourceMetadata: ResourceMetadata
  patientId: number
  userId: number
  name: string
  icd10Code: string
  codesDescriptions: DiagnosisCodeDescription[]
}

interface ProviderRecommendation {
  id: string
  appointmentId: number
  recommendation: string
  recordStatus: string
  metadata: {
    createdOn: string
    createdBy: number
    createdByFullName: string
  }
}

export {
  type LabOrder,
  type Referral,
  type TableColumn,
  type Appointment,
  type LabTest,
  type LabResult,
  type DiagnosisInfo,
  type ProviderRecommendation,
}
