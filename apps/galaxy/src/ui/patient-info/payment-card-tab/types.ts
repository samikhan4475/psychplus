import { type Row } from '@tanstack/react-table'
import { CreditCardType } from '@/constants'
import { CreditCard, PatientAddress } from '@/types'

interface AddCardRequestBody {
  name: string
  cardKey: string
  cardType: CreditCardType
  expireMonth: number
  expireYear: number
  numberLastFour: string
  billingAddress: PatientAddress
  isPrimary?: boolean
}

interface AddPatientCardParams {
  patientId: string
  payload: CreditCard
}

type CardRow = Row<CreditCard>

export type { CardRow, AddPatientCardParams, AddCardRequestBody }
