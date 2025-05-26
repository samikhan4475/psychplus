import { Metadata } from '@/types'

interface PracticeDetails {
  id: string
  practiceName: string
  npi?: string
  tin?: string
  taxonomyCode?: string
  clia?: string
  organization?: string
  phone?: string
  fax?: string
  primaryAddress?: string
  primaryAddress2?: string
  city?: string
  provider?: string
  state?: string
  zip?: string
  zipLast4?: string
  payAddress?: string
  status?: string
}

interface PracticesHistory {
  user?: string
  date?: string
  status?: string
}

interface Address {
  type: string
  street1: string
  street2: string
  city: string
  state: string
  country: string
  postalCode: string
  zipLast4?: string
  timeZoneId: string
}

interface Practice {
  id: string
  metadata: Metadata
  recordStatus: string
  practiceOrganizationType: string
  shortName: string
  displayName: string
  taxonomy: string
  socialSecurityNumber: string
  defaultClearinghouseReceiverId: string
  taxId: string
  practiceAddress: Address
  practicePaymentAddress: Address
  npi: string
  clia: string
  practicePhone: string
  practiceFax: string
  defaultProviderStaffId: number
  defaultProviderName: string
  practiceAddressId: string
  paymentAddressId: string
  organizationShortName: string
  organizationDisplayName: string
  organizationId: string
  staffuserId?: number
}

export type { PracticeDetails, PracticesHistory, Practice }
