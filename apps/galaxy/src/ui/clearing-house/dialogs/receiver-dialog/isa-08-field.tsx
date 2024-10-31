'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ISA08Field = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>ISA_08</FormFieldLabel>
      <TextInput field="isa08" className="w-full" />
      <FormFieldError name="isa08" />
    </FormFieldContainer>
  )
}

export { ISA08Field }
