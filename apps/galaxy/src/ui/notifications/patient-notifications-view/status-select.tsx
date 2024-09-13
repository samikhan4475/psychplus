'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        name="deliveryStatus"
        codeset={CODESETS.NotificationStatus}
        size="1"
        className="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
