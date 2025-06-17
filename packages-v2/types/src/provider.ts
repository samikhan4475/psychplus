import { ContactDetails, LegalName } from '.'

interface Specialist {
  id: number
  isTest?: boolean
  legalName: LegalName
  spokenLanguages?: string[]
  hasPhoto?: boolean
  rating?: number
  contactInfo?: ContactDetails
}

export type { Specialist }
