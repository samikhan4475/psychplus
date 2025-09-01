'use client'

import { useEffect, useMemo, useState } from 'react'
import { PaymentType } from '@psychplus-v2/constants'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import InsurancePaymentSection from '@/features/appointments/book/ui/book-appointment/insurance'
import PreferredPartnerSection from '@/features/appointments/book/ui/book-appointment/preferred-partner'
import SelfPaySection from '@/features/appointments/book/ui/book-appointment/selfpay'
import {
  getPrimaryActiveCard,
  getPrimaryInsurance,
} from '@/features/appointments/book/utils'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import {
  InsurancePayer,
  InsurancePolicy,
} from '@/features/billing/payments/types'
import { AcsInfo } from '@/features/call/types'
import { VerificationStatus } from '@/types'

interface PaymentMethodAccordionProps {
  paymentMethod: PaymentType
  stripeApiKey: string
  creditCards?: CreditCard[]
  patientInsurances?: InsurancePolicy[]
  insurancePayers?: InsurancePayer[]
  isCall?: boolean
  acsInfo?: AcsInfo
  isUnAuthenticated?: boolean
}

const isFullyPaid = (acsInfo?: AcsInfo) => {
  const coInsFullyPaid =
    (acsInfo?.paymentData?.coInsDue || 0) ===
    (acsInfo?.paymentData?.coInsPaid || 0)
  const coPayFullyPaid =
    (acsInfo?.paymentData?.coPayDue || 0) ===
    (acsInfo?.paymentData?.coPayPaid || 0)
  return coInsFullyPaid && coPayFullyPaid
}

const PaymentMethodAccordion = ({
  paymentMethod,
  stripeApiKey,
  creditCards,
  patientInsurances,
  insurancePayers,
  isCall = false,
  acsInfo,
  isUnAuthenticated = false,
}: PaymentMethodAccordionProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])

  const getDefaultInsuranceOpenState = () => {
    if (isUnAuthenticated) {
      return acsInfo?.paymentData?.isPrimaryInsuranceActive
        ? ''
        : 'Add Insurance'
    }
    if (!isCall) return 'Insurance on File'
    const primaryInsurance = getPrimaryInsurance(
      patientInsurances as InsurancePolicy[],
    )
    const hasActivePrimaryInsurance =
      primaryInsurance?.verificationStatus === VerificationStatus.Verified
    return hasActivePrimaryInsurance ? '' : 'Add Insurance'
  }

  const getDefaultCreditCardOpenState = () => {
    if (isUnAuthenticated) {
      return acsInfo?.paymentData?.patientCardInfoExist
        ? ''
        : 'Add Payment Card'
    }
    if (!isCall) return 'Credit/Debit Cards'
    const hasActivePrimaryCard = getPrimaryActiveCard(
      creditCards as CreditCard[],
    )
    return hasActivePrimaryCard ? '' : 'Add Payment Card'
  }

  const [creditCardOpenStateValue, setCreditCardOpenStateValue] =
    useState<string>(getDefaultCreditCardOpenState())
  const [insuranceOpenStateValue, setInsuranceOpenStateValue] =
    useState<string>(getDefaultInsuranceOpenState())
  const [selectedCreditCard, setSelectedCreditCard] = useState<
    CreditCard | undefined
  >(creditCards?.[0])

  const shouldHideSelfPay =
    isCall && paymentMethod === PaymentType.SelfPay && isFullyPaid(acsInfo)

  useEffect(() => {
    if (creditCards?.length) {
      setSelectedCreditCard(creditCards[0])
    }
  }, [creditCards])

  useEffect(() => {
    if (isCall) {
      setInsuranceOpenStateValue(getDefaultInsuranceOpenState())
      setCreditCardOpenStateValue(getDefaultCreditCardOpenState())
    }
  }, [isCall, patientInsurances, creditCards, acsInfo, paymentMethod])

  const renderPaymentSection = () => {
    switch (paymentMethod) {
      case PaymentType.Insurance:
        return (
          <InsurancePaymentSection
            patientInsurances={patientInsurances as InsurancePolicy[]}
            insurancePayers={insurancePayers as InsurancePayer[]}
            creditCards={creditCards as CreditCard[]}
            isCall={isCall}
            insuranceOpenStateValue={insuranceOpenStateValue}
            setInsuranceOpenStateValue={setInsuranceOpenStateValue}
            setCreditCardOpenStateValue={setCreditCardOpenStateValue}
            selectedCreditCard={selectedCreditCard}
            shouldHideSelfPay={shouldHideSelfPay}
            isUnAuthenticated={isUnAuthenticated}
          />
        )
      case PaymentType.SelfPay:
        return (
          <SelfPaySection
            creditCards={creditCards as CreditCard[]}
            isCall={isCall}
            creditCardOpenStateValue={creditCardOpenStateValue}
            setCreditCardOpenStateValue={setCreditCardOpenStateValue}
            selectedCreditCard={selectedCreditCard}
            isUnAuthenticated={isUnAuthenticated}
          />
        )
      case PaymentType.PreferredPartner:
        return <PreferredPartnerSection />
      default:
        return null
    }
  }

  return <Elements stripe={stripePromise}>{renderPaymentSection()}</Elements>
}

export { PaymentMethodAccordion }
