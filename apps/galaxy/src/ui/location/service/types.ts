import { Path } from 'react-hook-form'
import { Encounter, Metadata, SelectOptionType, StaffResource } from '@/types'
import { ServiceSchemaType } from './add-service-dialog'

interface Question {
  label: string
  name: Path<ServiceSchemaType>
  options: SelectOptionType[]
  disabled?: boolean
  locationType?: string
}

enum CosignerType {
  Location = 'Location',
}

enum Services {
  Psychiatry = 'Psychiatry',
  Therapy = 'Therapy',
  CouplesFamilyTherapy = 'CouplesFamilyTherapy',
  GroupTherapy = 'GroupTherapy',
}

enum PrimayProviderType {
  PMNR = 'Pmnr',
  Psychiatrist = 'Psychiatrist',
  InternalMedicine = 'InternalMedicine',
  FamilyMedicine = 'FamilyMedicine',
}

interface ServicePayload {
  locationId: string
  locationName: string
  servicePlace?: string
  serviceOffered: string
  cityId?: string
  stateId?: string
  taxonomy?: string
  isClaimAddress: boolean
  isPolicyRequired: boolean
  isReminderForNotes: boolean
  isReminderForVisit: boolean
  isPatientSeenEveryDay: boolean
  isAutomaticBilling: boolean
  billingUsageType: string
  coSignerType: string
  coSignerId?: string
  maxBookingFrequencyInSlot: number
  isRequiresMedicalVisit: boolean
  primaryProviderType?: string
  address1?: string
  address2?: string
  zipCode?: string
  city?: string
  state?: string
  cosigner?: StaffResource
  serviceVisitTypes: Partial<Encounter>[]
  locationType: string
  isServiceTimeDependent: boolean
}
interface LocationService {
  id: number
  locationType: string
  locationName: string
  service: string
  pos: number
  meta?: Metadata
  taxonomy: string
  primaryAddress1: string
  address2?: string
  city: string
  state: string
  zip: string
  psychPlusPolicy?: string
  reminder?: string
  provNotes: string
  ptVisits: string
  ehrCode?: string
  maxBookingFrequency?: number
  cosignerType?: string
  cosigner: string
  primaryProvider?: string
  status: string
}

export {
  CosignerType,
  Services,
  PrimayProviderType,
  type LocationService,
  type Question,
  type ServicePayload,
}
