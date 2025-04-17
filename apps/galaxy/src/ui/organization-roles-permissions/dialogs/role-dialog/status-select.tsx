'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        name="recordStatus"
        codeset={CODESETS.RecordStatus}
        className="h-6 w-full"
        exclude={['Deleted', 'Archived']}
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
