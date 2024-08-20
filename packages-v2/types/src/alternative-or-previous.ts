import { Address } from './address'

interface AlternateOrPreviousName {
  firstName?: string
  honors?: string
  lastName?: string
  middleName?: string
  suffix?: string
  title?: string
}

interface AlternateOrPreviousContactDetails {
  addresses: Address[]
}

export type { AlternateOrPreviousName, AlternateOrPreviousContactDetails }
