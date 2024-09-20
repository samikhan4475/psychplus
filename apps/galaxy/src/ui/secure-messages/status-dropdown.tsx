import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { SelectInput } from '@/components'

const StatusDropdownFilter = () => {
  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" weight="medium">
        Status
      </Text>
      <SelectInput
        field="Select"
        label=""
        className="w-full"
        name=""
        buttonClassName="w-full"
        options={[{ label: 'Yes', value: 'yes' }]}
        key=""
        placeholder="Select"
      />
    </Flex>
  )
}

export { StatusDropdownFilter }
