import React from 'react'
import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput } from '@/components'
import { SchemaType } from './payer-plan-address-form'

const StatusCheckbox = () => {
  const form = useFormContext<SchemaType>()
  return (
    <Text className="pt-2 text-[11.5px] font-[600]">
      <CheckboxInput
        field="status"
        label="Mark as Active"
        checked={form.watch('status')}
      />
    </Text>
  )
}

export { StatusCheckbox }
