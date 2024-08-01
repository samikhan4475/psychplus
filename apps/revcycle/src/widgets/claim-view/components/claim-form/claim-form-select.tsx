'use client'

import { Flex, Text } from '@radix-ui/themes'
import { Select } from '@psychplus/ui/select'

interface FormSelectProps {
  label: string
  options: { label: string; value: string }[]
  defaultValue: string
}

const ClaimFormSelect = ({
  label,
  options,
  defaultValue,
}: FormSelectProps) => {
  return (
    <Flex direction="column">
      <Text size="2" className="pb-1 font-bold">
        {label}
      </Text>
      <Select.Root size="3" defaultValue={defaultValue}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export default ClaimFormSelect
