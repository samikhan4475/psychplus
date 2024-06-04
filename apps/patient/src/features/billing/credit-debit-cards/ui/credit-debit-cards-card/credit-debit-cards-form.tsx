import { Flex, Separator } from '@radix-ui/themes'
import { FieldPlaceholder, LabelAndValue } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { AddCreditCardForm } from './add-credit-debit-card-form'
import { CreditCardListItem } from './credit-debit-card-list-item'

const PaymentMethodsForm = ({ creditCards }: { creditCards: CreditCard[] }) => {
  const trigger = <FieldPlaceholder>+ Add New Credit Card</FieldPlaceholder>
  return (
    <Flex direction="column" width="100%" gap="2">
      {creditCards.length > 0 ? (
        <Flex direction="column">
          {creditCards.map((creditCard) => (
            <Flex className="w-full" direction="column" key={creditCard.id}>
              <CreditCardListItem key={creditCard.id} creditCard={creditCard} />
              <Separator className="w-full" my="4" />
            </Flex>
          ))}
        </Flex>
      ) : null}
      <AddCreditCardForm trigger={trigger} />
    </Flex>
  )
}

export { PaymentMethodsForm }
