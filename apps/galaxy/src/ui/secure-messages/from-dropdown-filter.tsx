import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { SelectInput } from '@/components'

const FromDropdownFilter = () => {
  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" weight="medium">
        From
      </Text>
      <SelectInput
        field="Select"
        label=""
        name=""
        className="w-full"
        buttonClassName="w-full"
        options={[{ label: 'Yes', value: 'yes' }]}
        key=""
        placeholder="Select"
      />
    </Flex>
  )
}

export { FromDropdownFilter }
