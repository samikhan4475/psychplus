import type { Metadata } from '@/types'

interface PolicyConsentRaw {
  id: number
  metadata: Metadata
}

type StatusType = 'yes' | 'no' | 'pending'

interface PolicyConsents {
  policyDescription: string
  policyType: string
  organizationPractice: string
  issuanceDate: string
  signingDate: string
  status: StatusType
}

interface GetPolicyConsentsData {
  consents: PolicyConsents[]
}

export type {
  PolicyConsents,
  PolicyConsentRaw,
  GetPolicyConsentsData,
  StatusType,
}
