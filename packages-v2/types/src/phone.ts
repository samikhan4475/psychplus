type PhoneNumberType = 'Contact'

interface PhoneNumber {
  type: PhoneNumberType
  number?: string
  comment?: string
}

export type { PhoneNumber }
