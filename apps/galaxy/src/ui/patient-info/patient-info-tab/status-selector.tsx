'use client'

import { Flex, Select } from '@radix-ui/themes'

const StatusSelector = () => (
  <Select.Root defaultValue="pending" size="1">
    <Flex
      align="center"
      className="[&_.rt-SelectTriggerInner]:text-[12px] [&_.rt-SelectTrigger]:h-[24px]"
    >
      <Select.Trigger />
    </Flex>
    <Select.Content position="popper" align="end" highContrast>
      <Select.Item value="pending">Pending</Select.Item>
      <Select.Item value="another">Another</Select.Item>
    </Select.Content>
  </Select.Root>
)

export { StatusSelector }
