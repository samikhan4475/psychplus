type PatientAddressType = 'Home' | 'Mailing'

interface PatientAddress {
  type: PatientAddressType
  street1: string
  street2?: string
  city: string
  state: string
  country: string
  postalCode: string
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
