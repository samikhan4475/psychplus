'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const SchedulingStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Scheduling Status</FormFieldLabel>
      <CodesetSelect
        name="appointmentStatus"
        codeset={CODESETS.AppointmentStatus}
        className={buttonClassName}
        size="1"
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]'
export { SchedulingStatusSelect }
