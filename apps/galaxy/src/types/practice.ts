import { PatientAddress } from './address'
import { UserResponse } from './auth'
import { Metadata } from './metadata'
import { StaffResource } from './staff'

interface Practice {
  id: string
  metadata?: Metadata
  shortName: string
  displayName: string
  recordStatus: string
  practiceOrganizationType: string
  socialSecurityNumber: string
  defaultClearinghouseReceiverId: string
  taxId: string
  taxonomy: string
  users?: StaffResource[]
}

interface PracticeResource {
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
  practiceAddress: Partial<PatientAddress>
  practicePaymentAddress: Partial<PatientAddress>
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
}

interface SelfPractice {
  id: string
  recordStatus: string
  practiceOrganizationType: string
  shortName: string
  displayName: string
  taxonomy: string
  users: UserResponse[]
}

export type { Practice, SelfPractice, PracticeResource }
