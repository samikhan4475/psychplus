'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        name="orderStatus"
        size="1"
        className="h-6 w-[101px]"
        codeset={CODESETS.LabOrderStatus}
      />
    </FormFieldContainer>
  )
}
export { StatusSelect }
