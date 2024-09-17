'use client'

import { Button } from '@radix-ui/themes'
import { CreditCard } from 'lucide-react'

const PaymentButton = () => {
  return (
    <Button size="1" highContrast>
      <CreditCard width={12} height={12} />
      Payment
    </Button>
  )
}

export { PaymentButton }
