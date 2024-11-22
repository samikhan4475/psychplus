import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { SelectInput } from '@/components'
import { SchemaType } from './schema'
import { SendMode } from './types'

const FromDropdownFilter = () => {
  const form = useFormContext<SchemaType>()
  const sendMode = useWatch({
    name: 'sendMode',
    control: form.control,
  })

  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" weight="medium" className="text-[12px]">
        From
      </Text>
      <SelectInput
        field="Select"
        label=""
        className=" w-[238px]"
        value={sendMode || ''}
        onValueChange={(value) => form.setValue('sendMode', value)}
        buttonClassName="w-full"
        options={[
          { label: 'Internal', value: SendMode.INTERNAL },
          { label: 'External', value: SendMode.EXTERNAL },
        ]}
        key=""
        placeholder="Select"
      />
    </Flex>
  )
}

export { FromDropdownFilter }
