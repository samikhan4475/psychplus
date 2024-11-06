'use client'

import { I18nProvider } from 'react-aria-components'
import { DatePickerInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const CreatedOnField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Created On</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field="createdOn" className="w-[101px]" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { CreatedOnField }
