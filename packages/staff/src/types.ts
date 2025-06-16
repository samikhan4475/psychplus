import { Contact, LegalName, Metadata } from './shared'

interface Staff {
  id: number
  metadata?: Metadata
  isTest?: boolean
  legalName: LegalName
  staffRoleCode: string
  contactInfo?: Contact
  spokenLanguages?: string[]
  virtualRoomLink?: string
  rating?: number
}

type StaffPayload = {
  staffIds?: number[]
  clinicIds?: number[]
  name?: string
  npi?: string
  roleCodes?: string[]
  spokenLanguage?: string
}

type StaffRatingPayload = {
  appointmentId: number
  rating: number
  staffId: number
  comment?: string
}

export type { Staff, StaffPayload, StaffRatingPayload }
