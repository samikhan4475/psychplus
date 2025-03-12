'use client'

import { useState } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'
import { PermissionAlert as ValidationError } from '@/ui/schedule/shared'
import { DC_DATE_VALIDATION_ALERT_MESSAGE } from '@/ui/visit/constants'
import { SchemaType } from '../../schema'

const DCDate = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useFormContext<SchemaType>()
  const visitType = useWatch({
    name: 'visitType',
    control: form.control,
  })
  return (
    <Flex direction={'column'} className="flex-1 gap-[2px]">
      <ValidationError
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={DC_DATE_VALIDATION_ALERT_MESSAGE}
      />
      <FormFieldLabel required>DC Date</FormFieldLabel>
      <DatePickerInput
        isDisabled={!visitType}
        dateInputClass="h-6 w-full"
        field="dcDate"
        onChange={(date) => {
          const fourteenDaysFromNow = today(getLocalTimeZone()).add({
            days: 14,
          })
          const isDcDateGreaterThan14DaysFromToday =
            date.compare(fourteenDaysFromNow) > 0
          if (isDcDateGreaterThan14DaysFromToday) {
            form.setValue('dcDate', undefined, {
              shouldDirty: true,
            })
            return setIsOpen(true)
          }
          form.setValue('dcDate', date, {
            shouldDirty: true,
          })
        }}
      />
    </Flex>
  )
}

export { DCDate }
