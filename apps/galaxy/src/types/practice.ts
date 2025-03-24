import { UserResponse } from './auth'
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

interface SelfPractice {
  id: string
  recordStatus: string
  practiceOrganizationType: string
  shortName: string
  displayName: string
  taxonomy: string
  users: UserResponse[]
}

export type { Practice, SelfPractice }
