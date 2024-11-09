'use client'

import { Button, Dialog } from '@radix-ui/themes'
import { CreditCardIcon } from 'lucide-react'

const PaymentButton = () => {
  return (
    <Dialog.Trigger>
      <Button size="1" highContrast>
        <CreditCardIcon width={12} height={12} />
        Payment
      </Button>
    </Dialog.Trigger>
  )
}

export { PaymentButton }
