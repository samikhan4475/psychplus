import { LegalName } from '@psychplus-v2/types'

interface AcsInfo {
  externalId: string
  tokenExpiresAt: Date
  token: string
  staffName: LegalName
}

export type { AcsInfo }
