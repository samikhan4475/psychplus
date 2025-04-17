'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const TitleField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]" required>
        Title
      </FormFieldLabel>
      <TextInput field="shortName" className="h-6 w-full" />
      <FormFieldError name="shortName" />
    </FormFieldContainer>
  )
}

export { TitleField }
