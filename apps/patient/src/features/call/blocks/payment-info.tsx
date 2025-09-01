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
  isUnAuthenticated?: boolean
}

const PaymentInfo = ({
  activeCreditCard,
  acsInfo,
  isUnAuthenticated = false,
}: PaymentInfoProps) => {
  const hasCardInfo = activeCreditCard?.numberLastFour
  const hasPatientCardInfo = acsInfo?.paymentData?.patientCardInfoExist
  const coPayAmount = acsInfo?.paymentData?.coPayDue

  const renderVerificationBadge = () => {
    if (!isUnAuthenticated || !hasPatientCardInfo) return null

    return (
      <Badge
        label="Verified"
        type="success"
        addIcon={false}
        className="w-fit"
      />
    )
  }

  const renderCardDetails = () => {
    if (hasCardInfo) {
      const expiry = getCreditCardExpiry(
        Number(activeCreditCard.expireMonth),
        Number(activeCreditCard.expireYear),
        false,
      )

      return (
        <Text className="text-[#1C2024]" size="2">
          - {activeCreditCard.name}, **** {activeCreditCard.numberLastFour},{' '}
          {expiry}
        </Text>
      )
    }

    return (
      <Badge
        label="Inactive"
        type="warning"
        addIcon={false}
        className="w-fit"
      />
    )
  }

  return (
    <>
      <Flex gap="1" align="center">
        <Text className="text-[#1C2024]" size="2">
          Payment Card
        </Text>
        {isUnAuthenticated ? renderVerificationBadge() : renderCardDetails()}
      </Flex>
      <Text className="text-[#1C2024]" size="2">
        Copay/Co-Ins {formatCurrency(Number(coPayAmount))}
      </Text>
    </>
  )
}

export default PaymentInfo
