import { Path } from 'react-hook-form'
import { Encounter, SelectOptionType, StaffResource } from '@/types'
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

export { CosignerType, Services, type Question, type ServicePayload }
