import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import type {
  Address,
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

interface ProviderAddress extends Address {
  type: 'Business' | 'Mailing'
}
interface AppointmentContactDetails {
  addresses: ProviderAddress[]
  email: string
}

interface AppointmentSpecialist {
  id: number
  isTest?: boolean
  legalName: LegalName
  spokenLanguages?: string[]
  rating: number
  contactInfo?: AppointmentContactDetails
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
  providerType: ProviderType
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
  providerState: string
  onConfirm?: () => void
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
}
