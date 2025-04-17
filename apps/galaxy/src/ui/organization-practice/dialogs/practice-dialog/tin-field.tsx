'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const TinField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]">TIN</FormFieldLabel>
      <TextInput field="taxId" className="h-6 w-full" />
      <FormFieldError name="taxId" />
    </FormFieldContainer>
  )
}

export { TinField }
