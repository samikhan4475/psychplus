'use server'

import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { InsurancePolicy } from '@/features/billing/payments/types'
import { AcsInfoPayload } from '@/features/call/types'
import * as api from '@psychplus-v2/api'
import { PaymentType } from '@psychplus-v2/constants'
import { API_URL } from '@psychplus-v2/env'

interface AcsFeature {
  externalId: string
  tokenExpiresAt: string
  token: string
  staffName: {
    firstName: string
    middleName: string
    lastName: string
    honors: string
  }
  callUrl: string
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

const acs_enabled = (payload: AcsInfoPayload) => {
  const url = new URL(
    `${API_URL}/api/patients/self/communications/actions/accesstoken`,
  )

  return api.POST<AcsFeature>(url.toString(), payload)
}

export { acs_enabled }
