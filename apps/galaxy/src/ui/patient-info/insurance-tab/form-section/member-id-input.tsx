'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { InsuranceSchemaType } from './schema'

const MemberIDInput = () => {
  const form = useFormContext<InsuranceSchemaType>()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Member ID
      </FormFieldLabel>
      <TextField.Root
        type="text"
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Enter Member ID"
        size="1"
        {...form.register('memberId')}
        maxLength={16}
      />
      <FormFieldError name="memberId" />
    </FormFieldContainer>
  )
}

export { MemberIDInput }
