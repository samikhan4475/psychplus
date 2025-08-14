'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const DescriptionSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Description</FormFieldLabel>
      <CodesetSelect
        name="recordStatus"
        codeset={CODESETS.RecordStatus}
        size="1"
        className="h-6 w-[130px]"
        exclude={['Deleted', 'Archived']}
        placeholder="Description"
      />
    </FormFieldContainer>
  )
}

export { DescriptionSelect }
