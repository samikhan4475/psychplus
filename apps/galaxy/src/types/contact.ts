import { PatientAddress } from './address'
import { PhoneNumber } from './phone'

interface ContactDetails {
  email: string
  phoneNumbers: PhoneNumber[]
  addresses: PatientAddress[]
  isMailingAddressSameAsPrimary?: boolean
  relationship?: string
  contact?: Partial<ContactDetails>
}

export type { ContactDetails }
