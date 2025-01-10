'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const DefProviderField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]">Def. Provider</FormFieldLabel>
      <TextInput field="defProvider" className="h-6 w-full" />
      <FormFieldError name="defProvider" />
    </FormFieldContainer>
  )
}

export { DefProviderField }
