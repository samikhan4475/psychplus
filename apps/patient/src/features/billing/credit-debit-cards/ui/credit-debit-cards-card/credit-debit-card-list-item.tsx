'use client'

import { useRouter } from 'next/navigation'
import { CreditCardType } from '@psychplus-v2/constants'
import { Box, Flex, Separator, Text } from '@radix-ui/themes'
import { DotIcon } from 'lucide-react'
import {
  AmericanExpressCardIcon,
  Badge,
  DeletableFieldValue,
  DiscoverCardIcon,
  EditableFieldValue,
  MasterCardIcon,
  VisaCardIcon,
} from '@/components-v2'
import { removeCreditCardAction } from '@/features/billing/credit-debit-cards/actions'
import type { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { getDefaultCreditCardName } from '@/features/billing/credit-debit-cards/utils'

const CreditCardListItem = ({ creditCard }: { creditCard: CreditCard }) => {
  const router = useRouter()

  const onDelete = () => removeCreditCardAction({ id: creditCard.id })

  return (
    <Flex justify="between" gap="2">
      <Flex direction="column">
        <Flex gap="3">
          <CardIcon type={creditCard.cardType} />

          <Flex direction="column" gap="1">
            <Flex align="center" gap="2">
              <Text weight="bold">{creditCard.cardType}</Text>
              <Text size="2" className="tracking-[0.5px]">
                **** **** ****
              </Text>
              <Text>{creditCard.numberLastFour}</Text>
            </Flex>
            <Flex align="center">
              <Flex align="center" gap="2">
                {creditCard.name.toLowerCase() !==
                getDefaultCreditCardName(creditCard) ? (
                  <Text weight="regular" size="2">{`${creditCard.name}`}</Text>
                ) : null}

                {creditCard.isPrimary && <Badge label="Primary" type="basic" />}
              </Flex>
              <DotIcon color="gray" />

              <Text weight="regular" size="2">
                Expires {creditCard.expireMonth}/
                {creditCard.expireYear.toString().slice(-2)}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex ml="9" mt="1" align="center">
          <EditableFieldValue />

          <Separator className="w-6 rotate-90" />

          <DeletableFieldValue
            tooltip="Remove this card"
            deleteAction={onDelete}
            onSuccess={router.refresh}
            confirmTitle="Remove card"
            confirmDescription="Are you sure? This will remove the card from your account and it will no longer be able to be used."
            confirmActionLabel="Remove card"
          />
        </Flex>
      </Flex>
      <Flex
        className="w-1/3 border-l border-dashed border-gray-6"
        px="4"
        direction="column"
        gap="2"
      >
        <Text weight="bold">Billing Address</Text>
        <Text weight="regular" size="2">
          {creditCard.billingAddress.street1}, {creditCard.billingAddress.state}
          , {creditCard.billingAddress.postalCode}
        </Text>
      </Flex>
    </Flex>
  )
}

const CardIcon = ({ type }: { type: string }) => {
  switch (type) {
    case CreditCardType.Visa:
      return <VisaCardIcon />
    case CreditCardType.MasterCard:
      return <MasterCardIcon />
    case CreditCardType.Discover:
      return <DiscoverCardIcon />
    case CreditCardType.AmericanExpress:
      return <AmericanExpressCardIcon />
  }
}

export { CreditCardListItem }
