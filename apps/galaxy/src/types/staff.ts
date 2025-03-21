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
  avatar?: string
  userId?: string
  practiceIds?: string[]
}

enum STAFF_COMMENT_STATUS {
  Active = 'Active',
  Deleted = 'Deleted',
}

interface Provider {
  id?: string
  avatar?: string
  firstName: string
  lastName: string
  honors?: string
}

interface StaffTopBarInfoResponse {
  userId: number
  userName: string
  userFullName: LegalName
  inboxTotalCount: number
}

export type { StaffResource, Provider, StaffTopBarInfoResponse }
export { STAFF_COMMENT_STATUS }
