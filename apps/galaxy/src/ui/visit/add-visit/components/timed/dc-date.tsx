'use client'

import { useState } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { FormFieldLabel } from '@/components/form'
import { PermissionAlert as ValidationAlert } from '@/ui/schedule/shared'
import { DC_DATE_VALIDATION_ALERT_MESSAGE } from '@/ui/visit/constants'
import { SchemaType } from '../../schema'

const DCDate = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useFormContext<SchemaType>()
  const visitType = useWatch({
    control: form.control,
    name: 'visitType',
  })

  return (
    <Flex direction={'column'} className="flex-1 gap-[2px]">
      <ValidationAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={DC_DATE_VALIDATION_ALERT_MESSAGE}
      />
      <FormFieldLabel required>DC Date</FormFieldLabel>
      <DatePickerInput
        field="dcDate"
        isDisabled={!visitType}
        onChange={(date) => {
          const currentDate = today(getLocalTimeZone())
          if (date.compare(currentDate.add({ days: 14 })) > 0) {
            form.setValue('dcDate', undefined)
            return setIsOpen(true)
          }
          form.setValue('dcDate', date)
        }}
        dateInputClass="h-6 w-full"
      />
    </Flex>
  )
}

export { DCDate }
