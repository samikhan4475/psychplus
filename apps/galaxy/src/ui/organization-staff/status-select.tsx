'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Status</FormFieldLabel>
      <CodesetSelect
        name="statuses.[0]"
        codeset={CODESETS.RecordStatus}
        size="1"
        className="w-[calc(100%-45px)]"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
