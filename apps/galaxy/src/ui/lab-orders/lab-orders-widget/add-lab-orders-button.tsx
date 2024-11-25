'use client'

import { Button } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'

const AddLabOrdersButton = () => {
  return (
    <Button variant="outline" size="1" color="gray" className="text-black">
      <PlusIcon height={16} width={16} />
      Add Lab Order
    </Button>
  )
}

export { AddLabOrdersButton }
