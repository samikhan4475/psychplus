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
  patientInsurances?: InsurancePolicy[]
  creditCards?: CreditCard[]
  paymentMethod?: PaymentType
  isUnAuthenticated?: boolean
}

export const useCallView = ({
  acsInfo,
  patientInsurances,
  creditCards,
  paymentMethod,
  isUnAuthenticated = false,
}: UseCallViewProps) => {
  const checkCallEligibility = () => {
    const isPrimaryInsuranceActive =
      isUnAuthenticated && acsInfo?.paymentData?.isPrimaryInsuranceActive
    const isPrimaryCardActive =
      isUnAuthenticated && acsInfo?.paymentData?.patientCardInfoExist

    const primaryInsurance = getPrimaryInsurance(patientInsurances || [])

    const primaryCreditCard = getPrimaryActiveCard(creditCards || [])

    const activeCreditCard = isUnAuthenticated
      ? isPrimaryCardActive
      : primaryCreditCard?.isActive
    const activeInsurance = isUnAuthenticated
      ? isPrimaryInsuranceActive
      : primaryInsurance?.verificationStatus === 'Verified'

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
        activeInsurance &&
        (isFullyPaid() || (hasOutstandingBalance() && activeCreditCard))
      )
    }

    const isSelfPayValid = () => {
      return isFullyPaid() || (hasOutstandingBalance() && activeCreditCard)
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
