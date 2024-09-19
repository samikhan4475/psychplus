import { Metadata } from "@/types"

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
  type: 'in-person' | 'video' | 'unavailable'
  isPlusSlot: boolean
  startDate: string
  endDate: string
  duration: number
  servicesOffered: string[]
  teleState: string[]
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

interface AvailableSlotsMock extends AvailableSlots {
  specialist: Specialist
}

interface GetAppointmentSlotsResponse<T> {
  appointments: AvailableSlotsEvent<T>[]
  total: number
}

interface Option {
  value: string
  label: string
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
  },
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
  dateOfAddmission: string
  lengthOfStay: number
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
  AvailableSlotsMock,
  Option,
  Appointment,
}

export { TabValue }
