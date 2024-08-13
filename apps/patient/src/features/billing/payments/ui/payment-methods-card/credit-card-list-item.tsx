'use client'

import { useRouter } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { DeletableFieldValue } from '@/components-v2'
import { removeCreditCardAction } from '@/features/billing/payments/actions'
import type { CreditCard } from '@/features/billing/payments/types'
import { getDefaultCreditCardName } from '@/features/billing/payments/utils'

const CreditCardListItem = ({ creditCard }: { creditCard: CreditCard }) => {
  const router = useRouter()

  const onDelete = () => removeCreditCardAction({ id: creditCard.id })

  return (
    <DeletableFieldValue
      tooltip="Remove this card"
      deleteAction={onDelete}
      onSuccess={router.refresh}
      confirmTitle="Remove card"
      confirmDescription="Are you sure? This will remove the card from your account and it will
    no longer be able to be used."
      confirmActionLabel="Remove card"
      toastTitle="Credit card Removed"
    >
      <Flex direction="column" className="gap-[2px]">
        <Flex align="center" gap="1">
          <Text size="1" className="tracking-[0.5px]">
            &#9679;&#9679;&#9679;&#9679;
          </Text>
          <Text>{creditCard.numberLastFour}</Text>
          {creditCard.name.toLowerCase() !==
          getDefaultCreditCardName(creditCard) ? (
            <Text>{`(${creditCard.name})`}</Text>
          ) : null}
        </Flex>
        <Text size="2" className="font-[300] -tracking-[0.25px] opacity-75">
          {creditCard.cardType}&nbsp; Expires {creditCard.expireMonth}/
          {creditCard.expireYear}
        </Text>
      </Flex>
    </DeletableFieldValue>
  )
}

export { CreditCardListItem }
