'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { DEFAULT_OPTIONS } from '../../constants'

const ToPracticeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Practice</FormFieldLabel>
      <SelectInput
        field="toPracticeId"
        options={DEFAULT_OPTIONS}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full"
        className="w-full"
        disabled
        value="all"
      />
      <FormFieldError name="toPracticeId" />
    </FormFieldContainer>
  )
}

export { ToPracticeSelect }
