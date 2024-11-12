'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex, TextField } from '@radix-ui/themes'

const PatientSearchInput = () => {
  return (
    <Flex align="center" className="bg-white relative rounded-2">
      <MagnifyingGlassIcon
        className="absolute left-2 top-1/2 -translate-y-1/2 transform text-pp-grey"
        width="18px"
        height="18px"
      />
      <TextField.Root size="1" placeholder="Search" className="h-7 w-60 pl-6" />
    </Flex>
  )
}

export { PatientSearchInput }
