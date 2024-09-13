type PatientAddressType = 'Home' | 'Mailing'

interface PatientAddress {
  type: PatientAddressType
  street1: string
  street2?: string
  city: string
  state: string
  country: string
  postalCode: string
  geoCoordinates?: {
    longitude: number
    latitude: number
  }
}
interface GeoCoordinates {
  longitude: number
  latitude: number
  altitude: number
}

interface ClinicAddress {
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

export type { PatientAddressType, PatientAddress, ClinicAddress }
