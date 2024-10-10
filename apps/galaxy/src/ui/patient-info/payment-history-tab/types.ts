import { Metadata } from '@/types'

interface PatientName {
  firstName: string
  middleName: string
  lastName: string
  preferredName: string
  title: string
  suffix: string
  honors: string
}
interface PatientTransaction {
  id: number
  metadata: Metadata
  patientId: number
  chargeDate: string
  transactionNumber: string
  type: string
  description: string
  appointmentId: number
  visitNumber: string
  coPayDue: number
  coPayPaid: number
  coInsuranceDue: number
  coInsurancePaid: number
  balanceDue: number
  balancePaid: number
  unappliedPayment: number
  method: string
  stripeNumber: string
  paymentDescription: string
  patientName: PatientName
  preferredPartnerId: string
  isPreferredPartnerTransaction: boolean
  is_active: boolean
  paymentResponsibility: string
  subRows?: PatientTransaction[]
}

interface PaymentHistory {
  totalDue: number
  remainingDue: number
  unappliedPayment: number
  totalPayment: number
  startDate: string
  endDate: string
  bundledAmount?: number
  patientTransactions: PatientTransaction[]
}

interface GetPaymentHistorysData {
  paymentHistory: PaymentHistory
  total: number
}

interface GetPatientPaymentHistoryParams {
  patientIds?: string[]
  startDate?: string
  endDate?: string
  transactionTypes?: string[]
  preferredPartnerIds?: string[]
  dataRange?: string
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

interface GetPaymentHistoryData {
  paymentHistory: PaymentHistory
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
  type PatientTransaction,
  PaymentMethod,
  type GetPaymentHistoryData,
  type PaymentHistoryData,
  type PaymentHistory,
  type StaffCommentsTreatment,
  type StaffCommentsBilling,
  type GetPatientPaymentHistoryParams,
  type GetPaymentHistorysData,
}
