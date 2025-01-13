import { useRouter } from 'next/navigation'
import { ActionResult } from '@psychplus-v2/api'
import { truncateWithEllipsis } from '@psychplus-v2/utils'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { DotIcon } from 'lucide-react'
import { DeletableFieldValue } from '@/components-v2'
import { removeCreditCardAction } from '@/features/billing/credit-debit-cards/actions'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { ChangePrimaryCardDialog } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/change-primary-card-dialog'

const CreditDebitCardDetails = ({
  creditCard,
  name,
  expiry,
}: {
  creditCard: CreditCard
  name: string | null
  expiry: string | React.ReactElement
}) => {
  const router = useRouter()

  const onDelete = () => removeCreditCardAction({ id: creditCard.id })

  return (
    <Flex direction="column" gap="2">
      <Flex align="center" gap="2">
        <Text weight="bold">{creditCard.cardType}</Text>
        <Text size="2" className="tracking-[0.5px]">
          **** **** ****
        </Text>
        <Text>{creditCard.numberLastFour}</Text>
      </Flex>
      <Flex align="center">
        {name && (
          <Text weight="regular" size="2">
            {truncateWithEllipsis(name, 25)}
          </Text>
        )}
        <DotIcon color="gray" />
        <Text weight="regular" size="2">
          {expiry}
        </Text>
      </Flex>

      {!creditCard.isPrimary && (
        <Flex align="center">
          {creditCard.isActive && (
            <>
              <ChangePrimaryCardDialog creditCard={creditCard} />
              <Separator className="w-6 rotate-90" />
            </>
          )}
          <DeletableFieldValue
            tooltip="Remove this card"
            deleteAction={onDelete}
            onSuccess={router.refresh}
            confirmTitle="Remove card"
            confirmDescription="Are you sure? This will remove the card from your account and it will no longer be able to be used."
            confirmActionLabel="Remove card"
            toastTitle="Credit Card Removed"
          />
        </Flex>
      )}
    </Flex>
  )
}

export default CreditDebitCardDetails
