import React from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { AddPreferredPartnerDialog } from './dialogs'

const AddPreferredPartnerButton = () => {
  return (
    <AddPreferredPartnerDialog>
      <Button className="ml-auto" type="button" size="1" highContrast>
        <PlusIcon /> Add New
      </Button>
    </AddPreferredPartnerDialog>
  )
}

export { AddPreferredPartnerButton }
