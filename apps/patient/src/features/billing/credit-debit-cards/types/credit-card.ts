import { CreditCardType } from '@psychplus-v2/constants'
import { PatientAddress } from '@psychplus-v2/types'

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
