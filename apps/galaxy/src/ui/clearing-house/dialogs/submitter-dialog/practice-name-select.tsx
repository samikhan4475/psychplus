'use client'

import { getPracticeIdsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const PracticeNameSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Practice Name</FormFieldLabel>
      <AsyncSelect
        field="practiceId"
        buttonClassName="w-full  text-1"
        required
        fetchOptions={getPracticeIdsAction}
      />
    </FormFieldContainer>
  )
}

export { PracticeNameSelect }
