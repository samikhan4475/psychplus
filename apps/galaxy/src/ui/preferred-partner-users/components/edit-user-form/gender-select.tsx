'use client'

import { Select } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface GenderSelectProps {
  disabled?: boolean
}

const GenderSelect = ({ disabled = false }: GenderSelectProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>
        Gender
      </FormFieldLabel>
      <Controller
        name="gender"
        control={form.control}
        render={({ field }) => (
          <Select.Root
            size="1"
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <Select.Trigger placeholder="Select gender" />
            <Select.Content>
              <Select.Item value="Male">Male</Select.Item>
              <Select.Item value="Female">Female</Select.Item>
              <Select.Item value="NotSpecified">Not Specified</Select.Item>
            </Select.Content>
          </Select.Root>
        )}
      />
      <FormFieldError name="gender" />
    </FormFieldContainer>
  )
}

export { GenderSelect }
