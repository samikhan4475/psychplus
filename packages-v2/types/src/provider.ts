import { LegalName } from '.'

interface Specialist {
  id: number
  isTest?: boolean
  legalName: LegalName
  spokenLanguages?: string[]
  hasPhoto?: boolean
}

export type { Specialist }
