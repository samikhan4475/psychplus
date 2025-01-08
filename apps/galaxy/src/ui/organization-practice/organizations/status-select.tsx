'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const Statuselect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        name="status"
        codeset={CODESETS.RecordStatus}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { Statuselect }
