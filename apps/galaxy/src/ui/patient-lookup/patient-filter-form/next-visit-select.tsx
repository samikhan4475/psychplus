'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const NextVisitSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Next Visit</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.QueryByNextDays}
        size="1"
        name="futureVisitsByDays"
        placeholder="Days"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { NextVisitSelect }
