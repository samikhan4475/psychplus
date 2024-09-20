'use client'

import { Button } from '@radix-ui/themes'

const MakePaymentButton = () => {
  return (
    <Button
      size="1"
      className="border-3 mt-5 flex-1 border-solid border-slate-4"
      highContrast
      type="submit"
    >
      Make Payment
    </Button>
  )
}

export { MakePaymentButton }
