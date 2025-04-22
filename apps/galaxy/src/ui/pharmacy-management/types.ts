import { Row } from '@tanstack/react-table'
import { ContactDetails, Metadata } from '@/types'

interface Pharmacy {
  metadata?: Metadata
  email: string
  pharmacyId: string
  resourceStatus: string
  serviceLevel: string[]
  enabledDate: string
  enabledFrom: string
  npi: string
  ncpdpId: string
  healthIdentificationNumber: string
  pharmacyOrganizationId: string
  name: string
  contactDetails: ContactDetails
  lastUsed: string
  isPreferred: false
  id?: string
}

type PharmacyRow = Row<Pharmacy>

interface GetPharmacyData {
  currentPharmacies: Pharmacy[]
}
interface GetPharmacyResponse {
  pharmacies: Pharmacy[]
  total: number
}
interface PharmacyParams {
  isOnlyDefaults?: boolean
}

export type {
  GetPharmacyData,
  Pharmacy,
  PharmacyParams,
  PharmacyRow,
  GetPharmacyResponse,
}
