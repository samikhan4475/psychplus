'use client'

import { PaymentType } from '@psychplus-v2/constants'
import { Flex, Text } from '@radix-ui/themes'
import { PaymentMethodToggleButtons } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types/credit-card'
import { InsurancePolicy } from '@/features/billing/payments/types'
import { AcsInfo } from '../types'
import InsuranceInfo from './insurance-info'
import PaymentInfo from './payment-info'

interface CallDetailsProps {
  acsInfo: AcsInfo
  paymentMethod: PaymentType
  setPaymentMethod?: (method: PaymentType) => void
  primaryPolicy?: InsurancePolicy
  activeCreditCard?: CreditCard
  isUnAuthenticated?: boolean
}

const CallDetails = ({
  acsInfo,
  paymentMethod,
  setPaymentMethod,
  primaryPolicy,
  activeCreditCard,
  isUnAuthenticated = false,
}: CallDetailsProps) => (
  <>
    <Flex gap="2" align="center" className="pointer-events-none">
      <Text className="text-[#1C2024]" size="2">
        Payment Type
      </Text>
      <PaymentMethodToggleButtons
        value={paymentMethod}
        onChange={setPaymentMethod ?? (() => {})}
        disableInsurance={false}
        isCall
        isUnAuthenticated={isUnAuthenticated}
      />
    </Flex>
    {paymentMethod === PaymentType.Insurance && (
      <InsuranceInfo
        primaryPolicy={primaryPolicy}
        acsInfo={acsInfo}
        isUnAuthenticated={isUnAuthenticated}
      />
    )}
    <PaymentInfo
      activeCreditCard={activeCreditCard as CreditCard}
      acsInfo={acsInfo}
      isUnAuthenticated={isUnAuthenticated}
    />
  </>
)

export default CallDetails
