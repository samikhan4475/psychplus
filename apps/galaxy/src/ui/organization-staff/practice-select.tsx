'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getPracticeOptionsAction } from './actions'

const PracticeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Practice</FormFieldLabel>
      <AsyncSelect
        field="practicesIds.[0]"
        fetchOptions={getPracticeOptionsAction}
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
