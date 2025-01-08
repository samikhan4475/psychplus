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
  isTestLocation: boolean
  address: ClinicAddress
  cityId: string
  stateId: string
}

interface LocationSearchParams {
  isIncludeMetadataResourceChangeControl: boolean
  isIncludeMetadataResourceIds: boolean
  isIncludeMetadataResourceStatus: boolean
  id: string
  locationNameGenerated: string
  locationName: string
  locationType: string
  cityId: string
  cityName: string
  stateId: string[]
  stateCode: string
  stateName: string
  zip: string
  npi: string
  phone: string
  recordStatuses: string[]
  isIncludeTestLocations: boolean
}


export type { Location, LocationSearchParams }
