'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const IndividualNpiField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]" required>
        Individual NPI
      </FormFieldLabel>
      <TextInput field="individualNpi" className="h-6 w-full" />
      <FormFieldError name="individualNpi" />
    </FormFieldContainer>
  )
}

export { IndividualNpiField }
