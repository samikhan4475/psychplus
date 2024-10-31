'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ISA07Field = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>ISA_07</FormFieldLabel>
      <TextInput field="isa07" className="w-full" />
      <FormFieldError name="isa07" />
    </FormFieldContainer>
  )
}

export { ISA07Field }
