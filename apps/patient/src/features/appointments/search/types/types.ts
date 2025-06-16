import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import type {
  Clinic,
  ClinicContactDetails,
  ContactDetails,
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

interface DifferentStateDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onClose: (open: boolean) => void
  myState: string
  clinic: Clinic | undefined
  onConfirm?: () => void
}
interface CurrentBookingAppointmentData {
  appointmentId?: string
  appointmentType: AppointmentType
  providerType: ProviderType
  newProviderType: string
  slot: AppointmentSlot
  specialist: AppointmentSpecialist
  clinic: {
    id: string
    name: string
    isTest: boolean
    contact: ClinicContactDetails
    distanceInMiles?: number
  }
}
export type {
  AppointmentSpecialist,
  CurrentLocation,
  AppointmentAvailability,
  SlotsByDay,
  AppointmentSlot,
  AppointmentClinic,
  AppointmentsSearchApiResponse,
  DifferentStateDialogProps,
  CurrentBookingAppointmentData,
}
