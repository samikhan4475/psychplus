export enum PhoneNumberEnum {
  CONTACT = 'Contact',
  HOME = 'Home',
  BUSINESS = 'Business',
  WORK = 'Work',
  MOBILE = 'Mobile',
}

interface PhoneNumber {
  type: PhoneNumberEnum
  number?: string
  extension?: string
  comment?: string
}

export type { PhoneNumber }
