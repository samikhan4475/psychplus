'use client'

import React from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { Plus, X } from 'lucide-react'
import { CustomChargeForm } from './custom-charge-form'

const AddCustomChargeDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1" variant="outline" color="gray" className="text-black">
          <Plus width={12} height={12} />
          Add Custom Charge
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[662px] rounded-1 p-3">
        <Dialog.Close className="absolute right-2.5 cursor-pointer">
          <X size={18} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="!mb-0 font-[600]">
          Charge/Modified Entry
        </Dialog.Title>
        <CustomChargeForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddCustomChargeDialog }
