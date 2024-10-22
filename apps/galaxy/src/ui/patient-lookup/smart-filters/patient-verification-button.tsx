'use client'

import { Button } from '@radix-ui/themes'

const PatientVerificationButton = () => {
  return (
    <Button
      color="gray"
      size="1"
      variant="outline"
      className="text-black disabled:text-gray-5"
    >
      Patient Verification
    </Button>
  )
}

export { PatientVerificationButton }
