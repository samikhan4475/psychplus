import { ClinicAddress } from './address'
import { Metadata } from './metadata'
import { PhoneNumber } from './phone'
import { Practice } from './practice'

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
  locationGoogleLink?: string
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
  postalPlus4Code?: string
  npi: string
  phone: string
  recordStatuses: string[]
  isIncludeTestLocations: boolean
}

interface LocationPractice {
  id: string
  metadata: Metadata
  recordStatus: string
  practiceId: string
  locationId: string
  practiceType: string
  isPrimaryPractice: boolean
  isOverRideExistingPrimary: boolean
  practice: Practice
  location: Location
}

export type { Location, LocationSearchParams, LocationPractice }
