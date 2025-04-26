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
      <TextInput
        field="npi"
        className="h-6 w-full"
        placeHolder="Add NPI"
        maxLength={10}
      />
      <FormFieldError name="npi" />
    </FormFieldContainer>
  )
}

export { IndividualNpiField }
