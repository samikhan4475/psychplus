'use client'

import { Flex, IconButton } from '@radix-ui/themes'
import { CloseIcon, TableEditIcon } from '@/components/icons'

const ActionCell = () => {
  return (
    <Flex gap="1">
      <IconButton variant="ghost" color="gray">
        <CloseIcon width={16} height={16} />
      </IconButton>
      <IconButton variant="ghost" color="gray">
        <TableEditIcon width={16} height={16} />
      </IconButton>
    </Flex>
  )
}

export { ActionCell }
