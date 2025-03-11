import React from 'react'
import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput } from '@/components'
import { SchemaType } from './payer-plan-address-form'

const DefaultAddressCheckbox = () => {
  const form = useFormContext<SchemaType>()
  return (
    <Text className="pt-2 text-[11.5px] font-[600]">
      <CheckboxInput
        field="isDefaultLocation"
        label="Default Address"
        checked={form.watch('isDefaultLocation')}
      />
    </Text>
  )
}

export { DefaultAddressCheckbox }
