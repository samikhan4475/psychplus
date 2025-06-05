'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const NpiField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]" required>
        NPI
      </FormFieldLabel>
      <TextInput field="npi" maxLength={10} className="h-6 w-full" />
      <FormFieldError name="npi" />
    </FormFieldContainer>
  )
}

export { NpiField }
