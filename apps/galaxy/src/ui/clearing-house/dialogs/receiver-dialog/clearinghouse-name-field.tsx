'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ClearinghouseNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Clearinghouse Name</FormFieldLabel>
      <TextInput field="clearingHouseName" className="w-full" />
      <FormFieldError name="clearingHouseName" />
    </FormFieldContainer>
  )
}

export { ClearinghouseNameField }
