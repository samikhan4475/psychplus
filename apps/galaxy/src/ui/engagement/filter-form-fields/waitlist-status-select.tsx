'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { WAITLIST_STATUS_CODESET } from '../constant'

const WaitlistStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Waitlist Status</FormFieldLabel>
      <SelectInput
        field="waitlistStatus"
        buttonClassName={buttonClassName}
        options={WAITLIST_STATUS_CODESET}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]'
export { WaitlistStatusSelect }
