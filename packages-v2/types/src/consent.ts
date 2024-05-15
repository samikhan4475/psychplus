import { PolicyType } from './document'

interface Consent {
  id: number
  patientId: number
  type: PolicyType
  signatureName: string
  guardianSignature: string
  issuanceDate: string
  signingDate: string
  latestIssuanceDate: string
  isNeedsNewSignature: boolean
}

export type { Consent }
