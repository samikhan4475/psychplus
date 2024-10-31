'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const ISA03Field = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>ISA_03</FormFieldLabel>
      <TextInput field="isa03" className="w-full" />
      <FormFieldError name="isa03" />
    </FormFieldContainer>
  )
}

export { ISA03Field }
