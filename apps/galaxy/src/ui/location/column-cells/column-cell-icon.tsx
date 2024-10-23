import { EditUnderlinedIcon, LinkIcon } from '@/components/icons'
import { Flex } from '@radix-ui/themes'
import React from 'react'

const ColumnCellIcon = () => {
  return (
    <Flex gap="1">
      <EditUnderlinedIcon />
      <LinkIcon />
    </Flex>
  )
}

export { ColumnCellIcon }