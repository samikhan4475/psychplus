import { Metadata } from './metadata'

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
}

export type { Practice }
