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

interface PaymentHistoryData {
  time: string
  date: string
  charge: string
  visit: string
  method: string
  paymentDescription: string
  description: string
  transaction: string
  stripe: string
  coPay: {
    duePT: string
    duePP: string
    paid: string
  }
  coIns: {
    duePT: string
    duePP: string
    paid: string
  }
  balance: {
    duePT: string
    duePP: string
    paid: string
  }
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

enum PaymentMethod {
  CreditCard = 'Credit Card',
  Cheque = 'Cheque',
  Cash = 'Cash',
  CMD = 'CMD',
}

export {
  PaymentMethod,
  type GetPaymentHistoryData,
  type PaymentHistoryData,
  type PaymentHistory,
  type PaymentHistoryRow,
  type GetPaymentTableResponse,
  type StaffCommentsTreatment,
  type StaffCommentsBilling,
}
