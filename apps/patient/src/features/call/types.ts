import { LegalName } from '@psychplus-v2/types'

interface AcsInfoPayload {
  staffEmail?: string
  appointmentId?: string
  shortUrlReference?: string
}
interface AcsInfo {
  externalId: string
  tokenExpiresAt: Date
  token: string
  staffName: LegalName
  staffId: number
  callSessionId: string
}

interface NotifyProviderPayload {
  staffEmail: string
  appointmentId?: string
  patientName: LegalName
  callSessionId: string
}

export type { AcsInfo, NotifyProviderPayload, AcsInfoPayload }
