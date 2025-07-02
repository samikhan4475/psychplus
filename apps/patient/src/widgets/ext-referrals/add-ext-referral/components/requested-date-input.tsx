'use client'

import { getCalendarDate, getCalendarDateLabel } from '@psychplus-v2/utils'
import { useFormContext } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'
import { FormField } from '@/components-v2'
import { SchemaType } from './schema'

const RequestedDateInput = () => {
  const form = useFormContext<SchemaType>()
  const today = getCalendarDate()

  return (
    <FormField
      containerClassName="flex-1"
      name="requestedTime"
      label="Select Date"
      showError={false}
    >
      <FormTextInput
        type="date"
        label=""
        min={getCalendarDateLabel(today)}
        data-testid="referral-date-of-birth-input"
        {...form.register('requestedTime')}
        className="text-pp-gray-1 h-[38px] p-2 text-[14px] font-regular uppercase"
      />
    </FormField>
  )
}

export { RequestedDateInput }
