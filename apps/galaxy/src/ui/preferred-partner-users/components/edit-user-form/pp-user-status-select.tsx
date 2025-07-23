'use client'

import { Select } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface PPUserStatusSelectProps {
  disabled?: boolean
}

const PPUserStatusSelect = ({ disabled }: PPUserStatusSelectProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>
        PP User Status
      </FormFieldLabel>
      <Controller
        name="ppUserStatus"
        control={form.control}
        render={({ field }) => (
          <Select.Root
            size="1"
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <Select.Trigger placeholder="Select status" />
            <Select.Content>
              <Select.Item value="Active">Active</Select.Item>
              <Select.Item value="Deleted">Deleted</Select.Item>
            </Select.Content>
          </Select.Root>
        )}
      />
      <FormFieldError name="ppUserStatus" />
    </FormFieldContainer>
  )
}

export { PPUserStatusSelect }
