import React from 'react'
import { CreditCardType } from '@psychplus-v2/constants'
import { Flex } from '@radix-ui/themes'
import {
  AmericanExpressCardIcon,
  Badge,
  DiscoverCardIcon,
  MasterCardIcon,
  VisaCardIcon,
} from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import {
  getCreditCardExpiry,
  getDefaultCreditCardName,
} from '@/features/billing/credit-debit-cards/utils'
import CreditDebitCardDetails from './credit-debit-card-details'

const CreditCardListItem = ({ creditCard }: { creditCard: CreditCard }) => {
  const showCustomName =
    creditCard.name.toLowerCase() !== getDefaultCreditCardName(creditCard)
  const cardExpiry = getCreditCardExpiry(
    creditCard.expireMonth,
    creditCard.expireYear,
  )

  return (
    <Flex direction="column">
      <Flex justify="between" gap="2" direction={{initial:'column-reverse', md:'row'}}>
        <Flex direction="column">
          <Flex gap="3">
            <CardIcon type={creditCard.cardType} />
            <CreditDebitCardDetails
              creditCard={creditCard}
              name={showCustomName ? creditCard.name : null}
              expiry={cardExpiry}
            />
          </Flex>
        </Flex>
        <Flex className="items-start justify-end" px="4" gap="2">
          {creditCard.isPrimary && <Badge label="Primary" type="basic" />}

          {creditCard.isActive && creditCard.isPrimary && (
            <Badge label="Active" type="success" addIcon />
          )}

          {!creditCard.isActive && (
            <Badge label="Inactive" type="danger" addIcon />
          )}
        </Flex>
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

export {CreditCardListItem}
