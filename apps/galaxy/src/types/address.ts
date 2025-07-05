type PatientAddressType = 'Home' | 'Business' | 'Mailing' | 'Billing'

interface PatientAddress {
  type: PatientAddressType
  street1: string
  street2?: string
  city: string
  state: string
  country?: string
  postalCode: string
  postalPlus4Code?: string
  zipLast4?: string
  geoCoordinates?: {
    longitude: number
    latitude: number
    altitude?: number
  }
  zipLast4?:string
  timeZoneId?: string
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
  postalPlus4Code: string
  geoCoordinates: GeoCoordinates
  timeZoneId: string
}

export type { PatientAddressType, PatientAddress, ClinicAddress }
