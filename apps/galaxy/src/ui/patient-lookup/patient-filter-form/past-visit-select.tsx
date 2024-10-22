'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PastVisitSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Past Visit</FormFieldLabel>
      <CodesetSelect
        size="1"
        name="visitHistoryPastDays"
        codeset={CODESETS.QueryByNextDays}
        className="flex-1"
        placeholder="days"
      />
    </FormFieldContainer>
  )
}

export { PastVisitSelect }
