import { ContactDetails } from './contact'
import { Metadata } from './metadata'
import { LegalName } from './name'

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
  servicePlace: string
  serviceOffered: string
  cityId: string
  stateId: string
  taxonomy: string
  isClaimAddress: boolean
  address1: string
  address2: string
  zipCode: string
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
  isServiceTimeDependent: boolean
  city: string
  state: string
  cosigner: Cosigner
  serviceUnits?: ServiceUnit[]
  serviceGroups?: ServiceGroup[]
}

export type { Service, Cosigner, ServiceGroup, ServiceUnit }
