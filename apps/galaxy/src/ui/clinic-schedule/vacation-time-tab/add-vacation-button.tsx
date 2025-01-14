'use client'

import React from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { VacationDialog } from './vacation-dialog'

const AddVacationButton = () => {
  return (
    <VacationDialog title="Add Vacation">
      <Dialog.Trigger>
        <Button size="1" highContrast>
          <PlusIcon width={16} height={16} /> Add Vacation
        </Button>
      </Dialog.Trigger>
    </VacationDialog>
  )
}

export { AddVacationButton }
