'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldLabel
} from '@/components'
import { CODESETS } from '@/constants'

const PastVisitSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Past Visit</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.AppointmentStatus}
        name="pvStatus"
        className="flex-1 min-w-[72px]"
        size="1"
        placeholder='Status'
      />
      <CodesetSelect
        codeset={CODESETS.QueryByNextDays}
        name="pvDays"
        className="flex-1 min-w-[72px]"
        size="1"
        placeholder='Days'
      />
    </FormFieldContainer>
  )
}

export { PastVisitSelect }
