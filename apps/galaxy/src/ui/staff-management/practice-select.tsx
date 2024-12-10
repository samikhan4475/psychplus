import React from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from './store'

const PracticeSelect = () => {
  const practices = useStore((state) => state.dropDownOptions.practices)
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Practice</FormFieldLabel>
      <SelectInput
        disabled={practices.length === 0}
        options={practices}
        field="practicesIds.[0]"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
