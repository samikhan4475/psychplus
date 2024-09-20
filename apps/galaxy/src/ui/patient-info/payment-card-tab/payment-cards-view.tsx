'use client'

import { useEffect, useState } from 'react'
import { Button, Flex, ScrollArea } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { ActionResult } from '@/api'
import { TabContentHeading, ViewLoadingPlaceholder } from '../shared'
import { getPatientCards } from './actions'
import { AddCreditCardDialog } from './add-credit-card'
import { CreditCardsTable } from './cards-table'
import { CreditCard } from './types'

interface PaymentCardsWidgetProps {
  stripeApiKey: string
  patientId: string
}

const TAB_TITLE = 'Payment Cards'

const PaymentCardView = ({
  stripeApiKey,
  patientId,
}: PaymentCardsWidgetProps) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)

  const [patientCardsResult, setPatientCardsResult] =
    useState<ActionResult<CreditCard[]>>()

  useEffect(() => {
    getPatientCards({ patientId }).then(setPatientCardsResult)
  }, [])

  if (!patientCardsResult) {
    return <ViewLoadingPlaceholder title={TAB_TITLE} />
  }

  if (patientCardsResult.state === 'error') {
    return <div>{patientCardsResult.error}</div>
  }

  return (
    <Flex direction="column">
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
      <ScrollArea className="p-2">
        <CreditCardsTable patientCards={patientCardsResult?.data ?? []} />
      </ScrollArea>
      <AddCreditCardDialog
        open={open}
        onClose={toggleOpen}
        stripeApiKey={stripeApiKey}
        patientId={patientId}
      />
    </Flex>
  )
}

export { PaymentCardView }
