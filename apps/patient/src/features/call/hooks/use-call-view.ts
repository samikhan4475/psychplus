import { PaymentType } from '@psychplus-v2/constants'
import {
  getPrimaryActiveCard,
  getPrimaryInsurance,
} from '@/features/appointments/book/utils'
import { CreditCard } from '@/features/billing/credit-debit-cards/types/credit-card'
import { InsurancePolicy } from '@/features/billing/payments/types'
import { AcsInfo } from '@/features/call/types'

interface UseCallViewProps {
  acsInfo: AcsInfo
  patientInsurances: InsurancePolicy[]
  creditCards: CreditCard[]
  paymentMethod: PaymentType
}

export const useCallView = ({
  acsInfo,
  patientInsurances,
  creditCards,
  paymentMethod,
}: UseCallViewProps) => {
  const checkCallEligibility = () => {
    const primaryInsurance = getPrimaryInsurance(patientInsurances)

    const primaryCreditCard = getPrimaryActiveCard(creditCards)

    if (!primaryInsurance || !primaryCreditCard) return false

    const hasOutstandingBalance = () => {
      return (
        (acsInfo?.paymentData?.coInsDue || 0) >
          (acsInfo?.paymentData?.coInsPaid || 0) ||
        (acsInfo?.paymentData?.coPayDue || 0) >
          (acsInfo?.paymentData?.coPayPaid || 0)
      )
    }

    const isFullyPaid = () => {
      return (
        (acsInfo?.paymentData?.coInsDue || 0) ===
          (acsInfo?.paymentData?.coInsPaid || 0) &&
        (acsInfo?.paymentData?.coPayDue || 0) ===
          (acsInfo?.paymentData?.coPayPaid || 0)
      )
    }

    const isInsurancePaymentValid = () => {
      return (
        primaryInsurance.verificationStatus === 'Verified' &&
        (isFullyPaid() ||
          (hasOutstandingBalance() && primaryCreditCard?.isActive))
      )
    }

    const isSelfPayValid = () => {
      return (
        isFullyPaid() ||
        (hasOutstandingBalance() && primaryCreditCard?.isActive)
      )
    }

    if (paymentMethod === PaymentType.Insurance) {
      return isInsurancePaymentValid()
    }

    if (paymentMethod === PaymentType.SelfPay) {
      return isSelfPayValid()
    }

    return false
  }

  return {
    checkCallEligibility,
  }
}
