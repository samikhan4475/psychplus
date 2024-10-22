'use client'

import { Button } from '@radix-ui/themes'

const CreditCardButton = () => {
  return (
    <Button
      color="gray"
      size="1"
      variant="outline"
      className="text-black disabled:text-gray-5"
    >
      Credit Card
    </Button>
  )
}

export { CreditCardButton }
