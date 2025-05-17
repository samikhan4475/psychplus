type PatientAddressType = 'Home' | 'Mailing'

interface Address {
  street1: string
  street2?: string
  city: string
  state?: string
  country?: string
  postalCode: string
  zipLast4?: string
  type?: string
  geoCoordinates?: {
    longitude: number
    latitude: number
    altitude: number
  }
  timeZoneId?: string
}

interface PatientAddress extends Address {
  type: PatientAddressType
}

export type { Address, PatientAddressType, PatientAddress }
