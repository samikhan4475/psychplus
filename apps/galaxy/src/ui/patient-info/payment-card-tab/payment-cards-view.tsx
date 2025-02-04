'use client'

import { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { CreditCard } from '@/types'
import { TabContentHeading } from '../shared'
import { AddCreditCardDialog } from './add-credit-card'
import { CreditCardsTable } from './cards-table'
import { PermissionAlert } from '@/ui/schedule/shared'
import { useHasPermission } from '@/hooks'

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
  const addPaymentCardPermission = useHasPermission('addPaymentCard')
  const [isOpen, setIsOpen] = useState(false)

  const handleAddCardClick = () => {
    if (addPaymentCardPermission) {
      setOpen(true)
    } else {
      setIsOpen(true)
    }
  }
  return (
    <Flex direction="column" gap="1">
      <TabContentHeading title={TAB_TITLE}>
        <Flex justify="end" className="flex-1">
          <Button
            color="gray"
            size="1"
            variant="outline"
            className="text-black"
            onClick={handleAddCardClick}
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
      <PermissionAlert
        isOpen={isOpen}
        message="You do not have permission to Add Card. Please contact your supervisor if you need any further assistance."
        onClose={() => {
          setIsOpen(false)
        }}
      />
    </Flex>
  )
}

export { PaymentCardView }
