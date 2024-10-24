import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectInput } from '@/components'
import { SchemaType } from './schema'
import { SendMode } from './types'

const FromDropdownFilter = () => {
  const form = useFormContext<SchemaType>()

  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" weight="medium" className="text-[12px]">
        From
      </Text>
      <SelectInput
        field="Select"
        label=""
        className=" w-[238px]"
        value={form.watch('sendMode') || ''}
        onValueChange={(vals) => form.setValue('sendMode', vals)}
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
