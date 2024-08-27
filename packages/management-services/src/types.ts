import type { Metadata } from '@psychplus/clinics/shared'

interface Address {
  address1: string
  address2: string
  city: string
  state: string
  zip: number
}

interface Reminders {
  provNotes: string
  ptVisit: string
}

interface Service {
  id: string
  locationType: string
  locationName: string
  service: string
  pos: number
  address: Address
  psychplusPolicy: string
  reminders: Reminders
  ehrCode: number
  cosignerType: string
  cosigner: string
  primaryProvider: string
  visitType: string
  status: string
  metadata?: Metadata
}

interface AuthorityCodeSets {
  codeSystemName: string
  displayName: string
  codes: Code[]
}

interface Code {
  code: string
  displayName: string
  groupingCode?: string
  codeAttributes?: CodeAttribute[]
}

interface CodeAttribute {
  name: string
  content: string
}

export type { Service, AuthorityCodeSets }
