import React, { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SelectInput } from '@/components'
import { SchemaType } from './secure-messages-view'

const StatusDropdownFilter = () => {
  const form = useFormContext<SchemaType>()

  useEffect(() => {
    form.register('status')
  }, [form])

  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" className="text-[12px]" weight="medium">
        Status
      </Text>
      <SelectInput
        field="Select"
        label=""
        className="w-full"
        name="status"
        value={form.watch('status')}
        onValueChange={(vals) => form.setValue('status', vals)}
        buttonClassName="w-full"
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
        placeholder="Select"
      />
    </Flex>
  )
}

export { StatusDropdownFilter }
