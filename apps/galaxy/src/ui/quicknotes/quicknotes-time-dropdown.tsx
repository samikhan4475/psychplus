'use client'

import { useState } from 'react'
import { Flex, Select, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { generateTimeOptions } from '@/utils'

const QuickNotesTimeDropdown = () => {
  const options = generateTimeOptions()
  const [time, setTime] = useState(format(new Date(), 'HH:mm'))

  const items = options.map((option) => (
    <Select.Item
      key={option.value}
      value={option.value}
      disabled={option.disabled}
    >
      {option.label}
    </Select.Item>
  ))

  return (
    <Flex direction="column" gap="1">
      <Text size="1" weight="medium">
        Time
      </Text>
      <Select.Root onValueChange={setTime} size="1" value={time}>
        <Select.Trigger className="max-w-[125px]">{time}</Select.Trigger>
        <Select.Content highContrast>{items}</Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesTimeDropdown }
