import { LegalName } from '.'

interface Specialist {
  id: number
  isTest?: boolean
  legalName: LegalName
  spokenLanguages?: string[]
  hasPhoto?: boolean
  rating: number
}

export type { Specialist }
