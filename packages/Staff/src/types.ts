import { Contact, LegalName, Metadata } from '../../shared/types'

interface Staff {
  id: number
  metadata?: Metadata
  isTest?: boolean
  legalName: LegalName
  staffRoleCode: string
  contactInfo?: Contact
  spokenLanguages?: string[]
  virtualRoomLink?: string
}

type StaffRequest = {
  staffIds?: number[]
  clinicIds?: number[]
  name?: string
  npi?: string
  roleCodes?: string[]
  spokenLanguage?: string
}

export type { Staff, StaffRequest }
