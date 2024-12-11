import { Metadata } from '@/types'

interface GeoCoordinates {
  longitude: number
  latitude: number
  altitude: number
}

interface Address {
  type: string
  street1: string
  street2: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates: GeoCoordinates
  timeZoneId: string
}

interface PhoneOrFax {
  type: string
  number: string
  extension: string
  comment: string
}

interface Location {
  id: string
  metadata: Metadata
  recordStatus: string
  locationNameGenerated: string
  locationType: string
  name: string
  npi: string
  phone: PhoneOrFax
  fax: PhoneOrFax
  isTestLocation: boolean
  address: Address
  cityId: string
  stateId: string
  addressMapLink: string
  locationSeqNumber: number
  isDefault: boolean
  timeZoneId: string
}
interface StaffLocation {
  id: string
  staffId: string
  externalProviderId: string
  metadata: Metadata
  recordStatus: string
  locationId: string
  defaultLocation: boolean
  location: Location
}

interface PrescriberDirectoryResponse {
  isSuccessful: boolean
  statusCode: string
  content: string
  statusDescription: string
}
interface GetStaffLocationListResponse {
  staffLocations: StaffLocation[]
  total: number
}

export {
  type Location,
  type StaffLocation,
  type GetStaffLocationListResponse,
  type PrescriberDirectoryResponse,
}
