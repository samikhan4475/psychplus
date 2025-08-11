import {
  Claim,
  Clinic,
  Cosigner,
  LegalName,
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
  GroupTherapy = 'GroupTherapy',
  KetamineFourVisit = 'KetamineIV',
  UDS = 'UDS',
  FitnessForDuty = 'FitnessForDuty',
  PreEmployment = 'PreEmployment',
}

enum VisitSequenceTypes {
  Discharge = 'Discharge',
  Establish = 'Establish',
  Na = 'NA',
  InitialDischarge = 'InitialDischarge',
  Initial = 'Initial',
  New = 'New',
  Subsequent = 'Subsequent',
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
interface CustomVisit {
  customDiagnosis: string
  customCptCodes: string
  customAddons: string
}
interface Appointment extends Partial<CustomVisit> {
  id: number
  appointmentId: number
  appointmentEncounterNo: string
  app_id?: string
  metadata: Metadata
  appointmentDate: string
  appointmentDuration: number
  coPayAmount?: string
  coInsuranceAmount?: string
  claimData?: Claim
  appointmentInterval: number
  appointmentDateTime?: string
  name: string
  age: number
  patientId: number
  state: string
  stateCode: string
  gender: string
  dob: string
  patientMrn: string
  patientStatus: string
  patientPhoneNumber?: { number: string; type: string }
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
  frequency: string
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
  diagnosis: string
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
  tmsSessionNumbersCount?: string
  status?: string
  type?: string
  specialistTypeCode?: number
  cosigners: Cosigner[]
  cptPrimaryCodes: CptCode[]
  cptAddonCodes: CptCode[]
  cptModifiersCodes: CptCode[]
  providerStaffId?: number
  groupTherapyTypeCode: string
  paymentErrorMessage?: string
  isPatientHadAnyCheckedOutVisit?: boolean
  isNoteSignedByProviderInLastYear?: boolean
  providerUserId?: number
  creditCardVerificationStatus: string
  isTestPatient: boolean
  isTcmBlockComplete: boolean
  isFollowupExistsWithin12Weeks: boolean
  isFollowupDenied?: boolean
  followUpDenialReason?: string
  isRequiredPolicy?: boolean
  isPrimaryNoteSigned?: boolean
  providerFullName?: string
  isQuickNoteSigned?: boolean
  isFollowupCreatedforTimedService?: boolean
  lastSeenByProvider?: string
  lastSeenByProviderName?: LegalName
  staffTimezonePreference?: string
  isCustomAppointment?: boolean
  admittingProviderName?: LegalName
  admittingProviderId?: number
  noteSignedByUserName?: LegalName
  cosignerName?: LegalName
}

interface BookVisitPayload {
  admissionId?: string
  admissionLegalStatus?: string
  appointmentId: number
  admissionDate?: string
  appointmentStatus?: string
  authorizationDate?: string | null
  authorizationNumber?: string
  claimData?: Claim
  isCustomAppointment?: boolean
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
  stateCode: string
  stateId?: string
  type: string
  unitId?: string
  visitSequenceType?: string
  visitTypeId?: string
  parentAppointmentId?: number
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

enum FileTypes {
  Xml = 'Xml',
  Json = 'Json',
  Csv = 'Csv',
  Xlsx = 'Xlsx',
  Pdf = 'Pdf',
  Txt = 'Txt',
}

interface PatientAppointments extends Partial<Appointment> {
  status: string
  type: string
  diagnoses: string[]
}
export {
  type Appointment,
  type BookVisitPayload,
  type BookVisitResponse,
  type Diagnosis,
  type PaymentType,
  type CptCode,
  type PatientAppointments,
  VisitTypes,
  VisitSequenceTypes,
  FileTypes,
}
