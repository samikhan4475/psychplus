import { Box, Flex, Separator } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty, FieldPlaceholder } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { CreditCardForm } from './credit-debit-card-form'
import { CreditCardListItem } from './credit-debit-card-list-item'

const PaymentMethodsForm = ({ creditCards }: { creditCards: CreditCard[] }) => {
  const trigger = (
    <FieldPlaceholder>+ Add New Credit/Debit Card</FieldPlaceholder>
  )
  return (
    <Box>
      {creditCards.length > 0 ? (
        <Flex direction="column" width="100%" gap="2">
          {creditCards.map((creditCard) => (
            <Flex className="w-full" direction="column" key={creditCard.id}>
              <CreditCardListItem creditCard={creditCard} />
              <Separator className="w-full" my="4" />
            </Flex>
          ))}

          <CreditCardForm trigger={trigger} existingCards={creditCards} />
        </Flex>
      ) : (
        <FeatureEmpty
          description="No Credit/Debit card added yet"
          action={
            <CreditCardForm
              trigger={trigger}
              triggerClassName="justify-center"
              existingCards={creditCards}
            />
          }
          Icon={EmptyFileIcon}
        />
      )}
    </Box>
  )
}

export { PaymentMethodsForm }
