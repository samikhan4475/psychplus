import { ContactDetails } from './contact'
import { Metadata } from './metadata'
import { LegalName } from './name'
import { Organization } from './organization'
import { Practice } from './practice'
import { Role } from './roles'

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
  status?: string
  staffSpecialistIds?: string[]
  staffUserRoleIds?: string[]
  practiceIds?: string[]
  userRoles?: Role[]
  npi?: string
  organizationIds?: string[]
  staffOrganizations?: Organization[]
  staffTypes?: string[]
  staffPractice?: Practice[]
  userRoleCode?: string
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

interface UserSelfInitialInformation {
  userId: number
  userName: string
  userFullName: LegalName
  inboxTotalCount: number
  userRoles: string[]
  isTestUser: boolean
  isUserHasProfileImage: boolean
  staffId: number
  staffRoleId: number
}

export type {
  StaffResource,
  Provider,
  StaffTopBarInfoResponse,
  UserSelfInitialInformation,
}
export { STAFF_COMMENT_STATUS }
