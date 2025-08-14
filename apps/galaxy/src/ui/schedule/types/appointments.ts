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

interface TransformedAppointment {
  appointmentId: number
  patientId: number
  stateCode: string
  locationId: string
  serviceId: string
  providerType: string
  encounterType: string
  visitSequenceType: string
  type: string
  isFollowup: boolean
  isPrimaryProviderType: boolean
  specialistStaffId: number
  startDate: string
  durationMinutes: number
  visitFrequency?: string
  isOverridePermissionProvided: boolean
  isProceedPermissionProvided: boolean
  appointmentStatus: string
  noRebookReason?: string
  unitId?: string
  groupId?: string
  roomId?: string
  admissionLegalStatus: string
  insuranceVerificationStatusCode: string
  admissionId?: string
  paymentResponsibilityTypeCode: string
  dischargeDate?: string
  dischargeLocation?: string
  isEdVisit?: boolean
  admissionDate?: string
  authorizationNumber: string
  authorizationDate: string
  lastAuthorizationCoveredDate: string
  groupTherapyTypeCode: string
}

type StaffAppointmentAvailabilityResponse = {
  staffAppointmentAvailabilities: StaffAppointmentAvailability[]
}

interface AlertState {
  message: string
  status?: number
  open: boolean
}

interface UpdateVisitAlertProps {
  state: AlertState
  onConfirm: (confirmed: boolean, status?: number) => void
}

export type {
  StaffAppointmentAvailabilityResponse,
  StaffAppointmentAvailability,
  TransformedAppointment,
  UpdateVisitAlertProps,
  AlertState,
}
