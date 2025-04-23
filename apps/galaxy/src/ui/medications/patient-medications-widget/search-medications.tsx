'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'

const SearchMedications = () => {
  return (
    <TextField.Root
      placeholder="Search Medications"
      size="1"
      className="w-[400px]"
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  )
}

export { SearchMedications }
