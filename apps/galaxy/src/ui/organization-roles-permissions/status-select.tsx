'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Status</FormFieldLabel>
      <CodesetSelect
        name="recordStatus"
        codeset={CODESETS.RecordStatus}
        size="1"
        className="h-6 w-[120px]"
        exclude={['Deleted', 'Archived']}
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
