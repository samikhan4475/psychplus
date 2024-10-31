'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const GS03Field = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>GS_03</FormFieldLabel>
      <TextInput field="gs03" className="w-full" />
      <FormFieldError name="gs03" />
    </FormFieldContainer>
  )
}

export { GS03Field }
