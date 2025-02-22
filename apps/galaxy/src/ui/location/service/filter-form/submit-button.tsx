'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const SubmitButton = () => {
  return (
    <Button highContrast size="1" type="submit">
      <MagnifyingGlassIcon strokeWidth={2} />
    </Button>
  )
}

export { SubmitButton }
