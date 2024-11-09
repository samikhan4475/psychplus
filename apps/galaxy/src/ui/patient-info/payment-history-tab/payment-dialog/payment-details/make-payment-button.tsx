'use client'

import { Button } from '@radix-ui/themes'

const MakePaymentButton = () => {
  return (
    <Button size="1" className="mt-5 flex-1" highContrast type="submit">
      Make Payment
    </Button>
  )
}

export { MakePaymentButton }
