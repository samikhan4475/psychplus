'use client'

import { DatePickerInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const AuthDate = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel>Auth Date</FormFieldLabel>
      <DatePickerInput
        dateInputClass="h-6 w-full"
        field="authDate"
        isDisabled={isPsychiatristVisitTypeSequence}
      />
      <FormFieldError name="authDate" />
    </FormFieldContainer>
  )
}

export { AuthDate }
