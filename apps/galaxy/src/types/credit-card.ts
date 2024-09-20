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
  isPrimary: boolean
}

export type { CreditCard }
