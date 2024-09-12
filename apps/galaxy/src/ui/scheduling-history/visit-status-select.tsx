'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const VisitStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Visit Status</FormFieldLabel>
      <CodesetSelect
        name="visitStatus"
        codeset={CODESETS.AppointmentStatus}
        className={buttonClassName}
        size="1"
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 w-[113px] h-6 border border-solid !outline-none [box-shadow:none]'
export { VisitStatusSelect }
