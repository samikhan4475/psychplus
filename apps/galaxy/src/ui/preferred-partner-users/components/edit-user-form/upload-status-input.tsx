'use client'

import { Select } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface UploadStatusInputProps {
  disabled?: boolean
}

const UploadStatusInput = ({ disabled }: UploadStatusInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>
        Upload Status
      </FormFieldLabel>
      <Controller
        name="uploadStatus"
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
              <Select.Item value="New">New</Select.Item>
              <Select.Item value="Matched">Matched</Select.Item>
              <Select.Item value="Unmatched">Unmatched</Select.Item>
              <Select.Item value="Reconcile">Reconcile</Select.Item>
            </Select.Content>
          </Select.Root>
        )}
      />
      <FormFieldError name="uploadStatus" />
    </FormFieldContainer>
  )
}

export { UploadStatusInput }
