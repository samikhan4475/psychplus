'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { ALERT_SENT_OPTIONS } from '../constant'

const AlertSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Alert</FormFieldLabel>
      <SelectInput
        field="isAlertSent"
        buttonClassName={buttonClassName}
        options={ALERT_SENT_OPTIONS}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]'
export { AlertSelect }
