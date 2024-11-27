'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const SubmitButton = () => {
  return (
    <Button size="1" variant="solid" type="submit" highContrast>
      <MagnifyingGlassIcon />
    </Button>
  )
}

export { SubmitButton }
