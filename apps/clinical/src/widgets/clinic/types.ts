interface Visit {
  type: string
  sequence: string
  medium: string
  status: string
  date: string
  insVerification: string
}

interface Balance {
  due: string
  paid: string
}

interface TableData {
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

interface Specialist {
  id: number
  isTest: boolean
  legalName: LegalName
  staffRoleCode: string
  virtualRoomLink: string
  bio: string
  hasPhoto: boolean
  rating: number
}

interface Contact {
  email: string
  emailVerificationStatus: string
  addresses: Address[]
  isMailingAddressSameAsPrimary: boolean
}

interface AvailableSlots {
  type: string
  isPlusSlot: boolean
  startDate: string
  endDate: string
  duration: number
  servicesOffered: string[]
  teleState: string[]
  timeZoneId: string
}

interface Clinic {
  id: string
  isTest: boolean
  name: string
  group: string
  description: string
  npi: string
  contact: Contact
  timeZoneId: string
}

interface ApiAppointmentAvailability {
  specialist: Specialist
  availableSlots: AvailableSlots[]
  specialistTypeCode: number
  clinic: Clinic
}

interface StaffAppointmentAvailabilities {
  staffAppointmentAvailabilities: ApiAppointmentAvailability[]
}

interface AppointmentDate {
  date: Date
  day: string
  monthAndDay: string
}

interface Provider {
  id: number
  legalName: {
    firstName: string
    lastName: string
  }
  staffRoleCode: string
}

enum ProviderType {
  Psychiatrist = 1,
  Therapist = 2,
}

interface AppointmentAvailability {
  allSlotsByDay: SlotsByDay
  specialist: AppointmentSpecialist
  clinics: AppointmentClinic[]
  specialistTypeCode: ProviderType
}

type SlotsByDay = { [key: string]: AvailableSlots[] | undefined }

interface AppointmentSpecialist {
  id: number
  isTest?: boolean
  legalName: LegalName
  spokenLanguages?: string[]
  rating: number
}

interface LegalName {
  firstName: string
  middleName?: string
  lastName: string
  preferredName?: string
  title?: string
  suffix?: string
  honors?: string
}

interface AvailableSlots {
  type: string
  isPlusSlot: boolean
  startDate: string
  endDate: string
  duration: number
  servicesOffered: string[]
  teleState: string[]
  timeZoneId: string
}

interface AppointmentClinic {
  id: string
  name: string
  isTest?: boolean
  contact: ClinicContactDetails
  slotsByDay: SlotsByDay
  distanceInMiles?: number
}

interface ClinicContactDetails {
  email?: string
  phoneNumbers?: PhoneNumber[]
  addresses?: Address[]
}

type PhoneNumberType = 'Contact'

interface PhoneNumber {
  type: PhoneNumberType
  number?: string
  comment?: string
}

interface Address {
  street1: string
  street2?: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates?: {
    longitude: number
    latitude: number
  }
}

export type {
  TableData,
  ApiAppointmentAvailability,
  AppointmentAvailability,
  SlotsByDay,
  StaffAppointmentAvailabilities,
  AvailableSlots,
  AppointmentDate,
  Provider,
}
