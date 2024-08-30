'use client'

import React from 'react'
import { Box, Flex, HoverCard } from '@radix-ui/themes'
import { History } from 'lucide-react'
import { Select } from '@psychplus/ui/select'
import { StatusCellTable } from './status-cell-table'

const TableCellStatus = () => {
  return (
    <Flex direction={'row'} align={'center'} justify={'start'} gap={'2'}>
      <HoverCard.Root>
        <HoverCard.Trigger>
          <History height={16} width={16} />
        </HoverCard.Trigger>
        <HoverCard.Content>
          <StatusCellTable />
        </HoverCard.Content>
      </HoverCard.Root>
      <Box className="flex-1">
        <Select.Root defaultValue="active" size="1">
          <Select.Trigger className="w-full" />
          <Select.Content position="popper">
            <Select.Item value="active">Active</Select.Item>
            <Select.Item value="complete">Complete</Select.Item>
          </Select.Content>
        </Select.Root>
      </Box>
    </Flex>
  )
}

export { TableCellStatus }
