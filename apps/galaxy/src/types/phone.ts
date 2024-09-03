type PhoneNumberType = 'Contact' | 'Home' | 'Business'

interface PhoneNumber {
  type: PhoneNumberType
  number: string
}

export type { PhoneNumber }
