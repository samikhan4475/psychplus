'use client'

import { PaymentMethodToggleButtons } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types/credit-card'
import { InsurancePolicy } from '@/features/billing/payments/types'
import { PaymentType } from '@psychplus-v2/constants'
import { Flex, Text } from '@radix-ui/themes'
import { AcsInfo } from '../types'
import InsuranceInfo from './insurance-info'
import PaymentInfo from './payment-info'

interface CallDetailsProps {
  acsInfo: AcsInfo
  paymentMethod: PaymentType
  setPaymentMethod?: (method: PaymentType) => void
  primaryPolicy?: InsurancePolicy
  activeCreditCard?: CreditCard
}

const CallDetails = ({
  acsInfo,
  paymentMethod,
  setPaymentMethod,
  primaryPolicy,
  activeCreditCard,
}: CallDetailsProps) => (
  <>
    <Flex gap="2" align="center" className='pointer-events-none'>
      <Text className="text-[#1C2024]" size="2">
        Payment Type
      </Text>
      <PaymentMethodToggleButtons
        value={paymentMethod}
        onChange={setPaymentMethod ?? (() => {})}
        disableInsurance={false}
        isCall
      />
    </Flex>
    {paymentMethod === PaymentType.Insurance && (
      <InsuranceInfo primaryPolicy={primaryPolicy} acsInfo={acsInfo} />
    )}
    <PaymentInfo
      activeCreditCard={activeCreditCard as CreditCard}
      acsInfo={acsInfo}
    />
  </>
)

export default CallDetails
