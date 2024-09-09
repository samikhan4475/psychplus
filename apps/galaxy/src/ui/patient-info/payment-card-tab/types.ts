import { type Row } from '@tanstack/react-table'
import { CreditCardType } from '@/constants'
import { PatientAddress } from '@/types'

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

interface GetPatientCardsResponse {
  data: CreditCard[]
}

type CardRow = Row<CreditCard>
export type { CreditCard, CardRow, GetPatientCardsResponse }
