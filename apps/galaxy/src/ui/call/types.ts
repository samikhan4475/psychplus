import { LegalName } from '@/types'

interface AcsInfo {
  externalId: string
  tokenExpiresAt: Date
  token: string
  staffName: LegalName
}

export { type AcsInfo }
