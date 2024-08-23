import { PatientAddress } from './address'
import { PhoneNumber } from './phone'

interface ContactDetails {
  email: string
  phoneNumbers: PhoneNumber[]
  addresses: PatientAddress[]
}

export type { ContactDetails }
