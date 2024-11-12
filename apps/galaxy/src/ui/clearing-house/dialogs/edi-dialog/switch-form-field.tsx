'use client'

import { Flex, Switch, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components/form'

interface SwitchFormFieldProps {
  label: string
  field: string
}

const SwitchFormField = ({ label, field }: SwitchFormFieldProps) => {
  const form = useFormContext()

  const onCheckedChange = (value: boolean) => {
    form.setValue(field, value, { shouldValidate: true, shouldDirty: true })
  }

  return (
    <FormFieldContainer className="flex-row gap-1.5">
      <Text as="label" size="3">
        <Flex gap="2">
          <Text className="w-[300px] text-1 font-medium">{label}</Text>
          <Switch
            size="1"
            color="green"
            checked={form.getValues(field)}
            onCheckedChange={onCheckedChange}
          />
        </Flex>
      </Text>
    </FormFieldContainer>
  )
}

export { SwitchFormField }
