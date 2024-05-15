import { Flex } from '@radix-ui/themes'
import { LabelAndValue } from '@/components-v2'
import { CreditCard } from '@/features/billing/payments/types'
import { AddCreditCardForm } from './add-credit-card-form'
import { CreditCardListItem } from './credit-card-list-item'

const PaymentMethodsForm = ({ creditCards }: { creditCards: CreditCard[] }) => {
  return (
    <LabelAndValue label="Credit Cards">
      <Flex direction="column" width="100%" gap="2">
        {creditCards.length > 0 ? (
          <Flex direction="column" gap="2">
            {creditCards.map((creditCard) => (
              <CreditCardListItem key={creditCard.id} creditCard={creditCard} />
            ))}
          </Flex>
        ) : null}
        <AddCreditCardForm />
      </Flex>
    </LabelAndValue>
  )
}

export { PaymentMethodsForm }
