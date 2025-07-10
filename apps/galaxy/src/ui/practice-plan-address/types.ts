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
  postalPlus4Code: string
  geoCoordinates: GeoCoordinates
  timeZoneId: string
}

interface PracticePlanAddress {
  id: string
  metadata: Metadata
  recordStatus: string
  address: Partial<Address>
  cityId: string
  stateId: string
  isDefaultLocation: boolean
}

interface PracticePlanAddressParams {
  practicePlanId: string
  recordStatuses: string[]
  networkStatus: string
  payerName: string
  planStatus: boolean
  insurancePlanName: string
  effectiveDate: string
  fromDate: string
  toDate: string
}

export { type PracticePlanAddress, type PracticePlanAddressParams }
