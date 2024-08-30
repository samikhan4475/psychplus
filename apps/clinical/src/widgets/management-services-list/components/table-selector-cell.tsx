'use client'

import { useState } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { History } from 'lucide-react'
import type { Service } from '@psychplus/management-services'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { Select } from '@psychplus/ui/select'

const TableCellSelector = ({
  row: { original: data },
  name,
}: PropsWithRow<Service> & { name: string }) => {
  const [value, setValue] = useState(data[name as keyof Service])
  const options = ['Active', 'Inactive']

  const updateSelection = (value: string) => {
    setValue(value)
  }

  return (
    <Flex gap={'2'} direction={'row'} justify={'start'} align={'center'}>
      <History className="w-[20px]" />
      <Box className="flex-1">
        <Select.Root
          value={value?.toString()}
          size="2"
          name={name}
          onValueChange={updateSelection}
        >
          <Select.Trigger className="w-full" />
          <Select.Content position="popper">
            {options.map((option) => (
              <Select.Item value={option} key={option}>
                {option}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Box>
    </Flex>
  )
}

export { TableCellSelector }
