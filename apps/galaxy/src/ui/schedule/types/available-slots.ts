import { Metadata, ServiceGroup, ServiceRoom, ServiceUnit } from '@/types'

interface Visit {
  type: string
  sequence: string
  medium: string
  status: string
  date: string
  insVerification: string
}

interface Slot {
  id: number
  duration: string
}

type SlotsTable = {
  [key: string]: Slot[]
}

interface Availability {
  time: string
  monthDay: string
  date: string
  day: string
}

interface Provider {
  id: number
  speciality: string
  slots: SlotsTable
  nextAvailability: Availability[]
}
interface Balance {
  due: string
  paid: string
}

enum TabValue {
  Scheduler = 'scheduler',
  List = 'list',
  Calendar = 'calendar',
  ProviderCoding = 'ProviderCoding',
  Rounding = 'Rounding',
}

enum VerificationStatus {
  Verified = 'Verified',
  Pending = 'Pending',
  UnVerifiable = 'Unverifiable',
}

interface PatientRecord {
  id: number
  date: string
  name: string
  age: number
  gender: string
  dob: string
  ptStatus: string
  p: string
  i: string
  c: string
  cc: string
  state: string
  Location: string
  providerType: string
  provider: string
  primaryInsurance: string
  secondaryInsurance: string
  visit: Visit
  coPay: Balance
  coIns: Balance
  balance: Balance
  nodeSigned: boolean
}

interface AvailableSlots {
  type: string
  isPlusSlot: boolean
  startDate: string
  endDate: string
  duration: number
  servicesOffered: string[]
  teleState?: string[]
  timeZoneId: string
}

interface AvailableSlotsInDateFormat
  extends Omit<AvailableSlots, 'startDate' | 'endDate'> {
  startDate: Date
  endDate: Date
  specialist: Specialist
}

interface AvailableSlotsEvent<T> {
  start: Date
  end: Date
  title: string
  data: T
}

interface Specialist {
  id: number
  isTest: boolean
  legalName: {
    firstName: string
    lastName: string
  }
  staffRoleCode: string
  virtualRoomLink?: string
  bio?: string
  hasPhoto?: boolean
  rating?: number
}

interface GetAppointmentSlotsResponse<T> {
  appointments: AvailableSlotsEvent<T>[]
  total: number
}

interface GetUnitsGroupsResponse {
  serviceGroups: ServiceGroup[]
  serviceUnits: ServiceUnit[]
  serviceRooms: ServiceRoom[]
}

interface Appointment {
  appointmentId: number
  metadata: Metadata
  appointmentDate: string
  name: string
  age: number
  clinicLocation: string
  state: string
  gender: string
  dob: string
  patientStatus: string
  service: string
  patientInfoVerificationStatus: string
  patientInsuranceVerificationStatus: string
  patientConsentStatus: string
  patientCardVerificationStatus: boolean
  providerId: number
  providerName: string
  providerType: string
  visitType: string
  visitSequence: string
  visitMedium: string
  visitStatus: string
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
  locationName: string
  unitResource: {
    id: string
    metadata: Metadata
    locationId: string
    serviceId: string
    unit: string
    coSignerId: number
  }
  groupResource: {
    id: string
    metadata: Metadata
    locationId: string
    serviceId: string
    group: string
    coSignerId: number
  }
  room: string
  diagnosis: string
  cptCodes: string[]
  legalStatus: string
  authorizationNumber: string
  dateOfAdmission: string
  lastCoverageDate: string
  lengthOfStay: number
}

interface ProviderCoding {
  appointmentId: number
  name: string
  age: number
  gender: string
  dob: string
  patientStatus: string
  service: string
  providerType: string
  clinicLocation: string
  providerId: number
  providerName: string
  primaryInsuranceName: string
  locationName: string
  room: string
  legalStatus: string
  authorizationNumber: string
  dateOfAddmission: string
  lastCoverageDate: string
  lengthOfStay: number
  cptCodes: string[]
  visitType: string
  visitSequence: string
  visitMedium: string
  visitStatus: string
  diagnosis: string
  isNoteSigned: boolean
  facilityAdmissionId?: string
}
interface AppointmentParams {
  appointmentIds?: number[]
  patientIds?: number[]
  startingDate?: string
  endingDate?: string
  name?: string
  age?: number | null
  gender?: string
  dateOfBirth?: string
  patientStatuses?: string[]
  locationIds?: string[]
  serviceIds?: string[]
  servicesOffered?: string[]
  stateIds?: string[]
  providerIds?: number[]
  providerTypes?: string[]
  unitIds?: string[]
  roomIds?: string[]
  groupIds?: string[]
  primaryInsuranceNames?: string[]
  secondaryInsuranceNames?: string[]
  visitTypes?: string[]
  visitSequences?: string[]
  visitMediums?: string[]
  visitStatus?: string
  patientInsuranceVerificationStatuses?: string[]
  diagnosisCode?: string
  cptCode?: string
  dateOfAdmissionStart?: string
  dateOfAdmissionEnd?: string
  lengthOfStayMin?: number | null
  lengthOfStayMax?: number | null
  lastCoverageDateStart?: string
  lastCoverageDateEnd?: string
  legalStatuses?: string[]
  copayDueMin?: number | null
  copayDueMax?: number | null
  copayPaid?: number | null
  coInsuranceDueMin?: number | null
  coInsuranceDueMax?: number | null
  coInsurancePaid?: number | null
  balanceDueMin?: number | null
  balanceDueMax?: number | null
  balancePaid?: number | null
  noteSigned?: string
  isFollowUp?: boolean
  isServiceTimeDependant?: boolean
  isShowActiveVisits?: boolean
  includePatientTransactions?: boolean
  bookedAppointmentTime?: string
  appointmentStatuses?: string[]
  noteSignedStatuses?: string[]
  facilityAdmissionIds?: string[]
}

interface ProviderCoding {
  name: string
  age: number
  gender: string
  dob: string
  patientStatus: string
  service: string
  providerType: string
  clinicLocation: string
  providerId: number
  providerName: string
  primaryInsuranceName: string
  locationName: string
  room: string
  legalStatus: string
  authorizationNumber: string
  dateOfAddmission: string
  lastCoverageDate: string
  lengthOfStay: number
  cptCodes: string[]
  visitType: string
  visitSequence: string
  visitMedium: string
  visitStatus: string
  diagnosis: string
  isNoteSigned: boolean
}

interface AvailableSlotsParams {
  startingDate?: string
  serviceIds?: string[]
  stateIds?: string[]
  visitTypeCode?: string[]
  locationIds?: string[]
  staffIds?: number[]
  specialistTypeCode?: string
  providerTypes?: string[]
  gender?: string
  language?: string
  isFirstResponder?: boolean
  maxDaysOutToLook?: number
}

interface GetUnitsGroupsResponse {
  serviceGroups: ServiceGroup[]
  serviceUnits: ServiceUnit[]
}

enum View {
  Rounding = 'rounding-view',
  List = 'list-view',
  Calendar = 'calendar',
  All = 'all',
}

enum SchedulerFilters {
  AuthorizationNumber = 'Authorization Number',
  Balance = 'Balance',
  CoInsurance = 'Co-Ins',
  CoPayment = 'Co-Pay',
  DOA = 'DOA',
  Group = 'Group',
  InsVerification = 'Ins Verification',
  LCD = 'LCD',
  Legal = 'Legal',
  LOS = 'LOS',
  Location = 'Location',
  Service = 'Service',
  NoteSigned = 'Note Signed',
  PrimaryInsurance = 'Primary Insurance',
  Provider = 'Provider',
  ProviderType = 'Provider Type',
  Room = 'Room',
  SecondaryInsurance = 'Secondary Insurance',
  Unit = 'Unit',
  VisitMedium = 'Visit Medium',
  VisitSequence = 'Visit Sequence',
  VisitStatus = 'Visit Status',
  VisitType = 'Visit Type',
  CptCode = 'CPT Code',
  Diagnosis = 'Diagnosis',
  FacilityAdmissionId = 'Facility Admission Id',
}

export type {
  PatientRecord,
  Provider,
  SlotsTable,
  AvailableSlots,
  GetAppointmentSlotsResponse,
  AvailableSlotsInDateFormat,
  Specialist,
  AvailableSlotsEvent,
  Appointment,
  ProviderCoding,
  AppointmentParams,
  GetUnitsGroupsResponse,
  AvailableSlotsParams,
}

export { TabValue, VerificationStatus, View, SchedulerFilters }
