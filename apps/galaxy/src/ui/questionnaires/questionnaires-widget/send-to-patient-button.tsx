'use client'

import { Button } from '@radix-ui/themes'

const SendToPatientButton = () => {
  return (
    <Button
      size="2"
      color="gray"
      variant="surface"
      highContrast
      className="h-auto px-3 py-1"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      Send to Patient
    </Button>
  )
}

export { SendToPatientButton }
