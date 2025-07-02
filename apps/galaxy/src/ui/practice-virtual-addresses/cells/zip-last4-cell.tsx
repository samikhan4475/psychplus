'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { useStore } from '../store'
import { VirtualAddressDetails } from '../types'

const ZIPLast4Cell = ({
  row: { original: address, index },
}: PropsWithRow<VirtualAddressDetails>) => {
  const editingRow = useStore((state) => state.editingRow)
  return (
    <Flex width="100%" height="100%" align="center">
      {editingRow === index ? (
        <TextField.Root size="1" defaultValue={address.postalPlus4Code ?? ''} />
      ) : (
        <TextCell>{address.postalPlus4Code}</TextCell>
      )}
    </Flex>
  )
}

export { ZIPLast4Cell }
