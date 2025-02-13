import {
  Clinic,
  Cosigner,
  Metadata,
  ServiceGroup,
  ServiceRoom,
  ServiceUnit,
} from '@/types'
import { Specialist } from '@/ui/schedule/types'

enum VisitTypes {
  Outpatient = 'Outpatient',
  ResidentCare = 'ResidentCare',
  EdVisit = 'EdVisit',
  TransitionalCare = 'TransitionalCare',
  IndividualPsychotherapy = 'IndividualPsychotherapy',
  FamilyPsychotherapy = 'FamilyPsychotherapy',
  Ect = 'Ect',
  Tms = 'Tms',
  Spravato = 'Spravato',
  HospitalCareInitial = 'HospitalCare/Initial',
  HospitalCareSubsequent = 'HospitalCare/Subsequent',
  HospitalCareDischarge = 'HospitalCare/Discharge',
  HospitalCareInitialDischarge = 'HospitalCare/InitialDischarge',
}

type PaymentType =
  | 'CoPay'
  | 'CoInsurance'
  | 'CoPayAndCoInsurance'
  | 'OutstandingBalance'
  | 'CustomPayment'
  | 'PaymentPlan'
  | 'PlusMembership'
  | 'Insurance'
  | 'SelfPay'

interface Diagnosis {
  id: string
  metadata: Metadata
  icd10Code: string
  description: string
  patientId: number
  isChecked: boolean
  priorityFavourite: number
  priorityCheck: number
  recordStatus: string
}

interface CptCode {
  code: string
  display?: string
  isDefault?: boolean
  isDisabled?: boolean
}
interface Appointment {
  id: number
  appointmentId: number
  app_id?: string
  metadata: Metadata
  appointmentDate: string
  appointmentDuration: number
  coPayAmount?: string
  coInsuranceAmount?: string
  appointmentInterval: number
  appointmentDateTime?: string
  name: string
  age: number
  patientId: number
  clinicLocation: string
  state: string
  stateCode: string
  gender: string
  dob: string
  patientMrn: string
  patientStatus: string
  service: string
  serviceId: string
  isServiceTimeDependent: boolean
  patientInfoVerificationStatus: string
  patientInsuranceVerificationStatus: string
  patientConsentStatus: string
  patientCardVerificationStatus: boolean
  providerId: number
  providerName: string
  physicianName: string
  providerType: string
  dischargeDate: string
  dischargeLocationName: string
  isEdDischarge: boolean
  visitType: string
  visitSequence: string
  visitMedium: string
  visitStatus: string
  visitNoteTitle?: string
  insuranceVerification: string
  primaryInsuranceName: string
  secondaryInsuranceName: string
  copayDue: number
  copayPaid: number
  coInsuranceDue: number
  coInsurancePaid: number
  balanceDue: number
  balancePaid: number
  isNoteSigned: boolean
  locationId: string
  locationName: string
  locationTimezoneId: string
  unitResource: ServiceUnit
  roomResource: ServiceRoom
  groupResource: ServiceGroup
  physicianStaffId?: string
  room: string
  diagnosis: Diagnosis[]
  cptCodes: string[]
  legalStatus: string
  authorizationNumber: string
  authorizationDate: string
  dateOfAdmission: string
  lastCoverageDate: string
  paymentResponsibility: string
  facilityAdmissionDetailId: string
  facilityAdmissionId: number
  lengthOfStay: number
  isPrimaryProviderType: boolean
  noteSignedStatus: string
  startDate?: string
  endDate?: string
  duration?: number
  visitTypeCode?: string
  encounterNumber?: string
  type?: string
  specialistTypeCode?: number
  cosigners: Cosigner[]
  cptPrimaryCodes: CptCode[]
  cptAddonCodes: CptCode[]
  cptModifiersCodes: CptCode[]
  providerStaffId?: number
  groupTherapyTypeCode: string
  isPatientHadAnyCheckedOutVisit?: boolean
  isNoteSignedByProviderInLastYear?: boolean
  providerUserId?: number
  creditCardVerificationStatus: string
  isTestPatient: boolean
}

interface BookVisitPayload {
  admissionId?: string
  admissionLegalStatus?: string
  appointmentId: number
  admissionDate?: string
  appointmentStatus?: string
  authorizationDate?: string
  authorizationNumber?: string
  dischargeDate?: string
  dischargeLocation?: string
  durationMinutes: number
  encounterReason?: string
  encounterType?: string
  facilityAppointmentStatus?: string
  visitFrequency: number
  groupId?: string
  groupTherapyTypeCode?: string
  insuranceVerificationStatusCode?: string
  isEdVisit?: boolean
  isFollowup: boolean
  isOverridePermissionProvided: boolean
  isPrimaryProviderType: boolean
  isProceedPermissionProvided: boolean
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

export {
  type Appointment,
  type BookVisitPayload,
  type BookVisitResponse,
  type Diagnosis,
  type PaymentType,
  type CptCode,
  VisitTypes,
}
