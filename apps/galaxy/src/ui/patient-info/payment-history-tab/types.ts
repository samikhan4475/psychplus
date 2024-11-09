import { LegalName, Metadata } from '@/types'
import { SchemaType } from './filter-form'

enum TransactionType {
  Visit = 'Visit',
  NoShow = 'NoShow',
  Records = 'Records',
  Letter = 'Letter',
  PlusMembership = 'PlusMembership',
  Custom = 'Custom',
  CancelPLt24 = 'CancelPLt24',
}

export interface PaymentMap {
  [key: string]: number
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
  patientName: LegalName
  preferredPartnerId: string
  isPreferredPartnerTransaction: boolean
  is_active: boolean
  paymentResponsibility: string
  chargeTime?: string
  subRows?: PatientTransaction[]
  coPayPreferredPartner?: number
  coInsurancePreferredPartner?: number
  balancePreferredPartner?: number
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

export {
  TransactionType,
  type PatientTransaction,
  type GetPaymentHistoryData,
  type PaymentHistoryData,
  type PaymentHistory,
  type StaffCommentsTreatment,
  type StaffCommentsBilling,
  type GetPatientPaymentHistoryParams,
  type GetPaymentHistorysData,
  type SchemaType,
}
