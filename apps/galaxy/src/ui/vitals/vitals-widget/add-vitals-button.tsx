'use client'

import { Button } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'

const AddVitalsButton = () => {
  return (
    <Button variant="outline" size="1" color="gray" className="text-black">
      <PlusIcon height={16} width={16} />
      Add
    </Button>
  )
}

export { AddVitalsButton }
