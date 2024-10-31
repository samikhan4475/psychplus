'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ISA05Field = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>ISA_05</FormFieldLabel>
      <TextInput field="isa05" className="w-full" />
      <FormFieldError name="isa05" />
    </FormFieldContainer>
  )
}

export { ISA05Field }
