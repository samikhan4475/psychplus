import { VisitMediumEnum } from '@/enum'
import { Clinic, PatientAddress } from '@/types'
import { Specialist } from '../types'

enum ProviderType {
  Psychiatrist = 1,
  Therapist = 2,
}

interface AvailabilityApiResponse {
  availableSlots: {
    type: VisitMediumEnum
    isPlusSlot: boolean
    duration: number
    startDate: string
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

type SlotsByDay = { [key: string]: AvailableSlots[] | undefined }

type PhoneNumberType = 'Contact' | 'Home' | 'Business'

interface PhoneNumber {
  type: PhoneNumberType
  number?: string
  extension?: string
  comment?: string
}

interface ClinicContactDetails {
  email?: string
  phoneNumbers?: PhoneNumber[]
  addresses?: PatientAddress[]
}

interface AppointmentAvailability {
  allSlotsByDay: SlotsByDay
  specialist: AppointmentSpecialist
  clinic: AppointmentClinic
  clinics: AppointmentClinic[]
  specialistTypeCode: ProviderType
}

interface AppointmentSpecialist {
  id: number
  isTest?: boolean
  legalName: LegalName
  spokenLanguages?: string[]
  rating?: number
  timeZonePreference?: string
}

interface AppointmentClinic {
  id: string
  name: string
  isTest?: boolean
  contact: ClinicContactDetails
  slotsByDay: SlotsByDay
  distanceInMiles?: number
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

interface AppointmentDate {
  date: Date
  day: string
  monthAndDay: string
}

export type {
  AvailabilityApiResponse,
  AppointmentsSearchApiResponse,
  AppointmentAvailability,
  AppointmentClinic,
  SlotsByDay,
  AppointmentDate,
}
