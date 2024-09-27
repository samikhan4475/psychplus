'use client'

import { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { CreditCard } from '@/types'
import { TabContentHeading } from '../shared'
import { AddCreditCardDialog } from './add-credit-card'
import { CreditCardsTable } from './cards-table'

interface PaymentCardsWidgetProps {
  stripeApiKey: string
  patientId: string
  googleApiKey: string
  patientCards: CreditCard[]
}

const TAB_TITLE = 'Payment Cards'

const PaymentCardView = ({
  stripeApiKey,
  patientId,
  googleApiKey,
  patientCards,
}: PaymentCardsWidgetProps) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)

  return (
    <Flex direction="column" gap="1">
      <TabContentHeading title={TAB_TITLE}>
        <Flex justify="end" className="flex-1">
          <Button
            color="gray"
            size="1"
            variant="outline"
            className="text-black"
            onClick={toggleOpen}
          >
            <Plus size={12} />
            Add Card
          </Button>
        </Flex>
      </TabContentHeading>
      <CreditCardsTable patientCards={patientCards ?? []} />
      <AddCreditCardDialog
        open={open}
        onClose={toggleOpen}
        stripeApiKey={stripeApiKey}
        patientId={patientId}
        googleApiKey={googleApiKey}
        patientCards={patientCards}
      />
    </Flex>
  )
}

export { PaymentCardView }
