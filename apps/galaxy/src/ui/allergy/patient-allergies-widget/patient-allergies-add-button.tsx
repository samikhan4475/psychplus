'use client'

import { Button } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'

const PatientAllergiesAddButton = () => {
  return (
    <Button
      variant="outline"
      className=" flex h-6 w-[82px] gap-x-1 px-1 text-[12px] text-[#000000] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
    >
      <PlusIcon width={12} height={12} />
      Add New
    </Button>
  )
}

export { PatientAllergiesAddButton }
