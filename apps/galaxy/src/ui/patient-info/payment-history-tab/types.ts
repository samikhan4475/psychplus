import { type Row } from '@tanstack/react-table'

interface PaymentHistory {
  time: string
  date: string
  charge: string
  visit: string
  method: string
  paymentDescription: string
  description: string
  transaction: string
  stripe: string
  updatedBy: string
  updatedDate: string
  coPay: {
    due: string
    paid: string
  }
  coIns: {
    due: string
    paid: string
  }
  subRows?: PaymentHistory[]
}

type PaymentHistoryRow = Row<PaymentHistory>

interface GetPaymentHistoryData {
  paymentHistories: PaymentHistory[]
}

interface GetPaymentTableResponse {
  notes: PaymentHistory[]
}

interface StaffCommentsTreatment {
  date: string
  time: string
  staff: string
  comments: string
}

interface StaffCommentsBilling {
  date: string
  time: string
  staff: string
  comments: string
}

export type {
  GetPaymentHistoryData,
  PaymentHistory,
  PaymentHistoryRow,
  GetPaymentTableResponse,
  StaffCommentsTreatment,
  StaffCommentsBilling,
}
