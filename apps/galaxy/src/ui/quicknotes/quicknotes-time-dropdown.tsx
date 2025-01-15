'use client'

import { Flex, Select, Text } from '@radix-ui/themes'
import { generateTimeOptions } from '@/utils'
import { useStore } from './store'

const QuickNotesTimeDropdown = () => {
  const options = generateTimeOptions()
  const { setSignOptions, signOptions } = useStore((state) => ({
    setSignOptions: state.setSignOptions,
    signOptions: state.signOptions,
  }))

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
      <Select.Root
        onValueChange={(e) => setSignOptions({ time: e })}
        size="1"
        value={signOptions.time}
        disabled={true}
      >
        <Select.Trigger className="max-w-[125px]">
          {signOptions.time}
        </Select.Trigger>
        <Select.Content highContrast>{items}</Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { QuickNotesTimeDropdown }
