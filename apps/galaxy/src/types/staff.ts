import { ContactDetails } from './contact'
import { Metadata } from './metadata'
import { LegalName } from './name'

interface StaffResource {
  id: string
  metadata: Metadata
  isTest: boolean
  legalName: LegalName
  staffRoleCode: string
  contactInfo: ContactDetails
  spokenLanguages: string[]
  virtualRoomLink: string
  bio: string
  hasPhoto: boolean
  rating: number
}

enum STAFF_COMMENT_STATUS {
  Active = 'Active',
  Deleted = 'Deleted',
}

export type { StaffResource }
export { STAFF_COMMENT_STATUS }
