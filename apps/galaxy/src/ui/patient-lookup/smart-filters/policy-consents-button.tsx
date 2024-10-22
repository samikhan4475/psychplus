'use client'

import { Button } from '@radix-ui/themes'

const PolicyConsentsButton = () => {
  return (
    <Button
      color="gray"
      size="1"
      variant="outline"
      className="text-black disabled:text-gray-5"
    >
      Policy & Consents
    </Button>
  )
}

export { PolicyConsentsButton }
