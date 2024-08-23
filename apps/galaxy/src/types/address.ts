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

export type { PatientAddressType, PatientAddress }
