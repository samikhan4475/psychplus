'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ISA01Field = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>ISA_01</FormFieldLabel>
      <TextInput field="isa01" className="w-full" />
      <FormFieldError name="isa01" />
    </FormFieldContainer>
  )
}

export { ISA01Field }
