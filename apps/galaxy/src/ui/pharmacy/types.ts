import { Row } from '@tanstack/react-table'
import { ContactDetails, Metadata } from '@/types'

interface Pharmacy {
  id: string
  metadata?: Metadata
  name?: string
  pharmacyId: string
  pharmacyName: string
  pharmacyContactDetails: ContactDetails
  ncpdpId?: string
  lastUsed: string
  isPreferred: boolean
  isFavorite: boolean
  patientId: string
  externalPharmacyId: string
  contactDetails: ContactDetails
}
interface PharmacyFilter {
  id?: string
  metadata?: Metadata
  name?: string
  pharmacyOrganizationId?: string
  ncpdpId?: string
  directorySpecialistName?: string
  serviceLevel?: string[]
  contactDetails?: ContactDetails
  enabledDateFrom?: string
  enabledDateTo?: string
  resourceStatus?: string
}

type PharmacyRow = Row<Pharmacy>

interface GetPharmacyData {
  currentPharmacies: Pharmacy[]
}
interface PharmacyParams {
  isOnlyDefaults?: boolean
  recordStatuses?: string[]
  patientIds?: string[]
}
interface PharmacySearchParams {
  organizationName?: string
  address1?: string
  city?: string
  state?: string
  zip?: string
  zipLast4?: string
  phone?: string
}

export type {
  GetPharmacyData,
  Pharmacy,
  PharmacyParams,
  PharmacyRow,
  PharmacySearchParams,
  PharmacyFilter,
}
