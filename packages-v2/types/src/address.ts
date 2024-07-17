type PatientAddressType = 'Home' | 'Mailing'

interface Address {
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

interface PatientAddress extends Address {
  type: PatientAddressType
}

export type { Address, PatientAddressType, PatientAddress }
