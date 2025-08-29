'use client'

import { formatCurrency } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { Badge } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { getCreditCardExpiry } from '@/features/billing/credit-debit-cards/utils'
import { AcsInfo } from '../types'

interface PaymentInfoProps {
  activeCreditCard: CreditCard
  acsInfo: AcsInfo
}

const PaymentInfo = ({ activeCreditCard, acsInfo }: PaymentInfoProps) => (
  <>
    <Flex gap="1" align="center">
      <Text className="text-[#1C2024]" size="2">
        Payment Card
      </Text>
      {activeCreditCard?.numberLastFour ? (
        <Text className="text-[#1C2024]" size="2">
          - {activeCreditCard?.name}, **** {activeCreditCard?.numberLastFour},{' '}
          {getCreditCardExpiry(
            Number(activeCreditCard?.expireMonth),
            Number(activeCreditCard?.expireYear),
            false,
          )}
        </Text>
      ) : (
        <Badge
          label="Inactive"
          type="warning"
          addIcon={false}
          className="w-fit"
        />
      )}
    </Flex>
    <Text className="text-[#1C2024]" size="2">
      Copay/Co-Ins {formatCurrency(Number(acsInfo?.paymentData?.coPayDue))}
    </Text>
  </>
)

export default PaymentInfo
