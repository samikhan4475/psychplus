'use client'

import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'

interface PaymentTypeCheckBoxProps {
  label: string
  field: string
  value: string
  disabled?: boolean
}
const PaymentTypeCheckBox = ({
  label,
  field,
  value,
  disabled,
}: PaymentTypeCheckBoxProps) => {
  const form = useFormContext()

  const values = form.watch(field) as string[]

  const isChecked = (value: string) => values?.includes(value)

  const toggleChecked = (value: string) => {
    const newValues = isChecked(value)
      ? values?.filter((v) => v !== value)
      : [...values, value]

    form.setValue(field, newValues)
    form.trigger(field)
  }
  return (
    <FormFieldLabel>
      <Flex gap="2">
        <Checkbox
          size="1"
          disabled={disabled}
          checked={isChecked(value)}
          onCheckedChange={() => toggleChecked(value)}
          className="data-[state=checked]:before:bg-pp-text-primary-base"
        />
        <Text size="1" weight="bold">
          {label}
        </Text>
      </Flex>
    </FormFieldLabel>
  )
}

export { PaymentTypeCheckBox }
