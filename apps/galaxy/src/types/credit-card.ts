import { CreditCardType } from '@/constants'
import { PatientAddress } from './address'

interface CreditCard {
  id: number
  patientId: number
  cardType: CreditCardType
  name: string
  numberLastFour: string
  isActive: boolean
  expireMonth: number
  expireYear: number
  billingAddress: PatientAddress
  cardKey: string
  cardStatus: string
  isPrimary: boolean
}

enum AllowedCards {
  Amex = 'amex',
  Discover = 'discover',
  AmericanExpress = 'AmericanExpress',
  Mastercard = 'mastercard',
  Visa = 'visa',
}

export { AllowedCards, type CreditCard }
