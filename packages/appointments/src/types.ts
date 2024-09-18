import { Clinic } from '../../clinics/src/types'
import { Staff } from '../../staff/src/types'

interface StaffAppointmentAvailabilities {
  staffAppointmentAvailabilities: StaffAppointmentAvailabilty[]
}
interface Slot {
  type: string
  isPlusSlot: boolean
  startDate: string
  endDate: string
  duration: number
  servicesOffered: string[]
}

interface StaffAppointmentAvailabilty {
  specialist: Staff
  specialistTypeCode: number
  clinic: Clinic
  availableSlots: Slot[]
}

type AppointmentAvailabilityPayload = {
  staffIds?: number[]
  clinicIds?: number[]
  specialistTypeCode?: number
  currentLocation?: {
    longitude?: number
    latitude?: number
    altitude?: number
  }
  postalCode?: string
  type?: string
  startingDate?: string
  maxDaysOutToLook?: number
  specificDay?: string
  state?: string
}

type BookAppointmentPayload = {
  locationId: number
  specialistStaffId: number
  specialistTypeCode: number
  type: string
  startDate: string
  duration: number
  isFollowup: boolean
  serviceId?: string
}

type MetaData = {
  createdOn: string
  createdBy: number
  createdByFullName?: string
  updatedOn: string
  updatedBy: number
  updatedByFullName?: string
  deletedOn?: string
  deletedBy?: number
  deletedByFullName?: string
}

type Card = {
  id?: number
  metadata?: MetaData
  patientId: number
  cardType: string
  name: string
  numberLastFour: string
  isActive: boolean
  isPrimary?: boolean
  expireMonth: number
  expireYear: number
  billingAddress?: {
    type: string
    street1: string
    street2?: string
    city: string
    state: string
    country: string
    postalCode: string
    geoCoordinates?: {
      longitude: number
      latitude: number
      altitude: number
    }
  }
  cardKey: string
}

type Cards = Card[]

type InsurancePlan = {
  id: string
  metadata: MetaData
  name: string
  isActive: boolean
  isTest: boolean
  isPublicViewable: boolean
  payerType: string
  effectiveDate: string
}

type InsurancePlans = InsurancePlan[]

type InsurancePayer = {
  id: string
  metadata: MetaData
  name: string
  plans: InsurancePlan[]
}

type InsurancePayers = InsurancePayer[]

export enum InsurancePolicyPriority {
  PRIMARY = 'Primary',
  SECONDARY = 'Secondary',
  TERTIARY = 'Tertiary',
  OTHER = 'Other',
}

export enum CardSide {
  FRONT = 'Front',
  BACK = 'Back',
}

type PatientPolicy = {
  id?: string
  metadata?: MetaData
  insurancePlanId: string
  memberId: string
  policyName?: string
  groupNumber: string
  effectiveDate: string
  terminationDate?: string
  insurancePolicyPriority: InsurancePolicyPriority
  hasCardFrontImage: boolean
  hasCardBackImage: boolean
  isActive: boolean
  isPatientPolicyHolder: boolean
  policyHolderName?: {
    firstName: string
    lastName: string
  }
  policyHolderDateOfBirth?: string
  policyHolderGender?: string
}

type PolicyCardRequest = {
  policyId: string
  cardSide: CardSide
  image: File
}

type UpcomingAppointmentsPayload = {
  maxFutureDays: number
}

type Appointment = {
  id: number
  metadata: MetaData
  status: string
  type: string
  encounterNumber: string
  encounterTypeCode: number
  clinic: Clinic
  specialist: Staff
  specialistTypeCode: number
  startDate: string
  endDate: string
  duration: number
  coPay: number
  virtualRoomLink: string
}

interface UpcomingAppointments {
  appointments: Appointment[]
}

export type {
  StaffAppointmentAvailabilities,
  StaffAppointmentAvailabilty,
  AppointmentAvailabilityPayload,
  Slot,
  BookAppointmentPayload,
  Card,
  Cards,
  InsurancePayer,
  InsurancePayers,
  InsurancePlan,
  InsurancePlans,
  PatientPolicy,
  PolicyCardRequest,
  UpcomingAppointmentsPayload,
  UpcomingAppointments,
  Appointment,
}
