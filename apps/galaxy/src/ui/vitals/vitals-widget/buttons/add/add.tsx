'use client'

import { Button } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'

const AddButton = ({ onAdd }: { onAdd: (state: boolean) => void }) => {
  return (
    <Button variant="outline" color="gray" size="1" onClick={() => onAdd(true)}>
      <PlusIcon height={16} width={16} />
      Add
    </Button>
  )
}

export { AddButton }
