import {
  AppointmentType,
  NewProviderType,
  ProviderType,
} from '@psychplus-v2/constants'
import { Address } from './address'
import type { Clinic } from './clinic'
import { ClinicContactDetails, ContactDetails } from './contact'
import { LegalName } from './name'
import type { Specialist } from './provider'

interface Appointment {
  id: number
  status: string
  type: AppointmentType
  encounterNumber: string
  encounterTypeCode: number
  clinic: Clinic
  specialist: Specialist
  specialistTypeCode: ProviderType
  providerType: NewProviderType
  visitType?: string
  startDate: string
  endDate: string
  duration: number
  coPay: number
  coPayDue?: number
  coPayPaid?: number
  virtualRoomLink: string
  isCopayPaid: boolean
  isSelfPay: boolean
  serviceId: string
  isQuickNoteSigned: boolean
  cptAddonCodes: CptCode[]
}

interface CptCode {
  code: string
  display?: string
  isDefault?: boolean
  isDisabled?: boolean
}

interface AppointmentMinimalDetails {
  status: string
  type: AppointmentType
  specialistTypeCode: ProviderType
  locationId: string
  locationName: string
  locationAddress: Address
  physicianName: LegalName
  startDate: string
  endDate: string
  duration: number
  isCopayPaid: boolean
  isPatientHadAnyCheckedOutVisit: boolean
  isNoteSignedByProviderInLastYear: boolean
  isPatientNeedsToAddCreditCard: boolean
  isPatientNeedsToAcceptPolicies: boolean
}

interface AppointmentSlot {
  type: AppointmentType
  isPlusSlot: boolean
  duration: number
  startDate: string
  endDate: string
  servicesOffered: string[]
  startDateUtc?: string
  clinicId?: string
  locationId?:string
}

interface AppointmentSpecialist {
  id: number
  isTest?: boolean
  legalName: LegalName
  spokenLanguages?: string[]
  rating?: number
  hasPhoto?: boolean
  contactInfo?: ContactDetails
}

interface AppointmentClinic {
  id: string
  name: string
  isTest?: boolean
  contact: ClinicContactDetails
  slotsByDay: SlotsByDay
  distanceInMiles?: number
}
interface AppointmentAvailability {
  allSlotsByDay: SlotsByDay
  specialist: AppointmentSpecialist
  clinics: AppointmentClinic[]
  specialistTypeCode: ProviderType
  providerType: string | null
}

type SlotsByDay = { [key: string]: AppointmentSlot[] | undefined }

type GeoCoordinates = {
  latitude: number
  longitude: number
}

interface Location {
  locationId: string
  serviceId: string
  locationName: string
  locationAddress: Address
  distanceInMiles?: number
}

interface LocationProvider {
  staffId: number
  name: LegalName
  averageRating?: number
  spokenLanguages: string[]
  hasPhoto?: boolean
  hasProfilePicture?: boolean
  clinic?: Clinic
  specialist?: Specialist
  SlotsByDay?: SlotsByDay | null
  providerType?: string
  specialistCode?: string
}

interface LocationProviders {
  location: Location
  providers: LocationProvider[]
}

interface LocationsProvidersApiResponse {
  locationsProviders: LocationProviders[]
  total: number
}

interface SearchLocationsProvidersParams {
  appointmentType?: AppointmentType
  providerType?: string
  serviceOffered?: string
  postalCode?: string
  stateCodes?: string[]
  maxDistance?: number
  limit?: number
  offset?: number
}

interface LocationProvidersFilterState {
  appointmentType: AppointmentType
  providerType: ProviderType
  startingDate: string
  zipCode?: string
  location?: GeoCoordinates
  state?: string
  maxDistanceInMiles?: string
  stateCode?: string
}

interface SearhStaffAvailabilityPayload {
  appointmentType: AppointmentType
  serviceOffered: string
  staffId: number
  startDate: string
  locationId?: string
  maxLookoutDays?: number
  maxRepeatOnNoneAvailable?: number
}

interface StaffAppointmentAvailabilityResponse {
  durationMinutes: number
  startDate: string
  endDate: string
  isPlusSlot: boolean
  serviceId: string
  type: AppointmentType
}

interface TransformStaffAvailabilityParams {
  response: StaffAppointmentAvailabilityResponse[]
  clinicId: string
  timeZone?: string
}

export type {
  Appointment,
  CptCode,
  AppointmentMinimalDetails,
  GeoCoordinates,
  LocationsProvidersApiResponse,
  LocationProvider,
  LocationProviders,
  AppointmentAvailability,
  SearchLocationsProvidersParams,
  AppointmentClinic,
  Location,
  LocationProvidersFilterState,
  SearhStaffAvailabilityPayload,
  StaffAppointmentAvailabilityResponse,
  TransformStaffAvailabilityParams,
  AppointmentSlot,
  SlotsByDay,
}
