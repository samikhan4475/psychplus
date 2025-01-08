'use client'

import { getPracticeIdsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const PracticeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="ml-2 !text-1">Practice</FormFieldLabel>
      <AsyncSelect
        field="practiceId"
        placeholder="Select"
        fetchOptions={getPracticeIdsAction}
        buttonClassName="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
