import { Row } from '@tanstack/react-table'
import { Metadata, PhoneNumber, Taxonomy } from '@/types'

interface BillingHistory {
  visit: string
  dateTime: string
  location: string
  visitType: string
  provider: string
  coSigner: string
  primaryIns: string
  secondaryIns: string
  financial: string
  diagnosis: string
  cptCodes: string
  schedulingStatus: string
  verification: string
  billingStatus: string
  cmd: string
  sign: string
}

type BillingHistoryRow = Row<BillingHistory>

interface GetBillingHistoryData {
  billingHistories: BillingHistory[]
}

interface Contact {
  email: string
  emailVerificationStatus: string
  phoneNumbers: PhoneNumber[]
  addresses: []
  isMailingAddressSameAsPrimary: boolean
}

interface ClinicRaw {
  id: string
  metadata: Metadata
  isTest: boolean
  name: string
  group: string
  description: string
  npi: string
  contact: Contact
  taxonomy: Taxonomy[]
  distanceInMiles: number
  timeZoneId: string
}

interface GetClinicsResponse {
  data: SelectOptionType[]
}
interface SelectOptionType {
  label: string
  value: string
}

export type {
  BillingHistoryRow,
  GetBillingHistoryData,
  BillingHistory,
  ClinicRaw,
  SelectOptionType,
  GetClinicsResponse,
}
