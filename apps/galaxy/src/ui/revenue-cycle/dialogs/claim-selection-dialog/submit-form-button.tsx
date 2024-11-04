import React from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const SubmitFormButton = () => (
  <Button highContrast size="1" type="submit">
    <MagnifyingGlassIcon />
  </Button>
)

export { SubmitFormButton }
