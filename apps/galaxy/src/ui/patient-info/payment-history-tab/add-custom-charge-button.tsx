'use client'

import { Button, Dialog } from '@radix-ui/themes'
import { Plus } from 'lucide-react'

const AddCustomChargeButton = () => {
  return (
    <Dialog.Trigger>
      <Button size="1" variant="outline" color="gray" className="text-black">
        <Plus width={12} height={12} />
        Add Custom Charge
      </Button>
    </Dialog.Trigger>
  )
}

export { AddCustomChargeButton }
