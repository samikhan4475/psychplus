import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import type {
  Clinic,
  ClinicContactDetails,
  LegalName,
  Specialist,
} from '@psychplus-v2/types'

interface CurrentLocation {
  latitude: number
  longitude: number
}

type SlotsByDay = { [key: string]: AppointmentSlot[] | undefined }

interface AppointmentSlot {
  type: AppointmentType
  isPlusSlot: boolean
  duration: number
  startDate: string
  endDate: string
  servicesOffered: string[]
  startDateUtc?: string
  clinicId?: string
}

interface AppointmentSpecialist {
  id: number
  isTest?: boolean
  legalName: LegalName
  spokenLanguages?: string[]
  rating: number
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
}

interface AvailabilityApiResponse {
  availableSlots: {
    type: AppointmentType
    isPlusSlot: boolean
    duration: number
    startDate: string
    startDateUtc?: string
    endDate: string
    servicesOffered: string[]
  }[]
  specialist: Specialist
  clinic: Clinic
  specialistTypeCode: ProviderType
}

interface AppointmentsSearchApiResponse {
  staffAppointmentAvailabilities: AvailabilityApiResponse[]
}

export type {
  AppointmentSpecialist,
  CurrentLocation,
  AppointmentAvailability,
  SlotsByDay,
  AppointmentSlot,
  AppointmentClinic,
  AppointmentsSearchApiResponse,
}
