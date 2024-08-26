import type { Metadata } from '@psychplus/clinics/shared'

interface Location {
  id: string
  locationType: string
  locationName: string
  metadata?: Metadata
  npi: string
  taxonomy: string
  p_address_1: string
  p_address_2: string
  city: string
  state: string
  zip: string
  phone: string
  fax: string
  status: string
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


export type { Location,AuthorityCodeSets }
