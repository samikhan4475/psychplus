import { Clinic, Gender, LegalName } from '@/types'
import { Specialist } from '../schedule/types'

interface GeoCoordinates {
  longitude: number
  latitude: number
}

interface Address {
  type: string
  street1: string
  city: string
  state: string
  postalCode: string
  geoCoordinates: GeoCoordinates
}

interface Metadata {
  createdOn: string
  createdBy?: number
  updatedOn?: string
}

interface VisitTypesPayload {
  locationId: string
  serviceId: string
}

interface StateCodeSet {
  id: string
  stateName: string
  stateCode: string
  metadata: Metadata
}

interface StatesCodeSetState {
  states: StateCodeSet[]
  setStates: (states: StateCodeSet[]) => void
}

interface DropdownOptions {
  label: string
  value: string
}

interface Service {
  id: string
  serviceOffered: string
}

interface ServiceWithOptions extends DropdownOptions, Service {}

interface PatientRaw {
  id: number
  metadata: Metadata
  legalName: LegalName
  contactDetails: { addresses: Address[] }
  birthdate: string
  medicalRecordNumber: string
  status: string
  gender: Gender
  isSelfPay?: boolean
}

interface Patient {
  id: number
  firstName: string
  middleName: string
  lastName: string
  birthdate: string
  gender: string
  medicalRecordNumber: string
  status: string
  contactDetails?: { addresses: Address[] }
  state?: string
  isSelfPay?: boolean
}

interface Provider {
  id?: number
  userId?: number
  avatar?: string
  firstName: string
  lastName: string
  honors?: string
}

enum TCMVisitTypes {
  T_EST_PT_TRANSITIONAL_CARE = 'T - Est Pt, Transitional Care Mngt',
  T_NEW_PT_TRANSITIONAL_CARE = 'T - New Pt, Transitional Care Mngt',
  EST_PT_TRANSITIONAL_CARE = 'Est Pt, Transitional Care Mngt',
  NEW_PT_TRANSITIONAL_CARE = 'New Pt, Transitional Care Mngt',
}

interface ServerSearchSelectID {
  id?: string | number
}

enum ServiceType {
  Aba = 'Aba',
  Therapy = 'Therapy',
  CouplesFamilyTherapy = 'CouplesFamilyTherapy',
  GroupTherapy = 'GroupTherapy',
  AssistedLivingFacility = 'AssistedLivingFacility',
  InpatientRehab = 'InpatientRehab',
  InpatientPsych = 'InpatientPsych',
  InpatientMedical = 'InpatientMedical',
  Psychiatry = 'Psychiatry',
  EmergencyRoom = 'EmergencyRoom',
  NursingFacility = 'NursingFacility',
  Tms = 'Tms',
  Ect = 'Ect',
  Spravato = 'Spravato',
  InpatientBehaviorHealthResidential = 'InpatientBehaviorHealthResidential',
  InpatientSubstanceUseResidential = 'InpatientSubstanceUseResidential',
  IntensiveOutpatient = 'IntensiveOutpatient',
  IntermediateCareFacility = 'IntermediateCareFacility',
  PartialHospital = 'PartialHospital',
  SkilledNursingFacility = 'SkilledNursingFacility',
  UDS = 'Uds',
}

enum ProviderType {
  Psychiatrist = 'Psychiatrist',
  Therapist = 'Therapy',
  Bcba = 'Bcba',
  Pmnr = 'Pmnr',
  NotSet = 'NotSet',
  FamilyMedicine = 'FamilyMedicine',
  InternalMedicine = 'InternalMedicine',
  Anesthesiology = 'Anesthesiology',
}

enum ServicesOffered {
  EmergencyRoom = 'EmergencyRoom',
  InpatientPsych = 'InpatientPsych',
  PartialHospital = 'PartialHospital',
  InpatientBehaviorHealthResidential = 'InpatientBehaviorHealthResidential',
  InpatientMedical = 'InpatientMedical',
  InpatientRehab = 'InpatientRehab',
  InpatientSubstanceUseResidential = 'InpatientSubstanceUseResidential',
}

enum STAFF_COMMENTS_TAB {
  TreatmentTab = 'Treatment',
  BillingTab = 'Billing',
}

interface StaffCommentParams {
  startDate?: string
  endDate?: string
  partialComment?: string
  isBilling: boolean
  isTreatment: boolean
  patientId?: string
  appointmentId?: number
  staff?: string
  recordStatuses?: string[] | null
}

interface BookVisitPayload {
  admissionId?: string
  admissionLegalStatus?: string
  appointmentId: number
  appointmentStatus?: string
  authorizationDate?: string
  authorizationNumber?: string
  dischargeDate?: string
  dischargeLocation?: string
  durationMinutes: number
  encounterReason?: string
  encounterType?: string
  facilityAppointmentStatus?: string
  visitFrequency: string
  groupId?: string
  groupTherapyTypeCode?: string
  isEdVisit?: boolean
  isFollowup: boolean
  isNewAdmissionIdRequired: boolean
  isOverridePermissionProvided: boolean
  isPrimaryProviderType: boolean
  isProceedPermissionProvided: boolean
  isOverridePrimaryProvider?: boolean
  isSelfPay?: boolean
  lastAuthorizationCoveredDate?: string
  locationId: string
  patientId: number
  paymentResponsibilityTypeCode?: string
  pharmacyName?: string
  providerType?: string
  reason?: string
  roomId?: string
  serviceId: string
  specialistStaffId: number
  startDate: string
  admissionDate?: string
  consultationDate?: string
  stateCode: string
  stateId?: string
  type: string
  unitId?: string
  visitSequenceType?: string
  visitTypeId?: string
}

interface BookVisitResponse {
  id: number
  metadata: Metadata
  status: string
  type: string
  encounterNumber: string
  encounterTypeCode: number
  clinic: Clinic
  specialist: Specialist
  specialistTypeCode: number
  locationId: string
  serviceId: string
  physicianStaffId: number
  physicianName: string
  startDate: string
  endDate: string
  duration: number
  coPay: number
  virtualRoomLink: string
  isCopayPaid: boolean
  isSelfPay: boolean
}

type VisitAlertType =
  | Pick<
      BookVisitPayload,
      | 'isOverridePermissionProvided'
      | 'isOverridePrimaryProvider'
      | 'isProceedPermissionProvided'
    >
  | {}

export {
  type Clinic,
  type DropdownOptions,
  type Patient,
  type PatientRaw,
  type Provider,
  type Service,
  type ServiceWithOptions,
  type StateCodeSet,
  type StatesCodeSetState,
  type VisitTypesPayload,
  type ServerSearchSelectID,
  type StaffCommentParams,
  type BookVisitPayload,
  type BookVisitResponse,
  type VisitAlertType,
  ServiceType,
  ProviderType,
  TCMVisitTypes,
  ServicesOffered,
  STAFF_COMMENTS_TAB,
}
