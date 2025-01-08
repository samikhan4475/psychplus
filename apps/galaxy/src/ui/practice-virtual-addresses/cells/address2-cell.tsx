'use client'

import { PropsWithRow, TextCell } from '@/components'
import { Flex, TextField } from '@radix-ui/themes'
import { useStore } from '../store'
import { VirtualAddressDetails } from '../types'

const Address2Cell = ({
  row: { original: address, index },
}: PropsWithRow<VirtualAddressDetails>) => {
  const editingRow = useStore((state) => state.editingRow);

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
    >
      {editingRow === index ?
        <TextField.Root
          size="1"
          defaultValue={address.primaryAddress2}
        />
        :
        <TextCell>{address.primaryAddress2}</TextCell>
      }
    </Flex>
  )
}

export { Address2Cell }
