import { ClinicAddress } from './address'
import { ContactDetails } from './contact'
import { Metadata } from './metadata'
import { LegalName } from './name'
import { VisitType } from './visit-type'

interface Cosigner {
  id: number
  metadata: Metadata
  isTest: boolean
  legalName: LegalName
  staffRoleCode: string
  contactInfo: ContactDetails
  spokenLanguages: string[]
  virtualRoomLink: string
  bio: string
  hasPhoto: boolean
  rating: number
  userId?: string
  isDefaultCosigner?: boolean
}

interface ServiceUnit {
  id: string
  metadata: Metadata
  locationId: string
  serviceId: string
  unit: string
  coSignerId: number
  resourceStatus: string
}

interface ServiceRoom {
  id: string
  metadata: Metadata
  locationId: string
  serviceId: string
  room: string
  coSignerId: number
  resourceStatus: string
}

interface ServiceGroup {
  id: string
  metadata: Metadata
  locationId: string
  serviceId: string
  group: string
  coSignerId: number
  resourceStatus: string
}

interface Service {
  id: string
  metadata: Metadata
  locationId: string
  locationName: string
  locationType: string
  servicePlace: string
  serviceOffered: string
  cityId: string
  stateId: string
  locationCityId: string
  locationStateId: string
  taxonomy: string
  isClaimAddress: boolean
  address: ClinicAddress
  locationAddress: ClinicAddress
  isPolicyRequired: boolean
  isReminderForNotes: boolean
  isReminderForVisit: boolean
  isPatientSeenEveryDay: boolean
  isAutomaticBilling: boolean
  ehrUsage: string
  coSignerType: string
  coSignerId: number
  maxBookingFrequencyInSlot: number
  isRequiresMedicalVisit: boolean
  primaryProviderType: string
  billingUsageType: string
  isServiceTimeDependent: boolean
  cosigner: Cosigner
  status: string
  serviceUnits?: ServiceUnit[]
  serviceRooms?: ServiceRoom[]
  serviceGroups?: ServiceGroup[]
  serviceVisitTypes?: VisitType[]
}

export type { Service, Cosigner, ServiceGroup, ServiceUnit, ServiceRoom }
