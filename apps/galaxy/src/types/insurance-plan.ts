import { Metadata } from './metadata'

interface InsurancePlan {
  id: string
  metadata?: Metadata
  name: string
  isActive: boolean
  isTest: boolean
  isPublicViewable: boolean
  payerType: string
  effectiveDate?: string
  payerId?: string
}

export type { InsurancePlan }
