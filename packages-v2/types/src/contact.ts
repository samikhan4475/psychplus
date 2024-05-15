import { Address, PatientAddress } from './address'
import { PhoneNumber } from './phone'

interface ContactDetails {
  email: string
  phoneNumbers?: PhoneNumber[]
  addresses?: PatientAddress[]
}

interface ClinicContactDetails {
  phoneNumbers?: PhoneNumber[]
  addresses?: Address[]
}

export type { ContactDetails, ClinicContactDetails }
