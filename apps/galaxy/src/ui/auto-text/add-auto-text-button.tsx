'use client'

import React from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'
import { AutoTextDialog } from './auto-text-dialog'

const AddAutoTextButton = () => {
  return (
    <AutoTextDialog title="New Auto Text">
      <Dialog.Trigger>
        <Button size="1" className="text-white" highContrast>
          <PlusIcon height={16} width={16} />
          Add New
        </Button>
      </Dialog.Trigger>
    </AutoTextDialog>
  )
}

export { AddAutoTextButton }
