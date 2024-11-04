import { PatientPayment } from '@/types'
import { SchemaType } from './filter-form'

interface GetPatientPaymentsData {
  payments: PatientPayment[]
}

interface GetPaymentPayload extends Omit<SchemaType, 'toDate' | 'fromDate'> {
  fromDate?: string
  toDate?: string
}

export type { PatientPayment, GetPatientPaymentsData, GetPaymentPayload }
