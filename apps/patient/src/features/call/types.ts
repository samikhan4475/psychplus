import { PaymentType } from '@psychplus-v2/constants'
import { LegalName } from '@psychplus-v2/types'
import { CreditCard } from '../billing/credit-debit-cards/types'
import { InsurancePolicy } from '../billing/payments/types'

interface AcsInfoPayload {
  staffEmail?: string
  appointmentId?: string
  shortUrlReference?: string
  isIncludeAppointmentData: boolean
}
interface AcsInfo {
  externalId: string
  tokenExpiresAt: Date
  token: string
  staffName: LegalName
  staffId: number
  callSessionId: string
  paymentData: {
    paymentResponsibilityCode: PaymentType
    isPrimaryInsuranceActive: boolean
    isSecondaryInsuranceActive: boolean
    coPayDue: number
    coPayPaid: number
    coInsDue: number
    coInsPaid: number
    balanceDue: number
    balancePaid: number
    patientCardInfoExist: boolean
    appointmentDateTime: string
    visitType: string
    visitTypeCode: string
    service:string
    patientCards?: CreditCard[]
    patientInsurancePolicies?: InsurancePolicy[]
  }
}

interface NotifyProviderPayload {
  staffEmail: string
  appointmentId?: string
  patientName: LegalName
  callSessionId: string
}

export type { AcsInfo, NotifyProviderPayload, AcsInfoPayload }
