import { ClinicAddress } from './address'
import { Metadata } from './metadata'
import { PhoneNumber } from './phone'

interface Location {
  id: string
  metadata: Metadata
  recordStatus: string
  locationNameGenerated: string
  locationType: string
  name: string
  npi: string
  phone: PhoneNumber
  fax: {
    type: string
    number: string
  }
  isTestLocation: false
  address: ClinicAddress
  cityId: string
  stateId: string
}

export type { Location }
