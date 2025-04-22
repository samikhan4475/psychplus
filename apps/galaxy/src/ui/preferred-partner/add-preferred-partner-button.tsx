import React from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const AddPreferredPartnerButton = () => {
  return (
    <Button className="ml-auto" type="button" size="1" highContrast>
      <PlusIcon /> Add New
    </Button>
  )
}

export { AddPreferredPartnerButton }
