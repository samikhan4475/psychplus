import React from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { AddStaffDialog } from './dialogs'

const AddStaffButton = () => {
  return (
    <AddStaffDialog>
      <Button className="ml-auto" type="button" size="1" highContrast>
        <PlusIcon /> Add Staff
      </Button>
    </AddStaffDialog>
  )
}

export { AddStaffButton }
