import { ContactDetails } from './contact'
import { Metadata } from './metadata'
import { Taxonomy } from './taxonomy'

interface Clinic {
  id: string
  isTest: boolean
  name: string
  group: string
  description: string
  npi: string
  contact: ContactDetails
  taxonomy: Taxonomy[]
  distanceInMiles: number
  timeZoneId: string
}

interface ClinicRaw {
  id: string
  metadata: Metadata
  isTest: boolean
  name: string
  group: string
  description: string
  npi: string
  contact: ContactDetails
  taxonomy: Taxonomy[]
  distanceInMiles: number
  timeZoneId: string
}

export type { ClinicRaw, Clinic }
