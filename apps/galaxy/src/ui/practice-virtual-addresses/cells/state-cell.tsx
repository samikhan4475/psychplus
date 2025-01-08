'use client'

import { PropsWithRow, TextCell } from '@/components'
import { Flex, TextField } from '@radix-ui/themes'
import { useStore } from '../store'
import { VirtualAddressDetails } from '../types'

const StateCell = ({
  row: { original: address, index },
}: PropsWithRow<VirtualAddressDetails>) => {
  const editingRow = useStore((state) => state.editingRow);
  return (
    <Flex
      width="90%"
      height="90%"
      align="center"
    >
      {editingRow === index ?
        <TextField.Root
          size="1"
          defaultValue={address.state}
        />
        :
        <TextCell>{address.state}</TextCell>
      }
    </Flex>
  )
}

export { StateCell }
