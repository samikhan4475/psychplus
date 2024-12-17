'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const PracticeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Practice</FormFieldLabel>
      <SelectInput
        options={[]}
        field="practiceId"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] min-w-[108px]"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
