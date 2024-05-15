import { AppointmentType } from '@psychplus-v2/constants'
import { Metadata } from '@psychplus-v2/types'

interface PaymentHistoryItem {
  id: number
  metadata: Metadata
  patientId: number
  chargeDate: string
  transactionNumber: string
  type: AppointmentType
  description: string
  appointmentId: number
  visitNumber: string
  coPayDue: number
  coPayPaid: number
  coInsuranceDue: number
  coInsurancePaid: number
  balanceDue: number
  balancePaid: number
}

export type { PaymentHistoryItem }
