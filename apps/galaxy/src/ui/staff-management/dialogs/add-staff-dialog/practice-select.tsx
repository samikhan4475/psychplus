import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useStore } from '../../store'

const PracticeSelect = () => {
  const practices = useStore((state) => state.dropDownOptions.practices)
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Practice</FormFieldLabel>
      <SelectInput
        disabled={practices.length === 0}
        options={practices}
        field="practiceIds.[0]"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="practiceIds.[0]" />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
