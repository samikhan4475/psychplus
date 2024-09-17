'use client'

import { CodesetSelect, FormFieldContainer } from '@/components'
import { CODESETS } from '@/constants'

const DateRangeSelect = () => {
  return (
    <FormFieldContainer className="flex flex-row items-center gap-1">
      <CodesetSelect
        name="dateRange"
        placeholder="Date Range"
        codeset={CODESETS.TransactionType}
        size="1"
        className="h-7 w-[121px] text-1"
      />
    </FormFieldContainer>
  )
}

export { DateRangeSelect }
