import { Clinic, ContactDetails } from '@/types'

type Specialist = {
  id: number
  metadata: {
    createdOn: string
  }
  isTest: boolean
  legalName: {
    firstName: string
    lastName: string
    honors?: string
  }
  staffRoleCode: string
  contactInfo: ContactDetails
  spokenLanguages: string[]
  hasPhoto: boolean
  rating: number
}

type AvailableSlot = {
  type: string
  isPlusSlot: boolean
  startDate: string
  endDate: string
  duration: number
  servicesOffered: string[]
  teleState: string[]
}

type StaffAppointmentAvailability = {
  type?: string
  appointmentType?: string
  specialist: Specialist
  specialistTypeCode: number
  clinic: Clinic
  availableSlots: AvailableSlot[]
}

type StaffAppointmentAvailabilityResponse = {
  staffAppointmentAvailabilities: StaffAppointmentAvailability[]
}

export type {
  StaffAppointmentAvailabilityResponse,
  StaffAppointmentAvailability,
}
