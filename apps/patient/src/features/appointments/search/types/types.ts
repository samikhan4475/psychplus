import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import type { ClinicContactDetails, LegalName } from '@psychplus-v2/types'

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

export type {
  AppointmentSpecialist,
  CurrentLocation,
  AppointmentAvailability,
  SlotsByDay,
  AppointmentSlot,
  AppointmentClinic,
}
