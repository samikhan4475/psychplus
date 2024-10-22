'use client'

import { Button } from '@radix-ui/themes'

const InsuranceVerificationButton = () => {
  return (
    <Button
      color="gray"
      size="1"
      variant="outline"
      className="text-black disabled:text-gray-5"
    >
      Insurance Verification
    </Button>
  )
}

export { InsuranceVerificationButton }
