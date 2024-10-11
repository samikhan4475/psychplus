type PhoneNumberType = 'Contact' | 'Home' | 'Business'

interface PhoneNumber {
  type: PhoneNumberType
  number: string
  extension?: string
  comment?: string
}

export type { PhoneNumber,PhoneNumberType }
