import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { SelectInput } from '@/components'

const FromDropdownFilter = () => {
  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" weight="medium" className="text-[12px]">
        From
      </Text>
      <SelectInput
        field="Select"
        label=""
        name=""
        className=" w-[238px]"
        buttonClassName="w-full"
        options={[{ label: 'Yes', value: 'yes' }]}
        key=""
        placeholder="Select"
      />
    </Flex>
  )
}

export { FromDropdownFilter }
