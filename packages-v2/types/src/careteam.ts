import { ProviderType } from '@psychplus-v2/constants'
import type { ContactDetails, LegalName, Metadata } from '@psychplus-v2/types'

interface CareTeamMember {
  id: number
  metadata: Metadata
  specialist: string
  staffDetails: {
    id: number
    metadata: Metadata
    legalName: LegalName
    staffRoleCode: ProviderType
    contactInfo: ContactDetails
    spokenLanguages?: string[]
    virtualRoomLink?: string
    bio?: string
    hasPhoto?: boolean
  }
}

export type { CareTeamMember }
