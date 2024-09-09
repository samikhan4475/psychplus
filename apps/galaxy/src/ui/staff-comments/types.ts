import { ContactDetails, LegalName, Metadata } from '@/types'

interface StaffComment {
  data_time: string
  staff: string
  organization: string
  comments: string
}

interface GetCommentsData {
  comments: StaffComment[]
}
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

interface SelectOptionType {
  label: string
  value: string
}

export type { StaffComment, GetCommentsData, StaffResource, SelectOptionType }
